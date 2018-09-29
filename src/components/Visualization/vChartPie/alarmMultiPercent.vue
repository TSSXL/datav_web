<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'alarmMultiPercent',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        let chartOption = {};
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

          chartOption.title.subtext = total;
        }
        return chartOption;
      }
    }
  }

</script>
