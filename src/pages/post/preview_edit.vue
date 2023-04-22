<template>
  <Navbar/>
  <div class="page-content">
    <md-editor
        v-model="state.text"
        :editorId="state.id"
        @on-get-catalog="onGetCatalog"
        :code-theme="state.codeTheme"
        :preview-theme="state.previewTheme"
        previewOnly="previewOnly"
        :marked-heading-id="markedHeadingId"
        :showCodeRowNumber="true"
        :format-copied-text="formatCopiedText"
    />
  </div>
  <div class="catalog">
    <md-catalog
        :editorId="state.id"
        :scroll-element="scrollElement"
        :theme="state.theme"
        :marked-heading-id="markedHeadingId"
    />
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {getPost} from "../../requests/index.js";
import {useRouter} from "vue-router";
import Navbar from "../../components/navbar.vue";

const state = reactive({
  text: '标题',
  id: 'my-editor',
  catalogList: [],
  theme: 'light',
  previewTheme: 'vuepress',
  codeTheme: 'a11y',
});
const onGetCatalog = (list) => {
  state.catalogList = list;
};
const MdCatalog = MdEditor.MdCatalog;
const scrollElement = document.documentElement;
const getMarkdown = async ()=>{
  try {
    const {data} = await getPost(useRouter().currentRoute.value.params.id)
    console.log(data)
    state.text = data.content
    console.log(data);
  } catch (err) {

  } finally {

  }
}
onMounted(getMarkdown)

const markedHeadingId = (_text, _level, index) => {
  return `heading-${index}`;
};
const formatCopiedText = (text) => {
  return `${text}  - @author：沫沫的时光机\n@email:@limfly0124@qq.com`;
};
MdEditor.config({
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
  }
});
</script>
<style>
.catalog{
  width: 200px;
  min-height: 600px;
  position: fixed;
  top: 0;
  left: 0;
}
.page-content{
  background-color: #ffffff;
  padding: 20px;
}
</style>