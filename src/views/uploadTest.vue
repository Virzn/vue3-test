<template>
  <el-button @click="tanchaung">按钮</el-button>
  <el-dialog v-model="tcxianshi" width="60%">
    <el-form :model="formState" ref="ruleFormRef1" :rules="rules">
      <el-form-item label="文件:" label-width="100px" prop="laplTime">
        <div class="fileFormItem">
          <ul class="fileListUl">
            <li class="fileListLi" v-for="item in fileList" :key="item.url">
              <div class="fileNameDiv" @click="handlePreview(item)">
                <img src="../assets/icon/file.svg" style="width: 1em; height: 1em;">
                {{ item.name }}
              </div>
              <div class="fileDesDiv">
                <span class="fileDesSpan">文件描述:</span>
                <el-input
                  class="input11"
                  v-model="item.descript"
                ></el-input>
              </div>
              <div class="deleteIcon" @click="deleteFile(item)">
                删除
              </div>
            </li>
          </ul>
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            :limit="3"
            :on-exceed="handleExceed"
            :show-file-list="false"
          >
            <el-button type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">
                <!-- jpg/png files with a size less than 500KB. -->
              </div>
            </template>
          </el-upload>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script  setup>
import { ref, toRefs, reactive, toRaw } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

let data = reactive({
  formState: {
  },
});

const ruleFormRef1 = ref();

let tcxianshi = ref(false);

function tanchaung() {
  tcxianshi.value = true;
}

const fileList = ref([
  {
    name: "element-plus-logo.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
    descript: "",
  },
  {
    name: "element-plus-logo2.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
    descript: "",
  },
]);

const rules = reactive({
  planName: [{ required: true, message: "请输入计划名", trigger: "blur" }],
});

function deleteFile(val){
  console.log('当前删除文件', val);
  console.log('当前存在文件', fileList.value);
  var length = fileList.value.length;
    for (var i = 0; i < length; i++) {
        if (fileList.value[i].uid == val.uid) {
            if (i == 0) {
                fileList.value.shift(); //删除并返回数组的第一个元素
                return fileList.value;
            }
            else if (i == length - 1) {
                fileList.value.pop();  //删除并返回数组的最后一个元素
                return fileList.value;
            }
            else {
                fileList.value.splice(i, 1); //删除下标为i的元素
                return fileList.value;
            }
        }
    }
    console.log('当前存在文件', fileList.value);
};

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles);
  console.log("handleRemove  fileList已有文件", fileList.value);
};

const handlePreview = (uploadFile) => {
  console.log(uploadFile);
  console.log("handlePreview  fileList已有文件", fileList.value);
};

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `确认删除 ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};

const handleSuccess = (file, uploadFiles) => {
  console.log("上传成功 ", file, uploadFiles);
  console.log("handleSuccess  fileList已有文件", fileList.value);
  // Object.assign(fileList.value[fileList.value.length], {descript:''})
  ElMessage({
    message: '上传成功',
    type: 'success',
  })
  fileList.value[fileList.value.length - 1].descript = "";
};



let {formState } = toRefs(data);
</script>

<style lang="less" scoped>

.fileFormItem{
  width: 100%;
}
.fileListUl {
  padding: 0;
  width: 100%;
  .fileListLi {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    .fileNameDiv {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }

    
    .fileDesDiv{
      display: flex;
      margin-left: 100px;
      .fileDesSpan{
        display: block;
        width: 100px;
        overflow: hidden;
        white-space: nowrap;
      }

      .input11{
        height: min-content;
        padding-left: 0;
      }
    }

    .deleteIcon{
      position: relative;
      font-size: 15px;
      color: cornflowerblue;
      padding-left: 100px;
      // right: 0;
    }
  }

  .fileListLi:hover{
    background-color: rgb(245,247,250)
    
  }

}
</style>