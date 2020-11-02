<template>
  <footer class="c-footer">
    <div class="l-container">
      <div class="c-footer__logo">
        Book<span class="u-primary-color">Store</span>
      </div>
      <div class="c-footer__copy">
        ©{{ new Date().getFullYear() }}. All rights reserved
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.c-footer {
  background-color: #5C4C4D;
  color: white;
  padding: 70px 0;
  & > .l-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__logo {
    font-size: 30px;
  }
  &__copy {
    font-size: 12px;
  }
}
</style>