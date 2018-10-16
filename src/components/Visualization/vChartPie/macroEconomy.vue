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
  import {getResultByApi,postResultByApi} from "../api"

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
        chartOption.grid = option.style.grid;
        chartOption.title = option.style.title;
        chartOption.series = option.style.series;
        chartOption.color = option.style.color;
        chartOption.title.text = option.data.static_data.text;
        chartOption.title.subtext = option.data.static_data.val;

        return chartOption;
      },
     async draw(){
        let chart = this.$refs.chart;
        let v = document.getElementById(this.option.cmpId);
        let obj = v.parentNode.parentNode.parentNode;
        this.charts = echarts.init(chart);
        let op=await this.getChartOption(JSON.parse(JSON.stringify(this.option)));

        this.charts.setOption(op);
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
