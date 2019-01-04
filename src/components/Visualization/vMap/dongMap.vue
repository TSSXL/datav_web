<template>
  <section  >
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <div id='map' style="width: 100%;height: 100%;z-index: 0;">
      </div>
    </div>
  </section>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import {BmlHeatmap} from 'vue-baidu-map'
  import {postResultByApi} from "../api"
  import remoteLoad from '../../../utils/remoteload.js'


  export default {
    name: 'dongMap',
    components: {
      BaiduMap,BmlHeatmap
    },
    props: {
      option: {type: Object},
      screen:{type:Object}
    },
    data() {
      return {
        size:{
          width:400,
          height:300
        },
        lng:121.418006,
        lat: 29.786533,
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

        //添加右击放大缩小
        function zoomIn(e) {
          map.zoomIn();
        };
        function zoomOut(lnglat) {
          map.zoomOut();
        }
        var Menu = new T.ContextMenu({
          width: 50
        });
        var _MenuItem2 = new T.MenuItem("放大", zoomIn);
        Menu.addItem(_MenuItem2);
        var _MenuItem3 = new T.MenuItem("缩小",zoomOut);
        Menu.addItem(_MenuItem3);
        map.addContextMenu(Menu);

        var arrayObj = new Array();
        for (var i = 0; i < 500; i++) {
          var marker = new T.Marker(new T.LngLat(Math.random() * 40+ 85, Math.random() *30+ 21), {title: i});
          arrayObj.push(marker);
        }
        var markers = new T.MarkerClusterer(map, {markers: arrayObj});
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
          iconUrl: "static/red.svg",
          iconSize: new T.Point(10, 15),
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

        //递归
        this.getMarks(map,i+1);
      }


    },
    mounted(){
      Promise.all([
        remoteLoad('http://api.tianditu.gov.cn/api?v=4.0&tk=674ebcb845d2ee07fe94b111519b1518')
      ]).then(() => {
        this.query()
      })

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
          this.size = this.getSize();
          if(curVal.newData!=null && curVal.newData.areaName!=""){
            let areaInfo=this.areaMap[curVal.newData.areaName];
            this.mapObject.centerAndZoom(new T.LngLat(areaInfo.lng, areaInfo.lat), areaInfo.zoom)

          }


        },
        deep: true
      }

    }
  }
</script>
<style scoped>
  /*.msg span{*/
    /*display: block;*/
    /*height:25%;*/
    /*width:100%;*/
    /*color:#FFFFFF;*/
    /*font-size: 12px;*/
    /*line-height: 17px;*/
    /*margin-top: 5px;*/
    /*text-indent: 12px;*/
  /*}*/
  /*.msg span:first-child{*/
   /*margin-top: 15px;*/
  /*}*/
  /*.msg span img {*/
    /*height:15px;*/
    /*width:15px;*/
    /*margin-left: -19px;*/
    /*position: absolute;*/
  /*}*/
</style>
