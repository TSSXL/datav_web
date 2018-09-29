<template></template>
<script>
  import echarts from 'echarts'
  import 'echarts-wordcloud'
  import "../../../plugins/echarts/theme/dark.js";
  import "../../../plugins/echarts/theme/infographic.js";
  import "../../../plugins/echarts/theme/macarons.js";
  import "../../../plugins/echarts/theme/roma.js";
  import "../../../plugins/echarts/theme/shine.js";
  import "../../../plugins/echarts/theme/walden.js";
  import "../../../plugins/echarts/theme/vintage.js";

  export default {
    name: 'vChartBase',
    props: {
      option: {type: Object},
      scale: {type: Number},
      screen:{type:Object}
    },
    methods: {
    async  draw(){
        let chart = this.$refs.chart;
        this.charts = echarts.init(chart,"walden");
        let op=await this.getChartOption(JSON.parse(JSON.stringify(this.option)))
        this.charts.setOption(op);

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
      this.$nextTick(() => {
        this.draw()
      })
    }
  }
</script>
