<template>
  <section :style="textStyle">
    <div v-for="(title,index) of titles" :key="index" :style="divStyle">
      <span v-if="option.style.showLeftIcon" :style="leftIconStyle[index]">1</span><span :style="style">{{title.value}}</span><span v-if="option.style.showRightIcon" :style="option.style.rightIconStyle[index]">1</span>
    </div>

  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  import {postResultByApi} from "../api"
  export default {
    name: 'vTextTitle',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        titles:[],
        leftIconStyle:[]

      }
    },
    methods: {
      query(){
        if(this.option.data.data_type=='API'){
          let url=this.option.data.data_api
          let param=this.option.data.data_api_json

          postResultByApi(url,param).then(response=>{


            this.titles= response.data;
            this.queryStyle()

          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_api+"接口调用报错"
            });
          });


        }else{
          this.titles= this.option.data.static_data;
          this.queryStyle()
        }

      },
      queryStyle(){
        if(this.option.data.style_type=='API'){
          let url=this.option.data.data_style_api
          let param=this.option.data.data_style_api_json

          postResultByApi(url,param).then(response=>{


            this.leftIconStyle= response.data

          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_style_api+"接口调用报错"
            });
          });


        }else{
          this.leftIconStyle= this.option.style.leftIconStyle
        }
      }
    },
    computed: {
      path() {
        return getPath()
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
          return s;
      },

    },
    created() {

      this.query();
      if(this.option.style.clock!=null && this.option.style.clock!=""){
        setInterval(this.query, this.option.style.clock);
      }
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.query();
        },
        deep: true
      }
    }
  }
</script>
<style scoped>
</style>
