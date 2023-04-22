<template>
  <div class="container2">

<div><h1><input type="text" v-model="state.title"></h1></div>
  <md-editor
      v-model="state.content"

      :language="state.language"
      :toolbars="toolbars"
      show-code-row-number
      preview-theme="vuepress"
      auto-detect-code
      class="md—editor"
      ref="editorRef"
      @on-save="onchangePost"
      @on-upload-img="onUploadImg"
      :footers="['markdownTotal', '=', 0, 'scrollSwitch']"
      :preview-theme="state.previewTheme">
    <template #defToolbars>
      <EmojiExtension :on-insert="insert"></EmojiExtension>
      <MarkExtension :on-insert="insert"></MarkExtension>
    </template>
  </md-editor>  </div>
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {onMounted, reactive, ref} from "vue";
import EmojiExtension from '../../components-edit/EmojiExtension/index.vue';
import MarkExtension from '../../components-edit/MarkExtension/index.vue';
import ReadExtension from '../../components-edit/ReadExtension/index.vue';
import TimeNow from '../../components-edit/TimeNow/index.vue';
import  {toolbars} from './static.js'
import './index.less'
import { Message } from '@arco-design/web-vue';
import { savePost } from '../../requests/index.js';
import {checkUserStatus} from '../../components/login.js';
import 'md-editor-v3/lib/style.css';
const NormalToolbar = MdEditor.NormalToolbar;


const handler = () => {
  console.log('NormalToolbar clicked!');
};
const state = reactive({
  content: '# 标题',
  id: 'my-editor',
  catalogList: [],
  theme: 'light',
  previewTheme: 'vuepress',
  codeTheme: 'a11y',
  cover: 'zh-CN',
  private: 'zh-CN',
  language: 'zh-CN',
  postid:0
});
const Router = useRouter()
const getMarkdown = async ()=>{
  try {
    const {data} = await getPost(Router.currentRoute.value.params.id)
    state.content = data.content
    state.title = data.title
    state.cover = data.cover
    state.postid = data.postid
    state.private = data.private
  } catch (err) {

  } finally {

  }
}


onMounted(()=>{
  getMarkdown()
})
const onchangePost = ()=>{
  saveMarkdown()
}

const saveMarkdown = async ()=>{
  try {
    const {data} = await savePost(state)
    Message.info(data.msg)
  } catch (err) {

  } finally {

  }
}
const  editorRef = ref()
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('file', file);

          axios
              .post('/api/img/upload', form, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then((res) => rev(res))
              .catch((error) => rej(error));
        });
      })
  );

  callback(res.map((item) => item.data.url));
};

const insert = (generator) => {
  editorRef.value?.insert(generator);
};
import MarkExtension2 from './makedutils.ts';
import {getPost} from "../../requests/index.js";
import {useRouter} from "vue-router";
MdEditor.config({
  markedExtensions: [MarkExtension2],
  markedRenderer(renderer) {
    renderer.heading = (text, level, _r, _s, _index, headingId) => {
      return `<h${level} id="${headingId}">${text}</h${level}>`;
    };

    renderer.link = (href, title, text) => {
      return `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`;
    };

    return renderer;
  },
  editorConfig:{
    renderDelay: 0
  },
  editorExtensions: {
    highlight: {
      css: {
        atom: {
          light:
              'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css',
          dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css'
        }
      }
    }
  }
});

</script>
<style lang="less">
.md-editor{
  height: 800px;
  background-color: #fff;
}

@import 'src/pages/post/var';

#md-editor-v3 {
  padding: 2rem;

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
</style>