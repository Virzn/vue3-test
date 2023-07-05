<template>
  <!-- https://blog.csdn.net/qq_37656005/article/details/123687788 -->

  <div id="myBiaoZhuDiv" class="myBiaoZhu">
    <img
      id="myBiaoZhu"
      alt=""
      src="../assets/logo.png"
      width="200"
      height="200"
    />
    <el-button @click="startBiaoZhu">开始标注</el-button>
    <el-button @click="endBiaoZhu">标注完成</el-button>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";

const canBiaoZhu = ref(false);
const banMa = ref([]);
const pointColor = ref("red");
const pointSize = ref("10");

function startBiaoZhu() {
  console.log('document.getElementById("bigImg").',document.getElementById("myBiaoZhu"));
  canBiaoZhu.value = true;
}

function endBiaoZhu() {
  // canBiaoZhu.value = false;
  var markerDivs = document.getElementsByClassName("marker");
  console.log("markerDivs", markerDivs);
  while (markerDivs.length > 0) {
    markerDivs[0].parentNode.removeChild(markerDivs[0]);
  }
}

function createMarker(x, y) {
  var div = document.createElement("div");
  div.className = "marker";
  div.id = "marker" + banMa.value.length;
  y = y + document.getElementById("myBiaoZhu").offsetTop - pointSize.value / 2;
  x = x + document.getElementById("myBiaoZhu").offsetLeft - pointSize.value / 2;
  console.log("坐标值", x, y);
  console.log(
    "document.getElementById(myBiaoZhu)",
    document.getElementById("myBiaoZhu")
  );
  div.style.width = pointSize.value + "px";
  div.style.height = pointSize.value + "px";
  div.style.backgroundColor = pointColor.value;
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.position = "absolute";
  div.style.borderRadius = "50%";
  div.style.zIndex = "999";
  div.style.top = y + "px";
  console.log("div.style", div.style);
  console.log("div", div);
  div.oncontextmenu = (e) => {
    var id = e.target.id;
    console.log("e.target.id;", e.target.id);
    document.getElementById("myBiaoZhuDiv").removeChild(div);
    banMa.value = banMa.value.filter(
      (item) => item.id != id.slice(6, id.length)
    );
    if (e && e.preventDefault) {
      //阻止默认浏览器动作(W3C)
      e.preventDefault();
    } else {
      //IE中阻止函数器默认动作的方式
      window.event.returnValue = false;
    }
    return false;
  }; //阻止冒泡行为和默认右键菜单事件，删除该点
  document.getElementById("myBiaoZhuDiv").appendChild(div);
}

onMounted(() => {
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
        createMarker(x, y);
      }
    }
  };
});
</script>
<style lang="less" scoped>
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
</style>
