<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <!--<el-button @click="showStation" style="display: block;float:right;"  v-if="show==false">展开站点列表</el-button>-->
      <!--<el-button @click="hideStation" style="display: block;float:right;" v-if="show">收起站点列表</el-button>-->
      <i class="fa fa-angle-double-down fa-3x" @click="showStation" style="display:block;margin-bottom:11px;width: 15%;float: right;cursor:pointer;" v-if="show==false"></i>
      <i class="fa fa-angle-double-up fa-3x" @click="hideStation" style="display:block;margin-bottom:11px;width: 15%;float: right;cursor:pointer;" v-if="show"></i>
      <div v-if="show" :style="`width: ${size.width}px;`">

        <img src="/static/rowArrow.png" @click="getUp()" v-if="startNum!=0" :style="`cursor:pointer;position: absolute;-webkit-transform:rotate(180deg);${option.style.upArrowStyle};`">
        <img src="/static/rowArrow.png" @click="getDown()" v-if="showDown" :style="`cursor:pointer;position: absolute;${option.style.downArrowStyle};`">
        <table :style="option.style.tableStyle">
          <!--<thead :style="option.style.theadStyle">-->
          <!--<th>站点名称</th>-->
          <!--</thead>-->
          <tbody  >
              <tr v-for="(item,index) in list" :key="index" :style="`${option.style.trStyle}`">
                <td style="cursor: pointer" @click="changeId(item)"><span :style="`left: ${option.style.markLeft}px;border-radius: 10px;display: block;position: absolute;background-color:${item.color};color:${item.color}`">1</span>{{item.PositionName}}</td>
                  </tr>


          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  import vueSeamlessScroll from 'vue-seamless-scroll'
  import {postResultByApi} from "../api"



  export default {
    name: 'airRollList',
    components: {vueSeamlessScroll},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        size:{
          width:400,
          height:200
        },
        list: [],
        listLoading: true,
        show:false,
        startNum:0,
        showSize:5,
        showDown:false
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
      showStation(){
          this.show=true;
      },
      hideStation(){
          this.show=false
      },
    async  query(){

          if(this.option.data.data_type=='API'){
            let url=this.option.data.data_api
            let param=this.option.data.data_api_param
            let data= await postResultByApi(url,param).then(response=>{

              return response.data;
            }).catch(e => {
              this.$message({
                type: 'error',
                message: this.option.data.data_api+"接口调用报错"
              });
            });

            this.option.data.static_data=data;
            this.list=data.slice(this.startNum,this.startNum+this.showSize);
          }else {
            this.list=this.option.data.static_data.slice(this.startNum,this.startNum+this.showSize);
          }


      if((this.startNum+this.showSize)>=this.option.data.static_data.length){
        this.showDown=false;
      }else{
        this.showDown=true;
      }
          this.listLoading=false;
      },
      getUp(){
          this.startNum--;
        this.list=this.option.data.static_data.slice(this.startNum,this.startNum+this.showSize);
        if((this.startNum+this.showSize)>=this.option.data.static_data.length){
          this.showDown=false;
        }else{
          this.showDown=true;
        }
      },
      getDown(){
        this.startNum++;
        this.list=this.option.data.static_data.slice(this.startNum,this.startNum+this.showSize);
        if((this.startNum+this.showSize)>=this.option.data.static_data.length){
          this.showDown=false;
        }else{
          this.showDown=true;
        }
      },
      changeId(item){
        this.$emit('ievent',{"id":item.StationID});
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
  .drip{
    background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
  }

  tr{
    border:1px solid #ffffff;
  }
  td{
    border:1px solid #ffffff;
  }

  table{
    border:1px solid #ffffff;

  }
</style>
