<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
<div >
  <ul class="item" @mouseover="hoverList" @mouseout="outList"
      :style="`line-height:${option.style.ulLineHeight}px;font-size:${option.style.fontSize}px;color:${option.style.color};width: ${size.width}px; height: ${size.height}px;background-color:${option.style.backgroundColor}`">
    <template v-if="option.style.isFs==false">
      <li>
        <span style="width: 40%;">污染源排口</span>
        <span style="width: 10%;">SO2折算浓度(mg/m3)</span>
        <span style="width: 10%;">烟尘折算浓度(mg/m3)</span>
        <span style="width: 10%;">Nox折算浓度(mg/m3)</span>
        <span style="width: 15%;">烟气流量(M3/h)</span>
        <span style="width: 15%;">监测时间</span>
      </li>
      <li v-for="item in lists.gasList" style="text-align: right">
        <span style="width: 40%;text-align: left" :title="`${item.qymc}`">&nbsp;&nbsp;{{item.qymc}}</span>
        <span style="width: 10%;">{{item.so2zs}}</span>
        <span style="width: 10%;">{{item.yczs}}</span>
        <span style="width: 10%;">{{item.noxzs}}</span>
        <span style="width: 15%;">{{item.yqll}}</span>
        <span style="width: 15%;">{{item.jcsj}}时&nbsp;&nbsp;</span>
      </li>

    </template>
    <template v-else>
      <li>
        <span style="width: 40%;">污染源排口</span>
        <span style="width: 10%;">PH值</span>
        <span style="width: 15%;">化学需氧量(mg/L)</span>
        <span style="width: 15%;">废水流量(m3/h)</span>
        <span style="width: 20%;">监测时间</span>
      </li>
      <li v-for="item in lists.effluentList" style="text-align: right">
        <span style="width: 40%;text-align: left" :title="`${item.qymc}`">&nbsp;&nbsp;{{item.qymc}}</span>
        <span style="width: 10%;">{{item.ph}}</span>
        <span style="width: 15%;">{{item.hxxyl}}</span>
        <span style="width: 15%;">{{item.fsll}}</span>
        <span style="width: 20%;">{{item.jcsj}}时&nbsp;&nbsp;</span>
      </li>

    </template>



  </ul>
</div>

      </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  import vueSeamlessScroll from 'vue-seamless-scroll'
  import {postResultByApi} from "../api"



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
        lists:{
          gasList:[],
          effluentList:[]

        },
        list:{
          gasList:[],
          effluentList:[]

        },
        step:5,
        stepTime:3000,
        interval:null
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
      query(){
        if(this.option.data.data_type=='API'){
          let url=this.option.data.data_api
          let param=this.option.data.data_api_param

          postResultByApi(url,param).then(response=>{
              if(this.option.style.isFs){
                this.list.effluentList=response.data
              }else{
                this.list.gasList=response.data
              }
          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_api+"接口调用报错"
            });
          });


        }else {
          this.list=this.option.data.static_data;
        }
        if(this.option.style.step!=null){
          this.step=this.option.style.step;
        }
        if(this.option.style.stepTime!=null){
          this.stepTime=this.option.style.stepTime;
        }
        this.scroll();
      },
      //事件滚动效果
      scroll(){
          if(this.option.style.isFs){
            this.lists.effluentList=[];
            if(this.list.effluentList.length>=this.step){
              for(let i=0;i<this.step;i++){
                this.list.effluentList.push(this.list.effluentList[i]);
                this.list.effluentList.shift();
              }

            }
            for(let i=0;i<this.list.effluentList.length;i++) {
              if (i >= this.step) {
                break;
              }
              this.lists.effluentList.push(this.list.effluentList[i]);
            }
          }else{
            this.lists.gasList=[];
            if(this.list.gasList.length>=this.step){
              for(let i=0;i<this.step;i++){
                this.list.gasList.push(this.list.gasList[i]);
                this.list.gasList.shift();
              }

            }
            for(let i=0;i<this.list.gasList.length;i++) {
              if (i >= this.step) {
                break;
              }
              this.lists.gasList.push(this.list.gasList[i]);
            }
          }


      },
      hoverList(){
        clearInterval(this.interval);//停止

      },
      outList(){
        this.interval=setInterval(this.scroll, this.stepTime); //重新启动即可
      }


    },

    computed: {
      path() {
        return getPath()
      },
      classOption: function () {
        return {
          step: 1,
          limitMoveNum: 5
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.size = this.getSize();
      });

      this.query();
      if(this.option.style.clock!=null && this.option.style.clock!=""){
        setInterval(this.query, this.option.style.clock);
      }
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.size = this.getSize();
          if(this.option.style.step!=null){
            this.step=this.option.style.step;
          }
          if(this.option.style.stepTime!=null){
            this.stepTime=this.option.style.stepTime;
          }

        },
        deep: true
      }
    },
  mounted(){
    this.interval=setInterval(this.scroll, this.stepTime);


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
  li span{
    overflow: hidden;

    white-space: nowrap;

  text-overflow: ellipsis
  }
</style>
