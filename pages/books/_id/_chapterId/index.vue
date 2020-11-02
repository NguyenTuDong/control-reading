<template>
  <main class="p-chapter">
    <div class="l-container">
      <div class="c-chapter">
        <div class="c-chapter__header">
          <h1 class="c-chapter__title">{{ chapter.bookTitle }}</h1>
          <h2 class="c-chapter__chapter">{{ chapter.chapter }}: {{ chapter.title }}</h2>
          <div class="c-chapter__nav">
            <NuxtLink :to="chapter.prev" :class="{'disabled': chapter.prev == ''}">Chương trước</NuxtLink>
            <NuxtLink :to="chapter.next" :class="{'disabled': chapter.next == ''}">Chương sau</NuxtLink>
          </div>
        </div>
        <p class="c-chapter__body" v-html="chapter.body"></p>
        <div class="c-chapter__footer">
          <div class="c-chapter__nav">
            <NuxtLink :to="chapter.prev" :class="{'disabled': chapter.prev == ''}">Chương trước</NuxtLink>
            <NuxtLink :to="chapter.next" :class="{'disabled': chapter.next == ''}">Chương sau</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    let chapter = await $axios.get(`/api/books/${route.params.id}/chapters/${route.params.chapterId}`);
    return { chapter: chapter.data };
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
      background-color: #EE434C;
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