<template>
    <div class="block">
      <el-carousel height="150px" :arrow="element.arrow" :type="element.carouselType">
        <el-carousel-item v-for="item in 4" :key="item">

        </el-carousel-item>
      </el-carousel>
    </div>
</template>
<script>
  import base from './base'

  export default {
    name: 'carouselControl',
    extends: base,
    data() {
      return {}
    }
  }
</script>
<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
