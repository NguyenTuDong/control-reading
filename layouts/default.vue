<template>
  <div>
    <AppHeader />
    <Nuxt />
    <AppFooter />
  </div>
</template>

<style lang="scss">
html {
  font-family:'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 400;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #263D57;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
a {
  color: #263D57;
  text-decoration: none;
  transition: 500ms;
  &:hover {
    opacity: 0.5;
  }
}
ul, ol {
  list-style: none;
  padding: 0;
}
.l-container {
  max-width: 1200px;
  margin: 0 auto;
}
.u-primary-color {
  color: #EE434C;
}
</style>
