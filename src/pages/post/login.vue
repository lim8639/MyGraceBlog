<template>
  <div style="background-color: #93ffc0">
    <a-form>
      <a-form-item field="name" tooltip="Please enter username" label="Username">
        <a-input
            v-model="form.username"
            placeholder="please enter your username..."
        />
      </a-form-item>
      <a-form-item field="post" label="Post">
        <a-input v-model="form.password" placeholder="please enter your post..." />
      </a-form-item>
      <a-form-item>
        <a-button @click="handleSubmit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import  { reactive } from 'vue';
import {useRouter} from "vue-router";
import { userloginApi} from "../../requests/index.js";
import {Message} from "@arco-design/web-vue";

const form = reactive({
  username: '',
  password: '',
});

const Router = useRouter()
const handleSubmit = (data) => {
  userLogin()

};
const userLogin = async ()=>{
  try {
    const {data} = await userloginApi(form)
    if(data.code ==200){
      localStorage.setItem('token',data.data)
      Router.push("/user")
    }
    Message.info(data.message)
  } catch (err) {

  } finally {

  }
}
</script>