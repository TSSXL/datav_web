<template>
  <div class="app-container"> 
    <h3>我的系统</h3>
      <sys-list-icon></sys-list-icon>
    <h3>我的资源</h3> 
      <el-alert
        title="请先注册系统"
        type="info"
        description="为系统添加各类资源，快速构建系统！"
        show-icon>
      </el-alert>
    <h3>安全预警</h3>  
      <el-alert
        title="还没有哦"
        type="info"
        description="暂时一无所有！"
        show-icon>
      </el-alert> 
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import sysListIcon from '@/views/console/app/listIcon'
  export default {
    name: 'home',
    components:{sysListIcon},
    methods:{
      create(){
        this.$router.push('/console/app/add');
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss"; 
  .create-button-card {
    background-color: #fbfdff;
    border: 2px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 128px;
    height: 128px;
    cursor: pointer;
    line-height: 24px;
    vertical-align: top;
    outline: none;
    text-align: center;
    font-weight:900;
  } 
  .create-button-card i{
    font-size: 48px;
    color: #8c939d;
  }
</style>
