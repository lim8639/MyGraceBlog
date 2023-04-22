<template>
  <nav>
    <ul>

      <li><router-link to="/">博客</router-link></li>
      <li><router-link to="/utils">工具</router-link></li>
      <li><router-link to="/direction">面板</router-link></li>
      <li><router-link to="/space">空间</router-link></li>
      <li><a href="#/user" class="">管理</a></li>
    </ul>
  </nav>
</template>

<script setup>

</script>

<style scoped>
nav {
  flex-flow: row nowrap;
  width: 100%;
  height: 50px;
  background-color: #55437a;
}
nav ul {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
}
nav>ul> li {
  text-decoration: none;
  line-height: 50px;
  display: inline-block;
  height: 50px;
  padding: 0;
}
nav>ul> li >a{
  color: #fff;
  font-size: 24px;
  text-decoration: none;
}
</style>