<template>
  <main class="p-page">
    <div class="l-container">
      <section class="c-banner">
        Welcome back!
      </section>
      <div class="c-slide">
        <div class="c-slide__header">
          <h3 class="c-slide__title">Best of the Month</h3>
          <NuxtLink to="/books" class="c-slide__more">See more</NuxtLink>
        </div>
        <div class="c-slide__list">
          <div v-for="book in books" :key="book.id" class="c-slide__item">
            <NuxtLink :to="`/books/${book.id}`">
              <div class="c-card">
                <div class="c-card__thumbnail">
                  <img :src="book.thumbnail" alt="">
                </div>
                <div class="c-card__title">{{ book.title }}</div>
                <div class="c-card__author">{{ book.author }}</div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  async asyncData() {
    try {
      let data = await axios.get("/api/books");
      return { books: data.data };
    } catch (error) {
      console.log(error);
      return { books: [] };
    }
  },
}
</script>

<style lang="scss">
.p-page {
  padding: 100px 0;
}
.c-banner {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 100px;
}
.c-slide {
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  &__title {
    font-size: 18px;
  }
  &__more {
    color: #86929F;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }
  &__item {
    flex: 0 0 20%;
    max-width: 20%;
    padding: 0 10px;
    @media only screen and (max-width: 812px) {
      flex: 0 0 33.33%;
      max-width: 33.33%;
    }
    @media only screen and (max-width: 450px) {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
}
.c-card {
  &__thumbnail {
    padding-top: 150%;
    position: relative;
    margin-bottom: 15px;
    -moz-box-shadow: 0 0 15px rgba(0,0,0,0.2);
    -webkit-box-shadow: 0 0 15px rgba(0,0,0,0.2);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__title {
    font-weight: 700;
    margin-bottom: 5px;
  }
  &__author {
    color: #86929F;
  }
}
</style>
