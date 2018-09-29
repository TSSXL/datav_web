<template>
  <div class="charts" style="padding: 8px;">
    <div ref='chart' :style="'width:360px;height:120px'"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: 'pieChart',
    components: {},
    props: {},
    data() {
      return {
        option: {
          title : {
            show:false,
            text: '站点用户访问来源',
            subtext: '模拟数据显示',
            x: 'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    methods: {
      drawChart() {
        var chart = this.$refs.chart
        this.charts = echarts.init(chart, 'walden')
        this.charts.setOption(this.option)
        this.charts.resize()
      }
    },
    created() {
      this.$nextTick(function () {
        this.drawChart()
      })
    }
  }
</script>
<style scoped>

</style>
