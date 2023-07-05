<template>
  <!-- https://blog.csdn.net/qq_45385505/article/details/124350934 -->
  <div class="df">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="问题次数">
        <el-input-number
          v-model="num"
          :min="1"
          :max="10"
          label="描述文字"
          @keydown.native="channelInputLimit"
        ></el-input-number>
      </el-form-item>
      <div v-for="(v, i) in allDraw" :key="i" class="DrawQu">
        <el-form-item :label="'问题' + (i + 1)">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
          <span class="ml10" v-if="!v.pts">
            <el-button type="primary" @click="toAdd(i + 1)"
              >添加</el-button
            > </span
          ><span class="ml10">
            <el-button type="primary" @click="toRemove(i + 1)">重置</el-button>
          </span>
        </el-form-item>
      </div>
      <el-form-item class="img-area" label="问题区域">
        <img
          class="img"
          height="540px"
          width="960px"
          src="../assets/66f3c1057640431caef2b63358b7a471.jpg"
          alt="预览图"
        />
        <svg
          class="svg"
          id="svg"
          height="540px"
          width="960px"
          style="border: 1px dashed #dbd2d2"
        >
          <div v-for="(v, i) in allDraw">
            <!-- 循环中key值不能相同,key值可以改,id不能改,影响其他代码 -->
            <polyline
              :key="'polyline' + i"
              :id="'polyline' + v.id"
              style="fill: #ffffff70; stroke: black; stroke-width: 1"
            />
            <text
              :key="i"
              :x="v.width"
              :y="v.height + 10"
              fill="red"
              v-if="v.pts != ''"
            >
              {{ v.id }}
            </text>
            <line
              :key="'templine' + i"
              :id="'templine' + v.id"
              style="fill: #ffffff70; stroke: black; stroke-width: 1"
            />
          </div>
        </svg>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      num: 5,
      firstPoint: "",
      form: {},
      // 是否正在绘制
      isDrawing: false,
      flag: false,
      allDraw: [],
      id: 0,
      polyline: "",
      templine: "",
      pts: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    num: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        // console.log(val, oldVal);
        if (val > oldVal) {
          console.log("增加");
          var a = {
            id: val,
          };
          this.allDraw.push(a);
          // console.log(this.allDraw);
        } else {
          console.log("减少");
          this.allDraw.pop();
          // console.log(this.allDraw);
        }
      },
      deep: true, //true 深度监听
    },
  },
  //方法集合
  methods: {
    // 开始绘图
    toAdd(id) {
      if (!this.flag) {
        console.log('请您在下方图片中添加区域')
        // this.$message({
        //   message: "请您在下方图片中添加区域",
        //   type: "success",
        // });
        document.addEventListener("contextmenu", function (e) {
          e.preventDefault();
        });
        // var lastPt = svg[id - 1].lastPt;
        // console.log("#polyline" + id);
        // 获取所有样式元素

        this.id = id;

        // 这个是鼠标点击的线
        this.polyline = document.querySelector("#polyline" + id);

        // 这个是鼠标悬浮的线
        this.templine = document.querySelector("#templine" + id);
        var allDraw = this.allDraw;
        allDraw[id - 1].svg = document.querySelector("#svg");
        // 绘图开始状态
        this.allDraw[id - 1].isDrawing = true;
        // console.log(id);

        this.allDraw[id - 1].svg.addEventListener(
          "mousedown",
          this.scrollEvent,
          true
        );

        this.allDraw[id - 1].svg.addEventListener(
          "mousemove",
          this.toMove,
          true
        );
      } else {
        console.log('不能同时添加多个区域')
        // this.$message({
        //   message: "不能同时添加多个区域",
        //   type: "warning",
        // });
      }
    },
    //点击事件
    scrollEvent(e) {
      var id = this.id;
      console.log(id);
      console.log(e);
      if (e.button == 0 && this.allDraw[id - 1].isDrawing == true) {
        this.allDraw[id - 1].pts = this.polyline.getAttribute("points") || "";
        const newPoint = `${e.offsetX},${e.offsetY} `;
        this.allDraw[id - 1].pts += newPoint;
        this.polyline.setAttribute("points", this.allDraw[id - 1].pts);
        this.allDraw[id - 1].lastPt = [e.offsetX, e.offsetY];
        // console.log(this.allDraw[id - 1]);
        if (!this.flag) {
          this.firstPoint = newPoint;
          this.flag = true;
        }
      } else if (e.button == 2 && this.allDraw[id - 1].isDrawing == true) {
        this.allDraw[id - 1].pts = this.polyline.getAttribute("points") || "";
        const newPoint = this.firstPoint;
        this.allDraw[id - 1].pts += newPoint;
        this.polyline.setAttribute("points", this.allDraw[id - 1].pts);

        this.stopDrawing(id);
      }
    },
    //移动事件
    toMove(e) {
      var id = this.id;
      if (this.allDraw[id - 1].isDrawing == true && this.firstPoint !== "") {
        this.templine.setAttribute("x1", this.allDraw[id - 1].lastPt[0]);
        this.templine.setAttribute("y1", this.allDraw[id - 1].lastPt[1]);
        this.templine.setAttribute("x2", e.offsetX);
        this.templine.setAttribute("y2", e.offsetY);
      } else {
        this.templine.setAttribute("x1", 0);
        this.templine.setAttribute("y1", 0);
        this.templine.setAttribute("x2", 0);
        this.templine.setAttribute("y2", 0);
      }
    },
    // 停止绘图
    stopDrawing(id) {
      //计算中心点
      var width = 0;
      var height = 0;
      var list = this.allDraw[id - 1].pts.trim().split(" ");

      list.forEach((v, i) => {
        var a = v.trim().split(",");
        width += Number(JSON.parse(a[0]));
        height += Number(JSON.parse(a[1]));
      });
      // console.log(width);
      // console.log(height);
      // console.log(list);
      this.allDraw[id - 1].width = width / list.length;
      this.allDraw[id - 1].height = height / list.length;

      this.$forceUpdate();

      this.allDraw[id - 1].isDrawing = false;
      this.flag = false;
    },

    //重置
    toRemove(id) {
      this.allDraw[id - 1].pts = "";

      this.firstPoint = "";
      this.flag = false;

      this.polyline = document.querySelector("#polyline" + id);
      this.templine = document.querySelector("#templine" + id);

      this.polyline.setAttribute("points", this.pts);

      // this.allDraw[id - 1].svg = "";
      this.allDraw[id - 1].svg.removeEventListener(
        "mousedown",
        this.scrollEvent,
        true
      );

      this.allDraw[id - 1].svg.removeEventListener(
        "mousemove",
        this.toMove,
        true
      );

      this.allDraw[id - 1].isDrawing = true;
      this.$forceUpdate();
    },

    //禁用输入框方法
    channelInputLimit(e) {
      e.returnValue = "";
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log(this.num);
    for (let index = 0; index < this.num; index++) {
      var a = {
        id: index + 1,
      };
      this.allDraw.push(a);
    }
    ``;
    // console.log(this.allDraw);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.toAdd();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="less">
.img-area {
  position: relative;
  padding-top: 20px;
  width: 100%;
  // canvas绝对定位，盖在图片上方，这里的z-indext如果没有设置，则canvas无法使用
  .svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
.DrawQu {
  .el-input {
    width: 300px;
  }
}
.ml10 {
  margin-left: 10px;
}
</style>