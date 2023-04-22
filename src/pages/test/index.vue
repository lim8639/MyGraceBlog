<template>
<div>
  <h1>测试页面b</h1>
    <a-button type="primary" @click="getData">
      查看节点
    </a-button>
  <div>
    接口获取数据{{userData}}
  </div>
</div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getDataApi} from "../../requests/index.js";


onMounted(()=>{
  getData()
  console.log("启动")
})
const userData =  ref()
const getData   = async ()=>{
  console.log("执行")
  try {
    const {data} = await  getDataApi()
    userData.value =  data
    console.log(data)
  }catch (e){
    console.log(e)
  }finally {

  }
}

</script>

<style scoped>

</style>