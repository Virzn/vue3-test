<template>
  <!-- 匹配到的路由、页面会在这里展示 -->
  <div class="app">
    <h2>vue 子应用</h2>
    <div class="menu">
      <router-link to="/">list</router-link>
      <router-link to="/detail">detail</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.app {
  padding: 24px;
}
.menu {
  margin-bottom: 24px;
}
.menu a {
  margin-right: 24px;
}
</style>
