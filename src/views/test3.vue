<template>
  <!-- https://blog.csdn.net/qq_37656005/article/details/123687788 -->
  <div id="content">
    <div id="imgContent" @mousewheel="rollImg()">
      <img id="bigImg" src="../assets/logo.png" width="200" height="200" />
      <canvas id="canvas" ref="markCanvasRef"></canvas>
    </div>
  </div>

  <el-button type="primary" style="margin: 20px" @click="saveData"
    >保存数据</el-button
  >
  <el-button type="primary" style="margin: 20px" @click="scaleLarge"
    >放大</el-button
  >
  <el-button type="primary" style="margin: 20px" @click="scaleSmall"
    >缩小</el-button
  >
</template>
<script setup>
import { draw } from "../utils/draw"; // 矩形绘制方法
import { ref, reactive, onMounted, nextTick } from "vue";

onMounted(() => {
  initCanvas(); // 画布初始化
});

// 标记内容数组
const markList = ref([
  // { x: 151, y: 384, w: 320, h: 86}
]);
const markCanvasRef = ref(null);
const bigImgRef = ref(null);
//画布初始化
const initCanvas = () => {
  setTimeout(() => {
    nextTick(() => {
      // 初始化canvas宽高
      let cav = markCanvasRef.value;
      console.log(' getElementById("imgContent")',document.getElementById("imgContent"));
      console.log(' getElementById("imgContent")offsetWidth',document.getElementById("imgContent").offsetWidth);
      console.log(' getElementById("imgContent")offsetHeight',document.getElementById("imgContent").offsetHeight);
      console.log(document.getElementById("imgContent").clientHeight);
      cav.width = document.getElementById("imgContent").offsetWidth;
      cav.height = document.getElementById("imgContent").offsetHeight;
      console.log(cav);
      let ctx = cav.getContext("2d");
      ctx.strokeStyle = "blue";
      cav.style.cursor = "crosshair";

      // 计算使用变量
      let list = markList.value; // 画框数据集合, 用于服务端返回的数据显示和绘制的矩形保存
      // // 若服务端保存的为百分比则此处需计算实际座标, 直接使用实际座标可省略
      // list.forEach(function (value, index, array) {
      //     let newValue = {
      //         x: value.x * cav.width,
      //         y: value.y * cav.height,
      //         w: value.w * cav.width,
      //         h: value.h * cav.height,
      //     }
      //     list.splice(index, 1, newValue)
      // })

      // 若list长度不为0, 则显示已标记框
      if (list.length !== 0) {
        list.forEach(function (value, index, array) {
          // 遍历绘制所有标记框
          ctx.rect(value.x, value.y, value.w, value.h);
          ctx.stroke();
        });
      }
      console.log("cav ,list " , cav , list)
      // 调用封装的绘制方法
      draw(cav, list);
    });
  }, 1000);
};
const saveData = () => {
  console.log("矩形数据", markList.value);
};

//放大
const scaleLarge = () => {
  var zoom = parseInt(document.getElementById("bigImg").style.zoom) || 100;
  zoom += 10;
  document.getElementById("bigImg").style.zoom = zoom + "%";
};

//缩小
const scaleSmall = () => {
  var zoom = parseInt(document.getElementById("bigImg").style.zoom) || 100;
  zoom -= 10;
  document.getElementById("bigImg").style.zoom = zoom + "%";
};

//滚轮缩放
const rollImg = () => {
  /* 获取当前页面的缩放比
         若未设置zoom缩放比，则为默认100%，即1，原图大小
     */
  console.log(document.getElementById("bigImg").style);
  var zoom = parseInt(document.getElementById("bigImg").style.zoom) || 100;
  /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom    wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动  */
  zoom += event.wheelDelta / 12;
  /* 最小范围 和 最大范围 的图片缩放尺度 */
  if (zoom >= 100 && zoom < 250) {
    document.getElementById("bigImg").style.zoom = zoom + "%";
  }
  return false;
};
</script>
<style lang="less" scoped>
#content {
  width: 800px;
  height: 600px;
  overflow: auto;

  #imgContent {
    display: inline-block;
    position: relative;
    margin: 0 auto;
    height: auto;
    width: auto;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
  }
}
</style>
