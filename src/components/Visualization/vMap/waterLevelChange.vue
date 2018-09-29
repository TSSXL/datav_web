<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import data from "../comps/330200";

  export default {
    name: 'waterLevelChange',
    props: {
      option: {type: Object},
      scale: {type: Number}
    },
    data() {
      return {

      }
    },
    methods: {
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        //chartOption.visualMap = option.style.visualMap;
        chartOption.xAxis = option.style.xAxis;
        chartOption.grid = option.style.grid;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;
        chartOption.series[0].map = "ningbo";
        chartOption.series[0].label  ={
          normal: {
            show: true,
            fontSize:35,
            formatter: function (params) {

              return params.name+'\n'+'xxxx站点:51'+'\n'+'xxxx站点：26';
            },
            position: [-50,-50],
            backgroundColor: ' rgba(255, 255, 255,0.7)',
            padding: [6, 7],
            fontFamily:'Microsoft YaHei',
            borderRadius: 3,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.5)',
            color: '#103256',
            rich: {

            }
          },
          emphasis: {
            show: true,
            itemStyle:{
              "borderWidth": 3,
              "borderColor": "#3fdaff",
              "areaColor": "transparent",
              "shadowColor": "#333",
              "shadowBlur": 10,
              "color": "#f4e925"
            }

          }
        };
        chartOption.series[0].data = option.data.static_data;
        console.log(JSON.stringify(chartOption));
        return chartOption;
      },
      draw(){
        echarts.registerMap("ningbo", data);
        let chart = this.$refs.chart;
        this.charts = echarts.init(chart,"walden");
        this.charts.setOption(this.getChartOption(JSON.parse(JSON.stringify(this.option))));
        let obj = chart.parentNode.parentNode.parentNode;
        chart.style.width = (obj.clientWidth) + 'px';
        chart.style.height = (obj.clientHeight) + 'px';
        this.charts.resize();
      }
    },
    watch: {
      option: {
        handler(curVal, oldVal){
          this.draw();
        },
        deep:true
      }
    },
    mounted() {
      this.draw();
    }
  }
</script>
