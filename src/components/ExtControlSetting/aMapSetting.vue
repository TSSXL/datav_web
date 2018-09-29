<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="宽度" >
        <el-input placeholder="宽度" v-model="data.attributes.width">
            <template slot="append">px</template>
        </el-input>
    </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="高度" >
          <el-input placeholder="高度" v-model="data.attributes.height">
              <template slot="append">px</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>    
    <el-form-item label="当前缩放级别" >
      <el-input placeholder="缩放级别" v-model="data.value.zoom" :disabled="true">
      </el-input>
    </el-form-item>
    <el-form-item label="预览" >
      <div v-bind:style="{ width: data.attributes.width + 'px' , height: data.attributes.height + 'px' }">
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
      <el-input-number v-model="data.value.lng" :min="0" :step="0.001" label="经度" @change="lnglatChange"></el-input-number>
    </el-form-item>
    <el-form-item label="纬度">
      <el-input-number v-model="data.value.lat" :min="0" :step="0.001" label="经度" @change="lnglatChange"></el-input-number>
    </el-form-item>
    <el-form-item label="海拔">
      <el-input  placeholder="海拔" v-model="data.value.altitude"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-input  placeholder="地址" v-model="data.value.address"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handlePosition">定位</el-button>
    </el-form-item>


  </div>
</template>

<style scoped>

</style>

<script type="javascript">
  export default {
    name:'a-map-setting',
    props: {
      data: { type: Object }
    },
    data () {
      let self = this;
      return {
        loaded: false,
        events: {
          click(e) {
            let { lng, lat } = e.lnglat;
            self.data.value.lng = lng;
            self.data.value.lat = lat;
            // 这里通过高德 SDK 完成。
            var geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress([lng ,lat], function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  self.data.value.address = result.regeocode.formattedAddress;
                  self.$nextTick();
                  self.changePosition();
                }
              }
            });            
          },
          zoomend(e){
            self.data.value.zoom= this.getZoom();            
          }
        },
        zoom: this.data.value.zoom,
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
                  if(self.data.value.lng!=0 ||self.data.value.lat!=0){
                    self.zoom = self.data.value.zoom;
                    self.center = [self.data.value.lng, self.data.value.lat];
                    self.loaded = true;   
                    self.$nextTick();                 
                    self.changePosition();                        
                  }
                  else{
                    if (result && result.position) {                      
                      //self.data.value.lng = result.position.lng;
                      //self.data.value.lat = result.position.lat;
                      self.center = [self.data.value.lng, self.data.value.lat];
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
        geocoder.getAddress([self.data.value.lng ,self.data.value.lat], function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.regeocode) {
              self.data.value.address = result.regeocode.formattedAddress;
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
          position: [self.data.value.lng,self.data.value.lat]
        };
        let mywindow = {
          position: [self.data.value.lng,self.data.value.lat],
          content: self.data.value.address,
          autoMove: true
        };
        let circle = {
          center: [self.data.value.lng,self.data.value.lat],
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
