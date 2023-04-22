<template>
<div class="container">
  <a-page-header
      :style="{ background: '#fafafa',marginBottom:'20px'}"
      title="沫沫的时光机"
      subtitle="常用工具1.0 by @julien"
  >
  </a-page-header>
  <a-card  >
    <template #title>
      <h3>常用工具</h3>
    </template>
    <a-select @change="textOnChange" v-model="changeData.type"  default-value="1" id="selectUtils" :style="{width:'320px'}" default-active-first-option placeholder="Please select ...">
      <a-option value="1">列表转Excel</a-option>
      <a-option value="2">子典转Excel</a-option>
      <a-option value="3">导出工作台菜单信息</a-option>
      <a-option value="4">词云</a-option>
      <a-option value="5">fetchToJson</a-option>
    </a-select>
    <div  v-if="changeData.type == '1'">
      <a-textarea    v-model="changeData.data" placeholder="请输入形如 [{},{}]格式的文本" :auto-size="{
    minRows:4,
    maxRows:7
  }" style="margin-top: 20px"   :error="error" allow-clear/>
      <a-alert  closable>
        <template #title>
          温馨提示
        </template>
        <ul>
          <li>该工具可以将josn列表转化为excel文件并输出。</li>
          <li>请输入形如 [{},{}]格式的文本</li>
          <li>一次只能生成一个文件</li>
        </ul>
      </a-alert>
    </div>
    <div  v-if="changeData.type == '2'">
     开发中
    </div>
    <div  v-if="changeData.type == '4'">
      开发中
    </div>
    <div  v-if="changeData.type == '3'">
      开发中
    </div>
    <div  v-if="changeData.type == '5'">
      <a-textarea    v-model="changeData.data" placeholder="请输入形如 [{},{}]格式的文本" :auto-size="{
           minRows:4,
          maxRows:7
      }" style="margin-top: 20px"   :error="error" allow-clear/>
    </div>
    <a-button   @click="clickToTransfer" type="primary" >点击执行</a-button>
  </a-card>
  <a-card  >
    <template #title>
      <h3>执行结果</h3>
    </template>
    <div  v-if="changeData.type == '1'">
      <a-table :columns="columns" :data="table_data" />
      <a-list empty="暂无信息">
        <a-list-item  v-for="item in resultUtils" >
          {{item.title}}
          <template #actions>
            <a-link :href="`${BaseUrl}/utils/download/${item.title}`" status="success">下载</a-link>
          </template>
        </a-list-item  >
      </a-list>
    </div>
    <div  v-if="changeData.type == '5'">
      <p v-clipboard:copy="resultUtils" v-clipboard:success="onSuccess">{{ resultUtils }}</p>
    </div>
  </a-card>
</div>
</template>

<script setup>
import { ref} from "vue";
import { UploadUtils} from '../../requests/index'
import { Modal } from '@arco-design/web-vue';
const error  = ref(false)
const BaseUrl = import.meta.env.VITE_BASE_URL
import {VueClipboard} from "@soerenmartius/vue3-clipboard"
const changeData  = ref({
  type:"1",
  data:"",
})
const resultUtils = ref([

])
// [{"hello":"hello","nice":"nice"},{"hello":"hello","nice":"nice"}]
const columns = ref();
const table_data = ref();
const clickToTransfer = ()=>{

  let data =  JSON.parse( changeData.value.data)
  console.log(Object.keys(data[0]))
  let tmp_col = []
  for( let item in data[0]) {
    console.log(item)
    let item2 = {
      title: item,
      dataIndex: item,
    }
    tmp_col.push(item2)
  }
  table_data.value = data
  columns.value  = tmp_col
  fetchData()
}
const onSuccess = ()=>{
  alert("复制成功")
}
const textOnChange = ()=>{
  resultUtils.value = []
}
const fetchData = async () => {
  if (changeData.value.type == "1"){
    if (changeData.value.data.substr(0,1) != '['){
      Modal.error({
        title: '错误提示',
        content: '请输入格式为[{xxx:xxx},{xxx:xxx}]的数据'
      });
      return false
    }else {
      try {
        const { data } = await UploadUtils(changeData.value);
        resultUtils.value.push({
          "title":data.title,
          "downloadLink":data.title,
        })
        console.log(data);
      } catch (err) {

      } finally {

      }
    }
  } else if (changeData.value.type == "2"){
    if (changeData.value.data.substr(0,1) != '{'){
      Modal.error({
        title: '错误提示',
        content: '开发中，未上线'
      });
      return false
    }
  } else if (changeData.value.type == "3"){
    if (changeData.value.data.substr(0,1) != '{'){
      Modal.error({
        title: '错误提示',
        content: '开发中，未上线'
      });
      return false
    }
  } else if (changeData.value.type == "4"){
    if (changeData.value.data.substr(0,1) != '{'){
      Modal.error({
        title: '错误提示',
        content: '开发中，未上线'
      });
      return false
    }
  }else if (changeData.value.type == "5"){
    if (changeData.value.data.substr(0,1) == ''){
      Modal.error({
        title: '错误提示',
        content: '输入为空'
      });
      return false
    }else{
      let basic  = changeData.value.data
      basic = basic.substr(0, basic.length - 1);
      resultUtils.value =  basic + `.then(function (res) {return res.json()}).then(function (res) {console.log(res)})`
    }
  }
}


</script>

<style scoped>
.container{
  max-width: 1200px;
  margin: auto;
}
</style>