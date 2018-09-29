<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'pieMultiPercent',
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
        console.log(JSON.stringify( chartOption));
        return chartOption;
      }
    }
  }

</script>
