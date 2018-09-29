<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";
  export default {
    name: 'mlLineBasic',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        if(option.newData!=null && option.newData.id!=null){
          let newMap=[
            {
              "x": "03时",
              "y": 7,
              "s": "1"
            },
            {
              "x": "03时",
              "y": 20,
              "s": "2"
            },
            {
              "x": "03时",
              "y": 24,
              "s": "3"
            },
            {
              "x": "04时",
              "y": 5.7,
              "s": "1"
            },
            {
              "x": "04时",
              "y": 14.2,
              "s": "2"
            },
            {
              "x": "04时",
              "y": 74,
              "s": "3"
            },
            {
              "x": "05时",
              "y": 1.3,
              "s": "1"
            },
            {
              "x": "05时",
              "y": 20.5,
              "s": "2"
            },
            {
              "x": "05时",
              "y": 79,
              "s": "3"
            },
            {
              "x": "06时",
              "y": 5,
              "s": "1"
            },
            {
              "x": "06时",
              "y": 12.4,
              "s": "2"
            },
            {
              "x": "06时",
              "y": 40,
              "s": "3"
            },
            {
              "x": "07时",
              "y": 9.2,
              "s": "1"
            },
            {
              "x": "07时",
              "y": 18,
              "s": "2"
            },
            {
              "x": "07时",
              "y": 60,
              "s": "3"
            },
            {
              "x": "08时",
              "y": 1.4,
              "s": "1"
            },
            {
              "x": "08时",
              "y": 5.7,
              "s": "2"
            },
            {
              "x": "08时",
              "y": 59,
              "s": "3"
            },
            {
              "x": "09时",
              "y": 6.2,
              "s": "1"
            },
            {
              "x": "09时",
              "y": 13,
              "s": "2"
            },
            {
              "x": "09时",
              "y": 50,
              "s": "3"
            },
            {
              "x": "10时",
              "y": 2.4,
              "s": "1"
            },
            {
              "x": "10时",
              "y": 21,
              "s": "2"
            },
            {
              "x": "10时",
              "y": 35,
              "s": "3"
            },
            {
              "x": "11时",
              "y": 3.4,
              "s": "1"
            },
            {
              "x": "11时",
              "y": 12.5,
              "s": "2"
            },
            {
              "x": "11时",
              "y": 47,
              "s": "3"
            },
            {
              "x": "12时",
              "y": 4,
              "s": "1"
            },
            {
              "x": "12时",
              "y": 19,
              "s": "2"
            },
            {
              "x": "12时",
              "y": 37,
              "s": "3"
            },
            {
              "x": "13时",
              "y": 8.5,
              "s": "1"
            },
            {
              "x": "13时",
              "y": 18,
              "s": "2"
            },
            {
              "x": "13时",
              "y": 41,
              "s": "3"
            },
            {
              "x": "14时",
              "y": 2.4,
              "s": "1"
            },
            {
              "x": "14时",
              "y": 10,
              "s": "2"
            },
            {
              "x": "14时",
              "y": 40,
              "s": "3"
            }
          ]
          option.data.static_data=newMap;
        }
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        chartOption.grid = option.style.grid;
        chartOption.legend = option.style.legend;
        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;

        console.log(chartOption.legend.data);
        if(option.style.visualMap!=null){
          chartOption.visualMap=option.style.visualMap
        }
        if(option.style.tooltip!=null){
          chartOption.tooltip=option.style.tooltip
        }
        chartOption.xAxis.data = Array.from(new Set(option.data.static_data.map(item => item.x)));
        chartOption.series.data = option.data.static_data.map(item => item.y);

        if(chartOption.series.length > 0){
          chartOption.series.forEach((item)=>{
            item.data = option.data.static_data.filter((d)=>d.s == item.value).map(m => m.y);
          });
        }
        return chartOption;
      }
    }
  }
</script>
