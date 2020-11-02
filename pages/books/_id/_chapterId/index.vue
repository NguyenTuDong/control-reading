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
  </main>
</template>

<script>
import axios from '~/plugins/axios'
import * as tf from '@tensorflow/tfjs'
import * as tmPose from '@teachablemachine/pose'
import modelJSON from '~/data/model.json'
import metadataJSON from '~/data/metadata.json'

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
      maxPredictions: null,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      let self = this;
      // load the model and metadata
      // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
      // Note: the pose library adds a tmPose object to your window (window.tmPose)
      this.model = await tmPose.load(modelURL, metadataURL)
      this.maxPredictions = this.model.getTotalClasses()

      // Convenience function to setup a webcam
      const size = 200
      const flip = true // whether to flip the webcam
      this.webcam = new tmPose.Webcam(size, size, flip) // width, height, flip
      await this.webcam.setup() // request access to the webcam
      await this.webcam.play()
      window.requestAnimationFrame(self.loop)
    },
    async loop(timestamp) {
      this.webcam.update() // update the webcam frame
      await this.predict()
      window.requestAnimationFrame(this.loop)
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

      if (className == 'NotLook') {
        document.body.classList.add('hide');
      } else {
        document.body.classList.remove('hide');
      }

      if (className == 'LookUp' && window.scrollY > 3) {
        window.scroll(0, window.scrollY - 3);
      }

      if (className == 'LookDown') {
        window.scroll(0, window.scrollY + 3);
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
  }
  &__title {
    margin-bottom: 20px;
  }
  &__chapter {
    margin-bottom: 20px;
  }
  &__nav {
    a {
      display: inline-block;
      height: 50px;
      width: 150px;
      background-color: #ee434c;
      line-height: 48px;
      color: white;
      border-radius: 5px;
      font-weight: bold;
      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
  &__body {
    font-size: 26px;
    line-height: 2;
    margin-bottom: 50px;
  }
  &__footer {
    text-align: center;
  }
}
</style>