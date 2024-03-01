<template>
  <h3>jsplumb使用</h3>
  <div id="container">
    <div class="col1">
      <div
        v-for="item in list1"
        :key="item.nodeId"
        :id="item.nodeId"
        name="joint"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="col2">
      <div
        v-for="item in list2"
        :key="item.nodeId"
        :id="item.nodeId"
        name="data"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
  <el-button @click="getConnectInfo">按钮</el-button>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import jsPlumb from "jsplumb";

// 存储连接信息
const connections = [];

//jsplumb使用
let $jsPlumb = jsPlumb.jsPlumb;
let jsPlumb_instance = null; // 缓存实例化的jsplumb对象
//模型轴
const list1 = reactive([
  { name: "选项1", nodeId: "name1", axis: "", type: "" },
  { name: "选项2", nodeId: "name2", axis: "", type: "" },
  { name: "选项3", nodeId: "name3", axis: "", type: "" },
  { name: "选项4", nodeId: "name4", axis: "", type: "" },
  { name: "选项5", nodeId: "name5", axis: "", type: "" },
  { name: "选项6", nodeId: "name6", axis: "", type: "" },
  { name: "选项7", nodeId: "name7", axis: "", type: "" },
  { name: "选项8", nodeId: "name8", axis: "", type: "" },
  { name: "选项9", nodeId: "name9", axis: "", type: "" },
  { name: "选项10", nodeId: "name10", axis: "", type: "" },
  { name: "选项11", nodeId: "name11", axis: "", type: "" },
  { name: "选项12", nodeId: "name12", axis: "", type: "" },
  { name: "选项13", nodeId: "name13", axis: "", type: "" },
  { name: "选项14", nodeId: "name14", axis: "", type: "" },
  { name: "选项15", nodeId: "name15", axis: "", type: "" },
  { name: "选项16", nodeId: "name16", axis: "", type: "" },
  { name: "选项17", nodeId: "name17", axis: "", type: "" },
  { name: "选项18", nodeId: "name18", axis: "", type: "" },
]);
//接口数据点
const list2 = reactive([
  { name: "数据1", nodeId: "数据1" },
  { name: "数据2", nodeId: "数据2" },
  { name: "数据3", nodeId: "数据3" },
  { name: "数据4", nodeId: "数据4" },
  { name: "数据5", nodeId: "数据5" },
  { name: "数据6", nodeId: "数据6" },
  { name: "数据7", nodeId: "数据7" },
  { name: "数据8", nodeId: "数据8" },
  { name: "数据9", nodeId: "数据9" },
  { name: "数据10", nodeId: "数据10" },
  { name: "数据11", nodeId: "数据11" },
  { name: "数据12", nodeId: "数据12" },
  { name: "数据13", nodeId: "数据13" },
  { name: "数据14", nodeId: "数据14" },
  { name: "数据15", nodeId: "数据15" },
  { name: "数据16", nodeId: "数据16" },
  { name: "数据17", nodeId: "数据17" },
  { name: "数据18", nodeId: "数据18" },
]);

onMounted(() => {
  showPlumb();
});

function getConnectInfo() {
  console.log("连接信息", connections);
}

const showPlumb = () => {
  jsPlumb_instance = $jsPlumb.getInstance({
    Container: "container", // 选择器id
    EndpointStyle: { radius: 0.11, fill: "#fff" }, // 端点样式
    Connector: "Bezier",
    PaintStyle: { strokeWidth: 2, stroke: "#000", joinstyle: "round" },
    HoverPaintStyle: { stroke: "#1E90FF" }, // 默认悬停样式  默认为null
    DrapOptions: { cursor: "crosshair", zIndex: 2000 },
  });

  jsPlumb_instance.batch(() => {
    for (let i = 0; i < list1.length; i++) {
      initLeaf(list1[i].nodeId, "joint", i);
    }
    for (let i = 0; i < list2.length; i++) {
      initLeaf(list2[i].nodeId, "data", i);
    }
  });

  const joint = document.getElementsByName("joint");
  const data = document.getElementsByName("data");

  jsPlumb_instance.setSourceEnabled(joint, true);
  jsPlumb_instance.setTargetEnabled(data, true);
  jsPlumb_instance.setDraggable(joint, false); // 是否支持拖拽
  jsPlumb_instance.setDraggable(data, false); // 是否支持拖拽

  jsPlumb_instance.bind("click", (conn, originalEvent) => {
    jsPlumb_instance.deleteConnection(conn);
    console.log("click事件");
  });

  jsPlumb_instance.bind("connection", (connection) => {
    const sourceId = connection.source.id; // 起点元素的 ID
    const targetId = connection.target.id; // 终点元素的 ID
    connections.push({ sourceId, targetId }); // 将 source.id 和 target.id 值存储到数组中
  });

  jsPlumb_instance.bind("connectionDetached", (connection) => {
    const sourceId = connection.source.id; // 起点元素的 ID
    const targetId = connection.target.id; // 终点元素的 ID
    for (let i = 0; i < connections.length; i++) {
      const connection = connections[i];
      if (
        connection.sourceId === sourceId &&
        connection.targetId === targetId
      ) {
        connections.splice(i, 1); // 从数组中删除对应的信息
        break;
      }
    }
  });
};

// 初始化具体节点
const initLeaf = (id, type, index) => {
  const ins = jsPlumb_instance;
  const elem = document.getElementById(id);
  const baseOffset = 10; // 基础偏移量
  const offset = baseOffset + index * 10; // 根据索引计算偏移量
  console.log("index", index);
  if (type == "joint") {
    ins.makeSource(elem, {
      anchor: "Bottom", // 锚点位于底部中心位置
      allowLoopback: false,
      maxConnections: 1,
      connector: ["Flowchart", { stub: [0, offset, 0, 0], cornerRadius: 10 }], // 连接线类型为Flowchart，连接线的起点向下偏移 offset 个像素，连接线在转折处形成90度角，终点向下偏移 0 个像素
    });
  } else {
    ins.makeTarget(elem, {
      anchor: "Bottom", // 锚点位于顶部中心位置
      allowLoopback: false,
      maxConnections: 1,
      connector: ["Flowchart", { stub: [0, -offset, 0, 0], cornerRadius: 10 }], // 连接线类型为Flowchart，连接线的起点向上偏移 offset 个像素，连接线在转折处形成90度角，终点向上偏移 0 个像素
    });
  }
};
</script>

<style scoped lang="less">
#container {
  // display: grid;
  align-content: space-around;
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 300px;
}

.col1 {
  width: 40%;
  display: flex;
  float: left;
  text-align: center;
  flex-wrap: wrap;
  div {
    margin-top: 100px;
  }
}

.col2 {
  width: 40%;
  display: flex;
  float: left;
  text-align: center;
  flex-wrap: wrap;
}

#container > div > div {
  line-height: 30px;
  margin: 12px 20px 0px 0;
  background: #ef631e;
  color: #fff;
}
#container > div > div:nth-child(1) {
  margin-left: 10px;
}
</style>
