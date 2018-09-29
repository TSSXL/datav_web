<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import data from "../comps/330200";

  export default {
    name: 'populationStructure',
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
        chartOption.visualMap = option.style.visualMap;
        chartOption.xAxis = option.style.xAxis;
        chartOption.grid = option.style.grid;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;
        chartOption.series[0].map = "ningbo";
        chartOption.series[0].data = option.data.static_data;
        chartOption.yAxis.data = option.data.static_data.map(item=>item.name);
        chartOption.series[1].data = option.data.static_data.map(item=>item.value);


        chartOption = {
          "visualMap": {
            "textStyle": {
              "color": "#fff"
            },
            "orient": "horizontal",
            "left": "left",
            "inRange": {
              "color": [
                "#059c14",
                "#F9C405"
              ]
            },
            "calculable": true,
            "seriesIndex": [
              0
            ],
            "realtime": true,
            "text": [
              "高",
              "低"
            ],
            "max": 1802,
            "min": 370
          },
          "geo": {
            "show": true,
            "map": "ningbo",
            "top":0,
            "bottom":0,
            "label": {
              "normal": {
                "show": false,
                fontSize:20,
                "color": "#fff"
              },
              "emphasis": {
                "show": false
              }
            },
            "roam": false,
            "silent": true,
            "itemStyle": {
              "normal": {
                "areaColor": "transparent",
                "borderColor": "#4682B4",
                "borderWidth": 2,
                "shadowColor": "rgba(63, 218, 255, 0.5)",
                "shadowBlur": 30
              },
              "emphasis": {
                "areaColor": "#2B91B7"
              }
            }
          },
          "series": [
            {
              "name": "categoryA",
              "type": "map",
              "geoIndex": 0,
              "data": [
                {
                  "name": "镇海区",
                  "value": 1802
                },
                {
                  "name": "江北区",
                  "value": 1801
                },
                {
                  "name": "鄞州区",
                  "value": 1589
                },
                {
                  "name": "海曙区",
                  "value": 1527
                },
                {
                  "name": "奉化区",
                  "value": 403
                },
                {
                  "name": "北仑区",
                  "value": 1115
                },
                {
                  "name": "宁海县",
                  "value": 370
                },
                {
                  "name": "余姚市",
                  "value": 730
                },
                {
                  "name": "慈溪市",
                  "value": 1104
                },
                {
                  "name": "象山县",
                  "value": 381
                }
              ]
            },
            {
              "name": "点",
              "type": "scatter",
              "coordinateSystem": "geo",
              "symbol": "pin",
              symbolSize: function(val) {
                return 100;
              },
              "label": {
                "normal": {
                  "show": true,
                  "textStyle": {
                    "color": "#fff",
                    "fontSize": 12
                  },
                  formatter: '{@[2]}万\n{@[3]}'
                }
              },
              "itemStyle": {
                "normal": {
                  "color":"#F80202"
                  //"color": "#F62157"
                }
              },
              "zlevel": 10,
              "data": [
                {
                  "name": "镇海区",
                  "value": [
                    121.714821,
                    29.954791,
                    44.3,
                    1802
                  ]
                },
                {
                  "name": "江北区",
                  "value": [
                    121.563043,
                    29.893691,
                    37.5,
                    1801
                  ]
                },
                {
                  "name": "鄞州区",
                  "value": [
                    121.640513,29.673392,
                    129.4,
                    1589
                  ]
                },
                {
                  "name": "海曙区",
                  "value": [
                    121.359379,29.81087,
                    90.9,
                    1527
                  ]
                },
                {
                  "name": "奉化区",
                  "value": [
                    121.348456,29.607596,
                    21.1,
                    403
                  ]
                },
                {
                  "name": "北仑区",
                  "value": [
                    121.982588,29.872523,
                    66.8,
                    1115
                  ]
                },
                {
                  "name": "宁海县",
                  "value": [
                    121.441305,
                    29.293845,
                    68.2,
                    370
                  ]
                },
                {
                  "name": "余姚市",
                  "value": [
                    121.156434,30.044245,
                    109.5,
                    730
                  ]
                },
                {
                  "name": "慈溪市",
                  "value": [
                    121.480111,30.104752,
                    150.2,
                    1104
                  ]
                },
                {
                  "name": "象山县",
                  "value": [
                    121.877665,
                    29.483672,
                    52.6,
                    381
                  ]
                }
              ]
            }
          ]
        };

        return chartOption;
      },
      draw(){
        echarts.registerMap("ningbo", data);
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
        this.draw()
      })
    }
  }
</script>
