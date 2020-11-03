<template>
  <main class="p-book">
    <div class="l-container">
      <div class="c-book">
        <div class="c-book__header">
          <h1 class="c-book__title">Linh Vũ Thiên Hạ</h1>
        </div>
        <div class="c-book__body">
          <div class="c-book__left">
            <div class="c-book__thumbnail-container">
              <div class="c-book__thumbnail">
                <img :src="book.thumbnail" alt="">
              </div>
            </div>
            <p>
              <b>Tác giả:</b> {{ book.author }}
            </p>
            <p>
              <b>Trạng thái:</b> {{ book.status }}
            </p>
          </div>
          <div class="c-book__right">
            <p><b>Nhóm dịch:</b> {{ book.translationTeam }}</p>
            <br>
            <p v-html="book.description"></p>
          </div>
        </div>
      </div>
      <div class="c-chapters">
        <h2 class="c-chapters__title">Danh sách chương</h2>
        <div class="c-chapters__list">
          <ul>
            <li v-for="chapter in book.chapters" :key="chapter.id"><NuxtLink :to="`/books/${book.id}/${chapter.id}`">{{ chapter.chapter }}: {{ chapter.title }}</NuxtLink></li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  async asyncData({ route }) {
    try {
      let data = await axios.get(`/api/books/${route.params.id}`);
      return { book: data.data };
    } catch (error) {
      console.log(error);
      return { book: {} };
    }
  },
}
</script>

<style lang="scss">
.p-book {
  padding-bottom: 100px;
}
.c-book {
  margin-bottom: 100px;
  &__header {
    padding: 50px 0;
  }
  &__title {
    font-size: 40px;
    text-align: center;
    @media only screen and (max-width: 450px) {
      font-size: 30px;
    }
  }
  &__body {
    display: flex;
    @media only screen and (max-width: 812px) {
      display: block;
    }
  }
  &__left {
    flex: 0 0 250px;
    max-width: 250px;
    @media only screen and (max-width: 812px) {
      max-width: 100%;
      margin-bottom: 30px;
    }
  }
  &__right {
    flex: 1;
    padding-left: 50px;
    @media only screen and (max-width: 812px) {
      padding-left: 0;
    }
  }
  &__thumbnail-container {
    @media only screen and (max-width: 812px) {
      width: 300px;
      margin: 0 auto;
    }
    @media only screen and (max-width: 450px) {
      width: 200px;
    }
  }
  &__thumbnail {
    position: relative;
    padding-top: 150%;
    margin-bottom: 20px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.c-chapters {
  text-align: center;
  &__title {
    text-align: center;
    font-size: 30px;
    display: inline-block;
    position: relative;
    margin-bottom: 50px;
    &::before {
      content: '';
      display: block;
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #86929F;
    }
    @media only screen and (max-width: 450px) {
      font-size: 26px;
    }
  }
  &__list {
    li {
      font-size: 20px;
      margin-bottom: 20px;
      @media only screen and (max-width: 450px) {
        font-size: 18px;
      }
    }
  }
}
</style>