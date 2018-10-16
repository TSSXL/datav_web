<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;background-color:rgba(255,255,255,0.1);border:1px solid #fff;`">
        <span :style="`display: block;border-bottom: 1px solid #fff;${option.style.areaTitleStyle}`">{{option.data.static_data[0].areaName}}</span>
      <div v-for="item in list"  :style="`border: 1px solid #fff;${option.style.stationDivStyle}`">
        <span :style="`display: block;text-align: left;${option.style.areaNameStyle}`">{{item.name}}：</span>
        <span :style="`display: block;${option.style.stationAQIStyle};`">AQI:&nbsp;&nbsp;<span :style="`${item.AQIStyle};`">{{item.AQI}}</span></span>
        <!--<span :style="`display: block;${option.style.stationPMStyle}`">PM2.5:{{item.PM25}}</span>-->
      </div>


    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  import {postResultByApi} from "../api"



  export default {
    name: 'airRollList',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        size:{
          width:400,
          height:200
        },
        list:{}

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

            this.option.data.static_data=response.data;
            this.list=this.option.data.static_data[0].stationList;
          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_api+"接口调用报错"
            });
          });


        }else {
          this.list=this.option.data.static_data[0].stationList;
        }


      }



    },

    computed: {
      path() {
        return getPath()
      },


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

        },
        deep: true
      }
    },
  }
</script>
<style scoped>
  .drip{
    background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
  }

  tr{
    border:1px solid #ffffff;
  }
  td{
    border:1px solid #ffffff;
  }

  table{
    border:1px solid #ffffff;

  }
</style>
