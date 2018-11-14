<template>
  <section >
    <div  :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <span :style="aqiStyle">{{info.aqiValue}}</span>
      <img :src="backgroundImg" :style="`width: 100%; height: 100%;`" />
      <span :style="statusStyle">空气质量等级:{{info.status}}</span>
      <span :style="mainStyle">首要污染物:{{info.main}}</span>
    </div>

  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  import {postResultByApi} from "../api"
  export default {
    name: 'airAQI',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
          aqi:0,
          backgroundImg:"",
        info:{
          aqiValue:null,
          status:'',
          main:''
        },

        size:{
          width:400,
          height:200
        },

      }
    },
    methods: {
      getSize(){
        let v = document.getElementById(this.option.cmpId);
        let obj = v.parentNode.parentNode.parentNode;
        return {
          width:obj.clientWidth,
          height:obj.clientHeight
        };
      },
      query(){
        if(this.option.data.data_type=='API'){
          let url=this.option.data.data_api
          let param=this.option.data.data_api_param

          postResultByApi(url,param).then(response=>{

            this.option.data.static_data=response.data;
            this.info=this.option.data.static_data[0];
            if(this.info.aqiValue<50){
              this.backgroundImg="/static/aqiGreen.png";
            }else if(this.info.aqiValue>=50 && this.info.aqiValue<100){
              this.backgroundImg="/static/aqiYellow.png";
            }else if(this.info.aqiValue>=100 && this.info.aqiValue<150){
              this.backgroundImg="/static/aqiOrange.png";
            }else if(this.info.aqiValue>=150 && this.info.aqiValue<200){
              this.backgroundImg="/static/aqiRed.png";
            }else if(this.info.aqiValue>=200 && this.info.aqiValue<300){
              this.backgroundImg="/static/aqiPink.png";
            }else if(this.info.aqiValue>=300){
              this.backgroundImg="/static/aqiDeepRed.png";
            }

          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_api+"接口调用报错"
            });
          });


        }else{
          this.backgroundImg="/static/aqiGreen.png";
          this.info=this.option.data.static_data[0];
        }
      }

    },
    computed: {
      path() {
        return getPath()
      },
      aqiStyle(){
          let s=`position: absolute;`
          if(this.option.style.aqiTextStyle!=null){
              s+=this.option.style.aqiTextStyle;
          }
        return s;
      },
      statusStyle(){
        let s=`position: absolute;`
        if(this.option.style.aqiStatusStyle!=null){
          s+=this.option.style.aqiStatusStyle;
        }
        return s;
      },
      mainStyle(){
        let s=`position: absolute;`
        if(this.option.style.aqiMainStyle!=null){
          s+=this.option.style.aqiMainStyle;
        }
        return s;
      }

    },
    created() {

      this.$nextTick(() => {
        this.size = this.getSize();
      });
      this.query();
      if(this.option.style.clock!=null && this.option.style.clock!=""){
        setInterval(this.query, this.option.style.clock);
      }
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.size = this.getSize();
        },
        deep: true
      }
    },
  }
</script>
<style scoped>
  span{
    display: block;
  }
</style>
