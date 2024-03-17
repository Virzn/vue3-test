<template>
  <div class="iframe-container">
    <iframe src="https://example.com/" frameborder="0" ref="myFrame"></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const myFrame = ref(null);


</script>

<style lang="scss">
.iframe-container {
  position: relative;
  width: 100%;
  height: 800px;
  overflow: hidden; /* 这样设置可以限制 iframe 内容的显示区域，超出容器范围的部分将被隐藏。 */
}

.iframe-container iframe {
  position: absolute;
  left: 0;
  width: 100%;
  top: -50px; /* 调整根据实际情况调整隐藏头部的距离 */
  height: calc(100% + 50px); /* 调整根据实际情况调整隐藏底部的距离 */
  border: none;
  clip: rect(60px, auto, auto, auto); /* 裁剪掉头部部分 */
}
</style>