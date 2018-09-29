<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";
  import {getResultByApi} from "../api"

  export default {
    name: 'mlAreaBasic',
    extends:vChartBase,
    methods: {
   async getChartOption(option){
        if(option.data.data_type=='API'){
            let url=option.data.data_api
          if(option.newData!=null && option.newData.id!=null){

           url=url+"/"+option.newData.id;
          }else{
            url=url+"/"+option.data.data_api_id;
          }
       let data= await getResultByApi(url).then(response=>{
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
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        chartOption.grid = option.style.grid;
        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;
        if(option.style.visualMap!=null){
          chartOption.visualMap=option.style.visualMap
        }
        if(option.style.tooltip!=null){
          chartOption.tooltip=option.style.tooltip
        }
        chartOption.xAxis[0].data = option.data.static_data.map(item => item.x);
        chartOption.series[0].data = option.data.static_data.map(item => item.y);
        return chartOption;
      }
    },
//    watch: {
//      option: {
//        handler(curVal, oldVal){
//          console.log("折线图")
//          console.log(curVal)
//        },
//        deep:true
//      }
//    }
  }
</script>
