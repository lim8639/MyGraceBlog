<template>
  <footer>
    <h4>沫沫的时光机运行了 <span class="rundays">{{rundays}}</span></h4>
    <div>
      <p>联系邮箱:lim8639@qq.com</p><p>Copyright © 2020 版权所有All Rights Reserved</p>  <p data-v-68bbe7b5="" class="lh"><a data-v-68bbe7b5="" href="https://beian.miit.gov.cn" target="_blank" class="text-color">桂ICP备2021009920号</a></p>
    </div>
  </footer>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";

const  rundays = ref("")
onMounted(()=>setInterval(()=>{
  let start = new Date("2021/12/18 01:24:22")
  let now = new Date()
  rundays.value = formatDuring(now.getTime()-start.getTime())
},1000))

const formatDuring = mss =>{
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = parseInt((mss % (1000 * 60)) / 1000);
  return days + " 天 " + hours + " 时 " + minutes + " 分 " +  seconds + " 秒 ";
}

</script>

<style scoped>
.rundays{
  color: #42d392;
}
footer{

  color: #696969;
  padding: 20px 20px 80px;
  text-after-overflow: center;
  background-color: #d0d0d0;
}
footer h2{

}
footer p{
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
}
.lh a{
  color: #ff9731;
}
footer a{
  font-size: 14px;
  color: #626262;
}
</style>