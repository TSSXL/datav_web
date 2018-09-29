<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:300px'"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import '../../../plugins/echarts/extension/bmap'
  import lineData from '../../../plugins/echarts/extension/cc-bus-lines.js'
  import {MP} from '../../../plugins/echarts/extension/map'

  export default {
    name: 'vMapBusLine',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        chartOption: {
          bmap: {
            center: [125.35, 43.86],
            zoom: 12,
            roam: true,
            mapStyle: {
              'styleJson': [{
                'featureType': 'water',
                'elementType': 'all',
                'stylers': {
                  'color': '#031628'
                }
              }, {
                'featureType': 'land',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#000102'
                }
              }, {
                'featureType': 'highway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'arterial',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#000000'
                }
              }, {
                'featureType': 'arterial',
                'elementType': 'geometry.stroke',
                'stylers': {
                  'color': '#0b3d51'
                }
              }, {
                'featureType': 'local',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#000000'
                }
              }, {
                'featureType': 'railway',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#000000'
                }
              }, {
                'featureType': 'railway',
                'elementType': 'geometry.stroke',
                'stylers': {
                  'color': '#08304b'
                }
              }, {
                'featureType': 'subway',
                'elementType': 'geometry',
                'stylers': {
                  'lightness': -70
                }
              }, {
                'featureType': 'building',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#000000'
                }
              }, {
                'featureType': 'all',
                'elementType': 'labels.text.fill',
                'stylers': {
                  'color': '#857f7f'
                }
              }, {
                'featureType': 'all',
                'elementType': 'labels.text.stroke',
                'stylers': {
                  'color': '#000000'
                }
              }, {
                'featureType': 'building',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#022338'
                }
              }, {
                'featureType': 'green',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#062032'
                }
              }, {
                'featureType': 'boundary',
                'elementType': 'all',
                'stylers': {
                  'color': '#465b6c'
                }
              }, {
                'featureType': 'manmade',
                'elementType': 'all',
                'stylers': {
                  'color': '#022338'
                }
              }, {
                'featureType': 'label',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }]
            },
          },
          series: [{
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: [],
            silent: true,
            lineStyle: {
              normal: {
                opacity: 0.2,
                width: 1
              }
            },
            progressiveThreshold: 500,
            progressive: 100
          }, {
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: [],
            lineStyle: {
              normal: {
                width: 0.02
              }
            },
            effect: {
              constantSpeed: 40,
              show: true,
              trailLength: 0.02,
              symbolSize: 2
            },
            zlevel: 1
          }]
        }
      }
    },
    methods: {
      drawChart() {
        var chart = this.$refs.chart
        this.charts = echarts.init(chart)
        this.chartOption.series[0].data = this.data
        this.chartOption.series[1].data = this.data
        //this.charts.setOption(this.chartOption)

        var obj = chart.parentNode.parentNode.parentNode;//获取父容器

        chart.style.width = (obj.clientWidth) + 'px';
        chart.style.height = (obj.clientHeight) + 'px';
        this.charts.resize();

        //数据处理
        var hStep = 300 / (lineData.length - 1);
        var busLines = [].concat.apply([], lineData.map(function (busLine, idx) {
          var prevPt;
          var points = [];
          for (var i = 0; i < busLine.length; i += 2) {
            var pt = [busLine[i], busLine[i + 1]];
            if (i > 0) {
              pt = [
                prevPt[0] + pt[0],
                prevPt[1] + pt[1]
              ];
            }
            prevPt = pt;

            points.push([pt[0] / 1e4, pt[1] / 1e4]);
          }
          return {
            coords: points,
            lineStyle: {
              normal: {
                color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
              }
            }
          };
        }));

        this.chartOption.series[0].data = lineData
        this.chartOption.series[1].data = lineData
        var ak = 'B4nhF2s1uGNK03AvgcxxMGl0omxmG4QD'; //我申请的
        MP(ak).then(BMap => {
          //获取数据
          this.charts.setOption(this.chartOption)
        })
      }
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.drawChart();
        },
        deep: true
      },
    },
    computed: {},
    created() {
      this.$nextTick(function () {
        this.drawChart()
      })
    }
  }
</script>
<style scoped>

</style>
