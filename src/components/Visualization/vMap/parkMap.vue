<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">

      <el-amap ref="map" :vid="`amap_${option.cmpId}`" :amap-manager="amapManager" mapStyle="dark" :center="center"  :zoom="zoom" :plugin="plugin">
        <el-amap-info-window v-if="window" :position="window.position"
                             :visible="window.visible"
                             :content="window.content"
                             :offset="window.offset"
                             :events="window.events"
        ></el-amap-info-window>
        <el-amap-marker v-for="(marker,index) in markers" :key="index"
                        :vid="index"
                        :position="marker.position"
                        :content="marker.content"
                        :events="marker.events"
        ></el-amap-marker>
      </el-amap>
    </div>
  </section>
</template>
<script>
  import VueAMap from "vue-amap";
  let amapManager = new VueAMap.AMapManager();
  export default {
    name: 'trafficMap',
    components: {},
    props: {
      option: {type: Object},
      screen:{type:Object}
    },
    data() {
      let self = this;
      return {
        contentId:"",
        radio6:"",
        amapManager: amapManager,
        size:{
          width:400,
          height:200
        },
        zoom: 13,
        center: [121.63501,29.878227],
        windows: [],
        window: "",
        plugin: [{
          pName: 'ToolBar',
          position: this.option.style.plugin.ToolBar.position,
          liteStyle: this.option.style.plugin.ToolBar.liteStyle
        }, {
          pName: 'MapType',
          defaultType: 1,
          showTraffic:this.option.style.plugin.MapType.showTraffic,
          showRoad:this.option.style.plugin.MapType.showRoad
        }],
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
      getMaker(){
        let sites=[]
        this.markers=[];
        this.windows=[];
        this.window="";
        //空气

        sites = [
          {
            pos:[121.63501,29.878227],
            stationName:"宁波高新区软件园",
            status:"正常",
            data:"2018-08-29 14时",
            color:"#00FF00",
            id:"1",
            borderStyle:"border:1px #DED300 solid"
          },{
            pos:[121.64061,29.882751],
            color:"#00FF00",
            stationName:"宁波高新区研发园",
            status:"正常",
            id:"2",
            data:"2018-08-29 14时",
            borderStyle:"border:1px #DED300 solid"
          }];

        let self=this
        for(let i=0;i<sites.length;i++) {
          let s =sites[i];
          this.markers.push({
            position: s.pos,
            content: `<div style="text-align:center; background-color: ${s.color} ; height: 18px; width: 18px; ${s.borderStyle}; border-radius: 12px; box-shadow: ${s.color} 0px 0px 20px;" ></div><span>${s.stationName}</span>`,

            events:{
              click(o){
                self.$emit('ievent',s);

                //获取到点对象
                //获取到点坐标位置
                self.windows.forEach(window => {
                  window.visible = false;
                });


                self.window = self.windows[i];
                self.$nextTick(() => {
                  self.window.visible = true;
                });



              }
            }
          });
          this.windows.push({
            position: s.pos,
            offset:[0,-30],
            content: `<div class="windowInfo">
                        <span style="display: block;border-bottom: 1px solid;background-color: ${s.color} ">${s.stationName}</span>
                        <span>${s.status}</span><br/>
                        <span>${s.data}</span><br/>
                      </div>`,
            visible: false,
            events:{
              close () {
                self.getMaker();
                self.$emit('ievent',[]);
              }
            }
          });

        }



      },

    },
    mounted(){

    },
    created() {
      this.getMaker();
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
  .amap-logo {
    display: none;
  }
  .windowInfo{
    color: #000000;
  }
  .amap-info div:nth-child(2){
    bottom: 20px;
  }
</style>
