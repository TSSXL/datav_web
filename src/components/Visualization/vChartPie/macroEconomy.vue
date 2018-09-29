<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <div :style="`color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-size: ${option.style.textStyle.fontSize}px;line-height: 35px;`">{{option.style.textStyle.name}}</div>
      <div class="charts">
        <div ref='chart' :style="'width:300px;height:200px;'"></div>
      </div>
    </div>
  </section>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: 'macroEconomy',
    props: {
      option: {type: Object},
      scale: {type: Number}
    },
    data() {
      return {
        size:{
          width:400,
          height:200
        }
      }
    },
    methods: {
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.grid = option.style.grid;
        chartOption.title = option.style.title;
        chartOption.series = option.style.series;
        chartOption.color = option.style.color;
        chartOption.title.text = option.data.static_data.text;
        chartOption.title.subtext = option.data.static_data.val;
        if(option.newData!=null && option.newData.id!=null){
          if(chartOption.title.text=='SO2折算浓度'){
            chartOption.title.subtext=12
          }else if(chartOption.title.text=='烟尘折算浓度'){
            chartOption.title.subtext=5
          }else if(chartOption.title.text=='Nox折算浓度'){
            chartOption.title.subtext=30
          }else if(chartOption.title.text=='烟气流量'){
            chartOption.title.subtext=184283.1192
          }else if(chartOption.title.text=='烟气流量'){
            chartOption.title.subtext=184283.1192
          }else if(chartOption.title.text=='PH值'){
            chartOption.title.subtext=7
          }else if(chartOption.title.text=='化学需氧量'){
            chartOption.title.subtext=70
          }else if(chartOption.title.text=='废水流量'){
            chartOption.title.subtext=5.632
          }

        }
        return chartOption;
      },
      draw(){
        let chart = this.$refs.chart;
        let v = document.getElementById(this.option.cmpId);
        let obj = v.parentNode.parentNode.parentNode;
        this.charts = echarts.init(chart);
        this.charts.setOption(this.getChartOption(JSON.parse(JSON.stringify(this.option))));
        this.size.width = obj.clientWidth;
        this.size.height = obj.clientHeight;
        chart.style.width =`${this.size.width}px`;
        chart.style.height = `${this.size.height - 35}px`;
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
