<template>
  <main class="p-chapter">
    <div class="l-container">
      <div class="c-chapter">
        <div class="c-chapter__header">
          <h1 class="c-chapter__title">{{ chapter.bookTitle }}</h1>
          <h2 class="c-chapter__chapter">
            {{ chapter.chapter }}: {{ chapter.title }}
          </h2>
          <div class="c-chapter__nav">
            <NuxtLink
              :to="chapter.prev"
              :class="{ disabled: chapter.prev == '' }"
              >Chương trước</NuxtLink
            >
            <NuxtLink
              :to="chapter.next"
              :class="{ disabled: chapter.next == '' }"
              >Chương sau</NuxtLink
            >
          </div>
        </div>
        <p class="c-chapter__body" v-html="chapter.body"></p>
        <div class="c-chapter__footer">
          <div class="c-chapter__nav">
            <NuxtLink
              :to="chapter.prev"
              :class="{ disabled: chapter.prev == '' }"
              >Chương trước</NuxtLink
            >
            <NuxtLink
              :to="chapter.next"
              :class="{ disabled: chapter.next == '' }"
              >Chương sau</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="c-control">
      <button class="c-control__button" @click="togglePanel"><i class="fas fa-cog"></i></button>
      <div class="c-control__panel">
        <label class="c-switch" for="gesture_switch">Reading gesture: 
          <input v-model="readingGesture" type="checkbox" id="gesture_switch">
          <span class="c-switch__slider"></span>
        </label>
        <label class="c-slider" for="scroll_speed">Scrolling speed: <span class="u-primary-color">{{scrollSpeed}}</span>
          <input v-model="scrollSpeed" type="range" min="20" max="100" id="scroll_speed">
        </label>
        <p v-if="loadingModel">Loading...</p>
      </div>
    </div>
  </main>
</template>

<script>
import axios from '~/plugins/axios'
import * as tf from '@tensorflow/tfjs'
import * as tmPose from '@teachablemachine/pose'
import modelJSON from '~/data/model.json'
import metadataJSON from '~/data/metadata.json'
import { mapState } from 'vuex'

const URL = "https://teachablemachine.withgoogle.com/models/2-TLkuF-X/";

export default {
  async asyncData({ route }) {
    try {
      let chapter = await axios.get(
        `/api/books/${route.params.id}/chapters/${route.params.chapterId}`
      )
      return { chapter: chapter.data }
    } catch (error) {
      console.log(error);
      return { chapter: {} }
    }
  },
  data() {
    return {
      model: null,
      webcam: null,
      isActive: true,
      loadedModel: false,
      loadingModel: false,
      animation: false,
      delay: 0,
    }
  },
  computed: {
    readingGesture: {
      get () {
        return this.$store.state.readingGesture;
      },
      set (value) {
        let self = this;
        self.$store.commit('toggleReadingGesture', value)
        let val = self.readingGesture ? '1' : '0';
        self.setCookie('readingGesture', val);
        if(value) {
          self.init();
        }
      }
    },
    scrollSpeed: {
      get () {
        return this.$store.state.scrollSpeed;
      },
      set (value) {
        let self = this;
        self.$store.commit('setScrollSpeed', value)
        self.setCookie('scrollSpeed', self.scrollSpeed);
      }
    }
  },
  mounted() {
    let self = this;
    if(!self.getCookie('readingGesture')) {
      let value = self.readingGesture ? '1' : '0';
      self.setCookie('readingGesture', value);
    } else {
      let value = self.getCookie('readingGesture') == '1' ? true : false;
      this.$store.commit('toggleReadingGesture', value)
    }
    if (!self.getCookie('scrollSpeed')) {
      self.setCookie('scrollSpeed', self.scrollSpeed);
    } else {
      let value = parseInt(self.getCookie('scrollSpeed'));
      self.$store.commit('setScrollSpeed', value)
    }
    if(this.isActive && this.readingGesture) this.init();
  },
  beforeDestroy() {
    this.isActive = false;
    if (this.webcam) this.webcam.pause();
  },
  methods: {
    togglePanel() {
      $('.c-control__panel').slideToggle(300);
    },
    setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },
    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },
    eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    async init() {
      let self = this;
      if(!this.loadedModel) {
        this.loadingModel = true;
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        self.model = await tmPose.load(modelURL, metadataURL)

        // Convenience function to setup a webcam
        const size = 200
        const flip = true // whether to flip the webcam
        self.webcam = new tmPose.Webcam(size, size, flip) // width, height, flip
        await self.webcam.setup() // request access to the webcam
        await self.webcam.play()
        this.loadedModel = true;
        this.loadingModel = false;
      }
      window.requestAnimationFrame(self.loop)
    },
    async loop(timestamp) {
      let { webcam, predict, isActive, readingGesture, loop } = this;
      if (!this.animation) {
        webcam.update() // update the webcam frame
        await predict()
      } else {
        this.delay++;
        if (this.delay == 100) {
          this.animation = false;
          this.delay = 0;
        }
      }
      if(isActive && readingGesture) {
        window.requestAnimationFrame(loop)
      }
    },
    async predict() {
      let self = this;
      let className = '';
      // Prediction #1: run input through posenet
      // estimatePose can take in an image, video or canvas html element
      const { pose, posenetOutput } = await self.model.estimatePose(self.webcam.canvas)
      // Prediction 2: run input through teachable machine classification model
      const prediction = await self.model.predictTopK(posenetOutput, 1)
      className = prediction[0].className;

      console.log(className);
      if (className == 'NotLook') {
        self.animation = true;
          $('body').addClass('hide');
      } else {
        if ($('body').hasClass('hide')) {
          self.animation = true;
          $('body').removeClass('hide');
        }
      }

      let scrollTop = $(window).scrollTop();
      let scrollSpeed = parseInt(self.scrollSpeed);

      if (className == 'LookUp' && scrollTop > scrollSpeed) {
        self.animation = true;
        $('html, body').stop().animate({
          scrollTop: scrollTop - scrollSpeed
        }, 800)
      }

      if (className == 'LookDown') {
        self.animation = true;
        $('html, body').stop().animate({
          scrollTop: scrollTop + scrollSpeed
        }, 800)
      }
    },
  },
}
</script>

<style lang="scss">
.p-chapter {
  padding-top: 50px;
  padding-bottom: 100px;
}
.c-chapter {
  &__header {
    margin-bottom: 100px;
    text-align: center;
    @media only screen and (max-width: 812px) {
      margin-bottom: 75px;
    }
    @media only screen and (max-width: 450px) {
      margin-bottom: 50px;
    }
  }
  &__title {
    margin-bottom: 20px;
    @media only screen and (max-width: 450px) {
      font-size: 26px;
    }
  }
  &__chapter {
    margin-bottom: 50px;
    @media only screen and (max-width: 450px) {
      font-size: 20px;
      margin-bottom: 30px;
    }
  }
  &__nav {
    a {
      display: inline-block;
      height: 45px;
      width: 150px;
      background-color: #ee434c;
      line-height: 44px;
      color: white;
      border-radius: 5px;
      font-weight: bold;
      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
      @media only screen and (max-width: 450px) {
        height: 40px;
        width: 130px;
        font-size: 14px;
        line-height: 40px;
      }
    }
  }
  &__body {
    font-size: 26px;
    line-height: 2;
    margin-bottom: 50px;
    @media only screen and (max-width: 812px) {
      font-size: 22px;
    }
    @media only screen and (max-width: 450px) {
      font-size: 18px;
    }
  }
  &__footer {
    text-align: center;
  }
}
.c-control {
  position: fixed;
  bottom: 30px;
  right: 30px;
  &__button {
    width: 50px;
    height: 50px;
    background-color: #ee434c;
    border: 0;
    padding: 0;
    display: block;
    color: white;
    border-radius: 25px;
    font-size: 20px;
    outline: none;
    cursor: pointer;
    -moz-box-shadow: 0 0 15px rgba(0,0,0,0.1);
    -webkit-box-shadow: 0 0 15px rgba(0,0,0,0.1);
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    @media only screen and (max-width: 450px) {
      width: 40px;
      height: 40px;
      font-size: 18px;
    }
  }
  &__panel {
    position: absolute;
    bottom: 60px;
    right: 0;
    width: 300px;
    background-color: white;
    padding: 20px;
    -moz-box-shadow: 0 0 15px rgba(0,0,0,0.1);
    -webkit-box-shadow: 0 0 15px rgba(0,0,0,0.1);
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    border-radius: 10px;
    display: none;
    label {
      margin-bottom: 15px;
      @media only screen and (max-width: 450px) {
        margin-bottom: 10px;
      }
    }
    @media only screen and (max-width: 450px) {
      bottom: 50px;
      width: 230px;
      padding: 10px;
    }
  }
  @media only screen and (max-width: 450px) {
    bottom: 15px;
    right: 15px;
  }
}
.c-switch {
  cursor: pointer;
  display: flex;
  align-items: center;
  input {
    display: none;
    &:checked + .c-switch__slider {
      background-color: #ee434c;
      &:before {
        -webkit-transform: translateX(30px);
        -ms-transform: translateX(30px);
        transform: translateX(30px);
      }
    }
  }
  &__slider {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;
    background-color: #ccc;
    transition: 400ms;
    border-radius: 30px;
    margin-left: 20px;
    &::before {
      content: '';
      position: absolute;
      width: 22px;
      height: 22px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 400ms;
      border-radius: 50%;
    }
  }
  @media only screen and (max-width: 450px) {
    font-size: 14px;
  }
}
.c-slider {
  input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    border-radius: 15px;  
    outline: none;
    margin-top: 15px;
    // Chrome
		@media screen and (-webkit-min-device-pixel-ratio:0) {
			& {
				overflow: hidden;
				height: 12px;
				-webkit-appearance: none;
				background-color: #ddd;
			}
			&::-webkit-slider-runnable-track {
				height: 12px;
				-webkit-appearance: none;
				color: #444;
				// margin-top: -1px;
				transition: box-shadow 0.2s ease-in-out;
			}
			&::-webkit-slider-thumb {
				width: 12px;
				-webkit-appearance: none;
				height: 12px;
				cursor: ew-resize;
				background: #ee434c;
				box-shadow: -340px 0 0 330px #ee434c, inset 0 0 0 2px #fff;
				border-radius: 50%;
				transition: box-shadow 0.2s ease-in-out;
				position: relative;
			}
		}
  }
  @media only screen and (max-width: 450px) {
    font-size: 14px;
  }
}
</style>