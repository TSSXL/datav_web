<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <el-row>
        <el-col :span="15">
          <div class="charts">
            <div ref='chart' :style="'width:300px;height:200px;'"></div>
          </div>
        </el-col>
        <el-col :span="9">
          <template v-for="item of option.data.static_data">
            <el-row  :style="`margin-top: 2px;height: ${size.height/6 - 15}px;`">
              <el-col :span="12" class="title" :style="`line-height: ${size.height/6 - 16}px;`">{{item.x}}</el-col>
              <el-col :span="12" class="val"  :style="`line-height: ${size.height/6 - 16}px;`">{{item.val}}</el-col>
            </el-row>
          </template>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: 'sub-index-monitor',
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
        chartOption.radar = option.style.radar;
        chartOption.grid = option.style.grid;
        chartOption.series = option.style.series;
        chartOption.radar.indicator = option.data.static_data.map(item => {
          return {text:item.x,color:"#fff"};
        });
        chartOption.series.data[0].value = option.data.static_data.map(item => item.val);
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
        chart.style.width = (this.size.width - 80) + 'px';
        chart.style.height = (this.size.height) + 'px';
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
<style scoped>

  .title{
    border:1px #15568B solid;
    color: #fff;
    background: #00598A;
  }
  .val{
    border:1px #15568B solid;
    color: #BF9D13;
  }
</style>
