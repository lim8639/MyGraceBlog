<template>
  <loading v-if="isLoading"></loading>
  <div class="contont-box">
    <navbar/>
      <ul>
      <li v-for="(item,index) in list" :key="index"><router-link :to="'/preview/'+item.id">
        <div class="post_item">
          <img :src="item.cover" alt="">
          <div class="post_content">
            <h2 class="title">{{item.title}}</h2><small>{{item.tags}}</small>
            <p class="p1">{{abstractFn(item.content)}}
            </p >
<!--            <p class="p2"><span>{{item.createtime.substr(0,10)}}</span><span>浏览量{{item.pageviews}}</span></p>-->
          </div>
        </div>
      </router-link>
      </li>
    </ul>
    <footerbar/>
  </div>

</template>
<script setup>
import {onMounted, ref} from "vue";
import {getAllArtilceApi} from "./../../requests/index";
import navbar from "../../components/navbar.vue";
import footerbar from "../../components/footerbar.vue";
import loading from "../../components/loading.vue";
import {createWebHashHistory} from "vue-router";
const list = ref([])
const isLoading = ref(true)
const getPostLsit = async ()=>{
  try {
    const {data} = await getAllArtilceApi()
    list.value = data
    console.log("数据",data);
  } catch (err) {

  } finally {
    isLoading.value = false
  }
}

const content = ref(null)
const changeApp = ()=>{
  console.log(content.value)
  content.value.setAttribute('src',"http://yy-zhaoshang.jd.com/merchantsClue")
}
onMounted(getPostLsit)
const abstractFn = (res)=>{
    if(!res){
      return '';
    }else{
      var str=res
          .replace(/(\*\*|__)(.*?)(\*\*|__)/g,'')          //全局匹配内粗体
          .replace(/!\[[\s\S]*?]\([\s\S]*?\)/g,'')                  //全局匹配图片
          .replace(/\[[\s\S]*?]\([\s\S]*?\)/g,'')                    //全局匹配连接
          .replace(/<\/?.+?\/?>/g,'')                                 //全局匹配内html标签
          .replace(/(\*)(.*?)(\*)/g,'')                               //全局匹配内联代码块
          .replace(/`{1,2}[^`](.*?)`{1,2}/g,'')                       //全局匹配内联代码块
          .replace(/```([\s\S]*?)```[\s]*/g,'')                       //全局匹配代码块
          .replace(/~~(.*?)~~/g,'')                               //全局匹配删除线
          .replace(/[\s]*[-*+]+(.*)/g,'')                           //全局匹配无序列表
          .replace(/[\s]*[0-9]+\.(.*)/g,'')                           //全局匹配有序列表
          .replace(/(#+)(.*)/g,'')                                    //全局匹配标题
          .replace(/(>+)(.*)/g,'')                                    //全局匹配摘要
          .replace(/\r\n/g,"")                                        //全局匹配换行
          .replace(/\n/g,"")                                          //全局匹配换行
          .replace(/\s/g,"")                                          //全局匹配空字符;
      return str.slice(0,68);
  }
  }

</script>

<style scoped>
#app2{
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: hidden;
}
ul{
  background-color: #fff;
}
.contont-box{
  max-width: 1200px;
  margin: auto;
}
li{
  list-style: none;
  padding: 20px 20px 10px;
}
.title{
  color: #151414;
  overflow: hidden;
  font-size: 20px;
  max-height: 30px;
  line-height: 30px;
  font-family: "黑体","sans-serif";
  font-weight: 900;
}
.post_item{
  overflow: hidden;
  display: flex;
  display: -webkit-flex;
  box-shadow: rgb(16 16 16 / 34%) 3px 3px 5px;
  height: 140px;
  background-color: #ffffff;
  flex-flow: row nowrap;
}
.post_content{
  padding: 10px 20px;
  max-width: 65%;
  order: 2;
}
.post_item img{
  min-width: 35%;
  width: 35%;
  object-fit: cover;
  height: 120%;
}
.p1{
  height: 46px;
  line-height: 23px;
  font-size: 16px;
  color: #464646;
  overflow: hidden;
  font-family: "Microsoft YaHei",system-ui;
}
.p2{
  margin-top: 10px;
  color: #545454;
  font-size: 14px;
}
.p2 span{
  margin-right: 20px;
}
a{
  color: #1a1a1a;
  text-decoration: none;
}
</style>