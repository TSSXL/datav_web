<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";
  import {getResultByApi,postResultByApi} from "../api"

  export default {
    name: 'pieMultiPercent',
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
      }
    }
  }

</script>
