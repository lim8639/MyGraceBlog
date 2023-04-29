<template>
  <div>
    <a-split :style="{
        height: '100vh',
        width: '100%',
        minWidth: '500px',
        border: '1px solid var(--color-border)'
      }"
             v-model:size="size"
             min="80px"
    >
      <template #first>
       1
      </template>
      <template #second>
        2
      </template>
    </a-split>
  </div>
</template>
<script>
import {ref} from "vue";
const size = ref(0.3)
</script>
<!--<template>-->
<!--  <div class="container2">-->
<!--    <div><h1><input type="text" v-model="article.title"></h1></div>-->
<!--    <md-editor-->
<!--        v-model="article.content"-->

<!--        :language="state.language"-->
<!--        :toolbars="toolbars"-->
<!--        preview-theme="vuepress"-->
<!--        auto-detect-code-->
<!--        show-code-row-number-->
<!--        class="md—editor"-->
<!--        ref="editorRef"-->
<!--        @on-save="onchangePost"-->
<!--        @on-upload-img="onUploadImg"-->
<!--        :footers="['markdownTotal', '=', 0, 'scrollSwitch']"-->
<!--        :preview-theme="state.previewTheme">-->
<!--      <template #defToolbars>-->
<!--        <EmojiExtension :on-insert="insert"></EmojiExtension>-->
<!--        <MarkExtension :on-insert="insert"></MarkExtension>-->
<!--      </template>-->
<!--    </md-editor>  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import MdEditor from 'md-editor-v3';-->

<!--import {onMounted, reactive, ref} from "vue";-->
<!--import EmojiExtension from '../../components-edit/EmojiExtension/index.vue';-->
<!--import MarkExtension from '../../components-edit/MarkExtension/index.vue';-->
<!--import ReadExtension from '../../components-edit/ReadExtension/index.vue';-->
<!--import TimeNow from '../../components-edit/TimeNow/index.vue';-->
<!--import  {toolbars} from './static.js'-->
<!--import { Message } from '@arco-design/web-vue';-->
<!--import { savePost } from '../../requests/index.js';-->
<!--const NormalToolbar = MdEditor.NormalToolbar;-->
<!--const handler = () => {-->
<!--  console.log('NormalToolbar clicked!');-->
<!--};-->
<!--const state = reactive({-->
<!--  content: '# 标题',-->
<!--  id: 'my-editor',-->
<!--  catalogList: [],-->
<!--  theme: 'light',-->
<!--  previewTheme: 'vuepress',-->
<!--  codeTheme: 'a11y',-->
<!--  cover: 'zh-CN',-->
<!--  permission: 'zh-CN',-->
<!--  language: 'zh-CN',-->
<!--  postid:0-->
<!--});-->

<!--const article = ref({-->
<!--  content: '# 标题',-->
<!--  id: '',-->
<!--  cover: '',-->
<!--  permission: 'zh-CN',-->
<!--  title: 'zh-CN'-->
<!--})-->
<!--const Router = useRouter()-->
<!--const getMarkdown = async ()=>{-->
<!--  try {-->
<!--    const {data} = await getPost(Router.currentRoute.value.params.id)-->
<!--    article.value = data-->
<!--  } catch (err) {-->

<!--  } finally {-->

<!--  }-->
<!--}-->


<!--onMounted(()=>{-->
<!--  getMarkdown()-->
<!--})-->
<!--const onchangePost = ()=>{-->
<!--  saveMarkdown()-->
<!--}-->

<!--const saveMarkdown = async ()=>{-->
<!--  try {-->

<!--    const {data} = await savePost(article.value)-->
<!--    Message.info(data.msg)-->
<!--  } catch (err) {-->

<!--  } finally {-->

<!--  }-->
<!--}-->
<!--const  editorRef = ref()-->
<!--const onUploadImg = async (files, callback) => {-->
<!--  const res = await Promise.all(-->
<!--      files.map((file) => {-->
<!--        return new Promise((rev, rej) => {-->
<!--          const form = new FormData();-->
<!--          form.append('file', file);-->

<!--          axios-->
<!--              .post('/api/img/upload', form, {-->
<!--                headers: {-->
<!--                  'Content-Type': 'multipart/form-data'-->
<!--                }-->
<!--              })-->
<!--              .then((res) => rev(res))-->
<!--              .catch((error) => rej(error));-->
<!--        });-->
<!--      })-->
<!--  );-->

<!--  callback(res.map((item) => item.data.url));-->
<!--};-->

<!--const insert = (generator) => {-->
<!--  editorRef.value?.insert(generator);-->
<!--};-->
<!--import MarkExtension2 from './makedutils.ts';-->
<!--import {getPost} from "../../requests/index.js";-->
<!--import {useRouter} from "vue-router";-->
<!--MdEditor.config({-->
<!--  markedExtensions: [MarkExtension2],-->
<!--  markedRenderer(renderer) {-->
<!--    renderer.heading = (text, level, _r, _s, _index, headingId) => {-->
<!--      return `<h${level} id="${headingId}">${text}</h${level}>`;-->
<!--    };-->

<!--    renderer.link = (href, title, text) => {-->
<!--      return `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`;-->
<!--    };-->

<!--    return renderer;-->
<!--  },-->
<!--  editorConfig:{-->
<!--    renderDelay: 0-->
<!--  },-->

<!--});-->

<!--</script>-->
