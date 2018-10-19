<template>
  <section>
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" @change="handleClick">
      <el-radio-button label="g">废气</el-radio-button>
      <el-radio-button label="w">废水</el-radio-button>
    </el-radio-group>

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
        tabPosition:this.option.data.tab,
        pageTab:this.option.data.tab,
        urlParam:this.option.data.urlParam
      }
    },
    methods: {
      handleClick(value){
        if(this.pageTab == value){
          return false;
        }
        if(value=="w"){
          let url = this.$route.path;
          if(url.substr(url.indexOf("/",2)+1,8)=="preview1"){
            url = url.replace("preview1","preview");
          }else{
            url = url.replace("preview","preview1");
          }
          this.$router.push({path: url.substr(0,url.lastIndexOf("/")+1)+this.urlParam});
        }
        if(value=="g"){
          let url = this.$route.path;
          if(url.substr(url.indexOf("/",5)+1,8)=="preview1"){
            url = url.replace("preview1","preview");
          }else{
            url = url.replace("preview","preview1");
          }
          this.$router.push({path: url.substr(0,url.lastIndexOf("/")+1)+this.urlParam});
        }
      }
    },
    computed: {

    },
    mounted() {

    }
  }
</script>
<style scoped>

</style>
