<template>
  <el-container>
    <el-header style="height: 32px; margin-top: 38px;">
      <el-row :gutter="20">
        <el-col :span="14" style="text-align: left">
          <el-popover
            ref="components"
            placement="bottom"
            width="600"
            trigger="click"
            v-model="popChartVisible">
            <ul class="charts">
              <li v-for="component in components" :key="component.name" @click="addComponent(component)">
                <img alt="" :src="'/static/charts/' + component.icon[0].name">
                <div class="name">{{component.label}}</div>
                <div class="checked"></div>
              </li>
            </ul>
          </el-popover>
          <el-button type="text" v-popover:components>
            <li class="fa fa-bar-chart-o"/>
            图表
          </el-button>
          <el-button type="text">
            <li class="fa fa-cube"/>
            组件
          </el-button>
          <el-button type="text">
            <li class="fa fa-globe"/>
            地图
          </el-button>
          <el-popover
            ref="text"
            placement="bottom"
            width="600"
            trigger="click"
            v-model="popTextVisible">
            <ul class="charts">
              <li v-for="chart in components" :key="chart.name" @click="selectChart(chart)">
                <img alt="" :src="'/static/charts/' + chart.icon">
                <div class="name">{{chart.name}}</div>
                <div class="checked"></div>
              </li>
            </ul>
          </el-popover>
          <el-button type="text" v-popover:text>
            <li class="fa fa-text-height"/>
            文字
          </el-button>
          <el-button type="text">
            <li class="fa fa-map-marker"/>
            辅助图形
          </el-button>

        </el-col>
        <el-col :span="2" > <div style="width: 200px;"><el-slider v-model="computedScale" size="mini"></el-slider></div></el-col>
        <el-col :span="8" style="text-align: right">
          <el-button type="text" @click="goBack">
            <li class="fa fa-mail-reply"/>
            返回
          </el-button>
          <el-button type="text">
            <li class="fa fa-eye"/>
            预览
          </el-button>
          <el-button type="text" @click="onSubmit">
            <li class="fa fa-save"/>
            保存
          </el-button>
          <el-button type="text">
            <li class="fa fa-send-o"/>
            发布
          </el-button>
        </el-col>
      </el-row>

    </el-header>
    <el-container>
      <el-aside width="180px">
        <div class="aside-title">图层</div>
        <div class="layout-toolbar">
          <el-button type="primary" size="mini">
            <li class="fa fa-angle-double-up"/>
          </el-button>
          <el-button type="primary" size="mini" @click="upLayout">
            <li class="fa fa-angle-up"/>
          </el-button>
          <el-button type="primary" size="mini" @click="downLayout">
            <li class="fa fa-angle-down"/>
          </el-button>
          <el-button type="primary" size="mini">
            <li class="fa fa-angle-double-down"/>
          </el-button>
        </div>
        <el-table :data="screen.components" highlight-current-row :show-header="false" size="mini">
          <el-table-column prop="selected" width="32">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.selected"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="icon" width="56">
            <template slot-scope="scope">
              <img alt="" :src="'/static/charts/' + scope.row.icon[0].name" width="45"
                   @click="handleCurrentClick(scope.row)">
            </template>
          </el-table-column>
          <el-table-column prop="name">
            <template slot-scope="scope">
              <span>{{ scope.row.label }}</span>
              <el-button type="text" @click="remove(scope.row)">
                <li class="fa fa-remove"/>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
      <el-main>
        <!----------------main开始-------------------->
        <div style="position: relative; width: 100%; height: 100%; background-color: #749e58">
          <div :style="'position: absolute; margin: 20px; -webkit-transform: scale(' + scale + ');'">
            <div ref='screen' id="screen"
               :style="'width:'
               + screen.page.canvas.width + 'px; height:'
               + screen.page.canvas.height + 'px; background-color: #000000; position: absolute;' + background">
            <vue-draggable-resizable v-for="component in screen.components" :key="component.uid"
                                     :w="component.option.style.size_location.width"
                                     :h="component.option.style.size_location.height"
                                     :x="component.option.style.size_location.x"
                                     :y="component.option.style.size_location.y"
                                     :z="component.option.style.size_location.z"
                                     :grid="grid"
                                     :active.sync="component.active"
                                     v-on:dragging="onDrag" @dragstop="onDragstop" v-on:resizing="onResize"
                                     @resizestop="onResizstop"
                                     @activated="onActivated(component)" @deactivated="onDeactivated"
                                     :parent="true" class="part" :class="component.selected ? active : ''">
              <component-container :component="component" :scale="scale"></component-container>
            </vue-draggable-resizable>
          </div>
          </div>
          <div ref='screenContainer' @click="clickScreen" style="background-color: #9c9c9c; width: 100%; height: 100%; background-image: url(/static/screenbg.png); ">
          </div>
        </div>

      </el-main>
      <el-aside style="width:332px; height: calc(100vh - 50px); overflow-x: hidden;">
        <!----------------right开始-------------------->
        <section v-if="!currentComponent.selected">
          <div class="aside-title">页面设置</div>
          <el-form label-width="80px" :model="screen.page" class="demo-form-inline" size="mini">
            <el-form-item label="名称">
              <el-input v-model="screen.name" v-validate="'required'" name="name" data-vv-as="可视化应用名称"
                        placeholder="请输入可视化应用名称"></el-input>
              <error-tip :errs="errors" name="name"></error-tip>
            </el-form-item>
            <el-form-item label="屏幕大小">
              <el-row>
                <el-col :span="12">
                  <li class="fa fa-arrows-h"/>
                  <el-input-number style="width: 96px;" v-model="screen.page.canvas.width" controls-position="right"
                                   :min="1"
                                   :max="32800"></el-input-number>
                </el-col>
                <el-col :span="12">
                  <li class="fa fa-arrows-v"/>
                  <el-input-number style="width: 96px;" v-model="screen.page.canvas.height" controls-position="right"
                                   :min="1"
                                   :max="32800"></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="背景图">
              <el-upload
                class="avatar-uploader"
                :action="api + '/api/attachment'"
                :multiple="false"
                :limit="1"
                :auto-upload="true"
                :fileList="screen.page.backgrounds"
                :on-success="handleUploadiconSuccess"
                :on-remove="handleUploadiconRemove">
                <img v-if="screen.page.backgrounds.length>0" :src="screen.page.backgrounds[0].url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="缩放方式">
              <el-radio-group v-model="screen.page.fill">
                <el-radio label="x">等比例缩放宽度铺满</el-radio>
                <el-radio label="y">等比例缩放高度铺满</el-radio>
                <el-radio label="full">全屏铺满</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="栅格间距">
              <el-input-number style="width: 96px;" v-model="screen.page.grid" controls-position="right" :min="1"
                               :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="项目封面">
              <img v-if="screen.page.coverImage" :src="screen.page.coverImage" width="220" alt="" />
              <el-button type="text" @click="draw">截取画布</el-button>
            </el-form-item>
          </el-form>
        </section>
        <section v-else>
          <div class="aside-title">{{currentComponent.label}}设置</div>
          <setting-container :component="currentComponent" v-if="currentComponent"></setting-container>
        </section>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
  import errorTip from "@/components/Validate/errorTip";
  import {addItem} from "@/views/visualization/screen/api"
  import {getItem, getList} from '@/views/visualization/component/api'
  import VueDraggableResizable from 'vue-draggable-resizable'
  import componentContainer from '@/components/VisualizationSetting/componentContainer'
  import settingContainer from '@/components/VisualizationSetting/settingContainer'
  import * as UUID from "uuid";
  import html2Canvas from 'html2canvas'
  import ElButton from "element-ui/packages/button/src/button";
  import store from '@/store'

  export default {
    components: {
      ElButton,
      errorTip, VueDraggableResizable, componentContainer, settingContainer
    },
    props: {
      screen: {type: Object}
    },
    data() {
      return {
        id: this.$route.params.id,
        currentComponent: {},
        components: [],
        popChartVisible: false,
        popTextVisible: false,
        layoutOperateName: 'style',
        active: 'active',
        screenWidth: 800,
        screenHeight: 600,
        scale: 1
      }
    },
    created() {
      var _this = this
      this.$nextTick(function () {
        this.getComponents()
        this.resizeScreen()
      })
      // 注：window.onresize只能在项目内触发1次
      window.onresize = function windowResize() {
        _this.resizeScreen()
      }
    },
    methods: {
      resizeScreen() {
        var width = this.$refs.screenContainer.clientWidth - 40
        var height = this.$refs.screenContainer.clientHeight  - 40
        //console.log(width)
        this.screenWidth = this.screen.page.canvas.width
        this.screenHeight = this.screen.page.canvas.height
        //console.log(this.screen.page.canvas.height)
        var rw = width / this.screenWidth
        var rh = height / this.screenHeight
        //console.log('width:' + width, 'height:' + height, 'screenWidth:' + this.screenWidth, 'screenHeight:' + this.screenHeight, 'rw:' + rw, 'rh:' + rh, 'scale:' + this.scale)
        if (rw < rh) { //如果需要缩放的宽度大于高度
          this.scale = rw
        } else {
          this.scale = rh
        }
        //this.screenWidth = this.screenWidth * this.scale - 20
        //this.screenHeight = this.screenHeight * this.scale - 20
        //console.log('width:' + width, 'height:' + height, 'screenWidth:' + this.screenWidth, 'screenHeight:' + this.screenHeight, 'rw:' + rw, 'rh:' + rh, 'scale:' + this.scale)

      },
      clickScreen() {
        this.currentComponent = {}
      },
      getComponents() {
        var listQuery = {
          pageNo: 1,
          pageSize: 100,
          sort: "_id",
          order: -1
        }
        var objQuery = []
        getList(listQuery, objQuery).then(response => {
          this.components = response.data.results
        });
      },
      onResize: function (x, y, width, height) {

      },
      onResizstop: function (x, y, width, height) {
        if (this.currentComponent && this.currentComponent.option) {
          this.currentComponent.option.style.size_location.x = x
          this.currentComponent.option.style.size_location.y = y
          this.currentComponent.option.style.size_location.width = width
          this.currentComponent.option.style.size_location.height = height
        }
      },
      onDrag: function (x, y) {

      },
      onDragstop: function (x, y) {
        this.currentComponent.option.style.size_location.x = x
        this.currentComponent.option.style.size_location.y = y
      },
      onActivated: function (component) {
        this.setCurrentComponent(component)
      },
      handleCurrentClick(component) {
        this.setCurrentComponent(component)
      },
      setCurrentComponent(component) {
        //this.currentComponent = {}
        for (let item of this.screen.components) {
          item.active = false
          item.selected = false
        }
        component.active = true
        component.selected = true
        this.$nextTick(() => {
          this.currentComponent = component
        })
      },
      onDeactivated: function () {
      },
      remove(row) {
        var index = this.screen.components.indexOf(row)
        if (index > -1) {
          this.screen.components.splice(index, 1)
        }
      },
      addComponent(component) {
        var z = 999;
        if (this.screen.components.length > 0)
          z = this.screen.components[0].option.style.size_location.z + 1;
        //为了获得一个新的对象
        var uid = UUID.v1();
        getItem(component.id).then(response => {
          var newComponent = response.data
          newComponent.uid = uid
          newComponent.option.style.size_location.z = z
          this.screen.components.unshift(newComponent);
          this.currentComponent = newComponent;
          this.popChartVisible = false;
        });
      },
      upLayout() {
        var layout = this.currentComponent
        var index = this.screen.components.indexOf(layout)
        if (index != 0) {
          this.screen.components.splice(index, 1)
          this.screen.components.splice(index - 1, 0, layout)
        }

        let z = this.screen.components[0].option.style.size_location.z
        for (let item of this.screen.components) {
          z = z - 1
          item.option.style.size_location.z = z
        }
      },
      downLayout() {
        var layout = this.currentComponent;
        var index = this.screen.components.indexOf(layout);
        if (index != this.screen.components.length) //已经是最后一个了
        {
          this.screen.components.splice(index, 1);
          this.screen.components.splice(index + 1, 0, layout)
        }

        let z = this.screen.components[0].option.style.size_location.z
        for (let item of this.screen.components) {
          z = z - 1
          item.option.style.size_location.z = z
        }
      },
      handleUploadiconSuccess(res, file, fileList) {
        this.seticonFileList(fileList)
      },
      handleUploadiconRemove(res, file) {
        this.seticonFileList(file)
      },
      seticonFileList(fileList) {
        this.page.backgrounds.splice(0, this.page.backgrounds.length)
        for (let file of fileList) {
          if (file.response)
            this.page.backgrounds.unshift({name: file.name, url: file.response.data.results})
          else
            this.page.backgrounds.unshift({name: file.name, url: file.url})
        }
      },
      goBack(){
        this.$router.push('/visualization/myvisualization/list')
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return;
          }
          this.$emit('submit')
        });
      },
      draw: function () {
        var _this = this
        var imgScale = 480 / (this.screen.page.canvas.width * this.scale)  //减小截屏图片的尺寸，宽度保持在480px
        imgScale = imgScale > 1 ? 1 : imgScale
        console.log(imgScale)
        html2Canvas(document.querySelector('#screen'), {allowTaint: false, taintTest: false, scale: imgScale }).then(function (canvas) {
          let image = canvas.toDataURL()
          _this.screen.page.coverImage = image
          //let cover = document.getElementById('cover')
          //cover.innerHTML = ''
          //cover.appendChild(image)
        })
      },
      saveImageInfo: function () {
        let mycanvas = document.getElementById('canvas')
        let image = mycanvas.toDataURL('image/png')
        let w = window.open('about:blank', 'image from canvas')
        w.document.write('<img src="' + image + '" alt="from canvas" style="width: 980px; margin: 0 auto; display: block; height: ' + (this.canvasHeight / 2) + 'px"/>')
      },
      saveAsLocalImage: function () {
        let myCanvas = document.getElementById('canvas')
        let image = myCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        window.location.href = image
      },
    },
    computed: {
      grid: function () {
        return [this.screen.page.grid, this.screen.page.grid]
      },
      background: function () {
        var bgimage = 'background-image: url(/static/main-bg.jpg); '
        var bgfill = 'background-size: cover; '
        var css = ' background-position: center center; background-repeat: no-repeat; '
        if (this.screen.page.fill == 'x') {

        } else if (this.screen.page.fill == 'y') {

        } else { //full
          return bgimage + bgfill + css;
        }
      },
      computedScale: {
        get:function(){
          return this.scale * 100
        },
        set:function(newVal){
          this.scale = newVal/100
        }
      },
      api() {
        return store.getters.urls.attachment_lib_api
      },
      path() {
        return store.getters.urls.attachment_lib_path
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
  .el-checkbox {
    margin-right: 0px;
  }

  .aside-title {
    background-color: #FFFFFF;
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }

  .layout-toolbar {
    background-color: #FFFFFF;
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }

  .el-container {
    height: calc(100vh);
  }

  .el-header, .el-footer {
    background-color: #333333;
    font-size: 12px;
    color: #CCCCCC;
    height: 20px;
    line-height: 20px;
  }

  .el-aside {
    background-color: #f7f8fa;
    color: #333;
  }

  .el-main {
    background-color: #e7e6e7;
    color: #FFF;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }

  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }

  ul, ol {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .charts li {
    position: relative;
    vertical-align: top;
    padding-top: 5px;
    padding-bottom: 28px;
    margin-top: 10px;
    margin-bottom: 10px;
    list-style: none;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    float: left;
    width: 89px;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }

  .charts li:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .charts li img {
    width: 45px;
    vertical-align: middle;
  }

  .charts li .name {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 20px;
  }

  .active {
    border: 1px dashed;
    border-radius: 5px;
  }

  .part {
    text-align: center;
    vertical-align: baseline;
    align-items: center;
    justify-content: center;
  }

  .el-main {
    padding: 0px;
  }
</style>
