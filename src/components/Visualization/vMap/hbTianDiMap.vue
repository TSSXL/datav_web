<template>
  <section  >
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <div id='map' >

      </div>

      <div style="position:absolute;left:70px;top:20px;width:80%;text-align: left;z-index: 99999">
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
  import {BmlHeatmap} from 'vue-baidu-map'
  import {postResultByApi} from "../api"
  import remoteLoad from '@/utils/remoteLoad.js'


  export default {
    name: 'hbTianDiMap',
    components: {
      BaiduMap,BmlHeatmap
    },
    props: {
      option: {type: Object},
      screen:{type:Object}
    },
    data() {
      return {
        radio6:"",
        size:{
          width:400,
          height:200
        },
        lng: 121.55027,
        lat: 29.87386,
        zoom: 13,
        sites:[],
        labels:[],
        labelsShow:false,
        mapObject:null,
        areaMap:{
          "北仑区":{
            "lng":121.841070,
            "lat":29.899890,
            "zoom":13
          },
          "江北区":{
            "lng":121.550850,
            "lat":29.888880,
            "zoom":13
          },
          "大榭开发区":{
            "lng":121.962200,
            "lat":29.915960,
            "zoom":13
          },
          "宁海县":{
            "lng":121.425700,
            "lat":29.289390,
            "zoom":13
          },
          "保税区":{
            "lng":121.851210,
            "lat":29.922250,
            "zoom":13
          },
          "余姚市":{
            "lng":121.149560,
            "lat":30.039130,
            "zoom":13
          },
          "奉化区":{
            "lng":121.402530,
            "lat":29.657180,
            "zoom":13
          },
          "象山县":{
            "lng":121.865500,
            "lat":29.479210,
            "zoom":13
          },
          "东钱湖":{
            "lng":121.656590,
            "lat":29.767950,
            "zoom":13
          },
          "鄞州区":{
            "lng":121.541860,
            "lat":29.819600,
            "zoom":13
          },
          "镇海区":{
            "lng":121.712380,
            "lat":29.951360,
            "zoom":13
          },
          "慈溪市":{
            "lng":121.261770,
            "lat":30.171990,
            "zoom":13
          },
          "杭州湾新区":{
            "lng":121.317620,
            "lat":30.299510,
            "zoom":13
          },
          "海曙区":{
            "lng":121.546900,
            "lat":29.861790,
            "zoom":13
          }

        },

        refresh:true
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
        let self=this;
        var T=window.T;
        //初始化地图对象
        var map = new T.Map("map");
        this.mapObject=map;
        //设置显示地图的中心点和级别
        map.centerAndZoom(new T.LngLat(this.lng, this.lat), this.zoom);

        let type=[
          {
            title: '卫星混合',
            icon:'http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellitepoi.png',
            layer: TMAP_HYBRID_MAP
          },
          {
            title: '地图', //地图控件上所要显示的图层名称
            icon:'http://api.tianditu.gov.cn/v4.0/image/map/maptype/vector.png', //地图控件上所要显示的图层图标（默认图标大小80x80）
            layer: TMAP_NORMAL_MAP //地图类型对象，即MapType。
          },
          {
            title: '卫星',
            icon:' http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellite.png',
            layer: TMAP_SATELLITE_MAP
          }
        ]
        //创建地图类型对象
        var ctrl = new T.Control.MapType(type);
        //添加控件
        map.addControl(ctrl);

        //鼠标滚轮缩放时判断ZOOM大小
        map.addEventListener("zoomend", function () {
          self.zoom=self.mapObject.getZoom();
          if(self.zoom>=15){
            self.getLabels(0);
          }else{
            self.removeLabels(0);

          }
        });// 将标注添加到地图中

        //获取坐标数据
        if(this.option.data.data_type=='API'){
          let url=this.option.data.data_api
          let param=this.option.data.data_api_param

          postResultByApi(url,param).then(async response=>{

            this.option.data.static_data=response.data;
            this.sites=this.option.data.static_data;//await this.formatLat(this.option.data.static_data);
            //创建mark点
            await this.getMarks(map,0);

          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_api+"接口调用报错"
            });
          });


        }else{
          this.sites=this.option.data.static_data;
          //创建mark点
          this.getMarks(map,0);

        }

      },

      //生成标签
      getLabels(i){
        if(i>=this.labels.length){
          this.labelsShow=true;
          return ;
        }
        //创建地图文本对象
        this.mapObject.addOverLay(this.labels[i]);
        this.getLabels(i+1);
      },
      //删除标签
      removeLabels(i){
        if(!this.labelsShow || i>=this.labels.length){
          this.labelsShow=false;
          return ;
        }
        //创建地图文本对象
        this.mapObject.removeOverLay(this.labels[i]);
        this.removeLabels(i+1);
      },

      //递归获取坐标点
      async getMarks(map,i){
        let self=this;
        if(i>=this.sites.length){
          this.option.newData=null;
          return ;
        }
        let site=this.sites[i];
        let iconStyleWidth=this.option.style.icon.width;
        let iconStyleHeight=this.option.style.icon.height;
        //创建图片对象
        var icon = new T.Icon({
          iconUrl: "static/ponit.png",
          iconSize: new T.Point(iconStyleWidth, iconStyleHeight),
          iconAnchor: new T.Point(20,25)
        });
        //向地图上添加自定义标注
        var marker = new T.Marker(new T.LngLat(site.LNG, site.LAT), {icon: icon});
        map.addOverLay(marker);

        var latlng = new T.LngLat(site.LNG, site.LAT);
        var label = new T.Label({
          text: "<span style='font-size: 20px'>"+site.MC+"</span>",
          position: latlng,
          offset: new T.Point(-9, 0)
        });
        this.labels.push(label);



        //向地图上添加窗口
        var infoWin1 = new T.InfoWindow();
        marker.addEventListener("click", function () {
          //关闭当前窗口，然后重新创建
          marker.closeInfoWindow(infoWin1);
          self.initWindow(marker,site,infoWin1);
        });// 将标注添加到地图中

        //递归
        this.getMarks(map,i+1);
      },


      //创建坐标窗口
      async  initWindow(marker,s,infoWin1){
        //API废水
        if(this.option.style.isFs && this.option.data.data_type=="API"){
          let url=this.option.data.data_Info_api
          let param=this.option.data.data_api_Info_param
          param.id=s.QYID;
          postResultByApi(url,param).then(async response=>{

            let info=response.data[0];
            let content=await this.getFsContent(info);

            infoWin1.setContent(content);
            marker.openInfoWindow(infoWin1);

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
          infoWin1.setContent(content);
          marker.openInfoWindow(infoWin1);


        }
        //API废气
        else if(this.option.data.data_type=="API"){
          let url=this.option.data.data_Info_api
          let param=this.option.data.data_api_Info_param
          param.id=s.QYID;
          postResultByApi(url,param).then(async response=>{

            let info=response.data[0];
            let content=await this.getFqContent(info);
            infoWin1.setContent(content);
            marker.openInfoWindow(infoWin1);


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

          infoWin1.setContent(content);
          marker.openInfoWindow(infoWin1);

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

        content="<div class='windowInfo' style='"+this.option.style.windowStyle+"'>"+
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

        content="<div class='windowInfo' style='"+this.option.style.windowStyle+"'>"+
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


    },
    mounted(){
      if (window.T ) {
        this.query()
        // 未载入高德地图API，则先载入API再初始化
      } else {
        Promise.all([
          remoteLoad('http://api.tianditu.gov.cn/api?v=4.0&tk=674ebcb845d2ee07fe94b111519b1518')
        ]).then(() => {
          this.query()
        })
      }
    },
    created() {

      this.$nextTick(() => {
        this.size = this.getSize();
      });
      if(this.option.data.areaMap!=null && this.option.data.areaMap!=""){
          this.areaMap=this.option.data.areaMap;
      }

    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          if(curVal.newData!=null && curVal.newData.areaName!=""){
            let areaInfo=this.areaMap[curVal.newData.areaName];
            this.mapObject.centerAndZoom(new T.LngLat(areaInfo.lng, areaInfo.lat), areaInfo.zoom)

          }

          this.size = this.getSize();
        },
        deep: true
      },


    }
  }
</script>
<style>
  #map{
    width: 100%;
    height: 100%;
  }
</style>
