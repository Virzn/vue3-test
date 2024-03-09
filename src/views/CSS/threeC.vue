<template>
<div class="container">
  <div class="left">左边栏</div>
  <div class="main">主要内容</div>
  <div class="right">右边栏</div>
</div>

</template>


<style scoped>
.container {
  position: relative;
}

.left, .main, .right {
  height: 200px; /* 设置高度，仅作示例 */
}

.left {
  position: absolute;
  width: 200px; /* 左边栏宽度 */
  background-color: #ccc;
}

.main {
  margin: 0 200px; /* 左右边栏宽度之和 */
  background-color: #eee;
}

.right {
  position: absolute;
  right: 0;
  top: 0;
  width: 200px; /* 右边栏宽度 */
  background-color: #ccc;
}


</style>