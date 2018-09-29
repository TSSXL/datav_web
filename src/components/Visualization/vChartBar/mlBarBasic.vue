<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'mlBarBasic',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        //地图点击后会重新调用这个方法刷新相关参数
        if(option.newData!=null && option.newData.id!=null){
          let newMap=[
            {
              "s": "1",
              "y": "24",
              "x": "08/23"
            },
            {
              "s": "2",
              "y": "0",
              "x": "08/23"
            },
            {
              "s": "3",
              "y": "0",
              "x": "08/23"
            },
            {
              "s": "1",
              "y": "31",
              "x": "08/24"
            },
            {
              "s": "2",
              "y": "0",
              "x": "08/24"
            },
            {
              "s": "3",
              "y": "0",
              "x": "08/24"
            },
            {
              "s": "1",
              "y": "36",
              "x": "80/25"
            },
            {
              "s": "2",
              "y": "0",
              "x": "80/25"
            },
            {
              "s": "3",
              "y": "0",
              "x": "80/25"
            },
            {
              "s": "1",
              "y": "0",
              "x": "08/26"
            },
            {
              "s": "2",
              "y": "0",
              "x": "08/26"
            },
            {
              "s": "3",
              "y": "120",
              "x": "08/26"
            },
            {
              "s": "1",
              "y": "30",
              "x": "08/27"
            },
            {
              "s": "2",
              "y": "0",
              "x": "08/27"
            },
            {
              "s": "3",
              "y": "0",
              "x": "08/27"
            },
            {
              "s": "1",
              "y": "49",
              "x": "08/28"
            },
            {
              "s": "2",
              "y": "0",
              "x": "08/28"
            },
            {
              "s": "3",
              "y": "0",
              "x": "08/28"
            },
            {
              "s": "1",
              "y": "0",
              "x": "08/29"
            },
            {
              "s": "2",
              "y": "60",
              "x": "08/29"
            },
            {
              "s": "3",
              "y": "0",
              "x": "08/29"
            }
          ]
          option.data.static_data=newMap;
        }
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
              var tar;
              if (params[2].value != 0) {
                tar = params[2];
              }else if(params[1].value != 0) {
                tar = params[1];
              }
              else {
                tar = params[0];
              }
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
