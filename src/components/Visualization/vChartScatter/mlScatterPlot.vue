<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";
  import {getResultByApi,postResultByApi} from "../api"

  export default {
    name: 'mlScatterPlot',
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
        chartOption.legend = option.style.legend;
        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;
        chartOption.series.splice(0,chartOption.series.length);
        //chartOption.legend.data.splice(0,chartOption.legend.data.length);

        let s =  option.data.static_data.map(item => item.s);
        let series = Array.from(new Set(s));


        if(series.length > 0){
          for(let se of series){
            chartOption.legend.data.push(`${se}`);
            chartOption.series.push({
              name: `${se}`,
              symbolSize: 20,
              itemStyle:{
                borderWidth:0,
                borderColor:'#fff'
              },
              data: option.data.static_data.filter((item)=>item.s == se).map(item => [item.x,item.y]),
              type: 'scatter'
            });
          }
        }
        return chartOption;
      }
    }
  }
</script>
