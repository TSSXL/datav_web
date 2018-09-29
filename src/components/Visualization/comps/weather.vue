<template>
  <section :style="textStyle">
    <img :src="imgUrl" style="width:150px;height:150px">
    <div v-for="(value,index) of list" :style="divStyle" style="padding:10px;">
      <span :style="style" >{{value}}</span>
    </div>

  </section>
</template>
<script>
  import {getResultByApi} from '@/components/Visualization/api'



  export default {
    props: {
      option: {type: Object}
    },
    data() {
      return {
        list:[],
        imgUrl:"/static/weather/",
        intervalSetting:null
      }
    },
    methods: {
      getInfo(){
        getResultByApi("http://192.168.10.11:30812/api/airquality/getWeathers").then(response => {
          if(response.code == 20000){
            this.list.push(response.data[5] + " "+ response.data[6].substr(response.data[6].lastIndexOf("日")+1));
            this.list.push(response.data[7]);
            this.list.push(response.data[10]);
            this.imgUrl += response.data[8];
          }
        })
      }
    },
    computed: {
      style: function(){

        let s =  'font-size: ' + this.option.style.text.fontSize + 'px; color: ' + this.option.style.text.color + '; font-family: ' + this.option.style.text.fontFamily + '; cursor: '+this.option.style.cursor+';';
        if(this.option.style.border && this.option.style.border.show){
          s += `border:${this.option.style.border.width}px ${this.option.style.border.color} ${this.option.style.border.type};padding:${this.option.style.border.padding}px;`;
          s += `box-shadow:0 0 ${this.option.style.border.boxShadowWidth}px ${this.option.style.border.boxShadowColor};`;
        }



        return s
      },
      textStyle:function(){
        let s=`text-align:${this.option.style.text.textAlign}`;


        return s;
      },
      divStyle:function(){
        let s=`text-align:${this.option.style.text.textAlign};`;
        if(this.option.style.text.divCss!=null){
          s+=`${this.option.style.text.divCss};`
        }
        if(this.option.style.text.backgroundImg!=null){
          s+=`background-image:url("${this.path}${this.option.style.text.backgroundImg}")`
        }
        console.log(s);
        return s;
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getInfo();

        /*this.intervalSetting = setInterval(function () {
          this.getInfo();
        }, 3600000);*/
      })
    },
    destroyed() {
      console.log('destroyed');
      /*clearInterval(this.intervalSetting);*/
    }
  }
</script>
<style scoped>

</style>
