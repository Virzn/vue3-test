<template>
  <div class="wholeDiv">
    <div>
      <el-button size="small" type="text" @click="getPdf('demo','tst1111')" style="float: right; margin-right: 60px">
            下载
          </el-button>
      <a-card class="">
        <h1>题目列表</h1>
        <div id="demo" ref="report">
          <div v-for="(item, index) in cognitiveList" :key="item.questionId" class="quesWholeDiv">
            <div>
              <span class="quesTitleSpan">
                {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput"
                  @input="scoreChange(item)" />
                分，共
                <span style="margin: 0 5px 0 5px">
                  {{ item.questionSumscore }}
                </span>
                分
              </span>
            </div>
            <div>
              <div>
                <span class="quesNameSpan" v-html="item.questionName"></span>
              </div>
              <div class="optionAnswerDiv">
                <div v-show="item.questionType == '文字单选题' ||
                  item.questionType == '图片单选题' ||
                  item.questionType == '视频题'
                  " class="singleOptionsDiv">
                  <span class="singleOptionSpan"> 选项：</span>
                  <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist"
                    :key="singleItem.options">
                    <el-checkbox :checked="item.questionAnswer.indexOf(
                      String.fromCharCode(index + 65)
                    ) !== -1
                      " class="singleOptionCheck" disabled></el-checkbox>
                    <span v-html="singleItem"></span>
                    <!-- {{ `${index + 1}.${singleItem}` }} -->
                  </div>
                </div>
                <div v-show="item.questionType == '文字多选题' ||
                  item.questionType == '图片多选题'
                  " class="multipleOptionsDiv">
                  <div>
                    <span class="multipleOptionSpan"> 选项：</span>
                    <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist"
                      :key="multiplItem.options">
                      <el-checkbox :checked="item.questionAnswer.indexOf(
                        String.fromCharCode(index + 65)
                      ) !== -1
                        " class="multipleOptionCheck" disabled></el-checkbox>
                      <span v-html="multiplItem"></span>
                      <!-- {{ `${index + 1}.${multiplItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '填空题'" class="blanksOptionsDiv">
                  <div>
                    <span class="blanksOptionSpan">参考答案：</span>
                    <div class="blanksOptionDiv" v-for="blanksItem in item.questionAnswer" :key="blanksItem.blanks">
                      <span v-html="blanksItem"></span>
                      <!-- {{ `${index + 1} . ${blanksItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '判断题' ||
                  item.questionType == '表格判断题'
                  " class="judgeOptionsDiv">
                  <div>
                    <span class="judgeOptionSpan">参考答案：</span>
                    <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                  </div>
                </div>
                <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"></div>
                <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                  <div>
                    <div>
                      <div class="pConnectOptionDiv" v-for="(
                          pConnectionItem, index
                        ) in item.questionAnswerList" :key="pConnectionItem.des">
                        <span v-html="pConnectionItem.value"></span>
                        <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                  <div>
                    <div>
                      <div class="lRecognitionOptionDiv" v-for="(
                          lRecognitionItem, index
                        ) in item.questionAnswerList" :key="lRecognitionItem.des">
                        <span v-html="lRecognitionItem.value"></span>
                        <span style="padding-left: 100px" v-html="lRecognitionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in measureList" :key="item.questionId" class="quesWholeDiv">
            <div>
              <span class="quesTitleSpan">
                {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput"
                  @input="scoreChange(item)" />
                分，共 {{ item.questionSumscore }} 分
              </span>
            </div>
            <div>
              <div>
                <span class="quesNameSpan" v-html="item.questionName"></span>
              </div>
              <div class="optionAnswerDiv">
                <div v-show="item.questionType == '文字单选题' ||
                  item.questionType == '图片单选题' ||
                  item.questionType == '视频题'
                  " class="singleOptionsDiv">
                  <span class="singleOptionSpan"> 选项：</span>
                  <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist"
                    :key="singleItem.options">
                    <el-checkbox :checked="item.questionAnswer.indexOf(
                      String.fromCharCode(index + 65)
                    ) !== -1
                      " class="singleOptionCheck" disabled></el-checkbox>
                    <span v-html="singleItem"></span>
                    <!-- {{ `${index + 1}.${singleItem}` }} -->
                  </div>
                </div>
                <div v-show="item.questionType == '文字多选题' ||
                  item.questionType == '图片多选题'
                  " class="multipleOptionsDiv">
                  <div>
                    <span class="multipleOptionSpan"> 选项：</span>
                    <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist"
                      :key="multiplItem.options">
                      <el-checkbox :checked="item.questionAnswer.indexOf(
                        String.fromCharCode(index + 65)
                      ) !== -1
                        " class="multipleOptionCheck" disabled></el-checkbox>
                      <span v-html="multiplItem"></span>
                      <!-- {{ `${index + 1}.${multiplItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '填空题'" class="blanksOptionsDiv">
                  <div>
                    <span class="blanksOptionSpan">参考答案：</span>
                    <div class="blanksOptionDiv" v-for="blanksItem in item.questionAnswer" :key="blanksItem.blanks">
                      <span v-html="blanksItem"></span>
                      <!-- {{ `${index + 1} . ${blanksItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '判断题' ||
                  item.questionType == '表格判断题'
                  " class="judgeOptionsDiv">
                  <div>
                    <span class="judgeOptionSpan">参考答案：</span>
                    <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                  </div>
                </div>
                <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"></div>
                <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                  <div>
                    <div>
                      <div class="pConnectOptionDiv" v-for="(
                          pConnectionItem, index
                        ) in item.questionAnswerList" :key="pConnectionItem.des">
                        <span v-html="pConnectionItem.value"></span>
                        <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                  <div>
                    <div>
                      <div class="lRecognitionOptionDiv" v-for="(
                          lRecognitionItem, index
                        ) in item.questionAnswerList" :key="lRecognitionItem.des">
                        <span v-html="lRecognitionItem.value"></span>
                        <span style="padding-left: 100px" v-html="lRecognitionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in objectJudgeList" :key="item.questionId" class="quesWholeDiv">
            <div>
              <span class="quesTitleSpan">
                {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput"
                  @input="scoreChange(item)" />
                分，共 {{ item.questionSumscore }} 分
              </span>
            </div>
            <div>
              <div>
                <span class="quesNameSpan" v-html="item.questionName"></span>
              </div>
              <div class="optionAnswerDiv">
                <div v-show="item.questionType == '文字单选题' ||
                  item.questionType == '图片单选题' ||
                  item.questionType == '视频题'
                  " class="singleOptionsDiv">
                  <span class="singleOptionSpan"> 选项：</span>
                  <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist"
                    :key="singleItem.options">
                    <el-checkbox :checked="item.questionAnswer.indexOf(
                      String.fromCharCode(index + 65)
                    ) !== -1
                      " class="singleOptionCheck" disabled></el-checkbox>
                    <span v-html="singleItem"></span>
                    <!-- {{ `${index + 1}.${singleItem}` }} -->
                  </div>
                </div>
                <div v-show="item.questionType == '文字多选题' ||
                  item.questionType == '图片多选题'
                  " class="multipleOptionsDiv">
                  <div>
                    <span class="multipleOptionSpan"> 选项：</span>
                    <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist"
                      :key="multiplItem.options">
                      <el-checkbox :checked="item.questionAnswer.indexOf(
                        String.fromCharCode(index + 65)
                      ) !== -1
                        " class="multipleOptionCheck" disabled></el-checkbox>
                      <span v-html="multiplItem"></span>
                      <!-- {{ `${index + 1}.${multiplItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '填空题'" class="blanksOptionsDiv">
                  <div>
                    <span class="blanksOptionSpan">参考答案：</span>
                    <div class="blanksOptionDiv" v-for="blanksItem in item.questionAnswer" :key="blanksItem.blanks">
                      <span v-html="blanksItem"></span>
                      <!-- {{ `${index + 1} . ${blanksItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '判断题' ||
                  item.questionType == '表格判断题'
                  " class="judgeOptionsDiv">
                  <div>
                    <span class="judgeOptionSpan">参考答案：</span>
                    <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                  </div>
                </div>
                <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"></div>
                <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                  <div>
                    <div>
                      <div class="pConnectOptionDiv" v-for="(
                          pConnectionItem, index
                        ) in item.questionAnswerList" :key="pConnectionItem.des">
                        <span v-html="pConnectionItem.value"></span>
                        <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                  <div>
                    <div>
                      <div class="lRecognitionOptionDiv" v-for="(
                          lRecognitionItem, index
                        ) in item.questionAnswerList" :key="lRecognitionItem.des">
                        <span v-html="lRecognitionItem.value"></span>
                        <span style="padding-left: 100px" v-html="lRecognitionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in objectSelectList" :key="item.questionId" class="quesWholeDiv">
            <div>
              <span class="quesTitleSpan">
                {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput"
                  @input="scoreChange(item)" />
                分，共 {{ item.questionSumscore }} 分
              </span>
            </div>
            <div>
              <div>
                <span class="quesNameSpan" v-html="item.questionName"></span>
              </div>
              <div class="optionAnswerDiv">
                <div v-show="item.questionType == '文字单选题' ||
                  item.questionType == '图片单选题' ||
                  item.questionType == '视频题'
                  " class="singleOptionsDiv">
                  <span class="singleOptionSpan"> 选项：</span>
                  <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist"
                    :key="singleItem.options">
                    <el-checkbox :checked="item.questionAnswer.indexOf(
                      String.fromCharCode(index + 65)
                    ) !== -1
                      " class="singleOptionCheck" disabled></el-checkbox>
                    <span v-html="singleItem"></span>
                    <!-- {{ `${index + 1}.${singleItem}` }} -->
                  </div>
                </div>
                <div v-show="item.questionType == '文字多选题' ||
                  item.questionType == '图片多选题'
                  " class="multipleOptionsDiv">
                  <div>
                    <span class="multipleOptionSpan"> 选项：</span>
                    <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist"
                      :key="multiplItem.options">
                      <el-checkbox :checked="item.questionAnswer.indexOf(
                        String.fromCharCode(index + 65)
                      ) !== -1
                        " class="multipleOptionCheck" disabled></el-checkbox>
                      <span v-html="multiplItem"></span>
                      <!-- {{ `${index + 1}.${multiplItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '填空题'" class="blanksOptionsDiv">
                  <div>
                    <span class="blanksOptionSpan">参考答案：</span>
                    <div class="blanksOptionDiv" v-for="blanksItem in item.questionAnswer" :key="blanksItem.blanks">
                      <span v-html="blanksItem"></span>
                      <!-- {{ `${index + 1} . ${blanksItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '判断题' ||
                  item.questionType == '表格判断题'
                  " class="judgeOptionsDiv">
                  <div>
                    <span class="judgeOptionSpan">参考答案：</span>
                    <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                  </div>
                </div>
                <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"></div>
                <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                  <div>
                    <div>
                      <div class="pConnectOptionDiv" v-for="(
                          pConnectionItem, index
                        ) in item.questionAnswerList" :key="pConnectionItem.des">
                        <span v-html="pConnectionItem.value"></span>
                        <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                  <div>
                    <div>
                      <div class="lRecognitionOptionDiv" v-for="(
                          lRecognitionItem, index
                        ) in item.questionAnswerList" :key="lRecognitionItem.des">
                        <span v-html="lRecognitionItem.value"></span>
                        <span style="padding-left: 100px" v-html="lRecognitionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in objectMultipleList" :key="item.questionId" class="quesWholeDiv">
            <div>
              <span class="quesTitleSpan">
                {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput"
                  @input="scoreChange(item)" />
                分，共 {{ item.questionSumscore }} 分
              </span>
            </div>
            <div>
              <div>
                <span class="quesNameSpan" v-html="item.questionName"></span>
              </div>
              <div class="optionAnswerDiv">
                <div v-show="item.questionType == '文字单选题' ||
                  item.questionType == '图片单选题' ||
                  item.questionType == '视频题'
                  " class="singleOptionsDiv">
                  <span class="singleOptionSpan"> 选项：</span>
                  <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist"
                    :key="singleItem.options">
                    <el-checkbox :checked="item.questionAnswer.indexOf(
                      String.fromCharCode(index + 65)
                    ) !== -1
                      " class="singleOptionCheck" disabled></el-checkbox>
                    <span v-html="singleItem"></span>
                    <!-- {{ `${index + 1}.${singleItem}` }} -->
                  </div>
                </div>
                <div v-show="item.questionType == '文字多选题' ||
                  item.questionType == '图片多选题'
                  " class="multipleOptionsDiv">
                  <div>
                    <span class="multipleOptionSpan"> 选项：</span>
                    <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist"
                      :key="multiplItem.options">
                      <el-checkbox :checked="item.questionAnswer.indexOf(
                        String.fromCharCode(index + 65)
                      ) !== -1
                        " class="multipleOptionCheck" disabled></el-checkbox>
                      <span v-html="multiplItem"></span>
                      <!-- {{ `${index + 1}.${multiplItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '填空题'" class="blanksOptionsDiv">
                  <div>
                    <span class="blanksOptionSpan">参考答案：</span>
                    <div class="blanksOptionDiv" v-for="blanksItem in item.questionAnswer" :key="blanksItem.blanks">
                      <span v-html="blanksItem"></span>
                      <!-- {{ `${index + 1} . ${blanksItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '判断题' ||
                  item.questionType == '表格判断题'
                  " class="judgeOptionsDiv">
                  <div>
                    <span class="judgeOptionSpan">参考答案：</span>
                    <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                  </div>
                </div>
                <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"></div>
                <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                  <div>
                    <div>
                      <div class="pConnectOptionDiv" v-for="(
                          pConnectionItem, index
                        ) in item.questionAnswerList" :key="pConnectionItem.des">
                        <span v-html="pConnectionItem.value"></span>
                        <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                  <div>
                    <div>
                      <div class="lRecognitionOptionDiv" v-for="(
                          lRecognitionItem, index
                        ) in item.questionAnswerList" :key="lRecognitionItem.des">
                        <span v-html="lRecognitionItem.value"></span>
                        <span style="padding-left: 100px" v-html="lRecognitionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in fictitiousList" :key="item.questionId" class="quesWholeDiv">
            <div>
              <span class="quesTitleSpan">
                {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput"
                  @input="scoreChange(item)" />
                分，共 {{ item.questionSumscore }} 分
              </span>
            </div>
            <div>
              <div v-if="!(item.questionType == '表格判断题')">
                <span class="quesNameSpan" v-html="item.questionName"></span>
              </div>
              <div v-if="item.questionType == '表格判断题'">
                <span class="TableJudgeSpan">点检部位：{{ item.questionName.checkLocation }}</span><br />
                <span class="TableJudgeSpan">点检项目：{{ item.questionName.checkProject }}</span><br />
                <span class="TableJudgeSpan">点检要求及标准：{{ item.questionName.checkRequest }}</span><br />
                <span class="TableJudgeSpan">点检方法：{{ item.questionName.checkMethod }}</span>
              </div>
              <div class="optionAnswerDiv">
                <div v-show="item.questionType == '文字单选题' ||
                  item.questionType == '图片单选题' ||
                  item.questionType == '视频题'
                  " class="singleOptionsDiv">
                  <span class="singleOptionSpan"> 选项：</span>
                  <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist"
                    :key="singleItem.options">
                    <el-checkbox :checked="item.questionAnswer.indexOf(
                      String.fromCharCode(index + 65)
                    ) !== -1
                      " class="singleOptionCheck" disabled></el-checkbox>
                    <span v-html="singleItem"></span>
                    <!-- {{ `${index + 1}.${singleItem}` }} -->
                  </div>
                </div>
                <div v-show="item.questionType == '文字多选题' ||
                  item.questionType == '图片多选题'
                  " class="multipleOptionsDiv">
                  <div>
                    <span class="multipleOptionSpan"> 选项：</span>
                    <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist"
                      :key="multiplItem.options">
                      <el-checkbox :checked="item.questionAnswer.indexOf(
                        String.fromCharCode(index + 65)
                      ) !== -1
                        " class="multipleOptionCheck" disabled></el-checkbox>
                      <span v-html="multiplItem"></span>
                      <!-- {{ `${index + 1}.${multiplItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '填空题'" class="blanksOptionsDiv">
                  <div>
                    <span class="blanksOptionSpan">参考答案：</span>
                    <div class="blanksOptionDiv" v-for="blanksItem in item.questionAnswer" :key="blanksItem.blanks">
                      <span v-html="blanksItem"></span>
                      <!-- {{ `${index + 1} . ${blanksItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '判断题' ||
                  item.questionType == '表格判断题'
                  " class="judgeOptionsDiv">
                  <div>
                    <span class="judgeOptionSpan">参考答案：</span>
                    <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                  </div>
                </div>
                <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"></div>
                <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                  <div>
                    <div>
                      <div class="pConnectOptionDiv" v-for="(
                          pConnectionItem, index
                        ) in item.questionAnswerList" :key="pConnectionItem.des">
                        <span v-html="pConnectionItem.value"></span>
                        <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                  <div>
                    <div>
                      <div class="lRecognitionOptionDiv" v-for="(
                          lRecognitionItem, index
                        ) in item.questionAnswerList" :key="lRecognitionItem.des">
                        <span v-html="lRecognitionItem.value"></span>
                        <span style="padding-left: 100px" v-html="lRecognitionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in practicalList" :key="item.questionId" class="quesWholeDiv">
            <div>
              <span class="quesTitleSpan">
                {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput"
                  @input="scoreChange(item)" />
                分，共 {{ item.questionSumscore }} 分
              </span>
            </div>
            <div>
              <div>
                <span class="quesNameSpan" v-html="item.questionName"></span>
              </div>
              <div class="optionAnswerDiv">
                <div v-show="item.questionType == '文字单选题' ||
                  item.questionType == '图片单选题' ||
                  item.questionType == '视频题'
                  " class="singleOptionsDiv">
                  <span class="singleOptionSpan"> 选项：</span>
                  <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist"
                    :key="singleItem.options">
                    <el-checkbox :checked="item.questionAnswer.indexOf(
                      String.fromCharCode(index + 65)
                    ) !== -1
                      " class="singleOptionCheck" disabled></el-checkbox>
                    <span v-html="singleItem"></span>
                    <!-- {{ `${index + 1}.${singleItem}` }} -->
                  </div>
                </div>
                <div v-show="item.questionType == '文字多选题' ||
                  item.questionType == '图片多选题'
                  " class="multipleOptionsDiv">
                  <div>
                    <span class="multipleOptionSpan"> 选项：</span>
                    <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist"
                      :key="multiplItem.options">
                      <el-checkbox :checked="item.questionAnswer.indexOf(
                        String.fromCharCode(index + 65)
                      ) !== -1
                        " class="multipleOptionCheck" disabled></el-checkbox>
                      <span v-html="multiplItem"></span>
                      <!-- {{ `${index + 1}.${multiplItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '填空题'" class="blanksOptionsDiv">
                  <div>
                    <span class="blanksOptionSpan">参考答案：</span>
                    <div class="blanksOptionDiv" v-for="blanksItem in item.questionAnswer" :key="blanksItem.blanks">
                      <span v-html="blanksItem"></span>
                      <!-- {{ `${index + 1} . ${blanksItem}` }} -->
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '判断题' ||
                  item.questionType == '表格判断题'
                  " class="judgeOptionsDiv">
                  <div>
                    <span class="judgeOptionSpan">参考答案：</span>
                    <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                  </div>
                </div>
                <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv">
                  <div></div>
                </div>
                <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                  <div>
                    <div>
                      <div class="pConnectOptionDiv" v-for="(
                          pConnectionItem, index
                        ) in item.questionAnswerList" :key="pConnectionItem.des">
                        <span v-html="pConnectionItem.value"></span>
                        <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                  <div>
                    <div>
                      <div class="lRecognitionOptionDiv" v-for="(
                          lRecognitionItem, index
                        ) in item.questionAnswerList" :key="lRecognitionItem.des">
                        <span v-html="lRecognitionItem.value"></span>
                        <span style="padding-left: 100px" v-html="lRecognitionItem.des"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-card>
    </div>
    <div class="footer">
      <div class="chooseTotal">
        <span>
          <img src="./papersource/联集4.png" /> 已选:
          {{ allTypeChose }} 道题目</span>
      </div>
      <div class="chooseTotal">
        <span>
          <img src="./papersource/联集3.png" /> 总分: {{ allScoreSum }}
        </span>
      </div>
      <div class="GenreNum">
        <span>认知识别题 ：{{ cognitiveChose }}</span>
        <span>量器具使用题 ：{{ measureChose }}</span>
        <span>客观题（判断） ：{{ oJudgeChose }}</span>
        <span>客观题（单项选择） ：{{ oSelectChose }}</span>
        <span>客观题（多项选择） ：{{ oMultipleChose }}</span>
        <span>虚拟交互题 ：{{ fictitiousChose }}</span>
        <span>实际操作题 ：{{ practicalChose }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Delete } from "@element-plus/icons-vue";
import { ref, reactive, nextTick } from "vue";
import { ElTable } from "element-plus";
import { getPdf } from "@/utils/htmlToPdf2";
import JsPDF from "jspdf";
import html2Canvas from "html2canvas";

let data = reactive({
  qTypeList: [
    {
      label: "文字单选题",
      value: "文字单选题",
    },
    {
      label: "文字多选题",
      value: "文字多选题",
    },
    {
      label: "图片单选题",
      value: "图片单选题",
    },
    {
      label: "图片多选题",
      value: "图片多选题",
    },
    {
      label: "判断题",
      value: "判断题",
    },
    {
      label: "表格判断题",
      value: "表格判断题",
    },
    {
      label: "视频题",
      value: "视频题",
    },
    {
      label: "图片交互题",
      value: "图片交互题",
    },
    {
      label: "图片连线题",
      value: "图片连线题",
    },
    {
      label: "连线识别题",
      value: "连线识别题",
    },
    {
      label: "填空题",
      value: "填空题",
    },
  ],
  qDiffList: [
    {
      label: "初级",
      value: "初级",
    },
    {
      label: "中级",
      value: "中级",
    },
    {
      label: "高级",
      value: "高级",
    },
  ],
  qGenreList: [
    {
      value: "认知识别题",
      label: "认知识别题",
    },
    {
      value: "量器具使用题",
      label: "量器具使用题",
    },
    {
      value: "客观题（判断）",
      label: "客观题（判断）",
    },
    {
      value: "客观题（单项选择）",
      label: "客观题（单项选择）",
    },
    {
      value: "客观题（多项选择）",
      label: "客观题（多项选择）",
    },
    {
      value: "虚拟交互题",
      label: "虚拟交互题",
    },
    {
      value: "实际操作题",
      label: "实际操作题",
    },
  ],
  // 选题组卷对话框获取题目列表
  dataSource: [],
  // 选题组卷已选择题目
  selectedRowKeys: [],
  // 选题组卷总数
  total: 0,
  // 客观题（判断）总分
  oJudgeTotalscore: 0,
  // 客观题（单项选择）总分
  oSelectTotalscore: 0,
  // 客观题（多项选择）总分
  oMultipleTotalscore: 0,
  // 工量具使用总分
  measureTotalscore: 0,
  // 认知识别总分
  cognitiveTotalscore: 0,
  // 虚拟交互题总分
  fictitiousTotalscore: 0,
  // 实际操作题总分
  practicalTotalscore: 0,
  // 一道题分数
  oneQuestionScore: 0,
});

const GenreList = [
  {
    value: "电气单元",
    label: "电气单元",
  },
  {
    value: "机械单元",
    label: "机械单元",
  },
  {
    value: "仪表单元",
    label: "仪表单元",
  },
];

// 新建试卷时传入参数
let paperName = ref("");
let paperCourse = ref();
let paperDuration = ref("40");
let paperGenerating = ref();

// 控制三种组卷方式对话框  抽题、选题、随机
const extractDialogVisible = ref(false);
const choseDialogVisible = ref(false);
const randomDialogVisible = ref(false);

// 抽题组卷加载标识
const isFindComplete = ref(false);

// 暂存各个类型的试题
let cognitiveList = ref([]);
let measureList = ref([]);
let objectJudgeList = ref([]);
let objectSelectList = ref([]);
let objectMultipleList = ref([]);
let fictitiousList = ref([]);
let practicalList = ref([]);

// 暂存已选择试题信息
let tableData = reactive([]);

// 存储已选择试题信息
let quesInfo = reactive([]);

let queryInfo = {
  page: 1,
  rows: 10,
  questionGenre: "",
  questionType: "",
  questionDiff: "",
  courseName: "",
};

// 标识题目类型是否存在数据
// 所有选择题型
let allTypeChose = ref("0");
// 总分
let allScoreSum = ref("0");
// 客观题（判断）类型数量
let oJudgeChose = ref("0");
// 客观题（单项选择）类型数量
let oSelectChose = ref("0");
// 客观题（多项选择）类型数量
let oMultipleChose = ref("0");
// 工量具使用类型数量
let measureChose = ref("0");
// 认知识别类型数量
let cognitiveChose = ref("0");
// 交互仿真类型数量
let fictitiousChose = ref("0");
// 实际操作类型数量
let practicalChose = ref("0");

let examinationId = ref("");


let report = ref(null);


// 编辑试卷获取题目信息
function getExaminaInfo() {
  paperName.value = "测试";
  paperDuration.value = "测试";
  paperCourse.value = "电气单元";
  paperGenerating.value = "一键组卷";

  data.dataSource = [
    {
      questionGenre: "认知识别题",
      eventId: "",
      questionGenreId: "1",
      questionId: "1684806290515111937",
      questionKnowpoint: "实物认知",
      memo: "",
      questionScore: "",
      questionName:
        "<p>请在机械单元的认知板上找到【微型断路器】部件，在下面选项中点击对应的编号</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "A",
      questionChoselist:
        "<p>01</p>$<p>02</p>$<p>03</p>$<p>04</p>$<p>05</p>$<p>06</p>$<p>07</p>$<p>08</p>$<p>09</p>$<p>10</p>$<p>11</p>",
      questionSumscore: "5",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "认知识别题",
      eventId: "",
      questionGenreId: "1",
      questionId: "1684808220377296897",
      questionKnowpoint: "实物认知",
      memo: "",
      questionScore: "",
      questionName:
        "<p>请在机械单元的认知板上找到【电流互感器】部件，在下面选项中点击对应的编号</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "G",
      questionChoselist:
        "<p>01</p>$<p>02</p>$<p>03</p>$<p>04</p>$<p>05</p>$<p>06</p>$<p>07</p>$<p>08</p>$<p>09</p>$<p>10</p>$<p>11</p>",
      questionSumscore: "5",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "量器具使用题",
      eventId: "",
      questionGenreId: "2",
      questionId: "1684813313235431426",
      questionKnowpoint: "实物测量",
      memo: "",
      questionScore: "",
      questionName:
        "<p>请使用万用表测量【交流电源】电流值并将其值输入到对应的输入框中</p>\n<p>测量值：_____VAC</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "220",
      questionChoselist: "",
      questionSumscore: "5",
      courseId: "1",
      questionDiff: "初级",
      questionType: "填空题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（判断）",
      eventId: "",
      questionGenreId: "3",
      questionId: "1684813566378455041",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>电力系统中最常见最危险的故障是单相接地故障</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "错",
      questionChoselist: "",
      questionSumscore: "1",
      courseId: "1",
      questionDiff: "初级",
      questionType: "判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "量器具使用题",
      eventId: "",
      questionGenreId: "2",
      questionId: "1684813619344125953",
      questionKnowpoint: "实物测量",
      memo: "",
      questionScore: "",
      questionName:
        "<p>请使用红外测温枪测量【变频电机】机壳温度并将其值输入到对应的输入框中</p>\n<p>测量值：_____℃</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "35",
      questionChoselist: "",
      questionSumscore: "5",
      courseId: "1",
      questionDiff: "初级",
      questionType: "填空题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（判断）",
      eventId: "",
      questionGenreId: "3",
      questionId: "1684813962354307074",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>变压器发生故障时,根据气体继电器的颜色气味可燃性可以判断故障类 型和原因</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "对",
      questionChoselist: "",
      questionSumscore: "1",
      courseId: "1",
      questionDiff: "初级",
      questionType: "判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（判断）",
      eventId: "",
      questionGenreId: "3",
      questionId: "1684814069824958466",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>并联电容器在电力系统的作用是补偿容性负载改善电压质量降低线路 损耗提高功率因数</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "错",
      questionChoselist: "",
      questionSumscore: "1",
      courseId: "1",
      questionDiff: "初级",
      questionType: "判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（判断）",
      eventId: "",
      questionGenreId: "3",
      questionId: "1684814177203335169",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>在绝缘监视装置中,运行人员根据三相电压表的读数,可以判断故障相 是那一相</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "对",
      questionChoselist: "",
      questionSumscore: "1",
      courseId: "1",
      questionDiff: "初级",
      questionType: "判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（判断）",
      eventId: "",
      questionGenreId: "3",
      questionId: "1684814469651181569",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>中性点运行方式的选择主要取决于单相接地时电气设备绝缘要求及供 电的可靠性</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "对",
      questionChoselist: "",
      questionSumscore: "1",
      courseId: "1",
      questionDiff: "初级",
      questionType: "判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "实际操作题",
      eventId: "",
      questionGenreId: "7",
      questionId: "1684814567693037570",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>请停止输送带控制系统中的【皮带传动机构】，若无法及时停止请指出设备故障原因</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "B",
      questionChoselist:
        "<p>制动器锁紧装置过紧</p>$<p>制动器锁紧装置过松</p>$<p>制动器供电故障</p>$<p>制动器设备故障</p>",
      questionSumscore: "10",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（判断）",
      eventId: "",
      questionGenreId: "3",
      questionId: "1684814818940235777",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>高压断路器应有防止高压连续多次分合间的跳跃闭键措施</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "对",
      questionChoselist: "",
      questionSumscore: "1",
      courseId: "1",
      questionDiff: "初级",
      questionType: "判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "实际操作题",
      eventId: "",
      questionGenreId: "7",
      questionId: "1684814916646547458",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>请启动风机控制系统中的【电动风门阀】，若无法启动请指出设备故障原因</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "A",
      questionChoselist:
        "<p>风门阀开极限故障</p>$<p>风门阀关极限故障</p>$<p>风门阀电源故障</p>$<p>风门阀设备故障</p>",
      questionSumscore: "10",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（判断）",
      eventId: "",
      questionGenreId: "3",
      questionId: "1684815537835552770",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>三相变压器一次侧额定电压值线电压,二次侧电压值相电压</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "错",
      questionChoselist: "",
      questionSumscore: "1",
      courseId: "1",
      questionDiff: "初级",
      questionType: "判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（判断）",
      eventId: "",
      questionGenreId: "3",
      questionId: "1684815645155209217",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>变压器的铜损与铁损相等到时,变压器的效率达到最大值</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "错",
      questionChoselist: "",
      questionSumscore: "1",
      courseId: "1",
      questionDiff: "初级",
      questionType: "判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（判断）",
      eventId: "",
      questionGenreId: "3",
      questionId: "1684816497903349761",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>三相短路电流的最大值出现在短路0.1秒的时间</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "错",
      questionChoselist: "",
      questionSumscore: "1",
      courseId: "1",
      questionDiff: "初级",
      questionType: "判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（判断）",
      eventId: "",
      questionGenreId: "3",
      questionId: "1684816599158042625",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>电力系统发生短路故障,除故障点出现某种不对称外、其它都分仍是对 称的</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "对",
      questionChoselist: "",
      questionSumscore: "1",
      courseId: "1",
      questionDiff: "初级",
      questionType: "判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（多项选择）",
      eventId: "",
      questionGenreId: "5",
      questionId: "1684818424061964289",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>在电力系统中提高功率因数的意义有()。</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "ABD",
      questionChoselist:
        "<p>.使电力设备的容量得到充分利用</p>$<p>.降低电能在传输中过程中的功率损耗</p>$<p>.使线路上电压降△(增大</p>$<p>.提高供、用电的可靠性</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字多选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（多项选择）",
      eventId: "",
      questionGenreId: "5",
      questionId: "1684819159965184001",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>配电变压器&ldquo;三位一体&rdquo;的接地是指()应接在 一起,然后再与接地装置相连 接</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "ACE",
      questionChoselist:
        "<p>.变压器金属外壳</p>$<p>.屏蔽接地</p>$<p>.避雷器,引下线</p>$<p>.避雷针引下线</p>$<p>.变压器的低压侧中心点</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字多选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（多项选择）",
      eventId: "",
      questionGenreId: "5",
      questionId: "1684820207253532673",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>供电系统对保护装置要求是( )</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "ABCE",
      questionChoselist:
        "<p>.选择性</p>$<p>.速动性</p>$<p>.可靠性</p>$<p>.扩展性&nbsp;</p>$<p>.灵敏性</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字多选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（多项选择）",
      eventId: "",
      questionGenreId: "5",
      questionId: "1684820603158081538",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>电流互感器产生误差有变比误差、角误差,其原因是( )</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "ABCD",
      questionChoselist:
        "<p>.一次电流大小有关</p>$<p>.铁芯质量有关&nbsp;</p>$<p>.结构尺寸有关&nbsp;</p>$<p>.二次负 载阻抗有关</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字多选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（单项选择）",
      eventId: "",
      questionGenreId: "4",
      questionId: "1684825452150992898",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>短路保护的操作电源可取自( )。</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "B",
      questionChoselist:
        "<p>.电压互感器&nbsp;</p>$<p>.电流互感器&nbsp;</p>$<p>.空气开关&nbsp;</p>$<p>.电容器</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（多项选择）",
      eventId: "",
      questionGenreId: "5",
      questionId: "1684826065442123777",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>工厂供电电压等级确定是()</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "BD",
      questionChoselist:
        "<p>.电压变化</p>$<p>.供电距离</p>$<p>.负荷大小&nbsp;</p>$<p>.供电容量</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字多选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（单项选择）",
      eventId: "",
      questionGenreId: "4",
      questionId: "1684826137944862721",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>以下接地方式属于保护接地的系统是( )。</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "B",
      questionChoselist:
        "<p>.变压器的中性点接地&nbsp;</p>$<p>.电机的外壳接地&nbsp;</p>$<p>.把一根金属和地线相连</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（单项选择）",
      eventId: "",
      questionGenreId: "4",
      questionId: "1684828087138594817",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>中性点不接地系统相接地事故、接地极对地电压为零,非接地极对地电压升高( ) 倍。</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "C",
      questionChoselist: "<p>3</p>$<p>2</p>$<p>&radic;3&nbsp;</p>$<p>I</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（单项选择）",
      eventId: "",
      questionGenreId: "4",
      questionId: "1684828237164654593",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>中性在不接在系统单个接地时应尽快的找出接地点,否则切断电源,主要是考虑 ( )要求。</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "A",
      questionChoselist:
        "<p>&nbsp;安全性&nbsp;</p>$<p>&nbsp;可行性&nbsp;</p>$<p>&nbsp;经济性&nbsp;</p>$<p>&nbsp;灵敏度</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（单项选择）",
      eventId: "",
      questionGenreId: "4",
      questionId: "1684828798056345602",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>发电机额定电压比线路额定电压( )</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "A",
      questionChoselist:
        "<p>高5%&nbsp;</p>$<p>低5%&nbsp;</p>$<p>&nbsp;相等</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（单项选择）",
      eventId: "",
      questionGenreId: "4",
      questionId: "1684829130215862273",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>中性点不接地的系统发生单相接地故障时不变的数据( )</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "A",
      questionChoselist:
        "<p>线间电压&nbsp;</p>$<p>非故障相对地电压&nbsp;</p>$<p>故障相对地电流&nbsp;</p>$<p>故障相对地电压</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（单项选择）",
      eventId: "",
      questionGenreId: "4",
      questionId: "1684829264089657346",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>当电源中性点不接地的系统发生单相接地时( )</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "C",
      questionChoselist:
        "<p>&nbsp;三相用电设备正常工作关系受到影响</p>$<p>&nbsp;设备不能照常运行&nbsp;</p>$<p>设备仍能照常运行&nbsp;</p>$<p>设备内部立即短路</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（单项选择）",
      eventId: "",
      questionGenreId: "4",
      questionId: "1684829382016708609",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName: "<p>变压器的额定电压确定的依据( )</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "B",
      questionChoselist:
        "<p>变压器的容量&nbsp;</p>$<p>变压器的允许温升&nbsp;</p>$<p>负载的容量</p>$<p>负载的接线方式</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（单项选择）",
      eventId: "",
      questionGenreId: "4",
      questionId: "1684829720857751554",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>电压互感器能将 高电压 变为便于测量的电压( ),使仪表等与高压隔</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "A",
      questionChoselist:
        "<p>&nbsp;100V&nbsp;</p>$<p>&nbsp;200V&nbsp;</p>$<p>&nbsp;50V</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "客观题（单项选择）",
      eventId: "",
      questionGenreId: "4",
      questionId: "1684829847366348802",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>二次设备是指对( &nbsp;)的工作进行监、测量、操作和控制的设备</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "C",
      questionChoselist:
        "<p>一次设备</p>$<p>一、二次设备&nbsp;</p>$<p>&nbsp;二次设备</p>",
      questionSumscore: "2",
      courseId: "1",
      questionDiff: "初级",
      questionType: "文字单选题",
      questionAnalysis: "",
    },
    {
      questionGenre: "虚拟交互题",
      eventId: "",
      questionGenreId: "6",
      questionId: "1684877845416849410",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        '{"checkLocation":"风机控制柜","checkProject":"柜内照明","checkRequest":"打开柜门后柜内有照明","checkMethod":"目视"}',
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "异常",
      questionChoselist: "",
      questionSumscore: "4",
      courseId: "1",
      questionDiff: "初级",
      questionType: "表格判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "虚拟交互题",
      eventId: "",
      questionGenreId: "6",
      questionId: "1684888657745358849",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        '{"checkLocation":"风机控制系统","checkProject":"24V电源","checkRequest":"电源指示灯显示正常，供电电压正常","checkMethod":"目视、检测"}',
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "正常",
      questionChoselist: "",
      questionSumscore: "4",
      courseId: "1",
      questionDiff: "初级",
      questionType: "表格判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "虚拟交互题",
      eventId: "",
      questionGenreId: "6",
      questionId: "1684889539828461570",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        '{"checkLocation":"风机控制系统","checkProject":"变频器","checkRequest":"屏幕正常显示，无故障代码","checkMethod":"目视"}',
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "正常",
      questionChoselist: "",
      questionSumscore: "4",
      courseId: "1",
      questionDiff: "初级",
      questionType: "表格判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "虚拟交互题",
      eventId: "",
      questionGenreId: "6",
      questionId: "1684889690206842881",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        '{"checkLocation":"风机控制系统","checkProject":"相序保护器","checkRequest":"接线端子外观完好","checkMethod":"目视"}',
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "正常",
      questionChoselist: "",
      questionSumscore: "4",
      courseId: "1",
      questionDiff: "初级",
      questionType: "表格判断题",
      questionAnalysis: "",
    },
    {
      questionGenre: "虚拟交互题",
      eventId: "",
      questionGenreId: "6",
      questionId: "1691981327886135297",
      questionKnowpoint: "",
      memo: "",
      questionScore: "",
      questionName:
        "<p>请将【变频器】与电机、PLC进行模拟连线，并将连接的端子号输入到对应的输入框。</p>",
      deleteFlag: 0,
      courseName: "电气单元",
      questionAnswer: "U$V$W$AO.2$AO.3",
      questionChoselist:
        "<p>U</p>$<p>V</p>$<p>W</p>$<p>MM440.24</p>$<p>MM440.25</p>",
      questionSumscore: "4",
      courseId: "1",
      questionDiff: "初级",
      questionType: "连线识别题",
      questionAnalysis: "",
    },
  ];
  console.log("第一步", data.dataSource);
  sliceAnswer();
  tableData = data.dataSource;
  console.log("第三步", tableData);

  tableData.forEach((item) => {
    quesInfo.push(item);
    if (
      item.questionType == "文字单选题" ||
      item.questionType == "图片单选题" ||
      item.questionType == "文字多选题" ||
      item.questionType == "图片多选题" ||
      item.questionType == "视频题" ||
      item.questionType == "判断题" ||
      item.questionType == "表格判断题"
    ) {
      item.questionScore = item.questionSumscore;
    } else if (
      item.questionType == "填空题" ||
      item.questionType == "图片交互题" ||
      item.questionType == "图片连线题" ||
      item.questionType == "连线识别题"
    ) {
      item.questionScore =
        Number(item.questionSumscore) / Number(item.questionAnswer.length);
    }
  });

  for (var i = 0; i < tableData.length; i++) {
    if (tableData[i].questionGenre == "认知识别题") {
      cognitiveList.value.push(tableData[i]);
    } else if (tableData[i].questionGenre == "量器具使用题") {
      measureList.value.push(tableData[i]);
    } else if (tableData[i].questionGenre == "客观题（判断）") {
      objectJudgeList.value.push(tableData[i]);
    } else if (tableData[i].questionGenre == "客观题（单项选择）") {
      objectSelectList.value.push(tableData[i]);
    } else if (tableData[i].questionGenre == "客观题（多项选择）") {
      objectMultipleList.value.push(tableData[i]);
    } else if (tableData[i].questionGenre == "虚拟交互题") {
      if (tableData[i].questionType == "表格判断题") {
        tableData[i].questionName = JSON.parse(tableData[i].questionName);
      }
      fictitiousList.value.push(tableData[i]);
    } else if (tableData[i].questionGenre == "实际操作题") {
      practicalList.value.push(tableData[i]);
    }
  }
  console.log("第四步", quesInfo);
  //  统计已选试题,重置分数
  totalStatistics();

  extractDialogVisible.value = false;
}

getExaminaInfo();

// 分割题目答案
function sliceAnswer() {
  for (var i = 0; i < data.dataSource.length; i++) {
    if (
      data.dataSource[i].questionType == "视频题" ||
      data.dataSource[i].questionType == "文字单选题" ||
      data.dataSource[i].questionType == "文字多选题" ||
      data.dataSource[i].questionType == "图片单选题" ||
      data.dataSource[i].questionType == "图片多选题"
    ) {
      if (data.dataSource[i].questionChoselist != null) {
        // console.log(' data.dataSource[i].questionChoselist', data.dataSource[i].questionChoselist);
        // console.log(' data.dataSource[i].questionChoselist.split()', data.dataSource[i].questionChoselist.split('$'));
        data.dataSource[i].questionChoselist =
          data.dataSource[i].questionChoselist.split("$");
        // console.log(' data.dataSource[i].questionChoselist', data.dataSource[i].questionChoselist);
      }
    }
    if (data.dataSource[i].questionType == "填空题") {
      // console.log(' data.dataSource[i].quesAnswer', data.dataSource[i].questionAnswer);
      // console.log(' data.dataSource[i].quesAnswer' ,  data.dataSource[i].quesAnswer)
      data.dataSource[i].questionAnswer =
        data.dataSource[i].questionAnswer.split("$");
      // console.log(' data.dataSource[i].questionAnswer', data.dataSource[i].questionAnswer);
    }

    if (
      data.dataSource[i].questionType == "图片连线题" ||
      data.dataSource[i].questionType == "连线识别题"
    ) {
      data.dataSource[i].questionAnswerList = [];
      if (data.dataSource[i].questionChoselist != null) {
        // console.log(' data.dataSource[i].questionChoselist', data.dataSource[i].questionChoselist);
        // console.log(' data.dataSource[i].questionChoselist.split()', data.dataSource[i].questionChoselist.split('$'));
        data.dataSource[i].questionChoselist =
          data.dataSource[i].questionChoselist.split("$");
        data.dataSource[i].questionAnswer =
          data.dataSource[i].questionAnswer.split("$");
        for (var j = 0; j < data.dataSource[i].questionChoselist.length; j++) {
          data.dataSource[i].questionAnswerList.push({
            value: data.dataSource[i].questionChoselist[j],
            des: data.dataSource[i].questionAnswer[j],
          });
        }
        // console.log(' data.dataSource[i].questionChoselist', data.dataSource[i].questionChoselist);
      }
    }
  }
  console.log("第二步", data.dataSource);
}

// 统计已选试题
function totalStatistics() {
  allScoreSum.value = "";
  data.oJudgeTotalscore = 0;
  data.oSelectTotalscore = 0;
  data.oMultipleTotalscore = 0;
  data.measureTotalscore = 0;
  data.fictitiousTotalscore = 0;
  data.cognitiveTotalscore = 0;
  data.practicalTotalscore = 0;

  allTypeChose.value = quesInfo.length.toString();
  oJudgeChose.value = objectJudgeList.value.length;
  oSelectChose.value = objectSelectList.value.length;
  oMultipleChose.value = objectMultipleList.value.length;
  measureChose.value = measureList.value.length;
  cognitiveChose.value = cognitiveList.value.length;
  fictitiousChose.value = fictitiousList.value.length;
  practicalChose.value = practicalList.value.length;

  objectJudgeList.value.forEach((item) => {
    data.oJudgeTotalscore =
      data.oJudgeTotalscore + Number(item.questionSumscore);
  });
  objectSelectList.value.forEach((item) => {
    data.oSelectTotalscore =
      data.oSelectTotalscore + Number(item.questionSumscore);
  });
  objectMultipleList.value.forEach((item) => {
    data.oMultipleTotalscore =
      data.oMultipleTotalscore + Number(item.questionSumscore);
  });
  measureList.value.forEach((item) => {
    data.measureTotalscore =
      data.measureTotalscore + Number(item.questionSumscore);
  });
  cognitiveList.value.forEach((item) => {
    data.cognitiveTotalscore =
      data.cognitiveTotalscore + Number(item.questionSumscore);
  });
  fictitiousList.value.forEach((item) => {
    data.fictitiousTotalscore =
      data.fictitiousTotalscore + Number(item.questionSumscore);
  });
  practicalList.value.forEach((item) => {
    data.practicalTotalscore =
      data.practicalTotalscore + Number(item.questionSumscore);
  });

  allScoreSum.value = (
    data.oJudgeTotalscore +
    data.oMultipleTotalscore +
    data.oSelectTotalscore +
    data.measureTotalscore +
    data.cognitiveTotalscore +
    data.fictitiousTotalscore +
    data.practicalTotalscore
  ).toString();
}

function isSplit (nodes, index, pageHeight) {
      // 计算当前这块dom是否跨越了a4大小，以此分割
      return !!(nodes[index].offsetTop + nodes[index].offsetHeight < pageHeight && nodes[index + 1] && nodes[index + 1].offsetTop + nodes[index + 1].offsetHeight > pageHeight);
    }




function exportPDF (dom, filename) {
    const scale = 2

    // 滚动到顶部，避免打印不全
    document.documentElement.scrollTop = 0

    html2Canvas(report.value, {
        allowTaint: true, // Whether to allow cross-origin images to taint the canvas
        scale // The scale to use for rendering. Defaults to the browsers device pixel ratio.
    }).then((canvas) => {
        const contentWidth = canvas.width / scale
        const contentHeight = canvas.height / scale
        const pdf = new JsPDF('', 'pt', [contentWidth, contentHeight])
        const pageData = canvas.toDataURL('image/jpeg', 1.0)

        pdf.addImage(pageData, 'JPEG', 0, 0, contentWidth, contentHeight)
        pdf.save(`${filename}.pdf`)
    })
}
// let { qDiffList, qTypeList, qGenreList } = toRefs(data);
</script>

<style lang="scss">
.quesNameSpan {
  p {
    display: flex;

    img {
      width: 100px;
    }
  }
}

.quesNameDiv {
  p {
    img {
      width: 100px;
    }
  }
}

.popoverQuesNameSpan {
  p {
    display: flex;

    img {
      width: 50px;
    }
  }
}

.singleOptionDiv {
  span {
    p {
      img {
        width: 100px;
      }
    }
  }
}

.popoverSingleOptionDiv {
  span {
    p {
      img {
        width: 50px;
      }
    }
  }
}

.multipleOptionDiv {
  span {
    p {
      img {
        width: 100px;
      }
    }
  }
}

.popoverMultipleOptionDiv {
  span {
    p {
      img {
        width: 50px;
      }
    }
  }
}

.pConnectionsDiv {
  p {
    margin-bottom: 0px;

    img {
      width: 120px;
      height: 100%;
    }
  }
}

.lRecognitionDiv {
  p {
    margin-bottom: 0px;

    img {
      width: 120px;
      height: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
#loading {
  position: relative;
  width: 50px;
  height: 50px;
  margin: 0 auto;
}

#loading::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 5px solid #ccc;
  border-top-color: #f8f8f8;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.footer {
  display: flex;
  position: fixed;
  bottom: 0px;
  // width: calc(100% - 210px);
  height: 70px;
  z-index: 999;
  width: 100%;
  background-color: white;
  position: fixed;
  bottom: 0;

  .chooseTotal {
    margin: auto 0px auto 10px;

    span {
      font-weight: bold;
      margin: 0px 0px 0px 10px;
      font-size: 18px;
      display: flex;

      img {
        margin-right: 10px;
      }
    }
  }

  .GenreNum {
    margin: auto 10px auto 20px;
    display: flex;

    span {
      margin-left: 10px;
      font-size: 14px;
    }
  }

  .footSave {
    margin: auto 10px auto 10px;
    padding-left: 1%;

    button {
      margin-left: 10px;
    }
  }
}

.infoDiv {

  // display: flex;
  .paperInfo {
    display: flex;
    margin: 2px 0 10px 0;

    .paperInfoInput {
      width: 50%;
      margin-left: 10px;
    }

    .paperInfoSelect {
      margin-left: 10px;
    }
  }
}

.chosequestion {
  font-size: 13px;
  line-height: 18px;
}

.quesWholeDiv {
  display: block;
  border-bottom: 1px solid #e8e8e9;
  margin: 1px 0px 1px 1px;
  padding: 10px 0px 40px 0px;

  .quesTitleSpan {
    display: block;
    margin: 0px 10px 0px 10px;
    padding: 0px 0px 0px 0px;

    .quesTitleScoreInput {
      width: 50px;
      margin: 0px 10px 0px 10px;
      padding: 0px 0px 10px 0px;
    }
  }

  .quesNameSpan {
    display: block;
    margin: 0 0 10px 30px;
    padding: 0px 0px 0px 0px;
  }

  .optionAnswerDiv {
    .singleOptionsDiv {
      display: flex;
      justify-content: space-between;

      .singleOptionSpan {
        display: block;
        margin: 0 0 0 10px;
      }

      .singleOptionDiv {
        margin: 5px 0 0 30px;
        display: flex;

        .singleOptionCheck {
          margin: 0 10px 0 0;
          bottom: 5px;
        }
      }

      .singleDeleteButton {
        margin: 0 10px 0 0;
        float: right;
      }
    }

    .multipleOptionsDiv {
      .div {
        display: flex;
        justify-content: space-between;
      }

      .multipleOptionSpan {
        display: block;
        margin: 0 0 0 10px;
      }

      .multipleOptionDiv {
        margin: 5px 0 0 30px;
        display: flex;

        .multipleOptionCheck {
          margin: 0 10px 0 0;
        }
      }

      .multipleDeleteButton {
        margin: 0 10px 0 0;
        float: right;
      }
    }

    .blanksOptionsDiv {
      .blanksOptionSpan {
        display: block;
        margin: 0 0 0 10px;
      }

      .blanksOptionDiv {
        margin: 5px 0 0 30px;
      }

      .blanksDeleteButton {
        margin: 0 10px 0 0;
        float: right;
      }
    }

    .judgeOptionsDiv {
      .judgeOptionSpan {
        display: block;
        margin: 0 0 0 10px;
      }

      .judgeAnswerSpan {
        margin-left: 30px;
      }

      .judgeOptionDiv {
        margin: 5px 0 0 30px;
      }

      .judgeDeleteButton {
        margin: 0 10px 0 0;
        float: right;
      }
    }

    .picConOptionsDiv {
      .picConDeleteButton {
        margin: 0 10px 0 0;
        float: right;
      }
    }

    .pConnectionsDiv {
      .pConnectOptionDiv {
        margin: 5px 0 0 30px;
        display: flex;
      }

      .pConnectDeleteButton {
        margin: 0 10px 0 0;
        float: right;
      }
    }

    .lRecognitionDiv {
      .lRecognitionOptionDiv {
        margin: 5px 0 0 30px;
        display: flex;
      }

      .lRecognitionDeleteButton {
        margin: 0 10px 0 0;
        float: right;
      }
    }

    .judgmentOptionsDiv {
      .judgmentOptionSpan {
        display: block;
        margin: 0 0 0 10px;
      }

      .judgmentRadio {
        margin: 5px 0 0 30px;
      }

      .judgmentDeleteButton {
        margin: 0 10px 0 0;
        float: right;
      }
    }
  }
}

.simpleDiff {
  border-bottom: 1px dotted #d8d8d8;
  display: flex;

  // justify-content: space-between;
  align-items: center;
  height: 50px;
  line-height: 50px;

  .questionDiffDiv {
    margin: 0 0 0 50px;
  }

  .numGradeDiv {
    display: flex;

    .numDiv {
      width: 300px;
      display: flex;
      margin: 0 0 0 10px;

      // :deep(.el-input) {
      //   margin: 0 5px;
      //   padding: 10px 5px;
      //   width: 55px;
      //   text-align: center;
      //   font-size: 18px;
      //   color: #5d82ff;
      // }

      // :deep(.el-input__inner) {
      //   text-align: center;
      //   font-size: 18px;
      //   color: #5d82ff;
      // }
    }
  }
}

.mediumDiff {
  border-bottom: 1px dotted #d8d8d8;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  height: 50px;
  line-height: 50px;

  .questionDiffDiv {
    margin: 0 0 0 50px;
  }

  .numGradeDiv {
    display: flex;

    .numDiv {
      width: 300px;
      display: flex;
      margin: 0 0 0 10px;

      // :deep(.el-input) {
      //   margin: 0 5px;
      //   padding: 10px 5px;
      //   width: 55px;
      //   text-align: center;
      //   font-size: 18px;
      //   color: #5d82ff;
      // }

      // :deep(.el-input__inner) {
      //   text-align: center;
      //   font-size: 18px;
      //   color: #5d82ff;
      // }
    }
  }
}

.inputNumber {
  height: 30px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.seniorDiff {
  border-bottom: 1px dotted #d8d8d8;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  height: 50px;
  line-height: 50px;

  .questionDiffDiv {
    margin: 0 0 0 50px;
  }

  .numGradeDiv {
    display: flex;

    .numDiv {
      width: 300px;
      display: flex;
      margin: 0 0 0 10px;

      // :deep(.el-input) {
      //   margin: 0 5px;
      //   padding: 10px 5px;
      //   width: 55px;
      //   text-align: center;
      //   font-size: 18px;
      //   color: #5d82ff;
      // }

      // :deep(.el-input__inner) {
      //   text-align: center;
      //   font-size: 18px;
      //   color: #5d82ff;
      // }
    }
  }
}

.popoverQuesDetails {
  .popoverQuesNameSpan {
    display: block;
    margin: 0px 0 10px 10px;
    padding: 0px 0px 0px 0px;
  }

  .popoverOptionAnswerDiv {
    .popoverSingleOptionsDiv {
      .popoverSingleOptionSpan {
        display: block;
        margin: 0 0 0 10px;
      }

      .popoverSingleOptionDiv {
        margin: 5px 0 0 30px;
        display: flex;

        .popoverSingleOptionCheck {
          margin: 0 10px 0 0;
          bottom: 5px;
        }
      }

      .popoverSingleDeleteButton {
        margin: 0 10px 0 0;
        float: right;
      }
    }

    .popoverMultipleOptionsDiv {
      .popoverMultipleOptionSpan {
        display: block;
        margin: 0 0 0 10px;
      }

      .popoverMultipleOptionDiv {
        margin: 5px 0 0 30px;
        display: flex;

        .popoverMultipleOptionCheck {
          margin: 0 10px 0 0;
          bottom: 5px;
        }
      }
    }

    .popoverBlanksOptionsDiv {
      .popoverBlanksOptionSpan {
        display: block;
        margin: 0 0 0 10px;
      }

      .popoverBlanksOptionDiv {
        margin: 5px 0 0 30px;
      }
    }

    .popoverConnectOptionsDiv {
      .popoverpConnectOptionDiv {
        margin: 5px 0 0 30px;
      }
    }
  }
}
</style>
