<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'barYCategoryStack',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        let chartOption= {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['面积', '常住人口','户籍人口']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis:  {
            type: 'value',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            splitLine: {
              show: false
            },
            data: ['鄞州','海曙','江北','镇海','奉化','北仑','慈溪','余姚','宁海','象山']
          },
          series: [

            {
              name: '常住人口',
              type: 'bar',
              stack: '总量',
              itemStyle: {
                color: "#0045F2"
              },
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [129.4,90.9,37.5,44.3,51.1,66.8,150.2,109.5,68.2,52.6]
            },
            {
              name: '户籍人口',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [87.2,62.6,25.1,25.0,48.3,41.4,105.3,82.7,63.2,55.0]
            }
          ]
        };

        return chartOption;
      }
    }

  }
</script>
