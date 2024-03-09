<template>
    <div class="parent">
    <div class="middle">中间内容</div>
    <div class="left">左边内容</div>
    <div class="right">右边内容</div>
  </div>
</template>


<style scoped>
    .parent {
      padding-left: 200px; /* 左边距 */
      padding-right: 200px; /* 右边距 */
      overflow: hidden; /* 清除浮动 */
    }

    .middle {
      float: left; /* 左浮动 */
      width: 100%; /* 宽度100% */
      background-color: #ccc;
    }

    .left {
      position: relative; /* 相对定位 */
      left: -200px; /* 负左边距 */
      width: 200px; /* 固定宽度 */
      float: left; /* 左浮动 */
      margin-left: -100%; /* 负左外边距 */
      background-color: #f00;
    }

    .right {
      position: relative; /* 相对定位 */
      left: 200px; /* 左定位 */
      width: 200px; /* 固定宽度 */
      float: right; /* 右浮动 */
      margin-left: -100%; /* 负左外边距 */
      background-color: #00f;
    }

</style>