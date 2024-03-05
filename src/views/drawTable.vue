<template>
  <div>
    <el-card>
      <p>类别选择</p>
      <div style="display: flex">
        <div style="display: flex; margin: 0 40px 0 30%">
          <span style="width: 100px; margin-top: 5px; margin-right: 10px;"> 考试等级 </span>
          <el-select v-model="data.nowGrade" placeholder="请选择" clearable>
            <el-option v-for="item in data.gradeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="mytable1">
          <div class="myTr1">
            <div class="proDiV">
              <p style="margin: revert">专业名称</p>
            </div>
            <div class="typeName">
              <p style="margin: revert">机械题目</p>
            </div>
            <div class="typeName">
              <p style="margin: revert">电气题目</p>
            </div>
            <div class="mytdRight typeName">
              <p style="margin: revert">仪表题目</p>
            </div>
          </div>
          <div class="myTr1">
            <div class="proDiV myButtom">
              <p style="margin: revert">分数占比</p>
            </div>
            <div class="myButtom">
              <p style="margin: revert"><input class="PercentageInput" v-model="machineryProportion" /></p>
            </div>
            <div class="myButtom">
              <p style="margin: revert"><input class="PercentageInput" v-model="electricalProportion" /></p>
            </div>
            <div class="mytdRight myButtom">
              <p style="margin: revert"><input class="PercentageInput" v-model="instrumentProportion" /></p>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <a-card style="margin-top: 2px">
      <div style="display: flex; margin-left: 10%; ">
        <div style="width: 30%; margin-left: 10px">
          <p>机械题目</p>
          <div class="mytable1">
            <div class="myTr2" style="background: rgb(47, 124, 168); color: white">
              <div style="width: 20%">
                <p style="margin: revert">序号</p>
              </div>
              <div style="width: 30%">
                <p style="margin: revert">题目类型</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">题目个数</p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">分数分配</p>
              </div>
            </div>
            <div class="myTr2">
              <div style="width: 20%">
                <p class="index">1</p>
              </div>
              <div style="width: 30%">
                <p class="quesType">选择判断题</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="mSelectionNum" />
                </p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="mSelectionScore" />
                </p>
              </div>
            </div>
            <div class="myTr2">
              <div style="width: 20%">
                <p class="index">2</p>
              </div>
              <div style="width: 30%">
                <p class="quesType">量器具使用题</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="mGaugeNum" />
                </p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="mGaugeScore" />
                </p>
              </div>
            </div>
            <div class="myTr2">
              <div style="width: 20%">
                <p class="index">3</p>
              </div>
              <div style="width: 30%">
                <p class="quesType">认知识别题</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="mCognitiveNum" />
                </p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="mCognitiveScore" />
                </p>
              </div>
            </div>
            <div class="myTr2">
              <div style="width: 20%">
                <p class="index">4</p>
              </div>
              <div style="width: 30%">
                <p class="quesType">虚拟交互题</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="mSimulationNum" />
                </p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="mSimulationScore" />
                </p>
              </div>
            </div>
            <div class="myTr2">
              <div class="myButtom">
                <p class="index">5</p>
              </div>
              <div class="myButtom">
                <p class="quesType">实际操作题</p>
              </div>
              <div class="myButtom">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="mOperationNum" />
                </p>
              </div>
              <div class="mytdRight myButtom" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="mOperationScore" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 30%; margin-left: 10px">
          <p>电气题目</p>
          <div class="mytable1">
            <div class="myTr2" style="background: rgb(47, 124, 168); color: white">
              <div style="width: 20%">
                <p style="margin: revert">序号</p>
              </div>
              <div style="width: 30%">
                <p style="margin: revert">题目类型</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">题目个数</p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">分数分配</p>
              </div>
            </div>
            <div class="myTr2">
              <div style="width: 20%">
                <p class="index">1</p>
              </div>
              <div style="width: 30%">
                <p class="quesType">选择判断题</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="eSelectionNum" />
                </p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="eSelectionScore" />
                </p>
              </div>
            </div>
            <div class="myTr2">
              <div style="width: 20%">
                <p class="index">2</p>
              </div>
              <div style="width: 30%">
                <p class="quesType">量器具使用题</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="eGaugeNum" />
                </p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="eGaugeScore" />
                </p>
              </div>
            </div>
            <div class="myTr2">
              <div style="width: 20%">
                <p class="index">3</p>
              </div>
              <div style="width: 30%">
                <p class="quesType">认知识别题</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="eCognitiveNum" />
                </p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="eCognitiveScore" />
                </p>
              </div>
            </div>
            <div class="myTr2">
              <div style="width: 20%">
                <p class="index">4</p>
              </div>
              <div style="width: 30%">
                <p class="quesType">虚拟交互题</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="eSimulationNum" />
                </p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="eSimulationScore" />
                </p>
              </div>
            </div>
            <div class="myTr2">
              <div class="myButtom">
                <p class="index">5</p>
              </div>
              <div class="myButtom">
                <p class="quesType">实际操作题</p>
              </div>
              <div class="myButtom">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="eOperationNum" />
                </p>
              </div>
              <div class="mytdRight myButtom" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="eOperationScore" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 30%; margin-left: 10px">
          <p>仪表题目</p>
          <div class="mytable1">
            <div class="myTr2" style="background: rgb(47, 124, 168); color: white">
              <div style="width: 20%">
                <p style="margin: revert">序号</p>
              </div>
              <div style="width: 30%">
                <p style="margin: revert">题目类型</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">题目个数</p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">分数分配</p>
              </div>
            </div>
            <div class="myTr2">
              <div style="width: 20%">
                <p class="index">1</p>
              </div>
              <div style="width: 30%">
                <p class="quesType">选择判断题</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="iSelectionNum" />
                </p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="iSelectionScore" />
                </p>
              </div>
            </div>
            <div class="myTr2">
              <div style="width: 20%">
                <p class="index">2</p>
              </div>
              <div style="width: 30%">
                <p class="quesType">量器具使用题</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="iGaugeNum" />
                </p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="iGaugeScore" />
                </p>
              </div>
            </div>
            <div class="myTr2">
              <div style="width: 20%">
                <p class="index">3</p>
              </div>
              <div style="width: 30%">
                <p class="quesType">认知识别题</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="iCognitiveNum" />
                </p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="iCognitiveScore" />
                </p>
              </div>
            </div>
            <div class="myTr2">
              <div style="width: 20%">
                <p class="index">4</p>
              </div>
              <div style="width: 30%">
                <p class="quesType">虚拟交互题</p>
              </div>
              <div style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="iSimulationNum" />
                </p>
              </div>
              <div class="mytdRight" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="iSimulationScore" />
                </p>
              </div>
            </div>
            <div class="myTr2">
              <div class="myButtom">
                <p class="index">5</p>
              </div>
              <div class="myButtom">
                <p class="quesType">实际操作题</p>
              </div>
              <div class="myButtom">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="iOperationNum" />
                </p>
              </div>
              <div class="mytdRight myButtom" style="width: 25%">
                <p style="margin: revert">
                  <input class="PercentageInput" v-model="iOperationScore" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="float: right; margin-right: 5%; margin-top: 20px;">
        <el-button round color="rgb(22,66,115)" @click="SaveExam">保存</el-button>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { reactive, toRefs, ref } from 'vue';

let data = reactive({
  gradeOptions: [
    {
      value: 'Simple',
      label: '初级',
    },
    {
      value: 'Medium',
      label: '中级',
    },
    {
      value: 'Difficulties',
      label: '高级',
    },
  ],
  nowGrade: '',
});
// 机械题目分数占比
let machineryProportion = ref('');
// 电气题目分数占比
let electricalProportion = ref('');
// 仪表题目分数占比
let instrumentProportion = ref('');
// 机械题目数量以及分数
let mSelectionNum = ref('');
let mSelectionScore = ref('');
let mGaugeNum = ref('');
let mGaugeScore = ref('');
let mCognitiveNum = ref('');
let mCognitiveScore = ref('');
let mSimulationNum = ref('');
let mSimulationScore = ref('');
let mOperationNum = ref('');
let mOperationScore = ref('');
// 电气题目数量以及分数
let eSelectionNum = ref('');
let eSelectionScore = ref('');
let eGaugeNum = ref('');
let eGaugeScore = ref('');
let eCognitiveNum = ref('');
let eCognitiveScore = ref('');
let eSimulationNum = ref('');
let eSimulationScore = ref('');
let eOperationNum = ref('');
let eOperationScore = ref('');
// 仪表题目数量以及分数
let iSelectionNum = ref('');
let iSelectionScore = ref('');
let iGaugeNum = ref('');
let iGaugeScore = ref('');
let iCognitiveNum = ref('');
let iCognitiveScore = ref('');
let iSimulationNum = ref('');
let iSimulationScore = ref('');
let iOperationNum = ref('');
let iOperationScore = ref('');

let machineryData = ref([
  {
    index: '1',
    typeName: '选择判断题',
    typeNum: '',
    typeScore: '',
  },
  {
    index: '2',
    typeName: '量器具使用题',
    typeNum: '',
    typeScore: '',
  },
  {
    index: '3',
    typeName: '认知识别题',
    typeNum: '',
    typeScore: '',
  },
  {
    index: '4',
    typeName: '虚拟交互题',
    typeNum: '',
    typeScore: '',
  },
  {
    index: '5',
    typeName: '实际操作题',
    typeNum: '',
    typeScore: '',
  },
]);
// let electricalData = ref({

// })
// let instrumentData = ref({

// })


function SaveExam() {
  console.log('保存成功')
}

let { } = toRefs(data);
</script>


<style lang="scss" scoped>
.mytable1 {
  width: 90%;
  // margin: 0 auto 0 0 ;
  text-align: center;
  font-size: 10px;
}

.myTr2 {
  width: 100%;
  height: 40px;
  display: flex;
  font-size: 10px;

  .index {
    margin: revert;
    color: rgb(46, 124, 169);
  }

  .quesType {
    margin: revert;
    color: rgb(46, 124, 169);
  }

  .typeNum {
    margin: revert;
  }

  .typeScore {
    margin: revert;
  }
}

.myTr2 div {
  flex: 1;
  text-align: center;
  height: 100%;
  border-top: 1px black solid;
  border-left: 1px black solid;
}

.myTr1 {
  width: 40%;
  height: 40px;
  display: flex;
  font-size: 10px;
}

.myTr1 div {
  flex: 1;
  text-align: center;
  height: 100%;
  border-top: 1px black solid;
  border-left: 1px black solid;
}

.proDiV {
  background-color: rgb(46, 124, 169);
  color: white;
}

.typeName {
  color: rgb(46, 124, 169);
}

.mytdRight {
  border-right: 1px black solid;
}

.myButtom {
  border-bottom: 1px black solid;
}

.PercentageInput {
  width: 95%;
  padding: 2px;
  text-align: center;
  outline: none;
  border: none;
}
</style>