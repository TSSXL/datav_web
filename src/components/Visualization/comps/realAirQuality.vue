<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <div :style="`line-height: 30px;color:${option.style.title.textStyle.color};font-family: ${option.style.title.textStyle.fontFamily};font-size: ${option.style.title.textStyle.fontSize}px;font-weight: ${option.style.title.textStyle.fontWeight};text-align: ${option.style.title.left};`">{{option.style.title.text}}</div>
      <el-row>
        <el-col :span="9">
          <div :style="`line-height: ${size.height/3 - 30}px;padding-left:5px;`">
            <div :style="`text-align:left;color:#7C9E39;font-family: ${option.style.valueStyle.fontFamily};font-size: ${option.style.valueStyle.fontSize}px;`">AQI 指数</div>
            <div :style="`text-align:left;color:#7C9E39;font-family: ${option.style.valueStyle.fontFamily};font-size: ${option.style.valueStyle.fontSize}px;font-weight: bold`">{{option.data.static_data.aqi}}</div>
          </div>
          <div :style="`line-height: ${size.height/3 - 30}px;padding-left:5px;`">
            <div :style="`text-align:left;color:#4D86B3;font-family: ${option.style.valueStyle.fontFamily};font-size: ${option.style.valueStyle.fontSize}px;`">首要污染物</div>
            <div :style="`text-align:left;color:#4D86B3;font-family: ${option.style.valueStyle.fontFamily};font-size: ${option.style.valueStyle.fontSize}px;font-weight: bold`">{{option.data.static_data.contaminant}}</div>
          </div>
          <div :style="`line-height: ${size.height/3 - 30}px;padding-left:5px;`">
            <div :style="`text-align:left;color:#C67643;font-family: ${option.style.valueStyle.fontFamily};font-size: ${option.style.valueStyle.fontSize}px;`">浓度</div>
            <div :style="`text-align:left;color:#C67643;font-family: ${option.style.valueStyle.fontFamily};font-size: ${option.style.valueStyle.fontSize}px;font-weight: bold`">{{option.data.static_data.potency}}</div>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="charts">
            <div ref='chart' :style="'width:300px;height:200px;'"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
  import echarts from 'echarts'
  import data from "./330200";

  export default {
    name: 'realAirQuality',
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
        chartOption.visualMap = option.style.visualMap;
        chartOption.series = option.style.series;
        chartOption.series[0].map = "ningbo";
        chartOption.series[0].data = option.data.static_data.areas;
        return chartOption;
      },
      getSize(){
        let v = document.getElementById(this.option.cmpId);
        let obj = v.parentNode.parentNode.parentNode;
        return {
          width:obj.clientWidth,
          height:obj.clientHeight
        };
      },
      draw(){
        echarts.registerMap("ningbo", data);
        let chart = this.$refs.chart;
        this.charts = echarts.init(chart);
        this.charts.setOption(this.getChartOption(JSON.parse(JSON.stringify(this.option))));
        chart.style.width = this.getSize().width - 80 + 'px';
        chart.style.height = this.getSize().height - 30 + 'px';
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
