<template>
<div  class="content-box">
  <header>
    <button style="border: 0;background-color:#fff;" @click="handleCLickFullScreen" ><icon-expand /></button>
  </header>
  <slot>
    <div class="hello" ref="box">
      <div class="time">
        {{DateTime}}
      </div>
      <div class="DateShow">
        {{DateShow}} <span class="weekshow">{{WeekShow}}</span>
      </div>

      <div class="content">
        <div class="content-right">
          <h2>Todolist
          </h2>
          <ol class="todolist">
            <li v-for="(item,index) in TodoListData" :key="index">
              <!--              <icon-compass :style="{fontSize:'32px'}" />-->
              <div class="ItemContent">
                {{index+1}}、<input type="text"   v-model="item.content" :disabled="item.status">
              </div>
              <div class="actionIcon">
                <span  class="noShowIcon check-circle">
                  <icon-delete  @click="todolist_delItem(index)"  :style="{fontSize:'32px'}"    />
                  <icon-check-circle @click="todolist_updateItem(index)" :style="{fontSize:'32px'}" stroke-linejoin="arcs" />
                </span>
                <span  class="showIcon check-circle">
                  <icon-sync v-if="!item.status" :style="{fontSize:'32px'}" spin/>
                  <icon-check-circle v-if="item.status"  @click="todolist_updateItem(index)" :style="{fontSize:'32px',color:'#42b883'}" stroke-linejoin="arcs" />
                </span>
              </div>


            </li>
            <li style="list-style: none"><input autofocus v-if="!isFullScreen" @keyup.enter="todolist_addItem()" class="InputItem" v-model="TodoListItem.content"  placeholder="....." /></li>
          </ol>

        </div>
        <div @click="reflashQuotes" class="content-left">
          <h2>Tender Moments</h2>
          <div class="quotes">
            {{niceQuetos.hitokoto}}
          </div>
          <div class="creator">作者：  {{niceQuetos.creator}}</div>
          <div class="from">来源：  {{niceQuetos.from}}</div>
        </div>

      </div>

      <div v-html="metingJs"></div>
    </div>
  </slot>
</div>
</template>

<script setup>
import { L2Dwidget } from 'live2d-widget'
import {onMounted, ref} from "vue";
let box  = ref(null)
let metingJs  = ref("  <meting-js\n" +
    "          server=\"netease\"\n" +
    "          type=\"playlist\"\n" +
    "          id=\"2068020430\"\n" +
    "          fixed=\"true\"\n" +
    "          volume=\"0.3\"\n" +
    "          theme=\"#B682FFFF\"\n" +
    "          autoplay=\"false\"\n" +
    "          order=\"random\"\n" +
    "      >\n" +
    "      </meting-js>")

let isFullScreen = ref(false);
const handleCLickFullScreen = () => {

  if (isFullScreen.value) {
    document.exitFullscreen()
  } else {
    document.body.requestFullscreen()
  }
  isFullScreen.value = !isFullScreen.value;
}
import { getCurrentInstance } from 'vue'
import {getPost} from "../../requests";
import {useRouter} from "vue-router";
const { appContext } = getCurrentInstance();


let DateTime = ref("12:00:00")
let DateShow = ref("2023年12月18日")
let WeekShow = ref("星期一")
let weekMap = {
  1:"星期一",
  2:"星期二",
  3:"星期三",
  4:"星期四",
  5:"星期五",
  6:"星期六",
  0:"星期日",
}
let TodoListItem = ref({
  id:"1",
  content:"",
  status:true
})
let TodoListData = ref([])
//修改todoList
const todolist_addItem =  () => {
  if(TodoListItem.value.content == ""){
    return false
  }
  TodoListItem.value.id = 0
  TodoListData.value.push( {
    id:"1",
    content:TodoListItem.value.content,
    status:false
  })
  TodoListItem.value.content = ""
  localStorage.setItem("TodoListData",JSON.stringify(TodoListData.value))
}
const todolist_delItem =  (index) => {
  let newArray = [];
  let array = TodoListData.value;
  let j = 0;
  for(let i = 0;i<array.length;i++){
    if (index != i){
      newArray[j] = array[i];
      j++;
    }
  }
  TodoListData.value = newArray;
  localStorage.setItem("TodoListData",JSON.stringify(TodoListData.value))
}
const todolist_updateItem =  (index,Item) => {
  TodoListData.value[index].status  = !TodoListData.value[index].status
}
setInterval(function () {
  let now = new Date()
  DateTime.value = now.format("hh:mm:ss");
  DateShow.value = now.format("yyyy年MM月dd日");
  WeekShow.value = weekMap[now.getDay()]
},1000)
let niceQuetos = ref({hitokoto:"#hello"})

const getMarkdown = async ()=>{
  try {
    const {data} = await getPost(useRouter().currentRoute.value.params.id)
    previewData.value = data

    console.log(data);
  } catch (err) {

  } finally {
    load.value = false
  }
}
import axios from "axios";
const reflashQuotes = ()=>{
  fetch('https://v1.hitokoto.cn/').then(function (res) {
    return res.json()

  }).then((data)=>{
    niceQuetos.value = data
    console.log(data)
  })
}



onMounted(()=>{

  reflashQuotes();
  let TodoList = JSON.parse(localStorage.getItem("TodoListData"))

  if (TodoList!=null){
    TodoListData.value = TodoList
  }

  L2Dwidget.init({
    "model": {
      //jsonpath控制显示模型，
      jsonPath: "https://cdn.jsdelivr.net/npm/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json",
      "scale": 1
    },
    "display": {
      "position": "right", //看板娘的表现位置
      "width": 150, //小萝莉的宽度
      "height": 300, //小萝莉的高度
      "hOffset": 0,
      "vOffset": -20,
      "superSample": 2
    },
    "mobile": {
      "show": true,
      "scale": 0.5,
      "hOffset": 0,
      "vOffset": 0,
    },
    "react": {
      "opacityDefault": 1.0,
      "opacityOnHover": 1.0,
    }
  });
})
Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S" : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}
</script>

<style scoped>
header{
  text-align: right;
}
.arco-list-bordered {
  border: 1px solid #42d392!important;
}
.content-box{
  width: 100%;
  height: 100%;
  background-color: #f3f4f5;
}
.weekshow{
  color: #476582;
  border-radius: 20px;
  margin-left: 20px;
  background-color:  #f1f1f1;
}
.DateShow{
  color: #42b883;
  /*background-color:  #42b883;*/
  text-align: center;
  font-size: 50px;
  font-weight: 700;
}
.hello{
  width: 100%;
  height: 300px;
  background-color: #fafafa;
}
.content{
  box-sizing: border-box;
  padding: 20px 100px;

}
.content >div{


  float: left;
}
.content >div>h2{
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
  margin: 10px 0;
  font-size: 30px;
  color: #213547;
}
.quotes{
  font-size: 30px;
  font-weight: 900;
  color: #476582;
  padding-bottom: 20px;
  line-height: 40px;
  font-family: 'Tahoma For Number', 'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
.arco-list-bordered {
  border: 0!important;
}
.creator{
  color: #3c3c3cb3;
  line-height: 20px;
  font-size: 18px;
}
.from{
  color: #3c3c3cb3;
  line-height: 20px;
  font-size: 18px;
}

.content-left{
  width: 40%;
  box-sizing: border-box;
  padding: 0 20px 20px;
}
.content-right{
  width: 60%;
  padding: 0 20px 20px;
  box-sizing: border-box;
}
.InputItem{
  font-size: 30px;
  font-weight: 700!important;
  box-sizing:content-box;
  caret-color: #ff9900;
  padding: 4px 0px;
  border: 0;

  outline: none;
}

input::-webkit-input-placeholder { /* WebKit browsers */ color: #707070; }
.time{
  /*margin-top: 30px;*/
  background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 100%;
  font-size: 150px;
  color: #30be0c;
  font-weight: 700;
  text-align: center;
}


.todolist{
  width: 100%;
  max-height: 200px;
  scroll-behavior: auto;
  margin: 0;
  padding: 0;
}

.todolist >li:hover{
  background-color: #42b883;
  color: #ffffff;
}

.todolist >li:hover input{
  color: #ffffff;
}
.todolist >li{
  width: 100%;
  line-height: 32px;
  height: 32px;
  padding: 10px 0;
  font-size:32px;
  list-style: none;
  color: #476582;
  position: relative;
}
.ItemContent{
  position: absolute;
  right: 64px;
  left: 0;
}
.actionIcon{
  position: absolute;
  right: 0px;
}
.noShowIcon{
  display: none;
}
.todolist >li:hover .noShowIcon{
  color: #ffffff;
  display: block;
}
.todolist >li:hover .showIcon{
  color: #ffffff;
  display: none;
}
.icon-delete{

  /*display: none;*/
}
.todolist >li input{
  width: 80%;
  display: inline-block;
  vertical-align:middle;
  border: none;
  margin-top: -10px;
  outline: none;
  /*font-size: 30px;*/
  height: 32px;
  line-height: 32px;
  color: #476582;
  background-color: transparent;
}
</style>