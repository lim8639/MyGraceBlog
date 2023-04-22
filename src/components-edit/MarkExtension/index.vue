<template>
  <normal-toolbar title="mark" @on-click="markHandler">
    <template #trigger>
      <svg t="1678721941536" class="md-editor-icon" aria-hidden="true" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5372" width="200" height="200"><path d="M170.666667 810.666667h682.666666v85.333333H170.666667z" fill="#515151" p-id="5373" data-spm-anchor-id="a313x.7781069.0.i11" class="selected"></path><path d="M419.498667 168.704l360.832 131.328a42.666667 42.666667 0 0 1 25.472 54.698667l-58.368 160.341333a128 128 0 0 1-107.562667 83.626667l-23.338667 64a98.133333 98.133333 0 0 1-119.381333 60.714666l-6.4-2.090666-14.037333 38.528H340.522667l29.952-82.304a98.133333 98.133333 0 0 1-60.714667-119.381334l2.090667-6.4 23.253333-64a128 128 0 0 1-28.672-133.205333L364.8 194.176a42.666667 42.666667 0 0 1 54.698667-25.472z m-24.533334 354.304l-18.986666 52.096a29.866667 29.866667 0 0 0 14.122666 36.693333l3.712 1.621334 120.32 43.776a29.866667 29.866667 0 0 0 36.608-14.165334l1.664-3.712 18.901334-52.138666-176.341334-64.170667z m25.216-281.429333L370.56 377.898667a59.733333 59.733333 0 0 0 30.378667 74.368l5.333333 2.218666 200.448 72.96a59.733333 59.733333 0 0 0 74.368-30.378666l2.218667-5.333334 49.621333-136.32-312.746667-113.834666z" fill="#575C63" p-id="5374"></path></svg>
    </template>
  </normal-toolbar>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import type { InsertContentGenerator } from 'md-editor-v3';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const NormalToolbar = MdEditor.NormalToolbar;
const props = defineProps({
  onInsert: {
    type: Function as PropType<(generator: InsertContentGenerator) => void>,
    default: () => () => null
  }
});

const markHandler = () => {
  const generator: InsertContentGenerator = (selectedText) => {
    return {
      targetValue: `@${selectedText}@`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    };
  };

  props.onInsert(generator);
};
</script>

<script lang="ts">
export default {
  name: 'MarkExtension'
};
</script>
