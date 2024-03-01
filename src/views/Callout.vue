<template>
  <!-- https://blog.csdn.net/qq_37656005/article/details/123687788 -->
  <div class="wholeDiv">
    <!-- 绘制矩形区域 -->
    <div id="content">
      <div id="imgContent">
        <img id="bigImg" src="../assets/logo.png" width="200" height="200" />
        <canvas id="canvas" ref="markCanvasRef"></canvas>
      </div>

      <el-button type="primary" style="margin: 20px" @click="saveData">保存数据</el-button>
    </div>
    <!-- 标注区域 -->
    <div id="myBiaoZhuDiv" class="myBiaoZhu">
      <img id="myBiaoZhu" alt="" src="../assets/logo.png" width="200" height="200" />
      <el-button @click="startBiaoZhu">开始标注</el-button>
      <el-button @click="endBiaoZhu">标注完成</el-button>
    </div>
  </div>
</template>
<script setup>

import { ref, onMounted, reactive, nextTick } from "vue";
import { draw } from "../utils/draw"; // 矩形绘制方法

const canBiaoZhu = ref(false); // 是否可以标注
const banMa = ref([]); // 标记点数组
const pointColor = ref("red"); // 标记点颜色
const pointSize = ref("10"); // 标记点大小

// 标记内容数组
const markList = ref([
  // { x: 151, y: 384, w: 320, h: 86}
]);

// 画布引用
const markCanvasRef = ref(null);

//画布初始化
const initCanvas = () => {
 // 使用setTimeout延迟执行，确保在DOM渲染完成后再执行
 setTimeout(() => {
    // 使用nextTick确保在Vue渲染周期的下一个tick执行
    nextTick(() => {
      // 输出当前元素，用于调试
      console.log(' getElementById("imgContent")',
        document.getElementById("imgContent")
      );

      // 初始化canvas宽高
      let cav = markCanvasRef.value;
      cav.width = document.getElementById("imgContent").offsetWidth;
      cav.height = document.getElementById("imgContent").offsetHeight;
      console.log(cav);
      let ctx = cav.getContext("2d");
      ctx.strokeStyle = "blue"; // 设置矩形边框颜色
      cav.style.cursor = "crosshair"; // 设置鼠标悬停样式为十字光标

      // 获取画框数据集合
      let list = markList.value;

      // 若list长度不为0, 则显示已标记框
      if (list.length !== 0) {
        list.forEach(function (value, index, array) {
          // 遍历绘制所有标记框
          ctx.rect(value.x, value.y, value.w, value.h);
          ctx.stroke();
        });
      }

      console.log("cav ,list ", cav, list);
      
      // 调用封装的绘制方法
      draw(cav, list);
    });
  }, 1000); // 1秒延迟，确保DOM渲染完成后再执行初始化
};
// 保存数据函数
const saveData = () => {
  console.log("矩形数据", markList.value);
};

// 开始标注函数
function startBiaoZhu() {
  console.log(
    'document.getElementById("bigImg").',
    document.getElementById("myBiaoZhu")
  );
  canBiaoZhu.value = true;
}
// 完成标注函数
function endBiaoZhu() {
  // canBiaoZhu.value = false;
  var markerDivs = document.getElementsByClassName("marker");
  console.log("markerDivs", markerDivs);
  while (markerDivs.length > 0) {
    markerDivs[0].parentNode.removeChild(markerDivs[0]);
  }
}
// 创建标记点函数
function createMarker(points) {
  points.forEach((point) => {
    const div = document.createElement("div");
    div.className = "marker";
    div.id = "marker" + banMa.value.length;
    const y =
      point.y +
      document.getElementById("myBiaoZhu").offsetTop -
      pointSize.value / 2;
    const x =
      point.x +
      document.getElementById("myBiaoZhu").offsetLeft -
      pointSize.value / 2;
    div.style.width = pointSize.value + "px";
    div.style.height = pointSize.value + "px";
    div.style.backgroundColor = pointColor.value;
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.style.position = "absolute";
    div.style.borderRadius = "50%";
    div.style.zIndex = "999";
    div.style.top = y + "px";
    div.oncontextmenu = (e) => {
      const id = e.target.id;
      document.getElementById("myBiaoZhuDiv").removeChild(div);
      banMa.value = banMa.value.filter(
        (item) => item.id != id.slice(6, id.length)
      );
      if (e && e.preventDefault) {
        e.preventDefault();
      } else {
        window.event.returnValue = false;
      }
      return false;
    };
    document.getElementById("myBiaoZhuDiv").appendChild(div);
  });
}
// Vue 生命周期钩子函数，组件挂载后执行
onMounted(() => {
  initCanvas(); // 画布初始化
 // 初始化标记点
  const initpoints = [
    {
      x: 117,
      y: 134,
    },
    {
      x: 55,
      y: 142,
    },
    {
      x: 75,
      y: 100,
    },
  ];
  createMarker(initpoints);
  // 阻止默认右键菜单事件
  document.getElementById("myBiaoZhu").oncontextmenu = (e) => {
    if (e && e.preventDefault) {
      //阻止默认浏览器动作(W3C)
      e.preventDefault();
    } else {
      //IE中阻止函数器默认动作的方式
      window.event.returnValue = false;
    }
    return false;
  }; //阻止冒泡行为和默认右键菜单事件
  
  // 鼠标点击事件监听，用于标注
  document.getElementById("myBiaoZhu").onmousedown = (e) => {
    e = e || window.event;
    if (e.button !== 2) {
      //判断是否右击
      if (canBiaoZhu.value) {
        //判断是否可以进行标注
        var x = e.offsetX || e.layerX;
        var y = e.offsetY || e.layerY;
        console.log("获取基于图片的x,y", x, y);
        console.log("获取e", e);
        var myImg = document.querySelector("#myBiaoZhu");
        var currWidth = myImg.clientWidth;
        var currHeight = myImg.clientHeight;
        var ProportionWidthInImg = x / currWidth;
        var ProportionHeightInImg = y / currHeight;
        console.log("图片比例高度：" + ProportionHeightInImg);
        console.log("图片比例宽度：" + ProportionWidthInImg);
        banMa.value.push({
          id: banMa.value.length + 1,
          x,
          y,
        });

        initpoints.push({
          x: x,
          y: y,
        });
        createMarker(initpoints);
      }
    }
  };
});
</script>
<style lang="less" scoped>
.wholeDiv {
  display: flex;
}

#myBiaoZhuDiv {
  position: relative;

  img {
    border: solid 1px #000;
    display: inline-block;
    margin: 100px 100px;
    z-index: 1;
  }

  .marker {
    position: absolute;
    border-radius: 50%;
    z-index: 999;
  }
}

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
