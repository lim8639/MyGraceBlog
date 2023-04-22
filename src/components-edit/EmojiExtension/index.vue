<template>
  <dropdown-toolbar title="emoji" :visible="state.visible" @on-change="onChange">
    <template #overlay>
      <div class="emoji-container">
        <ol class="emojis">
          <li
            v-for="(emoji, index) of emojis"
            :key="`emoji-${index}`"
            @click="emojiHandler(emoji)"
            v-text="emoji"
          ></li>
        </ol>
      </div>
    </template>
    <template #trigger>
      <svg t="1678721055697" aria-hidden="true" class="md-editor-icon icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3144" width="200" height="200"><path d="M512.5 863.7c-47.5 0-93.6-9.3-137-27.7-41.9-17.7-79.5-43.1-111.9-75.4-32.3-32.3-57.7-69.9-75.4-111.9-18.4-43.4-27.7-89.5-27.7-137s9.3-93.6 27.7-137c17.7-41.9 43.1-79.5 75.4-111.9 32.3-32.3 69.9-57.7 111.9-75.4 43.4-18.4 89.5-27.7 137-27.7s93.6 9.3 137 27.7c41.9 17.7 79.5 43.1 111.9 75.4 32.3 32.3 57.7 69.9 75.4 111.9 18.4 43.4 27.7 89.5 27.7 137s-9.3 93.6-27.7 137c-17.7 41.9-43.1 79.5-75.4 111.9s-69.9 57.7-111.9 75.4c-43.4 18.4-89.5 27.7-137 27.7z m0-639.8c-158.8 0-287.9 129.2-287.9 287.9 0 158.8 129.2 287.9 287.9 287.9 158.8 0 287.9-129.2 287.9-287.9 0.1-158.8-129.1-287.9-287.9-287.9z" fill="#000002" p-id="3145"></path><path d="M372.2 419.7m-50.9 0a50.9 50.9 0 1 0 101.8 0 50.9 50.9 0 1 0-101.8 0Z" fill="#000002" p-id="3146"></path><path d="M652.9 419.7m-50.9 0a50.9 50.9 0 1 0 101.8 0 50.9 50.9 0 1 0-101.8 0Z" fill="#000002" p-id="3147"></path><path d="M584.8 551.4c0 41.5-33.8 75.8-75.3 75-40.1-0.8-72.3-33.5-72.3-73.8l-0.3-5.4c-0.5-8.3 6.2-15.4 14.5-15.4h118.8c8 0 14.6 6.5 14.6 14.6v5z" fill="#000002" p-id="3148"></path></svg>
    </template>
  </dropdown-toolbar>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import type { PropType } from 'vue';
import type { InsertContentGenerator } from 'md-editor-v3';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const DropdownToolbar = MdEditor.DropdownToolbar;
import { emojis } from './data';

const props = defineProps({
  onInsert: {
    type: Function as PropType<(generator: InsertContentGenerator) => void>,
    default: () => () => null
  }
});

const state = reactive({
  visible: false
});

const emojiHandler = (emoji: string) => {
  const generator: InsertContentGenerator = () => {
    return {
      targetValue: emoji,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    };
  };

  props.onInsert(generator);
};

const onChange = (visible: boolean) => {
  state.visible = visible;
};
</script>

<script lang="ts">
export default {
  name: 'EmojiExtension'
};
</script>
<style>
#md-editor-v3 .emoji-container {
  border-radius: 3px;
  border: 1px solid #e6e6e6;
}
#md-editor-v3 .emojis {
  position: relative!important;
  width: 363px!important;
  margin: 10px!important;
  padding: 0!important;
  background-color: #fff!important;
}

#md-editor-v3 .emojis li {
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
}
</style>