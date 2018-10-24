<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";
  import {getResultByApi,postResultByApi} from "../api"

  export default {
    name: 'mlBarBasic',
    extends:vChartBase,
    methods: {
    async  getChartOption(option){
        if(option.data.data_type=='API'){
          let url=option.data.data_api
          if(option.newData!=null && option.newData.id!=null){

            option.data.data_api_json.id=option.newData.id;
          }

          let data= await postResultByApi(url,option.data.data_api_json).then(response=>{
            return response.data;
          }).catch((e) => {
            this.$message({
              type: 'error',
              message: option.data.data_api+"接口调用报错"
            });
          });

          option.data.static_data=data;
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

        let tooltip={
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle:{
            fontSize:25
          },
          formatter: function (params) {
            var tar= params[0];

            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
          }
        }
        chartOption.tooltip = tooltip;

        chartOption.title = option.style.title;
        chartOption.grid = option.style.grid;
        if(option.style.legend!=null){
          chartOption.legend = option.style.legend;
          chartOption.legend.data = option.style.seriesValues.map(item => item.name);
        }

        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;
        let seriesNames = Array.from(new Set(option.data.static_data.map(item => item.s)));
        let xs = Array.from(new Set(option.data.static_data.map(item => item.x)));
        chartOption.xAxis[0].data = xs;


        for(let i = 0;i < seriesNames.length; i++){
          if(i < option.style.seriesValues.length){
            chartOption.series.push({
              name:option.style.seriesValues[i].name,
              type:"bar",
              stack:"mlBarBasic",
              barGap:option.style.seriesValues[i].barGap,
              itemStyle:{
                color:option.style.seriesValues[i].color
              },
              label:{
                show:option.style.seriesLabel.show,
                fontSize:option.style.seriesLabel.fontSize,
                color:option.style.seriesLabel.color,
                fontWeight:option.style.seriesLabel.fontWeight,
                position:option.style.seriesLabel.position
              },
              barCategoryGap:option.style.barCategoryGap,
              barWidth:option.style.barWidth,
              data:option.data.static_data.filter((item)=>item.s == seriesNames[i]).map(item => item.y)
            });
          }
        }

        return chartOption;
      }
    }

  }
</script>
