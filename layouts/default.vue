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
  scroll-behavior: smooth;
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
body {
  position: relative;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transition: 1000ms ease-in-out;
    z-index: 9999;
  }
  &.hide {
    &::before {
      background-color: black;
    }
  }
}
.l-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 50px;
}
.u-primary-color {
  color: #EE434C;
}
</style>
