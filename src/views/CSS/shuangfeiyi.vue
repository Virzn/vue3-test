<template>
  <div class="header"></div>
  <div class="container">
    <div class="inner">
      <div class="center"></div>
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
  <div class="footer"></div>
  <input type="file">
</template>


<style scoped>
.header {
  height: 100px;
  width: 100%;
  background-color: antiquewhite;
}

.footer {
  height: 100px;
  width: 100%;
  background-color: blue;
}

.container {
  overflow: hidden;
}

.inner {
  margin-left: 200px;
  margin-right: 200px;
}

.left,
.center,
.right {
  height: 300px;
  float: left;
  position: relative;
}

.center {
  width: 100%;
  background-color: pink;
}

.left {
  width: 200px;
  margin-left: -100%;
  left: -200px;
  background-color: skyblue;
}

.right {
  width: 200px;
  margin-left: -200px;
  right: -200px;
  background-color: yellow;
}
</style>
