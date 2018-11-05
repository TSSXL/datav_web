<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";
  import {getResultByApi,postResultByApi} from "../api"

  export default {
    name: 'mlPieBasic',
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
        chartOption.animation = true;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        if(option.style.tooltip!=null){
          chartOption.tooltip = option.style.tooltip;
        }
        chartOption.legend = option.style.legend;
        chartOption.legend.data = option.data.static_data.map(item => item.x);
        chartOption.series = option.style.series;
        if(option.style.tagStyle.show){
          chartOption.series.label = {
            //formatter:`${option.style.tagStyle.show ? '{x|{b}}' : ''} ${option.style.tagStyle.isNewLine ? '\n': ''} ${option.style.tagStyle.isVal ? '{y|{c}}' : '{y|{d}%}'}`,
            formatter:`${option.style.tagStyle.show ? '{x|{b}}' : ''} ${option.style.tagStyle.isNewLine ? '\n': ''} ${option.style.tagStyle.isVal ? '{y|{c}}' : '{y|{c}}个'}`,
            rich:{
              x:option.style.tagStyle.x,
              y:option.style.tagStyle.y
            }
          };
        }else{
          chartOption.series.label={
            formatter:''

          }
        }
        if(option.style.serieColors != null && option.style.serieColors.length > 0) {
          option.style.serieColors.forEach((item, index) => {
            chartOption.series.data.push({
              "name": option.data.static_data[index].x,
              "value": option.data.static_data[index].y,
              "itemStyle": {
                "color": item.color
              }
            });
          });
        }
        return chartOption;
      }
    }
  }
</script>
