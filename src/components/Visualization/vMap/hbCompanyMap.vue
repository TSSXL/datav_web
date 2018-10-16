<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">

      <baidu-map class="bmap" :center="center" :map-click="false" :zoom="zoom" @ready="handler" >
        <!-- 比例尺 -->
        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
        <!-- 地图类型 -->
        <bm-map-type :map-types="mapType"  anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>


        <bm-marker v-for="(marker,index) in markers" :key="index"
                   :vid="index"
                   :position="marker.position"
                   :icon="marker.icon"
                   :zIndex="marker.zIndex"
        @click="initWindow">

        </bm-marker>
        <bm-info-window :position="window.center" :show="show"
                        @close="infoWindowClose" @open="infoWindowOpen">
          <div v-html="window.content">

          </div>
        </bm-info-window>
      </baidu-map>

      <div style="position:absolute;left:70px;top:20px;width:80%;text-align: left">
        <template v-if="option.style.isFs">
          <el-radio-group v-model="radio6" size="mini">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="ph">PH值</el-radio-button>
            <el-radio-button label="xyl">化学需氧量(mg/L)</el-radio-button>
            <el-radio-button label="fs">废水流量(m3/h)</el-radio-button>
          </el-radio-group>
        </template>
        <template v-else>
          <el-radio-group v-model="radio6" size="mini">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="so2">SO2折算浓度(mg/m3)</el-radio-button>
            <el-radio-button label="yc">烟尘折算浓度(mg/m3)</el-radio-button>
            <el-radio-button label="nox">Nox折算浓度(mg/m3)</el-radio-button>
            <el-radio-button label="yq">烟气流量(M3/h)</el-radio-button>
          </el-radio-group>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import {postResultByApi} from "../api"

  export default {
    name: 'hbCompanyMap',
    components: {
      BaiduMap
    },
    props: {
      option: {type: Object},
      screen:{type:Object}
    },
    data() {
      let self = this;
      return {
        radio6:"",
        size:{
          width:400,
          height:200
        },
        center: {lng: 121.55027, lat: 29.87386},
        zoom: 13,
        show:false,
        sites:[],
        window: {
            center:{lng:0,lat:0},
          content:""
        },
        mapType:['BMAP_NORMAL_MAP','BMAP_SATELLITE_MAP'],
        markers: []

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
      handler ({BMap, map}) {
          //鼠标滚轮缩放开启
        map.enableScrollWheelZoom(true);
        if(this.option.style.mapTypeIndex==1){
          map.setMapType(BMAP_SATELLITE_MAP);
        }

      },
      query(){
        if(this.option.data.data_type=='API'){
          let url=this.option.data.data_api
          let param=this.option.data.data_api_param

          postResultByApi(url,param).then(response=>{

            this.option.data.static_data=response.data;
            this.sites=this.option.data.static_data;
            this.getMaker(this.sites);

          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_api+"接口调用报错"
            });
          });


        }else{
          this.sites=this.option.data.static_data;
          this.getMaker(this.sites);

        }

      },
      getMaker(sites){
        //空气

        let self=this
        for(let i=0;i<sites.length;i++) {
          let s =sites[i];

          var marker={
            position: {lng :s.LNG,lat:s.LAT},
            icon:{url: '/static/ponit.png',
              size: {width: self.option.style.icon.width, height: self.option.style.icon.height},
              opts:{imageSize:{width: self.option.style.icon.width, height: self.option.style.icon.height}}},
            zIndex:i

          }

           this.markers.push(marker);


        }

      },
      infoWindowClose () {
        this.show = false
      },
      infoWindowOpen (e) {


        this.show = true
      },

      async initWindow(e){

          //当前节点信息
        var s=this.sites[e.target.zIndex];

        let info="";

        //API废水
        if(this.option.style.isFs && this.option.data.data_type=="API"){
          let url=this.option.data.data_Info_api
          let param=this.option.data.data_api_Info_param
          param.id=s.QYID;
          postResultByApi(url,param).then(async response=>{

            let info=response.data[0];
            let content=await this.getFsContent(info);
            this.createWindow(s,content);

          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_Info_api+"接口调用报错"
            });
          });
        }
        //废水
        else if(this.option.style.isFs){
          info={ qy:"宁波中华纸业有限公司",
            pk: [
              {
                "id": "1",
                "pkmc": "宁波中华纸业有限公司  #1",
                "ph": "7.957",
                "hxxyl": "65.36",
                "fsll": "7.957",
                "jcsj": "2018-09-01 14时",
                "xzqy": "宁波市市直属",
                "sbid": "3183",
                "datatype": "Hour",
                "bz": "330203"
              }, {
                "id": "2",
                "pkmc": "宁波中华纸业有限公司  #2",
                "ph": "6.444",
                "hxxyl": "21.6",
                "fsll": "6.444",
                "jcsj": "2018-09-01 14时",
                "xzqy": null,
                "sbid": "3184",
                "datatype": "Hour",
                "bz": "330212"
              }, {
                "id": "3",
                "pkmc": "宁波中华纸业有限公司  #3",
                "ph": "6.61",
                "hxxyl": "125.64",
                "fsll": "6.61",
                "jcsj": "2018-09-01 14时",
                "xzqy": "宁波市北仑区",
                "sbid": "1601",
                "datatype": "Hour",
                "bz": "330206"
              }]
          };
          let content=await this.getFsContent(info);
          this.createWindow(s,content);

        }
        //API废气
        else if(this.option.data.data_type=="API"){
          let url=this.option.data.data_Info_api
          let param=this.option.data.data_api_Info_param
          param.id=s.QYID;
          postResultByApi(url,param).then(async response=>{

            let info=response.data[0];
            let content=await this.getFqContent(info);
            this.createWindow(s,content);

          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_Info_api+"接口调用报错"
            });
          });

        }
        //废气
        else{
          let info= {
            qy: "国电浙江北仑第一发电有限公司",
            pk:[
              {
                "bz": "330206",
                "datatype": "Hour",
                "sbid": "470",
                "xzqy": "宁波市北仑区",
                "jcsj": "2018-09-01 14时",
                "yqll": "1821483.14",
                "noxzs": "37.91",
                "yczs": "3.44",
                "so2zs": "19.42",
                "pkmc": "国电浙江北仑第一发电有限公司#2",
                "id": "115"
              },
              {
                "bz": "330206",
                "datatype": "Hour",
                "sbid": "1336",
                "xzqy": "宁波市北仑区",
                "jcsj": "2018-09-01 14时",
                "yqll": "1677940.4212",
                "noxzs": "37.0739",
                "yczs": "2.4641",
                "so2zs": "16.2669",
                "pkmc": "国电浙江北仑第一发电有限公司#1",
                "id": "115"
              }
            ]

          };
          let content=await this.getFqContent(info);
          this.createWindow(s,content);
        }


      },


      getFsContent(info){
        let iStyle="<i style='color:"+this.option.style.titleBckgroundColor+";background-color: "+this.option.style.titleBckgroundColor+"'>1</i>";
        let content="";
        let phColor="";
        let xylColor="";
        let fsColor="";
        if(this.radio6=="ph"){
          phColor=iStyle
        }else if(this.radio6=="xyl"){
          xylColor=iStyle
        }else if(this.radio6=="fs"){
          fsColor=iStyle
        }

        content="<div class='windowInfo'>"+
          "<span style='display: block;border-bottom: 1px solid;background-color: "+this.option.style.titleBckgroundColor+" '>"+info.qy+"</span>";
        info.pk.forEach(item=>{
          content=content+"<div style='margin: 5px;border: 1px solid #000;'>"+
            "<span style='display: block'>排口名称:"+item.pkmc+"</span>"+
            "<span style='display: block;'>"+phColor+"PH值:"+item.ph+"</span>"+
            "<span style='display: block;'>"+xylColor+"化学需氧量(mg/L):"+item.hxxyl+"</span>"+
            "<span style='display: block;'>"+fsColor+"废水流量(m3/h):"+item.fsll+"</span>"+
            "<span style='display: block'>更新时间:"+item.jcsj+"时"+"</span>"+
            "</div>"
        });
        content+="</div>";
        return content;
      },

      getFqContent(info){
        let iStyle="<i style='color:"+this.option.style.titleBckgroundColor+";background-color: "+this.option.style.titleBckgroundColor+"'>1</i>";
        let content="";
        let so2Color="";
        let ycColor="";
        let noxColor="";
        let yqColor="";
        if(this.radio6=="so2"){
          so2Color=iStyle
        }else if(this.radio6=="yc"){
          ycColor=iStyle
        }else if(this.radio6=="nox"){
          noxColor=iStyle
        }else if(this.radio6=="yq"){
          yqColor=iStyle
        }

        content="<div class='windowInfo'>"+
          "<span style='display: block;border-bottom: 1px solid;background-color: "+this.option.style.titleBckgroundColor+" '>"+info.qy+"</span>";
        info.pk.forEach(item=>{
            console.log(item);
          content=content+"<div style='margin: 5px;border: 1px solid #000;'>"+
            "<span style='display: block;'>排口名称:"+item.pkmc+"</span>"+
            "<span style='display: block;'>"+so2Color+"SO2折算浓度(mg/m3):"+item.so2zs+"</span>"+
            "<span style='display: block;'>"+ycColor+"烟尘折算浓度(mg/m3):"+item.yczs+"</span>"+
            "<span style='display: block;'>"+noxColor+"NOX折算浓度(mg/m3):"+item.noxzs+"</span>"+
            "<span style='display: block;'>"+yqColor+"烟气流量(m3/h):"+item.yqll+"</span>"+
            "<span style='display: block'>更新时间:"+item.jcsj+"</span>"+
            "</div>"
        });
        content+="</div>";
        return content;
      },

      //初始化信息窗口
      createWindow(info,content){
        this.window.center.lng=info.LNG;
        this.window.center.lat=info.LAT;
        this.window.content=content;
        this.show = true
      },

    },
    mounted(){


    },
    created() {
      this.query();
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
      },


    }
  }
</script>
<style>
  .bmap{
    width: 100%;
    height: 100%;
  }
  .windowInfo{
    color: #000000;
  }
</style>
