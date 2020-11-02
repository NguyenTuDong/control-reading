<template>
  <main class="p-page">
    <div class="l-container">
      <div class="c-slide">
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
export default {
  async asyncData({ $axios }) {
    let data = await $axios.get("/api/books");
    return { books: data.data };
  },
}
</script>

<style>

</style>