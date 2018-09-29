<template>
  <section>
    <div :id="option.cmpId">
      <el-row :gutter="5" >
        <el-col :span="12"><div class="title" :style="`line-height:${height - 3}px`">{{option.data.static_data.name}}</div></el-col>
        <el-col :span="12"><div class="val" :style="`line-height:${height - 3}px`">{{option.data.static_data.val}}</div></el-col>
      </el-row>
    </div>
  </section>
</template>
<script>

  export default {
    name: 'vMonitor',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        height:100
      }
    },
    methods: {
      getHeight(){
        let v = document.getElementById(this.option.cmpId);
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
    border:2px #15568B dotted;
    color: #02E0E5;
    font-weight: bold;
    font-size: 26px;
    background: #00598A;
  }
  .val{
    border:2px #15568B solid;
    background: #004487;
    color: #BF9D13;
    font-weight: bold;
    font-size: 36px;
  }
</style>
