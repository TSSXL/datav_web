<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import vChartBase from "../vChartBase";
  import {getResultByApi,postResultByApi} from "../api"

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
        chartOption.grid = option.style.grid;
        if(option.style.tooltip!=null){
          chartOption.tooltip = option.style.tooltip;
        }
        chartOption.legend = option.style.legend;
        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = [];
        chartOption.xAxis[0].data = Array.from(new Set(option.data.static_data.map(item => item.x)));
        if(option.style.seriesItems != null && option.style.seriesItems.length > 0){
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
        return chartOption;
      },

     async draw(){
        let chart = this.$refs.chart;
        this.charts = echarts.init(chart,"walden");
        let op=await this.getChartOption(JSON.parse(JSON.stringify(this.option)));

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
