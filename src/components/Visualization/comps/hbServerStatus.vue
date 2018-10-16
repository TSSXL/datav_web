<template>
  <section>
    <div :id="option.cmpId" :style="`width:${size.width}px;height:${size.height}px;`">
      <el-row >
        <el-col :span="6">
          <span :style="option.style.wifi.wifiTtileStyle">网络</span>
        </el-col>
        <el-col :span="18">
          <img src="/static/12.png" v-if="wifiDatas[0].time>=0 && wifiDatas[0].time<option.style.wifi.warningLimit" :width="option.style.wifi.width" :height="option.style.wifi.height">
          <img src="/static/11.png" v-if="wifiDatas[0].time>=option.style.wifi.warningLimit && wifiDatas[0].time<option.style.wifi.errorLimit" :width="option.style.wifi.width" :height="option.style.wifi.height">
          <img src="/static/10.png" v-if="wifiDatas[0].time>=option.style.wifi.errorLimit" :width="option.style.wifi.width" :height="option.style.wifi.height">
          <img src="/static/9.png" v-if="wifiDatas[0].status==false" :width="option.style.wifi.width" :height="option.style.wifi.height">
        </el-col>
      </el-row>
      <div class="hbserver" v-for="(data,index) in datas">
      <el-row :style="option.style.rowStyle" >
       <el-col :span="6">
         <span>{{data.title}}</span>
       </el-col>
       <el-col :span="18">
         <el-progress :text-inside="option.style.percentStyle.inside" :stroke-width="option.style.percentStyle.width" :percentage="data.percent" :color="data.color"></el-progress>
       </el-col>
     </el-row>
     </div>

    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  import {postResultByApi} from "../api"
  export default {
    name: 'hbMonitor',
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
        datas:[],
        wifiDatas:[]
      }

    },
    methods: {
      getSize(){
        let v = document.getElementById(this.option.cmpId);
        let obj = v.parentNode.parentNode.parentNode;
        return {
          width: obj.clientWidth,
          height: obj.clientHeight
        };
      },
        query(){
          if(this.option.data.data_type=='API'){
            let url=this.option.data.data_api
            let wifiUrl=this.option.data.data_wifi_api
            let param=this.option.data.data_api_json
            let wifiParam=this.option.data.data_wifi_api_json

            postResultByApi(url,param).then(response=>{

              this.datas=response.data;

            }).catch(e => {
              this.$message({
                type: 'error',
                message: this.option.data.data_api+"接口调用报错"
              });
            });

            postResultByApi(wifiUrl,wifiParam).then(response=>{

              this.wifiDatas=response.data;

            }).catch(e => {
              this.wifiDatas=[
                {
                    "time":"-1",
                  "status":false
                }
              ];
              this.$message({
                type: 'error',
                message: this.option.data.wifiUrl+"接口调用报错"
              });
            });


          }else{
            //按照默认数据来算
            this.datas=this.option.data.static_data;
            this.wifiDatas=this.option.data.wifi_data;
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
    }
  }
</script>
