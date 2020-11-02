<template>
  <header class="c-header">
    <div class="l-container">
      <div class="c-header__logo">
        <NuxtLink to="/">Book<span class="u-primary-color">Store</span></NuxtLink>
      </div>
      <nav class="c-gnavi">
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
  padding:  20px 0;
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
  }
}
.c-gnavi {
  ul {
    display: flex;
    li {
      margin: 0 30px;
    }
  }
}
</style>