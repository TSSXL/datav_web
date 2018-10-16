<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <el-carousel :interval="4000" arrow="always"   :height="size.height+'px'" >
        <el-carousel-item v-for="(item,index) in list" :key="index">
          <div v-if="index==0" :style="`padding-top:5px;padding-left:5px;padding-right: 5px;height: ${size.height}px;font-size: 20px;${option.style.divStyle}`" >
            <h3 :style="`color:#fff;${option.style.h3Style}`">当前空气指标</h3>
            <div :style="`display: inline-block;width: 50%;float:left;border-right: 1px solid #fff;border-bottom: 1px solid #fff;${option.style.divLeftStyle}`">
              <div :style="`${option.style.dataDivStyle}`">
              <span class="airTitle">PM2.5</span><span class="value">:{{item.PM25}}μg/m3</span>
              </div>
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">SO2</span><span class="value">:{{item.SO2}}μg/m3</span>
              </div>
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">O3</span><span class="value">:{{item.O3}}μg/m3</span>
              </div>
              </div>
            <div :style="`display: inline-block;width: 50%;border-left: 1px solid #fff;border-bottom: 1px solid #fff;${option.style.divRightStyle}`">
              <div :style="`${option.style.dataDivStyle}`">
              <span class="airTitle">PM10</span><span class="value">:{{item.PM10}}μg/m3</span>
              </div>
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">NO2</span><span class="value">:{{item.NO2}}μg/m3</span>
              </div>
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">CO</span><span class="value">:{{item.CO}}mg/m3</span>
              </div>
              </div>
            <span :style="`display: inline-block;float: right;${option.style.timeStyle}`">更新时间：{{item.formatTime}}</span>
          </div>
          <div v-if="index==1" :style="`padding-top:5px;padding-left:5px;padding-right: 5px;height: ${size.height}px;font-size: 20px;${option.style.divStyle}`" >
            <h3 :style="`color:#fff;${option.style.h3Style}`">12小时前空气指标</h3>
            <div :style="`display: inline-block;width: 50%;float:left;border-right: 1px solid #fff;border-bottom: 1px solid #fff;${option.style.divLeftStyle}`">
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">PM2.5</span><span class="value">:{{item.PM25}}μg/m3</span>
              </div>
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">SO2</span><span class="value">:{{item.SO2}}μg/m3</span>
              </div>
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">O3</span><span class="value">:{{item.O3}}μg/m3</span>
              </div>
            </div>
            <div :style="`display: inline-block;width: 50%;border-left: 1px solid #fff;border-bottom: 1px solid #fff;${option.style.divRightStyle}`">
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">PM10</span><span class="value">:{{item.PM10}}μg/m3</span>
              </div>
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">NO2</span><span class="value">:{{item.NO2}}μg/m3</span>
              </div>
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">CO</span><span class="value">:{{item.CO}}mg/m3</span>
              </div>
            </div>
            <span :style="`display: inline-block;float: right;${option.style.timeStyle}`">更新时间：{{item.formatTime}}</span>
          </div>
          <div v-if="index==2" :style="`padding-top:5px;padding-left:5px;padding-right: 5px;height: ${size.height}px;font-size: 20px;${option.style.divStyle}`" >
            <h3 :style="`color:#fff;${option.style.h3Style}`">24小时前空气指标</h3>
            <div :style="`display: inline-block;width: 50%;float:left;border-right: 1px solid #fff;border-bottom: 1px solid #fff;${option.style.divLeftStyle}`">
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">PM2.5</span><span class="value">:{{item.PM25}}μg/m3</span>
              </div>
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">SO2</span><span class="value">:{{item.SO2}}μg/m3</span>
              </div>
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">O3</span><span class="value">:{{item.O3}}μg/m3</span>
              </div>
            </div>
            <div :style="`display: inline-block;width: 50%;border-left: 1px solid #fff;border-bottom: 1px solid #fff;${option.style.divRightStyle}`">
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">PM10</span><span class="value">:{{item.PM10}}μg/m3</span>
              </div>
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">NO2</span><span class="value">:{{item.NO2}}μg/m3</span>
              </div>
              <div :style="`${option.style.dataDivStyle}`">
                <span class="airTitle">CO</span><span class="value">:{{item.CO}}mg/m3</span>
              </div>
            </div>
            <span :style="`display: inline-block;float: right;${option.style.timeStyle}`">更新时间：{{item.formatTime}}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </section>
</template>
<script>

  import {postResultByApi} from "../api"

  export default {
    name: 'airTarget',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        size:{
          width:400,
          height:150
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

      query(){
        if(this.option.data.data_type=='API'){
          let url=this.option.data.data_api
          let param=this.option.data.data_api_param

          postResultByApi(url,param).then(response=>{

            this.option.data.static_data=response.data;
            this.list=this.option.data.static_data;
          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_api+"接口调用报错"
            });
          });


        }else{
            this.list=this.option.data.static_data;
        }
      }
    },
    computed: {
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
    }
  }
</script>
<style scoped>



</style>
