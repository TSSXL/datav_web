<template>
  <div>
    经度：{{value.lng}} 维度：{{value.lat}} 地址：{{value.address}} <el-button type="text" @click="isEdit=!isEdit" size="mini"><li class="fa fa-map" /></el-button>
    <section v-show="isEdit">
      <el-form-item label="定位" >
        <div v-bind:style="{ width: width + 'px' , height: height + 'px' }">
          <el-amap vid="amapMap" :zoom="zoom" :center="center" :plugin="plugin" :events="events" :cursor="cursor">
            <!--显示信息窗体-->
            <el-amap-info-window  :key="mywindow.id"  v-for="mywindow in mywindows" :position="mywindow.position" :content="mywindow.content" :visible="mywindow.visible" :events="mywindow.events"></el-amap-info-window>
            <!--蓝色小标-->
            <el-amap-marker  :key="marker.id" v-for="marker in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
            <!--黄色的圆圈-->
            <el-amap-circle :key="circle.id" v-for="circle in circles" :center="circle.center" :radius="circle.radius" :fillOpacity="circle.fillOpacity" :events="circle.events" :strokeColor="circle.strokeColor" :strokeStyle="circle.strokeStyle" :fillColor="circle.fillColor"></el-amap-circle>
          </el-amap>
        </div>
      </el-form-item>

      <el-form-item label="经度" >
        <el-input-number v-model="value.lng" :min="0" :step="0.001" label="经度" @change="lnglatChange"></el-input-number>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input-number v-model="value.lat" :min="0" :step="0.001" label="经度" @change="lnglatChange"></el-input-number>
      </el-form-item>
      <el-form-item label="海拔">
        <el-input  placeholder="海拔" v-model="value.altitude"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input  placeholder="地址" v-model="value.address"></el-input>
      </el-form-item>
    </section>
  </div>
</template>

<style scoped>

</style>

<script type="javascript">
  export default {
    name:'a-map',
    props: {
      value: {
        type: Object,
        default: function() {
          return {lng: 121.643277, lat: 29.863291}
        }
      },
      width: {type: Number, default: 450},
      height: {type: Number, default: 360},
      zoom: {type: Number, default: 15}
    },
    data () {
      let self = this;
      return {
        loaded: false,
        isEdit: false,
        events: {
          click(e) {
            let { lng, lat } = e.lnglat;
            self.value.lng = lng;
            self.value.lat = lat;
            // 这里通过高德 SDK 完成。
            var geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress([lng ,lat], function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  self.value.address = result.regeocode.formattedAddress;
                  self.$nextTick();
                  self.changePosition();
                }
              }
            });
          },
          zoomend(e){
            self.value.zoom= this.getZoom();
          }
        },
        center: [0,0],
        cursor: "crosshair",
        circles: [],
        markers: [{
          position: [0,0],
          events: {
            click: () => {
            alert('click marker');
            },
            dragend: (e) => {
                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
            }
          },
          visible: true,
              draggable: false
        }],
        mywindows: [{
          position: [0,0],
          visible: true,
          events: {
            close() {
              console.log('close infowindow');
            }
          }
        }],
        plugin: [{
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if(self.value.lng!=0 ||self.value.lat!=0){
                  self.center = [self.value.lng, self.value.lat];
                  self.loaded = true;
                  self.$nextTick();
                  self.changePosition();
                }
                else{
                  if (result && result.position) {
                    //self.data.value.lng = result.position.lng;
                    //self.data.value.lat = result.position.lat;
                    self.center = [self.value.lng, self.value.lat];
                    self.loaded = true;
                    self.$nextTick();
                  }
                  else{
                    self.center = [121.623893, 29.860162]
                    self.loaded = true;
                    self.$nextTick();
                  }
                }
              });
            }
          }
        }]
      }
    },
    methods: {
      lnglatChange(){
        this.handlePosition();
      },
      handlePosition(){
        let self=this;
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        geocoder.getAddress([self.value.lng ,self.value.lat], function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.regeocode) {
              self.value.address = result.regeocode.formattedAddress;
              self.$nextTick();
              self.changePosition();
            }
          }
        });
      },
      changePosition() {
        let self=this;
        self.circles=[];
        self.mywindows=[];
        self.markers=[];
        let marker = {
          position: [self.value.lng,self.value.lat]
        };
        let mywindow = {
          position: [self.value.lng,self.value.lat],
          content: self.value.address,
          autoMove: true
        };
        let circle = {
          center: [self.value.lng,self.value.lat],
          radius: 200,
          fillOpacity: 0.3,
          strokeStyle: 'dashed',
          fillColor: '#FFFF00',
          strokeColor: '#00BFFF'
        };
        self.markers.push(marker);
        self.mywindows.push(mywindow);
        self.circles.push(circle);
      }
    }
  }
</script>
