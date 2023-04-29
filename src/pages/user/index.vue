<template>
<div>hello</div>
<router-link to="/create">创建文章</router-link>
 当前待办数量
</template>

<script setup>
import Navbar from "../../components/navbar.vue";
import MdEditor from 'md-editor-v3';
import {onMounted, reactive, ref} from "vue";
import {getArticleByIdApi} from "../../requests/index.js";
import {useRouter} from "vue-router";
const MdCatalog = MdEditor.MdCatalog;
const scrollElement = document.querySelector('.preview-content');
const state = reactive({
  id: 'my-editor',
  catalogList: [],
  theme: 'light',
  previewTheme: 'vuepress',
  codeTheme: 'a11y',
});
const getMarkdown = async ()=>{
  try {
    const {data} = await getArticleByIdApi(1)
    console.log(data)
    myPost.value.content = data.content
  } catch (err) {

  } finally {

  }
}
const myPost = ref({
  title:"",
  content:"# hello# hello# hello# hello# hello# hello# hello",
})
onMounted(getMarkdown)

const isPreview = ref(true)
const changePreview = ()=>{
  isPreview.value = !isPreview.value
}
</script>
<style scoped>
</style>