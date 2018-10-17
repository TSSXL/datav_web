<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import data from "./330200";
  import {postResultByApi} from "../api"

  export default {
    name: 'airStationMap',
    props: {
      option: {type: Object},
      scale: {type: Number}
    },
    data() {
      return {
        chartOption:{}
      }
    },
    methods: {
    getChartOption(option){
        this.chartOption['geo']=this.option.style.geo;
      this.chartOption['series']=this.option.style.series;
        if(this.option.data.data_type=='API'){
          let url=option.data.data_api
          let param=option.data.data_api_param
          postResultByApi(url,param).then(async response=>{
              console.log(response);
            this.chartOption.series[0].data=response.data;

            this.draw();
          }).catch(e => {
            this.$message({
              type: 'error',
              message: option.data.data_api+"接口调用报错"
            });
          });

        }else {
          this.chartOption.series[0].data = this.option.data.static_data
        this.draw()
        }


      },
      draw(){
        echarts.registerMap("ningbo", data);
        let chart = this.$refs.chart;
        this.charts = echarts.init(chart,"walden");
        this.charts.setOption(this.chartOption);
        let obj = chart.parentNode.parentNode.parentNode;
        chart.style.width = (obj.clientWidth) + 'px';
        chart.style.height = (obj.clientHeight) + 'px';
        this.charts.resize();
      },


    },
    watch: {
      option: {
        handler(curVal, oldVal){
          //this.draw();
        },
        deep:true
      },

    },
    mounted() {
      this.getChartOption(this.option);
      if(this.option.style.clock!=null && this.option.style.clock!=""){
        setInterval(this.getChartOption(this.option), this.option.style.clock);
      }
    }
  }
</script>
