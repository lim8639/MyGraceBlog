<template>
<div>
  <v-md-editor
      v-model="content"
      mode="edit"
      :default-show-toc="false"
      placeholder="这里输入正文"
      @save="savePost"
      :disabled-menus="[]"
      @blur="savePost"
      @upload-image="handleUploadImage"
      :include-level="[1,2,3]"
      height="600px"/>
</div>
</template>

<script setup>
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import Prism from 'prismjs';
VMdEditor.use(vuepressTheme, {
  Prism
});

</script>

<style scoped>

</style>