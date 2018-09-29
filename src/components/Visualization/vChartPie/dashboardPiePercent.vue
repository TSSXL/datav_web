<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'dashboardPiePercent',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.legend = option.style.legend;
        chartOption.legend.data = option.style.seriesItems.map(item => item.name);
        chartOption.color = option.style.seriesItems.map(item => item.color);
        chartOption.series = option.style.series;
        chartOption.title = [];
        if(option.style.seriesItems != null && option.style.seriesItems.length > 0){
          option.style.seriesItems.forEach((item,index)=>{
            if(index < option.data.static_data.length){
              chartOption.title.push({
                text: item.text,
                left: item.center[0],
                top: option.style.title.top,
                textAlign:option.style.title.textAlign,
                textStyle: {
                  fontWeight: option.style.title.textStyle.fontWeight,
                  fontSize: option.style.title.textStyle.fontSize,
                  color: item.color,
                  textAlign: option.style.title.textStyle.textAlign,
                }
              });
              chartOption.series.push({
                type: "pie",
                name:item.name,
                hoverAnimation: false,
                radius: option.style.radius,
                center: item.center,
                startAngle: item.startAngle,
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                label: {
                  normal: {
                    position: "center"
                  }
                },
                data: [{
                  value: option.data.static_data[index].value,
                  itemStyle: {
                    normal: {
                      color: item.color
                    }
                  },
                  label: {
                    normal: {
                      formatter: option.style.label.formatter,
                      position: "center",
                      show: option.style.label.show,
                      textStyle: {
                        fontSize: option.style.label.textStyle.fontSize,
                        fontWeight: option.style.label.textStyle.fontWeight,
                        color:  item.color
                      }
                    }
                  },
                }, {
                  value: 100 - option.data.static_data[index].value,
                  itemStyle: {
                    normal: {
                      label: {
                        show: false
                      },
                      labelLine: {
                        show: false
                      },
                      color: "rgba(0,0,0,0)",
                      borderWidth: 0
                    },
                    emphasis: {
                      color: "rgba(0,0,0,0)",
                      borderWidth: 0
                    }

                  },
                }]
              });
            }
          })

        }

        return chartOption;
      }
    }
  }

</script>
