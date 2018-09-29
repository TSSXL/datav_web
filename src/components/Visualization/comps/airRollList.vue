<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
<div >
  <ul class="item" :style="`line-height:${option.style.ulLineHeight}px;font-size:${option.style.fontSize}px;color:${option.style.color};width: ${size.width}px; height: ${size.height}px;background-color:${option.style.backgroundColor}`">
    <li>
      <span style="width: 45%;">站点名称</span>
      <span style="width: 35%;">主要污染物</span>
      <span style="width: 10%;">AQI</span>
    </li>
      <vue-seamless-scroll :data="list" :class-option="classOption"
                           @copy-data="list = list.concat(list)"
                           class="warp"
                           :style="`width: ${size.width}px; height: ${size.height}px;`"
      >

          <li v-for="item in list" >
            <span style="width: 45%;">{{item.station}}</span>
            <span style="width: 35%;">{{item.main}}</span>
            <span :style="`width: 10%;height: 30px;
            line-height:30px;margin-top:10px;
    border-radius: 4px;
    text-align: center;background:${item.itemBackground};color:#103256`">{{item.aqi}}</span>
          </li>

      </vue-seamless-scroll>
  </ul>
</div>

      </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  import vueSeamlessScroll from 'vue-seamless-scroll'



  export default {
    name: 'airRollList',
    components: {vueSeamlessScroll},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        size:{
          width:400,
          height:200
        },
        list:[]
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
      },


    },

    computed: {
      path() {
        return getPath()
      },
      classOption: function () {
        return {
          step: 0.5,
          limitMoveNum: 5
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.size = this.getSize();
      });

      this.list=this.option.data.static_data;
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.size = this.getSize();
        },
        deep: true
      }
    },
  mounted(){
//    $('.dowebok').liMarquee({
//      direction: 'up'
//    });

  }
  }
</script>
<style scoped>
  .drip{
    background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
  }

  .warp {
    overflow: hidden;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
  }
  li {
    display: flex;
    justify-content: space-between;
  }
</style>
