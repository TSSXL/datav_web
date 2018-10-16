<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";
  import {getResultByApi,postResultByApi} from "../api"

  export default {
    name: 'alarmMultiPercent',
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
        if(option.style.tooltip){
          chartOption.tooltip = option.style.tooltip;
        }
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        chartOption.legend = option.style.legend;
        chartOption.legend.data = option.style.seriesItems.map(item => item.name);
        chartOption.series = option.style.series;
        chartOption.series = [{
          "type": "pie",
          "radius": [
            `${80}%`,
            `${option.style.spacing}%`
          ],
          "center": [`${option.style.center.x}%`, `${option.style.center.y}%`],
          "label": {
            "show": false
          },
          "data": [
          ]
        }];
        if(option.style.seriesItems != null && option.style.seriesItems.length > 0){
          let total = 0;
          option.style.seriesItems.forEach((item,index)=>{
            if(index < option.data.static_data.length){
              total += option.data.static_data[index].value;
              chartOption.series[0].data.push({
                "name": item.name,
                "value": option.data.static_data[index].value,
                "itemStyle": {
                  "color": item.color
                }
              });
            }
          })

          //补上空格防止错位
          if(option.style.title.subtext==""){
            if(total<10){
              chartOption.title.subtext ="    "+total;
            }else if(total<100) {
              chartOption.title.subtext ="   "+total;
            }else if(total<1000){
                chartOption.title.subtext ="  "+total;
            }else if(total<10000){
              chartOption.title.subtext =" "+total;
            }else{
              chartOption.title.subtext =total;
            }


          }

        }

        return chartOption;
      }
    }
  }

</script>
