<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";
  import {getResultByApi,postResultByApi} from "../api"
  export default {
    name: 'mlLineBasic',
    extends:vChartBase,
    methods: {
      async  getChartOption(option){
        if(option.data.data_type=='API'){
          let url=option.data.data_api

          let data=await  postResultByApi(url,option.data.data_api_json).then(async response=>{
            return response.data;
          }).catch((e) => {
            this.$message({
              type: 'error',
              message: option.data.data_api+"接口调用报错"
            });
          });
          option.data.static_data= data;
          return this.returnChartOption(option);

        }else{
          return this.returnChartOption(option);
        }
      },

      returnChartOption(option){

        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        chartOption.grid = option.style.grid;
        chartOption.legend = option.style.legend;
        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;

        if(option.style.visualMap!=null){
          chartOption.visualMap=option.style.visualMap
        }
        if(option.style.tooltip!=null){
          chartOption.tooltip=option.style.tooltip
        }
        chartOption.xAxis.data = Array.from(new Set(option.data.static_data.map(item => item.x)));
        chartOption.series.data = option.data.static_data.map(item => item.y);

        if(chartOption.series.length > 0){
          chartOption.series.forEach((item)=>{
            item.data = option.data.static_data.filter((d)=>d.s == item.value).map(m => m.y);
          });
        }
        return chartOption;
      }
    }
  }
</script>
