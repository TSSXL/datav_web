<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
<div >
  <ul class="item" :style="`line-height:${option.style.ulLineHeight}px;font-size:${option.style.fontSize}px;color:${option.style.color};width: ${size.width}px; height: ${size.height}px;background-color:${option.style.backgroundColor}`">
    <template v-if="option.style.isFs">
      <li>
        <span style="width: 40%;">所属企业</span>
        <span style="width: 10%;">SO2折算浓度(mg/m3)</span>
        <span style="width: 10%;">烟尘折算浓度(mg/m3)</span>
        <span style="width: 10%;">Nox折算浓度(mg/m3)</span>
        <span style="width: 15%;">烟气流量(M3/h)</span>
        <span style="width: 15%;">监测时间</span>
      </li>
      <vue-seamless-scroll :data="list.gasList" :class-option="classOption"
                           @copy-data="list.gasList = list.gasList.concat(list.gasList)"
                           class="warp"
                           :style="`width: ${size.width}px; height: ${size.height}px;`"
      >

        <li v-for="item in list.gasList" >
          <span style="width: 40%;">{{item.qymc}}</span>
          <span style="width: 10%;">{{item.so2zs}}</span>
          <span style="width: 10%;">{{item.yczs}}</span>
          <span style="width: 10%;">{{item.noxzs}}</span>
          <span style="width: 15%;">{{item.yqll}}</span>
          <span style="width: 15%;">{{item.jcsj}}</span>
        </li>

      </vue-seamless-scroll>
    </template>
    <template v-else>
      <li>
        <span style="width: 45%;">所属企业</span>
        <span style="width: 10%;">PH值</span>
        <span style="width: 15%;">化学需氧量(mg/L)</span>
        <span style="width: 15%;">废水流量(m3/h)</span>
        <span style="width: 15%;">监测时间</span>
      </li>
      <vue-seamless-scroll :data="list.effluentList" :class-option="classOption"
                           @copy-data="list.effluentList = list.effluentList.concat(list.effluentList)"
                           class="warp"
                           :style="`width: ${size.width}px; height: ${size.height}px;`"
      >

        <li v-for="item in list.effluentList" >
          <span style="width: 45%;">{{item.qymc}}</span>
          <span style="width: 10%;">{{item.ph}}</span>
          <span style="width: 15%;">{{item.hxxyl}}</span>
          <span style="width: 15%;">{{item.fsll}}</span>
          <span style="width: 15%;">{{item.jcsj}}</span>
        </li>

      </vue-seamless-scroll>
    </template>



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
