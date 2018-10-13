<template>
    <div ref="screenContainer" style="position: relative; width: 100vw; height: 100vh; color:#fff" :style="background">
      <div :style="'margin-left:' + marginLeft + 'px'">
          <div :style="'position: absolute; -webkit-transform: scale(' + scale + ');'">
            <div ref='screen' id="screen"
                 :style="'width:'
                 + screen.page.canvas.width + 'px; height:'
                 + screen.page.canvas.height + 'px; position: absolute;'">
              <vue-draggable-resizable v-for="component in screen.components" :key="component.uid"
                                       :w="component.option.style.size_location.width"
                                       :h="component.option.style.size_location.height"
                                       :x="component.option.style.size_location.x"
                                       :y="component.option.style.size_location.y"
                                       :z="component.option.style.size_location.z"
                                       :draggable="false" :resizable="false"  :active="false" class="part">
                <component-container :component="component" :screen="screen" :scale="scale" @notifyUpdate = "refreshData"></component-container>
              </vue-draggable-resizable>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
  import errorTip from "@/components/Validate/errorTip";
  import VueDraggableResizable from 'vue-draggable-resizable'
  import {getPath} from '@/views/dev/attachment/api'
  import componentContainer from '@/components/VisualizationSetting/componentContainer'

  export default {
    components: {
      errorTip, VueDraggableResizable, componentContainer
    },
    props: {
      screen: {type: Object}
    },
    data() {
      return {
        id: this.$route.params.id,
        screenWidth: 800,
        screenHeight: 600,
        scale: 1,
        marginLeft: 0
      }
    },
    created() {
      var _this = this
      this.$nextTick(function () {
        this.resizeScreen()
      })
      // 注：window.onresize只能在项目内触发1次
      window.onresize = function windowResize() {
        _this.resizeScreen()
      }
    },
    methods: {
      refreshData(){
        this.screen.components = JSON.parse(JSON.stringify(this.screen.components));
      },
      resizeScreen() {
        var width = this.$refs.screenContainer.clientWidth
        var height = this.$refs.screenContainer.clientHeight
        //console.log(width)
        this.screenWidth = this.screen.page.canvas.width
        this.screenHeight = this.screen.page.canvas.height

        var rw = width / this.screenWidth
        var rh = height / this.screenHeight

        if (rw < rh) { //如果需要缩放的宽度大于高度
          this.scale = rw
        } else {
          this.scale = rh
        }

        this.marginLeft = (width - this.scale * this.screenWidth) / 2;
      }
    },
    computed: {
      path() {
        return getPath()
      },
      background: function () {
        var backgroundColor = 'background-color: #000;'
        if(this.screen.page.backgroundColor)
          backgroundColor = 'background-color: ' + this.screen.page.backgroundColor + ';'

        if(this.screen.page.backgrounds && this.screen.page.backgrounds.length > 0){
          //var bgimage = 'background-image: url(' + this.screen.page.backgrounds[0].url + '); '
          var bgimage = 'background-image: url(' + this.path + this.screen.page.backgrounds[0].url + '); '
          var bgfill = 'background-size: cover; '
          var css = ' background-position: center center; background-repeat: no-repeat; '
          if (this.screen.page.fill == 'x') {

          } else if (this.screen.page.fill == 'y') {

          } else { //full
            return backgroundColor + bgimage + bgfill + css;
          }
        }
        else{
          return backgroundColor
        }
      },
      computedScale: {
        get:function(){
          return this.scale * 100
        },
        set:function(newVal){
          this.scale = newVal/100
        }
      }
    },
    watch:{
      'screen.page.canvas': {
        handler(curVal, oldVal) {
          this.resizeScreen()
        },
        deep: true
      },
    }
  };
</script>
<style scoped>
  .part {
    text-align: center;
    vertical-align: baseline;
    align-items: center;
    justify-content: center;
  }

</style>
