<!-- 垂直居中 1.父元素flex  2.父元素table-cell  3.grid  4.子绝父相  5.absolute margin:autp -->
<template>
  <div class="container1" style="  border: 1px solid red;">
    <div class="content">
      1111111111111
    </div>
  </div>
  <br>
  <div class="container2" style="  border: 1px solid red;">
    <div class="content2">
      1111111111111
    </div>
  </div>
  <br>
  <div class="container3" style="  border: 1px solid red;">
    <div class="content3">
      1111111111111
    </div>
  </div>
  <br>
  <div class="container4" style="  border: 1px solid red;">
    <div class="content4">
      1111111111111
    </div>
  </div>
  <br>
  <div class="container5" style="  border: 1px solid red;">
    <div class="content5">
      1111111111111
    </div>
  </div>
</template>

<style scoped>
.container1 {
  display: flex; /* 将容器设置为 Flex 布局 */
  justify-content: center; /* 在主轴上居中 */
  align-items: center; /* 在交叉轴上居中 */
  height: 100px; 
}
.container2 {
  display: table-cell; /* 将容器设置为 Flex 布局 */
  text-align: center; /* 水平居中 */
  vertical-align: middle; /* 垂直居中 */
  height: 100px; 
  width: 300px;
}

.content2{
  display: inline-block;
}
.container3 {
  display: grid; 
  height: 100px; 
  width: 300px;
}

.content3{
  align-self: center;
  justify-self: center;
}
.container4 {
  position: relative;
  height: 100px; 
  width: 300px;
}

.content4{
position: absolute;
left: 50%;
top: 50%;
}
.container5 {
  position: relative;
  height: 100px; 
  width: 300px;
}

.content5{
  position: absolute; /* 绝对定位 */
  top: 0; /* 位于容器顶部 */
  bottom: 0; /* 位于容器底部 */
  left: 0; /* 位于容器左侧 */
  right: 0; /* 位于容器右侧 */
  margin: auto; /* 使用 margin: auto 实现水平垂直居中 */
  width: 100px; /* 内容的宽度 */
  height: 100px; /* 内容的高度 */
}


.content {
  /* 这里可以设置内容区域的样式 */
}
</style>