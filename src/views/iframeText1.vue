<template>
  <div class="iframe-container">
    <iframe ref="myFrame" src="https://example.com/" frameborder="0"></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const myFrame = ref(null);

onMounted(() => {
  const iframe = myFrame.value; // 使用 ref 获取 iframe 元素
  if (iframe) {
    // 调整 iframe 高度
    function adjustIframeHeight() {
      iframe.style.height = '100%'; // 重置高度，以便获取实际内容高度
      const contentHeight = iframe.contentWindow.document.documentElement.scrollHeight; // 获取内容的完整高度
      iframe.style.height = `${contentHeight}px`; // 设置 iframe 高度为内容高度
    }

    // 在 iframe 加载完成后调整高度
    iframe.onload = adjustIframeHeight;

    // 当窗口大小改变时调整高度（可选）
    window.addEventListener('resize', adjustIframeHeight);
  }
});
</script>

<style lang="scss">
.iframe-container {
  width: 100%;
  overflow: hidden;
}

.iframe-container iframe {
  border: none;
}
</style>
