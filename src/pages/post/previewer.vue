<template>
  <transition name="fade">
    <loading v-if="load"></loading>
  </transition>
  <div class="content">

<!--    <a-card  :bordered="false">-->

<!--      <v-md-preview   :text="previewData.content" ref="preview"/>-->
<!--    </a-card>-->
    <a-card :style="{ maxWidth: '1200px', margin: 'auto' }"  :bordered="false">
      <template #title>

        <h1>{{previewData.title}}</h1>
      </template>
      <template #extra>
        <a-link href="">edit</a-link>
      </template>
      <a-image
          width="100%"
          :src="previewData.cover"
      />
      <v-md-preview   :text="previewData.content" ref="preview"/>
    </a-card>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {getPost, UploadUtils} from "./../../requests/index";
import loading from "./../../components/loading.vue";

const VUE_APP_BASEURL = import.meta.env.VITE_APP_BASEURL



import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
// Prism
import Prism from 'prismjs';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import {onMounted, ref} from "vue";
// VMdPreview.use(createEmojiPlugin());
// VMdPreview.use(createCopyCodePlugin());
// VMdPreview.use(createLineNumbertPlugin());
// VMdPreview.use(createTodoListPlugin());
// VMdPreview.use(createEmojiPlugin());
VMdPreview.use(vuepressTheme, {
  Prism,
});
const previewData = ref({
  title:"# hello",
  content:"# hello",
  dateTime:"# hello",
  cover:"# hello",
})
const load = ref(true)
const hello = ref("# hello")


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
onMounted(getMarkdown)

</script>
<style scoped>
.content{
  width: 100%;
  background-color: #f4f5f6;
}
</style>