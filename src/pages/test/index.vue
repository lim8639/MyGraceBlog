<template>
  <div class="page">
    <a-space direction="vertical" fill>
      <a-form :model="currentProject">
        <a-row :gutter="24">
          <a-col :span="24">
            <a-typography-title :heading="2">
              我的待办
            </a-typography-title>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item field="start_time" label="开始" label-col-flex="30px">
              <a-input v-model="currentProject.projectName" placeholder="please enter..." />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="value4" label="结束" label-col-flex="30px">
              <a-date-picker
                  style="width: 100%;"
                  show-time
                  :time-picker-props="{ defaultValue: '09:09:06' }"
                  format="YYYY-MM-DD HH:mm:ss"
                  @change="onChange"
                  @select="onSelect"
                  @ok="onOk"
                  :model-value="currentProject.deadline"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">

            <a-button style="width: 220px" type="primary" @click="addNewProject">

                <template #icon>
              <icon-plus />
            </template>新建项目
            </a-button>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item field="start_time" label="开始" label-col-flex="30px">
              <a-input v-model="currentProject.projectName" placeholder="please enter..." />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="value4" label="结束" label-col-flex="30px">
              <a-date-picker
                  style="width: 100%;"
                  show-time
                  :time-picker-props="{ defaultValue: '09:09:06' }"
                  format="YYYY-MM-DD HH:mm:ss"
                  @change="onChange"
                  @select="onSelect"
                  @ok="onOk"
                  :model-value="currentProject.deadline"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-button  style="margin-right: 10px">点击搜索</a-button>
            <a-button  type="outline" style="margin-right: 10px">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
      <a-divider class="half-divider" />

    </a-space>
    <a-table  :data="Projects" >
      <template #columns>
        <a-table-column title="名称" data-index="projectName"></a-table-column>
        <a-table-column title="内容" data-index="content"></a-table-column>
        <a-table-column title="备注" data-index="desc"></a-table-column>
        <a-table-column title="开始" data-index="start_time"></a-table-column>
        <a-table-column title="结束" data-index="deadline"></a-table-column>
        <a-table-column title="状态" data-index="status"></a-table-column>
        <a-table-column title="操作">
          <template #cell="{ record }">
            <a-button type="text" @click="editProject(record)">管理</a-button>
            <a-button type="text" style="color: #c80000" @click="removeProject(record.id)">删除</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-drawer width="50%" :visible="visible" @ok="handleOk(currentProject)" @cancel="handleCancel" unmountOnClose>
      <template #title>
        编辑项目：{{currentProject.projectName}}
      </template>
      <div>
        <a-form :model="currentProject">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item field="projectName" label="名称" label-col-flex="30px">
                <a-input v-model="currentProject.projectName" placeholder="please enter..." />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item field="start_time" label="开始" label-col-flex="30px">
                <a-date-picker
                    style="width: 100%;"
                    show-time
                    :time-picker-props="{ defaultValue: '09:09:06' }"
                    format="YYYY-MM-DD HH:mm:ss"
                    @change="onChange"
                    @select="onSelect"
                    @ok="onOk"
                    :model-value="currentProject.start_time"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value4" label="结束" label-col-flex="30px">
                <a-date-picker
                    style="width: 100%;"
                    show-time
                    :time-picker-props="{ defaultValue: '09:09:06' }"
                    format="YYYY-MM-DD HH:mm:ss"
                    @change="onChange"
                    @select="onSelect"
                    @ok="onOk"
                    :model-value="currentProject.deadline"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item field="value4" label="描述" label-col-flex="30px">
                <a-textarea :auto-size="{
    minRows:5,
    maxRows:10
  }" v-model="currentProject.content" placeholder="please enter..." />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item field="value4" label="备注" label-col-flex="30px">
                <a-textarea v-model="currentProject.desc" placeholder="please enter..." />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <span>创建于{{currentProject.create_time}} 最后一次更新时间{{currentProject.last_update_time}}</span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-drawer>
  </div>

</template>
<script setup>

import {createProjectApi, deleteProjectsApi, getProjectsApi, updateProjectsApi} from "../../requests/project.js";

const visible = ref(false);

const editProject = (record) => {
  currentProject.value = record
  visible.value = true;
};
const handleOk = (record) => {
  updateProject(record)
  console.log(record.value)
  visible.value = false;
};
const updateProject = async (record)=>{
  const { data } = await  updateProjectsApi(record)
  console.log(data)
  Message.success(data.message)
}
const removeProject = async (id) => {
  let {data} = await deleteProjectsApi(id)
  let newArray = []
  for(let i=0;i<Projects.value.length;i++){
     if(Projects.value[i].id !== id){
       newArray.push(Projects.value[i])
     }
  }
  Projects.value = newArray
};
const handleCancel = () => {
  visible.value = false;
}

import {onMounted, reactive, ref} from "vue";
import {Message} from "@arco-design/web-vue";

const addNewProject = async () =>{
  const {data} = await createProjectApi()
  let project = {
    id:"",
    projectName:"",
    content:"",
    desc:"",
    status:"",
    create_time:"",
    start_time:"",
    deadline:"",
    last_update_time:"",
    nickName:"",
    user_id:"",
    child:""
  }
  project.id = data.id
  currentProject.value = project
  Projects.value.push(project)
  visible.value = !visible.value;
}
const getProjectList = async () =>{
  const {data} = await getProjectsApi()
  Projects.value = data
  console.log(data)


}

const Projects = ref([]);
onMounted(()=>{
  getProjectList(0,20)
})


const currentProject = ref({
  id:"",
  projectName:"",
  content:"",
  desc:"",
  status:"",
  create_time:"",
  start_time:"",
  deadline:"",
  last_update_time:"",
  nickName:"",
  user_id:"",
  child:""
})


</script>
<style>

.page{
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff!important;
}
</style>