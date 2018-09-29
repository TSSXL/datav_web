<template>
  <section >
    <div  :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <span :style="aqiStyle">{{aqiValue}}</span>
      <img :src="backgroundImg" :style="`width: 100%; height: 100%;`" />
      <span :style="statusStyle">空气质量等级:{{status}}</span>
      <span :style="mainStyle">首要污染物:{{main}}</span>
    </div>

  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
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
        aqiValue:40,
        status:'优',
        main:'PM2.5',
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
      this.backgroundImg=this.path+"datav-border/5b8817467e54120032097d26.png";
      this.$nextTick(() => {
        this.size = this.getSize();
      });

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
