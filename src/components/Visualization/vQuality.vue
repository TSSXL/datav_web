<template>
  <section>
    <div id="vQuality">
      <el-row class="title" :style="`margin: 5px;`">水质浮台监测</el-row>
      <div :style="`height:${height - 110}px;margin:0px;padding:0px;`">
        <el-row :style="`height:${(height - 110)/3}px`">
          <el-col :span="6" class="key">{{option.data.static_data.sw.name}}</el-col>
          <el-col :span="6" class="val">{{option.data.static_data.sw.val}}</el-col>
          <el-col :span="6" class="key">{{option.data.static_data.ddd.name}}</el-col>
          <el-col :span="6" class="val">{{option.data.static_data.ddd.val}}</el-col>
        </el-row>
        <el-row :style="`height:${(height - 110)/3}px`">
          <el-col :span="6" class="key">{{option.data.static_data.ph.name}}</el-col>
          <el-col :span="6" class="val">{{option.data.static_data.ph.val}}</el-col>
          <el-col :span="6" class="key">{{option.data.static_data.yd.name}}</el-col>
          <el-col :span="6" class="val">{{option.data.static_data.yd.val}}</el-col>
        </el-row>
        <el-row :style="`height:${(height - 110)/3}px`">
          <el-col :span="6" class="key">{{option.data.static_data.odo.name}}</el-col>
          <el-col :span="6" class="val">{{option.data.static_data.odo.val}}</el-col>
          <el-col :span="6" class="key">{{option.data.static_data.yys.name}}</el-col>
          <el-col :span="6" class="val">{{option.data.static_data.yys.val}}</el-col>
        </el-row>
      </div>
      <el-row class="title" :style="`margin: 5px;`">遥感水质监测</el-row>
      <el-row>
        <el-col :span="8" class="key">{{option.data.static_data.ch.name}}</el-col>
        <el-col :span="8" class="key">{{option.data.static_data.tran.name}}</el-col>
        <el-col :span="8" class="key">{{option.data.static_data.mlss.name}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="val">{{option.data.static_data.ch.val}}</el-col>
        <el-col :span="8" class="val">{{option.data.static_data.tran.val}}</el-col>
        <el-col :span="8" class="val">{{option.data.static_data.mlss.val}}</el-col>
      </el-row>
    </div>
  </section>
</template>
<script>

  export default {
    name: 'vQuality',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        height:150
      }
    },
    methods: {
      getHeight(){
        let v = document.getElementById("vQuality");
        let obj = v.parentNode.parentNode.parentNode;
        return obj.clientHeight;
      }
    },
    computed: {
    },
    created() {
      this.$nextTick(() => {
        this.height = this.getHeight();
      });
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.height = this.getHeight();
        },
        deep: true
      }
    }
  }
</script>
<style scoped>
  .title{
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }

  .key{
    font-size: 14px;
    line-height: 20px;
  }
  .val{
    color: #BF9D13;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
  }
</style>
