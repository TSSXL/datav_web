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
  import {
    getItem,
    editItem
  } from "@/views/visualization/screen/api";


  export default {
    props: {
      option: {type: Object}
    },
    data() {
      return {
        id: this.$route.params.id,
        list:[],
        imgUrl:"/static/weather/",
        intervalSetting:null,
        url:this.option.data.datamap.url.map,
        screen:
          {
            name: '',
            desc: '',
            tag: [],
            publish: {},
            version: '',
            page: {},
            components: []
          }
      }
    },
    methods: {
      getInfo(){
        if(this.option.data.weather != null && new Date().getDate()==this.option.data.time){
          this.list = this.option.data.weather;
          this.imgUrl = this.option.data.imgUrl;
        }else{
          getResultByApi(this.url).then(response => {
            if(response.code == 20000){
              this.list.push(response.data[5] + " "+ response.data[6].substr(response.data[6].lastIndexOf("日")+1));
              this.list.push(response.data[7]);
              this.list.push(response.data[10]);
              this.imgUrl += response.data[8];
              this.option.data.weather = this.list;
              this.option.data.imgUrl = this.imgUrl;
              this.option.data.time = new Date().getDate();
              for(let i =0;i<this.screen.components.length;i++){
                if(this.screen.components[i].name == "weather"){
                  this.screen.components[i].option = this.option;
                }
              }
              if(this.screen.components.length>0){
                editItem(this.id, this.screen).then(response => {});
              }
            }
          })
        }
      },
      fetchData() {
        getItem(this.id).then(response => {
          this.screen = response.data;
        });
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
    created() {
      this.fetchData();
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
