<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <el-carousel :interval="3000" arrow="never" @change="changePage"  :height="size.height+'px'" >
        <el-carousel-item v-for="(item,index) in list" :key="index">
          <div v-if="index==0" :style="`padding-top:5px;padding-left:5px;padding-right: 5px;height: ${size.height}px;font-size: 20px;${option.style.divStyle}`" >
            <h3 :style="`color:#fff;${option.style.h3Style}`">全量资产</h3>
            <div :style="`display: inline-block;width: 50%;height:50%;float:left;border-right: 1px solid #fff;border-bottom: 1px solid #fff;${option.style.divLeftStyle}`">

              <div :style="`height:25%;${option.style.dataDivStyle}`">
              <span class="airTitle">设备资产</span><span class="value">:213</span>
              </div>
              <div :style="`height:25%;${option.style.dataDivStyle}`">
                <span class="airTitle">软件资产</span><span class="value">:137</span>
              </div>
              <div :style="`height:25%;${option.style.dataDivStyle}`">
                <span class="airTitle">网络资产</span><span class="value">:10</span>
              </div>
              <div :style="`height:25%;${option.style.dataDivStyle}`">
                <span class="airTitle">许可资产</span><span class="value">:7</span>
              </div>
              </div>
            <div :style="`display: inline-block;width: 50%;height:50%;border-left: 1px solid #fff;border-bottom: 1px solid #fff;${option.style.divRightStyle}`">
              <div :style="`height:33%;${option.style.dataDivStyle}`">
              <span class="airTitle">基础设施云资源资产</span><span class="value">:68</span>
              </div>
              <div :style="`height:33%;${option.style.dataDivStyle}`">
                <span class="airTitle">软件服务资产</span><span class="value">:24</span>
              </div>
              <div :style="`height:33%;${option.style.dataDivStyle}`">
                <span class="airTitle">安全服务资产</span><span class="value">:45</span>
              </div>
              </div>
            <span :style="`display: inline-block;float: right;${option.style.timeStyle}`">更新时间：2018-11-08</span>
          </div>
          <div v-if="index==1" :style="`padding-top:5px;padding-left:5px;padding-right: 5px;height: ${size.height}px;font-size: 20px;${option.style.divStyle}`" >

              <div ref='zwychart' :style="'width:300px;height:200px;'"></div>

          </div>
          <div v-if="index==2" :style="`padding-top:5px;padding-left:5px;padding-right: 5px;height: ${size.height}px;font-size: 20px;${option.style.divStyle}`" >

            <div ref='fwzchart' :style="'width:300px;height:200px;'"></div>
          </div>
        </el-carousel-item>
      </el-carousel>
      <!--<div ref='zwychart' :style="'width:300px;height:200px;'"></div>-->
    </div>
  </section>
</template>
<script>

  import {postResultByApi} from "../api"
  import echarts from 'echarts'
  import 'echarts-wordcloud'
  import "../../../../plugins/echarts/theme/dark.js";
  import "../../../../plugins/echarts/theme/infographic.js";
  import "../../../../plugins/echarts/theme/macarons.js";
  import "../../../../plugins/echarts/theme/roma.js";
  import "../../../../plugins/echarts/theme/shine.js";
  import "../../../../plugins/echarts/theme/walden.js";
  import "../../../../plugins/echarts/theme/vintage.js";

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

    async  darwZwy(){
        let chart = this.$refs.zwychart[0];
        this.charts = echarts.init(chart,"walden");
        let op=await this.getChartZwyOption(JSON.parse(JSON.stringify(this.option.zwy)))

      this.charts.setOption(op);

        let obj = chart.parentNode.parentNode.parentNode;
        chart.style.width = (obj.clientWidth) + 'px';
        chart.style.height = (obj.clientHeight) + 'px';
        this.charts.resize();
      },

      async  darwFwzc(){
        let chart = this.$refs.fwzchart[0];
        this.charts = echarts.init(chart,"walden");
        let op=await this.getChartFwzcOption(JSON.parse(JSON.stringify(this.option.fwzc)))

        this.charts.setOption(op);

        let obj = chart.parentNode.parentNode.parentNode;
        chart.style.width = (obj.clientWidth) + 'px';
        chart.style.height = (obj.clientHeight) + 'px';
        this.charts.resize();
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
      },

      getChartZwyOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        chartOption.legend = option.style.legend;
        chartOption.legend.data = option.style.seriesItems.map(item => item.name);
        chartOption.series = option.style.series;
        if(option.style.seriesItems != null && option.style.seriesItems.length > 0){
          option.style.seriesItems.forEach((item,index)=>{
            if(index < option.data.static_data.length){
              chartOption.series.push({
                "type": "pie",
                "radius": [
                  `${80 - index * option.style.spacing}%`,
                  `${70 - index * option.style.spacing}%`
                ],
                "center": [`${option.style.center.x}%`, `${option.style.center.y}%`],
                "startAngle": item.startAngle,
                "label": {
                  "show": false
                },
                "data": [
                  {
                    "name": item.name,
                    "value": option.data.static_data[index].value,
                    "itemStyle": {
                      "color": item.color
                    }
                  },
                  {
                    "name": "other",
                    "value": option.data.static_data[index].total - option.data.static_data[index].value,
                    "label": {
                      "show": false
                    },
                    "itemStyle": {
                      "color": option.style.bgColor
                    }
                  }
                ]
              });
            }
          })
        }
        return chartOption;
      },

      getChartFwzcOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        chartOption.legend = option.style.legend;
        chartOption.legend.data = option.style.seriesItems.map(item => item.name);
        chartOption.series = option.style.series;
        if(option.style.seriesItems != null && option.style.seriesItems.length > 0){
          option.style.seriesItems.forEach((item,index)=>{
            if(index < option.data.static_data.length){
              chartOption.series.push({
                "type": "pie",
                "radius": [
                  `${80 - index * option.style.spacing}%`,
                  `${70 - index * option.style.spacing}%`
                ],
                "center": [`${option.style.center.x}%`, `${option.style.center.y}%`],
                "startAngle": item.startAngle,
                "label": {
                  "show": false
                },
                "data": [
                  {
                    "name": item.name,
                    "value": option.data.static_data[index].value,
                    "itemStyle": {
                      "color": item.color
                    }
                  },
                  {
                    "name": "other",
                    "value": option.data.static_data[index].total - option.data.static_data[index].value,
                    "label": {
                      "show": false
                    },
                    "itemStyle": {
                      "color": option.style.bgColor
                    }
                  }
                ]
              });
            }
          })
        }
        return chartOption;
      },

      changePage(i){
          if(i==1){
            this.darwZwy();
          }else if(i==2){
            this.darwFwzc();
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

    },
    mounted() {
    },
    updated() {


    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.size = this.getSize();
        },
        deep: true
      },
      '$refs.zwychart':{
        handler(curVal, oldVal) {
          console.log(curVal);
        }
      }
    }
  }
</script>
<style scoped>



</style>
