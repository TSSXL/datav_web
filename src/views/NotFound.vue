<template>
  <div style="margin-top: 80px;">
      <div class="bullshit">
        <h2><i class="fa fa-info-circle"></i>  {{ message }}</h2>
        <div>请联系管理员查看组件配置是否正确</div>
        <router-link class='inlineBlock' to="/">返回首页</router-link>
      </div>
    </div>
</template>

<script>
 export default {
   data() {
     return {
      
     }
   },
   computed: {
     message() {
       return '找不到对应的组件......'
     }
   }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
