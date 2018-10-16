<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";
  import {getResultByApi,postResultByApi} from "../api"

  export default {
    name: 'piePercent',
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
        chartOption.series = option.style.series;
        chartOption.series[0].data[0].value = option.data.static_data.value;
        chartOption.series[0].data[1].value = option.style.totalValue - option.data.static_data.value;
        return chartOption;
      }
    }
  }
</script>
