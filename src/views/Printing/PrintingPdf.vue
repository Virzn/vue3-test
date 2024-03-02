<template>
  <div class="wholeDiv">
    <div>
      <a-card class="">
        <div style="top: 20px; float: right; right: 1%; position: absolute">
          <el-button type="primary" @click="outPutPdfFn()"> 下载 </el-button>
        </div>
        <div id="demo" ref="report">
          <el-card v-show="cognitiveList.length > 0">
            <div>
              <div class="group1TitleDiv sign">
                <div class="group1TitleDiv1">
                  <span style="font-size: 20px">认知识别题 {{ data.cognitiveTotalscore }} 分</span>
                </div>
              </div>
              <div v-for="(item, index) in cognitiveList" :key="item.questionId" class="quesWholeDiv">
                <div class="sign">
                  <span class="quesTitleSpan">
                    {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                    <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput" />
                    分，共
                    <span style="margin: 0 5px 0 5px">
                      {{ item.questionSumscore }}
                    </span>
                    分
                  </span>
                </div>
                <div>
                  <div class="sign">
                    <span class="quesNameSpan" v-html="item.questionName"></span>
                  </div>
                  <div class="optionAnswerDiv sign">
                    <div
                      v-show="item.questionType == '文字单选题' || item.questionType == '图片单选题' || item.questionType == '视频题'"
                      class="singleOptionsDiv"
                    >
                      <span class="singleOptionSpan"> 选项：</span>
                      <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist" :key="singleItem.options">
                        <el-checkbox
                          :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                          class="singleOptionCheck"
                          disabled
                        ></el-checkbox>
                        <span v-html="singleItem"></span>
                        <!-- {{ `${index + 1}.${singleItem}` }} -->
                      </div>
                    </div>
                    <div v-show="item.questionType == '文字多选题' || item.questionType == '图片多选题'" class="multipleOptionsDiv">
                      <div>
                        <span class="multipleOptionSpan"> 选项：</span>
                        <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist" :key="multiplItem.options">
                          <el-checkbox
                            :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                            class="multipleOptionCheck"
                            disabled
                          ></el-checkbox>
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
                    <div v-show="item.questionType == '判断题' || item.questionType == '表格判断题'" class="judgeOptionsDiv">
                      <div>
                        <span class="judgeOptionSpan">参考答案：</span>
                        <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                      </div>
                    </div>
                    <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"> </div>
                    <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                      <div>
                        <div>
                          <div class="pConnectOptionDiv" v-for="(pConnectionItem, index) in item.questionAnswerList" :key="pConnectionItem.des">
                            <span v-html="pConnectionItem.value"></span>
                            <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                      <div>
                        <div>
                          <div class="lRecognitionOptionDiv" v-for="(lRecognitionItem, index) in item.questionAnswerList" :key="lRecognitionItem.des">
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
          </el-card>
          <el-card v-show="measureList.length > 0">
            <div>
              <div class="group1TitleDiv sign">
                <div class="group1TitleDiv1">
                  <span style="font-size: 20px">量器具使用题 {{ data.measureTotalscore }} 分</span>
                </div>
              </div>
              <div v-for="(item, index) in measureList" :key="item.questionId" class="quesWholeDiv">
                <div class="sign">
                  <span class="quesTitleSpan">
                    {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                    <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput" />
                    分，共 {{ item.questionSumscore }} 分
                  </span>
                </div>
                <div>
                  <div class="sign">
                    <span class="quesNameSpan" v-html="item.questionName"></span>
                  </div>
                  <div class="optionAnswerDiv sign">
                    <div
                      v-show="item.questionType == '文字单选题' || item.questionType == '图片单选题' || item.questionType == '视频题'"
                      class="singleOptionsDiv"
                    >
                      <span class="singleOptionSpan"> 选项：</span>
                      <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist" :key="singleItem.options">
                        <el-checkbox
                          :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                          class="singleOptionCheck"
                          disabled
                        ></el-checkbox>
                        <span v-html="singleItem"></span>
                        <!-- {{ `${index + 1}.${singleItem}` }} -->
                      </div>
                    </div>
                    <div v-show="item.questionType == '文字多选题' || item.questionType == '图片多选题'" class="multipleOptionsDiv">
                      <div>
                        <span class="multipleOptionSpan"> 选项：</span>
                        <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist" :key="multiplItem.options">
                          <el-checkbox
                            :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                            class="multipleOptionCheck"
                            disabled
                          ></el-checkbox>
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
                    <div v-show="item.questionType == '判断题' || item.questionType == '表格判断题'" class="judgeOptionsDiv">
                      <div>
                        <span class="judgeOptionSpan">参考答案：</span>
                        <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                      </div>
                    </div>
                    <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"> </div>
                    <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                      <div>
                        <div>
                          <div class="pConnectOptionDiv" v-for="(pConnectionItem, index) in item.questionAnswerList" :key="pConnectionItem.des">
                            <span v-html="pConnectionItem.value"></span>
                            <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                      <div>
                        <div>
                          <div class="lRecognitionOptionDiv" v-for="(lRecognitionItem, index) in item.questionAnswerList" :key="lRecognitionItem.des">
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
          </el-card>
          <el-card v-show="objectJudgeList.length > 0">
            <div>
              <div class="group1TitleDiv sign">
                <div class="group1TitleDiv1">
                  <span style="font-size: 20px">客观题（判断） {{ data.oJudgeTotalscore }} 分</span>
                </div>
              </div>
              <div v-for="(item, index) in objectJudgeList" :key="item.questionId" class="quesWholeDiv">
                <div class="sign">
                  <span class="quesTitleSpan">
                    {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                    <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput" />
                    分，共 {{ item.questionSumscore }} 分
                  </span>
                </div>
                <div>
                  <div class="sign">
                    <span class="quesNameSpan" v-html="item.questionName"></span>
                  </div>
                  <div class="optionAnswerDiv sign">
                    <div
                      v-show="item.questionType == '文字单选题' || item.questionType == '图片单选题' || item.questionType == '视频题'"
                      class="singleOptionsDiv"
                    >
                      <span class="singleOptionSpan"> 选项：</span>
                      <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist" :key="singleItem.options">
                        <el-checkbox
                          :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                          class="singleOptionCheck"
                          disabled
                        ></el-checkbox>
                        <span v-html="singleItem"></span>
                        <!-- {{ `${index + 1}.${singleItem}` }} -->
                      </div>
                    </div>
                    <div v-show="item.questionType == '文字多选题' || item.questionType == '图片多选题'" class="multipleOptionsDiv">
                      <div>
                        <span class="multipleOptionSpan"> 选项：</span>
                        <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist" :key="multiplItem.options">
                          <el-checkbox
                            :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                            class="multipleOptionCheck"
                            disabled
                          ></el-checkbox>
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
                    <div v-show="item.questionType == '判断题' || item.questionType == '表格判断题'" class="judgeOptionsDiv">
                      <div>
                        <span class="judgeOptionSpan">参考答案：</span>
                        <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                      </div>
                    </div>
                    <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"> </div>
                    <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                      <div>
                        <div>
                          <div class="pConnectOptionDiv" v-for="(pConnectionItem, index) in item.questionAnswerList" :key="pConnectionItem.des">
                            <span v-html="pConnectionItem.value"></span>
                            <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                      <div>
                        <div>
                          <div class="lRecognitionOptionDiv" v-for="(lRecognitionItem, index) in item.questionAnswerList" :key="lRecognitionItem.des">
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
          </el-card>
          <el-card v-show="objectSelectList.length > 0">
            <div>
              <div class="group1TitleDiv sign">
                <div class="group1TitleDiv1">
                  <span style="font-size: 20px">客观题（单项选择） {{ data.oSelectTotalscore }} 分</span>
                </div>
              </div>
              <div v-for="(item, index) in objectSelectList" :key="item.questionId" class="quesWholeDiv">
                <div class="sign">
                  <span class="quesTitleSpan">
                    {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                    <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput" />
                    分，共 {{ item.questionSumscore }} 分
                  </span>
                </div>
                <div>
                  <div class="sign">
                    <span class="quesNameSpan" v-html="item.questionName"></span>
                  </div>
                  <div class="optionAnswerDiv sign">
                    <div
                      v-show="item.questionType == '文字单选题' || item.questionType == '图片单选题' || item.questionType == '视频题'"
                      class="singleOptionsDiv"
                    >
                      <span class="singleOptionSpan"> 选项：</span>
                      <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist" :key="singleItem.options">
                        <el-checkbox
                          :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                          class="singleOptionCheck"
                          disabled
                        ></el-checkbox>
                        <span v-html="singleItem"></span>
                        <!-- {{ `${index + 1}.${singleItem}` }} -->
                      </div>
                    </div>
                    <div v-show="item.questionType == '文字多选题' || item.questionType == '图片多选题'" class="multipleOptionsDiv">
                      <div>
                        <span class="multipleOptionSpan"> 选项：</span>
                        <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist" :key="multiplItem.options">
                          <el-checkbox
                            :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                            class="multipleOptionCheck"
                            disabled
                          ></el-checkbox>
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
                    <div v-show="item.questionType == '判断题' || item.questionType == '表格判断题'" class="judgeOptionsDiv">
                      <div>
                        <span class="judgeOptionSpan">参考答案：</span>
                        <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                      </div>
                    </div>
                    <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"> </div>
                    <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                      <div>
                        <div>
                          <div class="pConnectOptionDiv" v-for="(pConnectionItem, index) in item.questionAnswerList" :key="pConnectionItem.des">
                            <span v-html="pConnectionItem.value"></span>
                            <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                      <div>
                        <div>
                          <div class="lRecognitionOptionDiv" v-for="(lRecognitionItem, index) in item.questionAnswerList" :key="lRecognitionItem.des">
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
          </el-card>
          <el-card v-show="objectMultipleList.length > 0">
            <div>
              <div class="group1TitleDiv sign">
                <div class="group1TitleDiv1">
                  <span style="font-size: 20px">客观题（多选选择） {{ data.oMultipleTotalscore }} 分</span>
                </div>
              </div>
              <div v-for="(item, index) in objectMultipleList" :key="item.questionId" class="quesWholeDiv">
                <div class="sign">
                  <span class="quesTitleSpan">
                    {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                    <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput" />
                    分，共 {{ item.questionSumscore }} 分
                  </span>
                </div>
                <div>
                  <div class="sign">
                    <span class="quesNameSpan" v-html="item.questionName"></span>
                  </div>
                  <div class="optionAnswerDiv sign">
                    <div
                      v-show="item.questionType == '文字单选题' || item.questionType == '图片单选题' || item.questionType == '视频题'"
                      class="singleOptionsDiv"
                    >
                      <span class="singleOptionSpan"> 选项：</span>
                      <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist" :key="singleItem.options">
                        <el-checkbox
                          :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                          class="singleOptionCheck"
                          disabled
                        ></el-checkbox>
                        <span v-html="singleItem"></span>
                        <!-- {{ `${index + 1}.${singleItem}` }} -->
                      </div>
                    </div>
                    <div v-show="item.questionType == '文字多选题' || item.questionType == '图片多选题'" class="multipleOptionsDiv">
                      <div>
                        <span class="multipleOptionSpan"> 选项：</span>
                        <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist" :key="multiplItem.options">
                          <el-checkbox
                            :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                            class="multipleOptionCheck"
                            disabled
                          ></el-checkbox>
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
                    <div v-show="item.questionType == '判断题' || item.questionType == '表格判断题'" class="judgeOptionsDiv">
                      <div>
                        <span class="judgeOptionSpan">参考答案：</span>
                        <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                      </div>
                    </div>
                    <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"> </div>
                    <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                      <div>
                        <div>
                          <div class="pConnectOptionDiv" v-for="(pConnectionItem, index) in item.questionAnswerList" :key="pConnectionItem.des">
                            <span v-html="pConnectionItem.value"></span>
                            <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                      <div>
                        <div>
                          <div class="lRecognitionOptionDiv" v-for="(lRecognitionItem, index) in item.questionAnswerList" :key="lRecognitionItem.des">
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
          </el-card>
          <el-card v-show="fictitiousList.length > 0">
            <div>
              <div class="group1TitleDiv sign">
                <div class="group1TitleDiv1">
                  <span style="font-size: 20px">虚拟交互题 {{ data.fictitiousTotalscore }} 分</span>
                </div>
              </div>
              <div v-for="(item, index) in fictitiousList" :key="item.questionId" class="quesWholeDiv">
                <div class="sign">
                  <span class="quesTitleSpan">
                    {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                    <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput" />
                    分，共 {{ item.questionSumscore }} 分
                  </span>
                </div>
                <div>
                  <div v-if="!(item.questionType == '表格判断题')" class="sign">
                    <span class="quesNameSpan" v-html="item.questionName"></span>
                  </div>
                  <div v-if="item.questionType == '表格判断题'" class="sign">
                    <span class="TableJudgeSpan">点检部位：{{ item.questionName.checkLocation }}</span
                    ><br />
                    <span class="TableJudgeSpan">点检项目：{{ item.questionName.checkProject }}</span
                    ><br />
                    <span class="TableJudgeSpan">点检要求及标准：{{ item.questionName.checkRequest }}</span
                    ><br />
                    <span class="TableJudgeSpan">点检方法：{{ item.questionName.checkMethod }}</span>
                  </div>
                  <div class="optionAnswerDiv sign">
                    <div
                      v-show="item.questionType == '文字单选题' || item.questionType == '图片单选题' || item.questionType == '视频题'"
                      class="singleOptionsDiv"
                    >
                      <span class="singleOptionSpan"> 选项：</span>
                      <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist" :key="singleItem.options">
                        <el-checkbox
                          :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                          class="singleOptionCheck"
                          disabled
                        ></el-checkbox>
                        <span v-html="singleItem"></span>
                        <!-- {{ `${index + 1}.${singleItem}` }} -->
                      </div>
                    </div>
                    <div v-show="item.questionType == '文字多选题' || item.questionType == '图片多选题'" class="multipleOptionsDiv">
                      <div>
                        <span class="multipleOptionSpan"> 选项：</span>
                        <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist" :key="multiplItem.options">
                          <el-checkbox
                            :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                            class="multipleOptionCheck"
                            disabled
                          ></el-checkbox>
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
                    <div v-show="item.questionType == '判断题' || item.questionType == '表格判断题'" class="judgeOptionsDiv">
                      <div>
                        <span class="judgeOptionSpan">参考答案：</span>
                        <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                      </div>
                    </div>
                    <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"> </div>
                    <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                      <div>
                        <div>
                          <div class="pConnectOptionDiv" v-for="(pConnectionItem, index) in item.questionAnswerList" :key="pConnectionItem.des">
                            <span v-html="pConnectionItem.value"></span>
                            <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                      <div>
                        <div>
                          <div class="lRecognitionOptionDiv" v-for="(lRecognitionItem, index) in item.questionAnswerList" :key="lRecognitionItem.des">
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
          </el-card>
          <el-card v-show="practicalList.length > 0">
            <div>
              <div class="group1TitleDiv sign">
                <div class="group1TitleDiv1">
                  <span style="font-size: 20px">实际操作题 {{ data.practicalTotalscore }} 分</span>
                </div>
              </div>
              <div v-for="(item, index) in practicalList" :key="item.questionId" class="quesWholeDiv">
                <div class="sign">
                  <span class="quesTitleSpan">
                    {{ index + 1 }}.【 {{ item.questionType }} 】 每小题
                    <el-input v-model="item.questionScore" placeholder="分数" class="quesTitleScoreInput" />
                    分，共 {{ item.questionSumscore }} 分
                  </span>
                </div>
                <div>
                  <div class="sign">
                    <span class="quesNameSpan" v-html="item.questionName"></span>
                  </div>
                  <div class="optionAnswerDiv sign">
                    <div
                      v-show="item.questionType == '文字单选题' || item.questionType == '图片单选题' || item.questionType == '视频题'"
                      class="singleOptionsDiv"
                    >
                      <span class="singleOptionSpan"> 选项：</span>
                      <div class="singleOptionDiv" v-for="(singleItem, index) in item.questionChoselist" :key="singleItem.options">
                        <el-checkbox
                          :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                          class="singleOptionCheck"
                          disabled
                        ></el-checkbox>
                        <span v-html="singleItem"></span>
                        <!-- {{ `${index + 1}.${singleItem}` }} -->
                      </div>
                    </div>
                    <div v-show="item.questionType == '文字多选题' || item.questionType == '图片多选题'" class="multipleOptionsDiv">
                      <div>
                        <span class="multipleOptionSpan"> 选项：</span>
                        <div class="multipleOptionDiv" v-for="(multiplItem, index) in item.questionChoselist" :key="multiplItem.options">
                          <el-checkbox
                            :checked="item.questionAnswer.indexOf(String.fromCharCode(index + 65)) !== -1"
                            class="multipleOptionCheck"
                            disabled
                          ></el-checkbox>
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
                    <div v-show="item.questionType == '判断题' || item.questionType == '表格判断题'" class="judgeOptionsDiv">
                      <div>
                        <span class="judgeOptionSpan">参考答案：</span>
                        <span class="judgeAnswerSpan" v-html="item.questionAnswer"></span>
                      </div>
                    </div>
                    <div v-show="item.questionType == '图片交互题'" class="picConOptionsDiv"> </div>
                    <div v-show="item.questionType == '图片连线题'" class="pConnectionsDiv">
                      <div>
                        <div>
                          <div class="pConnectOptionDiv" v-for="(pConnectionItem, index) in item.questionAnswerList" :key="pConnectionItem.des">
                            <span v-html="pConnectionItem.value"></span>
                            <span style="padding-left: 100px" v-html="pConnectionItem.des"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-show="item.questionType == '连线识别题'" class="lRecognitionDiv">
                      <div>
                        <div>
                          <div class="lRecognitionOptionDiv" v-for="(lRecognitionItem, index) in item.questionAnswerList" :key="lRecognitionItem.des">
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
          </el-card>
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
// import { getPdf } from "@/utils/htmlToPdf2";
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
let quesInfo = reactive([])

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

let report = ref(null);


// 编辑试卷获取题目信息
function getExaminaInfo() {
  paperName.value = "测试";
  paperDuration.value = "测试";
  paperCourse.value = "电气单元";
  paperGenerating.value = "一键组卷";

  data.dataSource = [
    {
        "questionGenre": "认知识别题",
        "questionId": "1684806290515111937",
        "questionKnowpoint": "实物认知",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>01</p>$<p>02</p>$<p>03</p>$<p>04</p>$<p>05</p>$<p>06</p>$<p>07</p>$<p>08</p>$<p>09</p>$<p>10</p>$<p>11</p>",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "1",
        "data5": "0",
        "data4": "0",
        "data3": "0",
        "data2": "0",
        "data1": "21001",
        "questionScore": "",
        "questionName": "<p>请在电气单元的认知板上找到【微型断路器】部件，在下面选项中点击对应的编号</p>",
        "courseName": "电气单元",
        "questionAnswer": "A",
        "data10": "1",
        "questionSumscore": "5",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字单选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "量器具使用题",
        "questionId": "1684813619344125953",
        "questionKnowpoint": "实物测量",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "2",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>请使用红外测温枪测量【变频电机】机壳温度并将其值输入到对应的输入框中</p>\n<p>测量值：_____℃</p>",
        "courseName": "电气单元",
        "questionAnswer": "35",
        "data10": null,
        "questionSumscore": "5",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "填空题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（判断）",
        "questionId": "1684813662331547649",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "3",
        "data5": "0",
        "data4": "0",
        "data3": "0",
        "data2": "0",
        "data1": "23002",
        "questionScore": "",
        "questionName": "<p>发电、共电、用电要时刻保持平衡,发电量随着供电量的瞬时的增减而 增减</p>",
        "courseName": "电气单元",
        "questionAnswer": "错",
        "data10": "1",
        "questionSumscore": "1",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（判断）",
        "questionId": "1684814177203335169",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "3",
        "data5": "0",
        "data4": "0",
        "data3": "0",
        "data2": "0",
        "data1": "23007",
        "questionScore": "",
        "questionName": "<p>在绝缘监视装置中,运行人员根据三相电压表的读数,可以判断故障相 是那一相</p>",
        "courseName": "电气单元",
        "questionAnswer": "对",
        "data10": "1",
        "questionSumscore": "1",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "实际操作题",
        "questionId": "1684814322154287106",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>风门阀开极限故障</p>$<p>风门阀关极限故障</p>$<p>风机电源故障</p>$<p>风机设备故障</p>",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "7",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>请启动风机控制系统中的【风机】，若无法启动请指出设备故障原因</p>",
        "courseName": "电气单元",
        "questionAnswer": "A",
        "data10": null,
        "questionSumscore": "20",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字单选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（判断）",
        "questionId": "1684814331339812865",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "3",
        "data5": "0",
        "data4": "0",
        "data3": "0",
        "data2": "0",
        "data1": "23009",
        "questionScore": "",
        "questionName": "<p>输配电线路的额定电压与受电设备的额定电压规定得相同</p>",
        "courseName": "电气单元",
        "questionAnswer": "对",
        "data10": "1",
        "questionSumscore": "1",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（判断）",
        "questionId": "1684814623443726338",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "3",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>中性点不接地系统发生单相接地时三相设备的正常工作关系并未受到 影响,不必进行处理</p>",
        "courseName": "电气单元",
        "questionAnswer": "错",
        "data10": null,
        "questionSumscore": "1",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（判断）",
        "questionId": "1684814818940235777",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "3",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>高压断路器应有防止高压连续多次分合间的跳跃闭键措施</p>",
        "courseName": "电气单元",
        "questionAnswer": "对",
        "data10": null,
        "questionSumscore": "1",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（判断）",
        "questionId": "1684815587894571009",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "3",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>变压器的输出功率为0时效率为0,随着输的功率增加效率一直上升</p>",
        "courseName": "电气单元",
        "questionAnswer": "错",
        "data10": null,
        "questionSumscore": "1",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（判断）",
        "questionId": "1684815913422893057",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "3",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>电压互感器一次侧有一端必需接地</p>",
        "courseName": "电气单元",
        "questionAnswer": "错",
        "data10": null,
        "questionSumscore": "1",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（判断）",
        "questionId": "1684815961934213122",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "3",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>通过断路器的极限电流峰值应大于短路瞬间最大冲击电流</p>",
        "courseName": "电气单元",
        "questionAnswer": "对",
        "data10": null,
        "questionSumscore": "1",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（判断）",
        "questionId": "1684816497903349761",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "3",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>三相短路电流的最大值出现在短路0.1秒的时间</p>",
        "courseName": "电气单元",
        "questionAnswer": "错",
        "data10": null,
        "questionSumscore": "1",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（判断）",
        "questionId": "1684816652576698369",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "3",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>两相电流差式接线,使用于中性点接地的变压器、电动机和线路的相间 保护</p>",
        "courseName": "电气单元",
        "questionAnswer": "错",
        "data10": null,
        "questionSumscore": "1",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（多项选择）",
        "questionId": "1684818424061964289",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>.使电力设备的容量得到充分利用</p>$<p>.降低电能在传输中过程中的功率损耗</p>$<p>.使线路上电压降△(增大</p>$<p>.提高供、用电的可靠性</p>",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "5",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>在电力系统中提高功率因数的意义有()。</p>",
        "courseName": "电气单元",
        "questionAnswer": "ABD",
        "data10": null,
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字多选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（多项选择）",
        "questionId": "1684819440635424770",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>.操作过电压</p>$<p>.切合空长线路</p>$<p>.弧光接地过电压&nbsp;</p>$<p>.工频过电压</p>$<p>谐振过电压</p>",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "5",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>内部过电压分为( )</p>",
        "courseName": "电气单元",
        "questionAnswer": "ADE",
        "data10": null,
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字多选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（多项选择）",
        "questionId": "1684820888618217474",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>.可靠性</p>$<p>.灵活性</p>$<p>.操作方便</p>$<p>.经济性</p>$<p>.有扩建可能性</p>",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "5",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>工厂变配电所对电气主接线要求是()</p>",
        "courseName": "电气单元",
        "questionAnswer": "ABCDE",
        "data10": null,
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字多选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（多项选择）",
        "questionId": "1684824928978677761",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>.确定电压比</p>$<p>.判断铁质量</p>$<p>.测量励磁电流</p>$<p>.确定线圈有无匝间短路故障</p>$<p>测量空载换耗</p>",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "5",
        "data5": "0",
        "data4": "0",
        "data3": "0",
        "data2": "0",
        "data1": "23057",
        "questionScore": "",
        "questionName": "<p>变压器空载试验目的是()</p>",
        "courseName": "电气单元",
        "questionAnswer": "ABCE",
        "data10": "1",
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字多选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（单项选择）",
        "questionId": "1684824979591344130",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>.过补偿&nbsp;</p>$<p>.欠补偿&nbsp;</p>$<p>.全补偿&nbsp;</p>$<p>.任意</p>",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "4",
        "data5": "0",
        "data4": "0",
        "data3": "0",
        "data2": "0",
        "data1": "23058",
        "questionScore": "",
        "questionName": "<p>中性点经消弧线圈接地运行方式一般采用( &nbsp;)方式。</p>",
        "courseName": "电气单元",
        "questionAnswer": "A",
        "data10": "1",
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字单选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（单项选择）",
        "questionId": "1684825888673181698",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>.1.5&nbsp;</p>$<p>.0.5&nbsp;</p>$<p>0.1</p>$<p>0.2</p>",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "4",
        "data5": "0",
        "data4": "0",
        "data3": "0",
        "data2": "0",
        "data1": "23059",
        "questionScore": "",
        "questionName": "<p>过电流保护装置为了保证装置具有足够的反应故障能力,其最小灵敏度要求KSmin =( )。</p>",
        "courseName": "电气单元",
        "questionAnswer": "A",
        "data10": "1",
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字单选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（单项选择）",
        "questionId": "1684828087138594817",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>3</p>$<p>2</p>$<p>&radic;3&nbsp;</p>$<p>I</p>",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "4",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>中性点不接地系统相接地事故、接地极对地电压为零,非接地极对地电压升高( ) 倍。</p>",
        "courseName": "电气单元",
        "questionAnswer": "C",
        "data10": null,
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字单选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（单项选择）",
        "questionId": "1684828166901673985",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>&nbsp;设备多少&nbsp;</p>$<p>电压高低&nbsp;</p>$<p>企业规模&nbsp;</p>$<p>负荷大小和距离远近</p>",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "4",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>如果本地区有两种以上可供选择的电源电压,选择供电电压的原则是( )</p>",
        "courseName": "电气单元",
        "questionAnswer": "D",
        "data10": null,
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字单选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（单项选择）",
        "questionId": "1684828347655204866",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>三相&nbsp;</p>$<p>二相&nbsp;</p>$<p>单相&nbsp;</p>$<p>两极接地</p>",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "4",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>对称短路是电力系统中( )短路。</p>",
        "courseName": "电气单元",
        "questionAnswer": "A",
        "data10": null,
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字单选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（单项选择）",
        "questionId": "1684828633543159810",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>一般采用开环运行&nbsp;</p>$<p>&nbsp;一般采用闭环运行</p>$<p>适用于三级负荷</p>",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "4",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>环形接线( )</p>",
        "courseName": "电气单元",
        "questionAnswer": "A",
        "data10": null,
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字单选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（单项选择）",
        "questionId": "1684828652283310082",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>电力系统有确定的电压&nbsp;</p>$<p>所有电器有一个额定电压&nbsp;</p>$<p>额定电压随意确定&nbsp;</p>$<p>&nbsp;应该经过充分论证,由国家主管部门确定</p>",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "4",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>确定额定电压的意义( )</p>",
        "courseName": "电气单元",
        "questionAnswer": "D",
        "data10": null,
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字单选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（单项选择）",
        "questionId": "1684828788229091330",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>三角形排列&nbsp;</p>$<p>&nbsp;水平排列&nbsp;</p>$<p>&nbsp;双层排列</p>",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "4",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>三相四线制低压线路的导线多采用( )</p>",
        "courseName": "电气单元",
        "questionAnswer": "B",
        "data10": null,
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字单选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（单项选择）",
        "questionId": "1684830566706262017",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>二次额定负载下的电压</p>$<p>一次有额定电流时的电压</p>$<p>一次有额定电压,二次有额定负载时的电压</p>$<p>一次有额定电压,二次空载时电压</p>",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "4",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>变压器二次额定电压是( &nbsp;)</p>",
        "courseName": "电气单元",
        "questionAnswer": "D",
        "data10": null,
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字单选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（单项选择）",
        "questionId": "1684830755802263553",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>开断正常运行的最大负荷电流</p>$<p>开断最大短路电流</p>$<p>在规定条件下能开断的最大短路电流有效值</p>$<p>额定电流的峰值</p>",
        "courseId": "1",
        "data9": null,
        "data8": null,
        "eventId": "",
        "data7": null,
        "data6": null,
        "questionGenreId": "4",
        "data5": null,
        "data4": null,
        "data3": null,
        "data2": null,
        "data1": null,
        "questionScore": "",
        "questionName": "<p>高压断路器的额定开断电流是指断路器( &nbsp;)</p>",
        "courseName": "电气单元",
        "questionAnswer": "C",
        "data10": null,
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字单选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "量器具使用题",
        "questionId": "1724772032960720897",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "2",
        "data5": "2",
        "data4": "2",
        "data3": "266",
        "data2": "259",
        "data1": "22002",
        "questionScore": "",
        "questionName": "<p>请使用万用表在直流电流测点1上测量【<span style=\"color: #e03e2d;\">直流电源</span>】电流值并将其值输入到对应的输入框中 测量值： &nbsp; &nbsp; A</p>",
        "courseName": "电气单元",
        "questionAnswer": "24VDC",
        "data10": "1",
        "questionSumscore": "5",
        "isReturnAnswer": 1,
        "questionDiff": "初级",
        "questionType": "填空题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "客观题（多项选择）",
        "questionId": "1724774778052997121",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p>.油面高低&nbsp;</p>$<p>.上层油面温度&nbsp;</p>$<p>.外売接地是否良好&nbsp;</p>$<p>.检查套管是否清洁</p>$<p>.声音是否正常F.冷却装置运行情况</p>",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "5",
        "data5": "0",
        "data4": "0",
        "data3": "0",
        "data2": "0",
        "data1": "23104",
        "questionScore": "",
        "questionName": "<p>4.<span style=\"color: #e03e2d;\">变在器在运行时,外部检查的项目检查</span>有()</p>",
        "courseName": "电气单元",
        "questionAnswer": "ABCDE",
        "data10": "1",
        "questionSumscore": "2",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "文字多选题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "虚拟交互题",
        "questionId": "1724775998046007297",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "6",
        "data5": "0",
        "data4": "0",
        "data3": "0",
        "data2": "0",
        "data1": "24006",
        "questionScore": "",
        "questionName": "{\"checkLocation\":\"风机控制系统\",\"checkProject\":\"交流接触器\",\"checkRequest\":\"接线端子外观完好\",\"checkMethod\":\"目视\"}",
        "courseName": "电气单元",
        "questionAnswer": "正常",
        "data10": "1",
        "questionSumscore": "4",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "表格判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "虚拟交互题",
        "questionId": "1724776463647305730",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "6",
        "data5": "0",
        "data4": "0",
        "data3": "0",
        "data2": "0",
        "data1": "24007",
        "questionScore": "",
        "questionName": "{\"checkLocation\":\"风机控制系统\",\"checkProject\":\"24V电源\",\"checkRequest\":\"电源指示灯显示正常，供电电压正常\",\"checkMethod\":\"目视、检测\"}",
        "courseName": "电气单元",
        "questionAnswer": "正常",
        "data10": "1",
        "questionSumscore": "4",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "表格判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "虚拟交互题",
        "questionId": "1724776977990610945",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "6",
        "data5": "0",
        "data4": "0",
        "data3": "0",
        "data2": "0",
        "data1": "24010",
        "questionScore": "",
        "questionName": "{\"checkLocation\":\"风机控制系统\",\"checkProject\":\"变频电机\",\"checkRequest\":\"电机外观完好无破损\",\"checkMethod\":\"目视\"}",
        "courseName": "电气单元",
        "questionAnswer": "正常",
        "data10": "1",
        "questionSumscore": "4",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "表格判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "虚拟交互题",
        "questionId": "1724777120647278594",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "6",
        "data5": "0",
        "data4": "0",
        "data3": "0",
        "data2": "0",
        "data1": "24011",
        "questionScore": "",
        "questionName": "{\"checkLocation\":\"风机控制系统\",\"checkProject\":\"变频器\",\"checkRequest\":\"屏幕正常显示，无故障代码\",\"checkMethod\":\"目视\"}",
        "courseName": "电气单元",
        "questionAnswer": "正常",
        "data10": "1",
        "questionSumscore": "4",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "表格判断题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "认知识别题",
        "questionId": "1742031053427724289",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "<p><img id=\"bigImg\" src=\"http://101.42.247.53:8080/jeecg-boot/sys/common/static/jeditor/批注2023-12-28162416_1704167508395.png\" /></p>$<p><img id=\"bigImg\" src=\"http://101.42.247.53:8080/jeecg-boot/sys/common/static/jeditor/批注2023-12-28162416_1704167519153.png\" /></p>$<p><img id=\"bigImg\" src=\"http://101.42.247.53:8080/jeecg-boot/sys/common/static/jeditor/批注2023-12-28162416_1704167529290.png\" /></p>$<p><img id=\"bigImg\" src=\"http://101.42.247.53:8080/jeecg-boot/sys/common/static/jeditor/批注2023-12-28162416_1704167534620.png\" /></p>",
        "courseId": "1",
        "data9": "111",
        "data8": "111",
        "eventId": "",
        "data7": "111",
        "data6": "111",
        "questionGenreId": "1",
        "data5": "111",
        "data4": "111",
        "data3": "111",
        "data2": "111",
        "data1": "111",
        "questionScore": "",
        "questionName": "<p>图片连线</p>",
        "courseName": "电气单元",
        "questionAnswer": "1图片$2图片$3图片$4图片",
        "data10": "111",
        "questionSumscore": "",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "图片连线题",
        "questionAnalysis": ""
    },
    {
        "questionGenre": "虚拟交互题",
        "questionId": "1742044591298859009",
        "questionKnowpoint": "",
        "memo": "",
        "deleteFlag": 0,
        "questionChoselist": "",
        "courseId": "1",
        "data9": "0",
        "data8": "0",
        "eventId": "",
        "data7": "0",
        "data6": "0",
        "questionGenreId": "6",
        "data5": "0",
        "data4": "1",
        "data3": "1",
        "data2": "1",
        "data1": "12",
        "questionScore": "",
        "questionName": "<p><img id=\"bigImg\" src=\"http://101.42.247.53:8080/jeecg-boot/sys/common/static/jeditor/fbd8bb86001db706bb1392f3c23776e_1704171054129.png\" width=\"296\" height=\"287\" /></p>",
        "courseName": "电气单元",
        "questionAnswer": "",
        "data10": "1",
        "questionSumscore": "",
        "isReturnAnswer": 0,
        "questionDiff": "初级",
        "questionType": "图片交互题",
        "questionAnalysis": ""
    }
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


let zancunH = [];
function isSplit(nodes, index, pageHeight) {
  if (nodes[index].offsetTop + nodes[index].scrollHeight < pageHeight && nodes[index + 1] && nodes[index + 1].offsetTop + nodes[index + 1].scrollHeight > pageHeight) {
        return true;
    } else {
        return false;
    }

}

function outPutPdfFn() {
  document.body.scrollTop = 0;
  document.body.scrollLeft = 0;
  // 获取滚动条的位置并赋值为 0，因为是 el-dialog 弹框，并且内容较多出现了纵向的滚动条，截图出来的效果只能截取到视图窗口显示的部分，超出窗口部分则无法生成。所以先将滚动条置顶
  const A4_WIDTH = 592.28;
  const A4_HEIGHT = 841.89;
  let imageWrapper = document.getElementById('demo');

  let pageHeight = (imageWrapper.scrollWidth / A4_WIDTH) * A4_HEIGHT;
  let lableListID = imageWrapper.querySelectorAll('.sign');
  console.log('lableListID11', lableListID[10].offsetTop );
  console.log('pageHeight', pageHeight );
  console.log('offsetHeight',  imageWrapper.offsetHeight );
  console.log('scrollHeight',  imageWrapper.scrollHeight );
  // 进行分割操作，当 dom 内容已超出 A4 的高度，则将该 dom 前插入一个空 dom，把它挤下去，分割
  console.log('lableListID33', lableListID[33].offsetTop );
  console.log('lableListID33', lableListID[33].scrollHeight );
  console.log('lableListID34', lableListID[34].offsetTop );
  console.log('lableListID34', lableListID[34].scrollHeight );
  console.log('--------------',lableListID[34].offsetTop + lableListID[34].scrollHeight );
  console.log('lableListID35', lableListID[35].offsetTop );
  console.log('lableListID35', lableListID[35].scrollHeight );
  console.log('lableListID68', lableListID[68].offsetTop );
  console.log('lableListID68', lableListID[68].scrollHeight );
  console.log('lableListID69', lableListID[69].offsetTop );
  console.log('lableListID69', lableListID[69].scrollHeight );
  console.log('--------------',lableListID[69].offsetTop + lableListID[69].scrollHeight );
  console.log('lableListID70', lableListID[70].offsetTop );
  console.log('lableListID70', lableListID[70].scrollHeight );
  console.log('lableListID88', lableListID[88].offsetTop );
  console.log('lableListID88', lableListID[88].scrollHeight );
  console.log('lableListID89', lableListID[89].offsetTop );
  console.log('lableListID89', lableListID[89].scrollHeight );
  console.log('--------------',lableListID[89].offsetTop + lableListID[89].scrollHeight );
  console.log('lableListID90', lableListID[90].offsetTop );
  console.log('lableListID90', lableListID[90].scrollHeight );
  zancunH[0] = 0;
  for (let i = 0; i < lableListID.length; i++) {


    let multiple = Math.ceil((lableListID[i].offsetTop + lableListID[i].scrollHeight) / pageHeight);
    console.log(`multiple`, multiple);

    // console.log(`此时multiple的值${multiple}`);
    if (isSplit(lableListID, i, multiple * pageHeight)) {
      console.log(`父节点${i}，`, lableListID[i].parentNode);
      console.log(`multiple`, multiple * pageHeight);
      console.log(`lableListID[i]`, lableListID[i].offsetTop + lableListID[i].scrollHeight);
      console.log(`[i]高度差`, multiple * pageHeight- lableListID[i].offsetTop - lableListID[i].scrollHeight);
      console.log(`lableListID[i+1]`, lableListID[i + 1].offsetTop + lableListID[i + 1].scrollHeight);
      console.log(`[i+1]高度差`, lableListID[i + 1].offsetTop + lableListID[i + 1].scrollHeight - multiple * pageHeight);
      console.log(`[i]  [i+1]高度差`, lableListID[i + 1].offsetTop + lableListID[i + 1].scrollHeight - lableListID[i].offsetTop - lableListID[i].scrollHeight);
      let divParent = lableListID[i].parentNode; // 获取该 div 的父节点
      let newNode = document.createElement('div');
      newNode.className = 'emptyDiv';
      newNode.style.background = '#ffffff';
      let _H = multiple * pageHeight - (lableListID[i].offsetTop + lableListID[i].scrollHeight);
      console.log('留白高度', _H);
      zancunH[multiple] = _H;
      // console.log('留白高度', _H);
      // 留白
      let zancunH1 = 0;
      // for (let i = 0; i < zancunH.length - 1; i++) {
      //   zancunH1 = zancunH1 + zancunH[i];
      // }
      zancunH1 = _H
      console.log('zancunH', zancunH);

      newNode.style.height =  zancunH1 + 'px';
      console.log('最终留白高度newNode', newNode.style.height);

      newNode.style.width = '100%';
      let next = lableListID[i].nextSibling; // 获取 div 的下一个兄弟节点
      // 判断兄弟节点是否存在
      if (next) {
        // 存在则将新节点插入到 div 的下一个兄弟节点之前，即 div 之后
        divParent.insertBefore(newNode, next);
      } else {
        // 不存在则直接添加到最后,appendChild 默认添加到 divParent 的最后
        divParent.appendChild(newNode);
      }
    }
  }
  // 接下来开始截图
  html2Canvas(imageWrapper, {
    allowTaint: true,
    x: imageWrapper.getBoundingClientRect().left + 13, // 绘制的 dom 元素相对于视口的位置
    y: imageWrapper.getBoundingClientRect().top,
    width: imageWrapper.offsetWidth - 15, // 因为多出的需要剪裁掉，
    height: imageWrapper.offsetHeight,
    backgroundColor: '#FFF', // 一定要设置背景颜色，否则有的浏览器就会变花~，比如 Edge
    useCORS: true,
    scale: 3, // 图片模糊
    dpi: 350, // z
  })
    .then((canvas) => {
      let pdf = new JsPDF('p', 'mm', 'a4'); // A4 纸，纵向
      let ctx = canvas.getContext('2d'),
        a4w = 190,
        a4h = 270, // A4 大小，210mm x 297mm，四边各保留 10mm 的边距，显示区域 190x277
        imgHeight = Math.floor((a4h * canvas.width) / a4w), // 按 A4显示比例换算一页图像的像素高度
        renderedHeight = 0;

      while (renderedHeight < canvas.height) {
        let page = document.createElement('canvas');
        page.width = canvas.width;
        page.height = Math.min(imgHeight, canvas.height - renderedHeight); // 可能内容不足一页
        // 用 getImageData 剪裁指定区域，并画到前面创建的 canvas 对象中
        page
          .getContext('2d')
          .putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);
        pdf.addImage(page.toDataURL('image/jpeg', 0.2), 'JPEG', 10, 10, a4w, Math.min(a4h, (a4w * page.height) / page.width)); // 添加图像到页面，保留 10mm 边距
        renderedHeight += imgHeight;
        if (renderedHeight < canvas.height) pdf.addPage(); // 如果后面还有内容，添加一个空页
      }
      pdf.save('paperDownName');
    })
    .then(() => {
      ElMessage({
        message: '文件下载成功',
        type: 'success',
      });
    })
    .catch((error) => {
      // 保存失败
      console.error('PDF 文件保存失败:', error);
      ElMessage.error('文件下载失败');
    });
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
