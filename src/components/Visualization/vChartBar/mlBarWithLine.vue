<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import vChartBase from "../vChartBase";

  export default {
    name: 'mlBarWithLine',
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
        chartOption.title = option.style.title;
        chartOption.grid = option.style.grid;
        chartOption.legend = option.style.legend;
        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = [];
        chartOption.xAxis[0].data = Array.from(new Set(option.data.static_data.map(item => item.x)));
        if(this.option.style.seriesItems != null && this.option.style.seriesItems.length > 0){
          this.option.style.seriesItems.forEach((item)=>{
            let static_data = option.data.static_data.filter((d)=>d.s == item.value);
            if(static_data != null && static_data.length > 0){
              let obj = null;
              if(item.type == "bar"){
                obj = {
                  "name": item.name,
                  "type": "bar",
                  "itemStyle": {
                    "color": item.color
                  },
                  "label": item.label,
                  "barCategoryGap": option.style.barCategoryGap,
                  "barWidth": option.style.barWidth,
                  "stack":option.style.stack?"overlap":"",
                  "data": static_data.map(item => item.y)
                };

              }else if(item.type == "line"){
                obj = {
                  "name": item.name,
                  "type": "line",
                  "symbolSize": item.symbolSize,
                  "smooth": item.smooth,
                  "lineStyle": item.lineStyle,
                  "label": item.label,
                  "data": static_data.map(item => item.y)
                };
              }
              chartOption.legend.data.push(item.name);
              chartOption.series.push(obj);
            }
          });
        }
        console.log(JSON.stringify( chartOption));
        return chartOption;
      },
      draw(){
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
      this.$nextTick(() => {
        this.draw();
        /*setInterval(()=>{
          let c = this.option.data.static_data[0];
          this.option.data.static_data.splice(0,1);
          this.option.data.static_data.push(c);
        }, 2000);*/
      })
    }
  }
</script>
