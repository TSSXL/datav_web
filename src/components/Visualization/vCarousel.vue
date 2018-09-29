<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <el-carousel :interval="4000" type="card" :height="size.height - 40+'px'" indicator-position="none">
        <el-carousel-item v-for="item in option.data.static_data.length" :key="item">
          <div style="margin-top:20%;color: #BF9D13;font-size: 26px;font-weight: bold;">{{option.data.static_data[item - 1].val}}</div>
          <div>{{option.data.static_data[item - 1].name}}</div>
        </el-carousel-item>
      </el-carousel>
      <br>
      <span>更新时间:{{option.style.updateTime}}</span>
    </div>
  </section>
</template>
<script>

  export default {
    name: 'vCarousel',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        size:{
          width:400,
          height:150
        }
      }
    },
    methods: {
      getSize(){
        let v = document.getElementById(this.option.cmpId);
        let obj = v.parentNode.parentNode.parentNode;
        return {
          width:obj.clientWidth,
          height:obj.clientHeight
        };
      }
    },
    computed: {
    },
    created() {
      this.$nextTick(() => {
        this.size = this.getSize();
      });
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.size = this.getSize();
        },
        deep: true
      }
    }
  }
</script>
<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #002246;
    border:2px #15568B solid;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #002246;
    border:2px #15568B solid;
  }
</style>
