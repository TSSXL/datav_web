<template>
  <section >
    <div  :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">

      <img :src="bImg" :style="`width: 100%; height: 100%;`" />

    </div>

  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  import {postResultByApi} from "../api"
  export default {
    name: 'vImgLink',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        size:{
          width:400,
          height:200
        },
        bImg:""
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
        if(this.option.data.data_type=="API"){
          let url=this.option.data.data_api
          let param=this.option.data.data_api_json

          postResultByApi(url,param).then(response=>{

            this.bImg= this.path+response.data[0].value;
          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_api+"接口调用报错"
            });
          });
        }else{
          this.bImg= this.path+this.option.data.static_data[0].value;

        }
      }
    },
    computed: {
      path() {
        return getPath()
      },



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
