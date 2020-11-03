<template>
  <header class="c-header">
    <div class="l-container">
      <div class="c-header__logo">
        <NuxtLink to="/">Book<span class="u-primary-color">Store</span></NuxtLink>
      </div>
      <nav class="c-gnavi">
        <button class="c-gnavi__button">
          <span></span>
          <span></span>
        </button>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/books">Books</NuxtLink></li>
          <li><NuxtLink to="/blogs">Blog</NuxtLink></li>
        </ul>
      </nav>
      <div class="c-header__auth">
        <ul>
          <li><NuxtLink to="/login">Login</NuxtLink></li>
          <li><NuxtLink to="/register">Register</NuxtLink></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.c-header {
  padding: 20px 0;
  -moz-box-shadow: 0 0 6px rgba(0,0,0,0.3);
  -webkit-box-shadow: 0 0 6px rgba(0,0,0,0.3);
  box-shadow: 0 0 6px rgba(0,0,0,0.3);
  .l-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__logo {
    width: 200px;
    font-weight: 500;
    font-size: 30px;
    @media only screen and (max-width: 450px) {
      font-size: 26px;
    }
  }
  &__auth {
    width: 200px;
    ul {
      display: flex;
      justify-content: flex-end;
      li {
        margin-left: 20px;
      }
    }
    @media only screen and (max-width: 812px) {
      display: none;
    }
  }
  @media only screen and (max-width: 450px) {
    padding: 10px 0;
  }
}
.c-gnavi {
  &__button {
    display: none;
    @media only screen and (max-width: 812px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 30px;
      height: 30px;
      background-color: transparent;
      outline: 0;
      border: 0;
      padding: 0;
      cursor: pointer;
      span {
        display: block;
        width: 30px;
        height: 2px;
        background-color: #263D57;
        margin: 4px 0;
      }
    }
  }
  ul {
    display: flex;
    li {
      margin: 0 30px;
    }
    @media only screen and (max-width: 812px) {
      display: none;
    }
  }
}
</style>