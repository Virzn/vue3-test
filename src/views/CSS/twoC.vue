<template>
  <div class="container">
    <div class="sidebar">侧边栏</div>
    <div class="main-content">主要内容</div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  /* 使用 Flex 布局 */
}

.sidebar {
  flex: 0 0 200px;
  /* 不放大不缩小，固定宽度为 200px */
  background-color: #ccc;
}

.main-content {
  flex: 1;
  /* 填充剩余空间 */
  background-color: #eee;
}
</style>