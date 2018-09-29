<template>
  <div class="charts">
    <div ref="chart" style="width:480px;height:240px"></div>
    <el-button type="primary" @click="refresh" size="mini"> 刷新 </el-button>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import store from '@/store'
  import {post, get, put} from "@/views/task/apiparam/api"

  export default {
    components: {},
    props: {
      table: {type: String},
      field: {type: String}
    },
    data() {
      return {
        option: {
          title: {
            show: false,
          },
          grid: {
            top: 10
          },
          color: ['rgb(25, 183, 207)'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          xAxis: {
            type: 'time',
            boundaryGap: false,
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: ['0%', '40%']
          },
          series: [{
            name: '模拟数据',
            type: 'line',
            data: []
          }]
        }
      };
    },
    methods: {
      refresh(){
        this.drawChart()
      },
      drawChart() {
        var chart = this.$refs.chart
        this.charts = echarts.init(chart)

        var data = []
        let select = "SELECT " + this.field + " FROM " + this.table + " order by time desc limit 50";
        get(this.sql + select).then(response => {
          console.log(this.sql + select)
          let result = [];
          if (response.data.results && response.data.results.length > 0 && response.data.results[0].series && response.data.results[0].series.length > 0) {
            result = response.data.results[0].series[0].values
          }

          for (let item of result) {
            data.push({
              name: item[0],
              value: [item[0], item[1]]
            });
          }

          this.charts.setOption({
            series: [{
              data: data
            }]
          })
        })

        //应用样式
        this.charts.setOption(this.option);
      }
    },
    computed: {
      sql() {
        return store.getters.urls.influxdb_city_pc
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
