<template>
  <div v-if="visible || props.visible" class="container_box">
    <div class="login_box">
      <a-card>
        <template #title>
          <h1>账户登录</h1>
        </template>
        <a-form :model="form">
          <a-form-item field="name" label="账号：">
            <a-input v-model="form.username" />
          </a-form-item>
          <a-form-item field="password" label="密码：">
            <a-input v-model="form.password" />
          </a-form-item>
          <a-form-item >
            <a-button @click="handleClick" type="primary">登录</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue';
const props = defineProps(['visible'])
console.log(props.visible)
const visible = ref(true);
const form = reactive({
  username: '',
  password: ''
});

const handleClick = () => {
  visible.value = false;
};
const checkToken = () => {

};
onMounted(checkToken)
</script>
<style>

.container_box{
  position: fixed;
  left: 0;
  top: 0;
  background: #d3d3d3;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}
.container_box h1{
  text-align: center;
  font-size: 22px;
}
.login_box{
  width: 320px;
  top: 50%;
  left: 50%;
  margin: auto;
  margin-top: 200px;
}
</style>