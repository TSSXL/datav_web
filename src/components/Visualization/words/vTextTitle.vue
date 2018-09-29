<template>
  <section :style="textStyle">
    <div v-for="(title,index) of titles" :key="index" :style="divStyle">
      <span :style="style" @click="redirectRoute();">{{title.value}}</span>
    </div>

  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  export default {
    name: 'vTextTitle',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {}
    },
    methods: {
      redirectRoute(){
        if(this.option.data.datamap.url.map !=""){
          let url ="";
          let pathNow = this.$route.path;
          if(pathNow.substr(pathNow.indexOf("/",2)+1,8)=="preview1"){
            url = this.option.data.datamap.url.map.replace("preview1","preview");
          }else{
            url = this.option.data.datamap.url.map.replace("preview","preview1");
          }
          window.open(url, '_self');
        }
      }

    },
    computed: {
      path() {
        return getPath()
      },
      titles: function () {
        var data = this.option.data.static_data

          return data
      },
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
    }
  }
</script>
<style scoped>
</style>
