<template>
  <div class="p-error">
    <div class="l-container">
      <h1 v-if="error.statusCode === 404">404! Page not found</h1>
      <h1 v-else>An error occurred</h1>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>

<style lang="scss" scoped>
.p-error {
  padding: 100px 0;
  text-align: center;
}
</style>