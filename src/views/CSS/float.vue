  <!-- 清除浮动 1.额外标签  2.父盒子加overflow hidden,auto,scroll 3.父盒子加浮动  4.::after伪元素-->
<template>
  <div style="background-color: aliceblue; width: 200px;">
    <div style="width: 50px;height: 50px; background-color: red; float: left;"></div>
    <div style="clear: both; background-color: aquamarine;"></div>
  </div>
  <br>

  <div style="background-color: aliceblue; width: 200px; overflow: hidden;">
    <div style="width: 50px;height: 50px; background-color: red; float: left;"></div>
  </div>
  <br>

  <div style="background-color: aliceblue; width: 200px;" class="father">
    <div style="width: 50px;height: 50px; background-color: red; float: left;"></div>
  </div>
</template>


<style scoped>
.father::after{
  content: '';
  display: block;
  clear: both;
}
</style>