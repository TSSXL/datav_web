<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <!--<el-button @click="showStation" style="display: block;float:right;"  v-if="show==false">展开站点列表</el-button>-->
      <!--<el-button @click="hideStation" style="display: block;float:right;" v-if="show">收起站点列表</el-button>-->
      <img src="/static/downButton.png" @click="showStation" style="width: 15%;float: right;cursor:pointer;" v-if="show==false">
      <img src="/static/downButton.png" @click="hideStation" style="width: 15%;float: right;-webkit-transform:rotate(180deg);cursor:pointer;" v-if="show">
      <div v-if="show" :style="`width: ${size.width}px;`">
        <img src="/static/rowArrow.png" @click="getUp()" v-if="startNum!=0" :style="`cursor:pointer;position: absolute;-webkit-transform:rotate(180deg);${option.style.upArrowStyle};`">
        <img src="/static/rowArrow.png" @click="getDown()" v-if="showDown" :style="`cursor:pointer;position: absolute;${option.style.downArrowStyle};`">
        <table :style="option.style.tableStyle">
          <!--<thead :style="option.style.theadStyle">-->
          <!--<th>站点名称</th>-->
          <!--</thead>-->
          <tbody  >
              <tr v-for="(item,index) in list" :key="index" :style="`background-color:${item.itemBackground};${option.style.trStyle}`">
                    <td>{{item.station}}</td>
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
      query(){

          this.list=this.option.data.static_data.slice(this.startNum,this.startNum+10);

          if((this.startNum+10)>=this.option.data.static_data.length){
            this.showDown=false;
          }else{
            this.showDown=true;
          }
          this.listLoading=false;
      },
      getUp(){
          this.startNum--;
        this.query();
      },
      getDown(){
        this.startNum++;
        this.query();
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
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.size = this.getSize();
          this.query();
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
    border-radius: 25px;
  }
  td{
    border:1px solid #ffffff;
    border-radius: 25px;
  }

  table{
    border:1px solid #ffffff;

  }
</style>
