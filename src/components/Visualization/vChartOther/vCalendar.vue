<template>
  <div class="charts">
    <i class="fa fa-angle-double-right fa-3x"  style="z-index:999;position:absolute;top: 50%;right: 1px" @click="nowMonth" v-if="nowData!='2018-08'" circle></i>
    <i class="fa fa-angle-double-left fa-3x"  style="position:absolute;z-index:999;top: 50%;left: 1px" @click="lastMonth" circle></i>
    <span style="float:right;font-size: 25px;margin-top:14px">{{splitData[0]}}</span>
    <span style="float:right;font-size: 40px">{{splitData[1]}}/</span>

    <div ref='chart' :style="'width:300px;height:200px;'"></div>


  </div>
</template>
<script>
  import vChartBase from "../vChartBase";
  import echarts from 'echarts'
  import {postResultByApi} from "../api"

  export default {
    name: 'v-calendar',
    extends:vChartBase,
    data() {
      return {
        nowData:"2018-08",
        splitData:['2018','08']
      }
    },
    methods: {
    async  getChartOption(option){
      if(option.data.data_type=='API'){
        let url=option.data.data_api
        let range=this.option.style.calendar[0].range
        if(option.newData!=null && option.newData.id!=null){

          url=url+"/"+option.newData.id;
        }else{
          url=url+"/"+option.data.data_api_id;
        }
        let data= await postResultByApi(url,range).then(response=>{
          return response.data;
        }).catch((e) => {
          this.$message({
            type: 'error',
            message: option.data.data_api+"接口调用报错"
          });
        });

        option.data.static_data=data;
        return this.returnChartOption(option);


      }else{
        return this.returnChartOption(option);
      }
      },

      returnChartOption(option){
        let heatmapData = [];
        let lunarData = [];
        for (let i = 0; i < option.data.static_data.length; i++) {

            heatmapData.push([
              option.data.static_data[i][0],
              option.data.static_data[i][1]
            ]);


          lunarData.push([
            option.data.static_data[i][0],
            1,
            option.data.static_data[i][2],
            option.data.static_data[i][3]
          ]);
        }

        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.grid = option.style.grid;
        chartOption.visualMap = option.style.visualMap;
        chartOption.calendar = option.style.calendar;
        let tooltip={
          textStyle:{
            fontSize:25
          },
          formatter: function (params) {
            return 'AQI: ' + params.value[1];
          }
        };
        chartOption.tooltip = tooltip;
        chartOption.series = option.style.series;
        chartOption.series[0].label.normal.formatter = function(params) {
          var d = echarts.number.parseDate(params.value[0]);
          return d.getDate();
        };
        chartOption.series[1].label.normal.formatter = function (params) {
          return "\n\n\n" + (params.value[3] || "");
        };
        chartOption.series[0].data = lunarData;
        chartOption.series[1].data = lunarData;
        chartOption.series[2].data = heatmapData;
        console.log(chartOption);
        return chartOption;
      },

      nowMonth(){
          this.nowData='2018-08'
        this.option.style.calendar[0].range="2018-08"
      },
      lastMonth(){
        this.nowData='2018-07'
        this.option.style.calendar[0].range="2018-07"

      }
    },
    watch: {
      nowData: {
        handler(curVal, oldVal) {
          this.splitData=curVal.split("-");
        },
        deep: true
      }
    }
  }
</script>
