<template>
  <div class="space">

    <div class="left">
      <div class="sidebar">

        <a-space style="width: 100%;" direction="vertical" size="large">
          <a-list size="large">
            <template #header>
              <router-link to="/index"> <a-button type="text" >
                <template #icon>
                  <icon-left-circle />
                </template>
                返回首页
              </a-button>
             </router-link>
              <a-button type="primary" @click="addArticle">
                <template #icon>
                  <icon-plus />
                </template>
                添加新的文章
              </a-button>
            </template>
            <a-list-item    @click="selectPost(index)"  v-for="(item,index) in list">
              {{item.title}}
              <template #actions>

                <icon-edit  @click="changePreview"/>
                <icon-delete  @click="removeArticle"/>
              </template>

            </a-list-item>
          </a-list>
        </a-space>
        <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
          <template #title>
            删除提示
          </template>
          <div> 请问您是否确认删除该文章</div>
        </a-modal>
      </div>
    </div>
    <div v-if="!isPreview" class="content">
      <div  class="content_title">
        <h1 contenteditable="true"><input type="text" placeholder="请输入文章标题" v-model="myPost.title"></h1>
      </div>
      <md-editor
          v-model="myPost.content"
          :editorId="state.id"
          @on-get-catalog="onGetCatalog"
          :code-theme="state.codeTheme"
          class="md—editor"
          @on-save="onchangePost"
          :toolbars="toolbars"
          ref="editorRef"
          auto-detect-code
          show-code-row-number
          @on-upload-img="onUploadImg"
          :preview-theme="state.previewTheme"
          :marked-heading-id="markedHeadingId"
          :showCodeRowNumber="true"
          :format-copied-text="formatCopiedText"
          :footers="['markdownTotal', '=', 0, 'scrollSwitch']"
      >
        <template #defToolbars>
        <EmojiExtension :on-insert="insert"></EmojiExtension>
        <MarkExtension :on-insert="insert"></MarkExtension>
        </template>
      </md-editor>
    </div>
    <div v-if="isPreview" class="content">
      <div  class="content_title">
        <h1 >{{myPost.title}}</h1>
      </div>
      <div class="preview-content">
        <md-editor
            v-model="myPost.content"
            :editorId="state.id"
            @on-get-catalog="onGetCatalog"
            :code-theme="state.codeTheme"
            class="my-md-preview"
            :preview-theme="state.previewTheme"
            :marked-heading-id="markedHeadingId"
            :showCodeRowNumber="true"
            :format-copied-text="formatCopiedText"
            :previewOnly="true"
        />
        <md-catalog
            :editorId="state.id"
            :scroll-element="scrollElement"
            :theme="state.theme"
            :marked-heading-id="markedHeadingId"
            class="preview-catalog"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import 'md-editor-v3/lib/style.css';
import {onMounted, reactive, ref} from "vue";
import {
  createArticle,
  deleteArticleApi,
  getAllArtilceApi,
  updateArticleApi,
  uploadImage
} from "../../requests/index.js";
import MdEditor from 'md-editor-v3';
import {useRouter} from "vue-router";
import {checkUserStatus} from "../../components/login.js";
import {Message} from "@arco-design/web-vue";
import MarkExtension2 from "./makedutils.ts";
import EmojiExtension from '../../components-edit/EmojiExtension/index.vue';
import MarkExtension from '../../components-edit/MarkExtension/index.vue';
import  {toolbars} from './static.js'
import './index.less'
import 'md-editor-v3/lib/style.css';
const NormalToolbar = MdEditor.NormalToolbar;

const router = useRouter()
const isPreview = ref(true)
const changePreview = ()=>{

  const token = localStorage.getItem('token')
  if (token == null){
    localStorage.setItem('path','/space')
    router.push('/login')
  }else{
    isPreview.value = !isPreview.value
  }
}
const state = reactive({
  id: 'my-editor',
  catalogList: [],
  theme: 'light',
  previewTheme: 'vuepress',
  codeTheme: 'a11y',
});

const myPost = ref({
  content:"",
  cover:"",
  create_time:"",
  id:"",
  last_update_time:"",
  nickName:"",
  permission:"",
  title:"",
  user_id:""
})
onMounted(()=>{
  getPostLsit()
})
const onchangePost = ()=>{
  saveMarkdown()
}
const addArticle = async ()=>{
  try {
    const {data} = await createArticle ()
    Message.info(data.message)
    let artilce = {
      content:"",
      cover:"",
      create_time:"",
      id:data.id,
      last_update_time:"",
      nickName:"",
      permission:false,
      title:"",
      user_id:data.user_id
    }
    list.value.push(artilce)
    selectPost(list.value.length-1)
    isPreview.value = false
  } catch (err) {
    Message.error("添加失败")
  }
}

const saveMarkdown = async ()=>{
  try {
    const {data} = await updateArticleApi(myPost.value)
    Message.info(data.message)
  } catch (err) {

  }
}

const visible = ref(false);

const handleOk = async () => {
  visible.value = false;
  try {
    const {data} = await deleteArticleApi(myPost.value.id)
    Message.info(data.message)
    let newArray = []
    for(let i =0;i<list.value.length;i++){
      if(list.value[i].id !== myPost.value.id){
        newArray.push(list.value[i])
      }
    }
    list.value = newArray
  } catch (err) {
    Message.info(data.message)
  }
};
const handleCancel = () => {
  visible.value = false;
}
const removeArticle = ()=>{
  visible.value = true;
}

// 上传图片
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('image', file);
          uploadImage(form).then((res) => rev(res))
              .catch((error) => rej(error));
        });
      })
  );
  callback(res.map((item) => item.data.url));
};





const list = ref([])
const getPostLsit = async ()=>{
  try {
    console.log("数据");
    const {data} = await getAllArtilceApi()
    list.value = data
    myPost.value  = data[0]
    console.log("数据",data);
  } catch (err) {

  } finally {

  }
}
const selectPost = (index)=>{
  myPost.value = list.value[index]
}

// 查阅模式
const onGetCatalog = (list) => {
  state.catalogList = list;
};
const MdCatalog = MdEditor.MdCatalog;
const scrollElement = document.querySelector('preview');
const markedHeadingId = (_text, _level, index) => {
  return `heading-${index}`;
};
const  editorRef = ref()
const insert = (generator) => {
  editorRef.value?.insert(generator);
};

MdEditor.config({
  markedExtensions: [MarkExtension2],
  markedRenderer(renderer) {
    // 这里的'headingId'是通过你提供的'markedHeadingId'方法生成的。
    renderer.heading = (text, level, _raw, _slugger, _index, headingId) => {
      // 这种方式通常用与处理使用配置了 'renderer.heading'，同时又设置的具体编辑器的'markedHeadingId'属性带来的优先级问题。

      // 你不能直接调用默认的 'markedHeadingId'，但是它很简单（(text) => text）。
      // 如果你需要重新定义标题的ID，请一定记得将你的生成方法通过markedHeadingId告诉编辑器和目录组件 MdCatalog（如果你有使用）。
      // 否则编辑器默认的目录定位功能无法正确使用。

      return `<h${level} id="${headingId}">${text}</h${level}>`;
    };
    return renderer;
  },
  editorConfig:{
    renderDelay: 0
  },
});
const formatCopiedText = (text) => {
  return `${text}  - @author：沫沫的时光机\n@email:@limfly0124@qq.com`;
};
// 编辑模式
</script>
<style lang="less">
.space{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: -webkit-flex; /* Safari */
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:flex-start;
  align-items:stretch;
}
.left{
  flex-basis: 300px;
  overflow-y: auto;
}
.sidebar{
  width: 100%;

}
.sidebar h2{
  text-align: center;
}
.sidebar >ul{
  padding: 20px;
  box-sizing: border-box;
}
.sidebar >ul>li{
  font-size: 16px;
  list-style: none;
  line-height: 30px;
  overflow: hidden;
  height: 30px;
  //padding-left: 10px;
  box-sizing: border-box;
  background-color: #d4c7c7;
  padding: 5px;
  margin-bottom:4px ;
}
.sidebar > ul>li button{
  float: right;
}
.sidebar >ul>li:hover{
  background-color: #42b883;
  color: #ffffff;
  font-weight: 700;
}
.content{

  flex-grow: 1;
  height: 100%;
  display: -webkit-flex;
  flex-flow: column nowrap;
  align-items:stretch;
}
#my-editor-preview{
  padding:30px;
  height: 100%;
}
#my-editor{
  height: 100%;
}
.content_title{
  order: 0;
  flex-basis: 50px;
  margin: 0;
  z-index: 999;
}
.content_title h1{
  align-items: center;
  line-height: 50px;
  padding-left: 20px;
  margin: 0;
  //box-shadow: 0 1px 40px -8px rgba(0,0,0,.5);
  z-index: 999;
  background-color: #fff;
}
.content_title input{
  width: 90%;
  outline: none;
  border: none;
}
.my-md-editor{
  flex-basis: 100px;
  flex-grow: 1;
  height: 100%;
}
.my-md-preview{

  flex-grow: 1;
  padding: 0 0 0 20px;
}
.preview-content{
  display: -webkit-flex; /* Safari */
  flex-direction: row;
  overflow-y: scroll;
}

.preview-catalog{
  flex-basis: 200px;
  flex-grow: 0;
  max-width: 200px;
}


@import 'src/pages/post/var';

#md-editor-v3 {
  .tips-text {
    color: #777;
  }

  .emoji-container {
    border-radius: 3px;
    border: 1px solid #e6e6e6;
  }

  .emojis {
    position: relative;
    width: 363px;
    margin: 10px;
    padding: 0;
    background-color: #fff;

    li {
      cursor: pointer;
      float: left;
      border: 1px solid #e8e8e8;
      height: 24px;
      width: 28px;
      overflow: hidden;
      margin: -1px 0 0 -1px;
      padding: 4px 2px;
      text-align: center;
      list-style: none;
      z-index: 11;

      &:hover {
        position: relative;
        border: 1px solid #63a35c;
        z-index: 12;
      }
    }

    &::after {
      content: '';
      clear: left;
      display: block;
    }

    * {
      user-select: none;
    }
  }
}

.theme-dark {
  .project-preview {
    .emoji-container {
      border-color: #2d2d2d;
    }

    .emojis {
      background-color: inherit;

      li {
        border-color: #2d2d2d;
        &:hover {
          border: 1px solid #497744;
        }
      }
    }
  }
}

@media (max-width: 320px) {
  /*0~320*/
  body {
    background: pink;
  }
}

@media (min-width: 200px) and (max-width: 768px) {
  /*426~768*/
  .left,.preview-catalog{
    display: none;
  }
}
@media (min-width: 769px) {
  /*769~+∞*/

}
</style>
<style>
.md-editor-catalog-link{
  font-size: 16px;
}
.md-editor-catalog-active>span {
  color: #42b883;
  font-weight: 700;
}
.md-editor-catalog-link >span:hover{
  color: #ffffff;
  font-weight: 700;
  background-color: #42b883;
}

</style>
