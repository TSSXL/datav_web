<template>
  <el-container>
    <el-header style="height: 32px; margin-top: 38px;">
      <el-row :gutter="20">
        <el-col :span="12" style="text-align: left">
          <el-popover
            ref="components"
            placement="bottom"
            width="600"
            trigger="click"
            v-model="popChartVisible">
            <el-tabs tab-position="left">
              <el-tab-pane>
                <template slot="label"><i class="fa fa-list" aria-hidden="true" title="全部"></i></template>
                <el-scrollbar style="height: 400px;" tag="div">
                  <ul class="charts">
                    <li v-for="component in components.filter((c)=>c.type[0] == 'charts')" :key="component.name" @click="addComponent(component)">
                      <img alt="" :src="api + 'public' + component.icon[0].url" v-if="component.icon && component.icon.length > 0">
                      <div class="name">{{component.label}}</div>
                      <div class="checked"></div>
                    </li>
                  </ul>
                </el-scrollbar>
              </el-tab-pane>
              <el-tab-pane>
                <template slot="label"><i class="fa fa-bar-chart" aria-hidden="true" title="柱形图"></i></template>
                <ul class="charts">
                  <li v-for="component in components.filter((c)=>c.type.find((t)=>t == 'bar'))" :key="component.name" @click="addComponent(component)">
                    <img alt="" :src="api + 'public' + component.icon[0].url" v-if="component.icon && component.icon.length > 0">
                    <div class="name">{{component.label}}</div>
                    <div class="checked"></div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane>
                <template slot="label"><i class="fa fa-line-chart" aria-hidden="true" title="折线图"></i></template>
                <ul class="charts">
                  <li v-for="component in components.filter((c)=>c.type.find((t)=>t == 'line'))" :key="component.name" @click="addComponent(component)">
                    <img alt="" :src="api + 'public' + component.icon[0].url" v-if="component.icon && component.icon.length > 0">
                    <div class="name">{{component.label}}</div>
                    <div class="checked"></div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane>
                <template slot="label"><i class="fa fa-pie-chart" aria-hidden="true" title="饼图"></i></template>
                <ul class="charts">
                  <li v-for="component in components.filter((c)=>c.type.find((t)=>t == 'pie'))" :key="component.name" @click="addComponent(component)">
                    <img alt="" :src="api + 'public' + component.icon[0].url" v-if="component.icon && component.icon.length > 0">
                    <div class="name">{{component.label}}</div>
                    <div class="checked"></div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane>
                <template slot="label"><i class="fa fa-snowflake-o" aria-hidden="true" title="散点图"></i></template>
                <ul class="charts">
                  <li v-for="component in components.filter((c)=>c.type.find((t)=>t == 'scatter'))" :key="component.name" @click="addComponent(component)">
                    <img alt="" :src="api + 'public' + component.icon[0].url" v-if="component.icon && component.icon.length > 0">
                    <div class="name">{{component.label}}</div>
                    <div class="checked"></div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane>
                <template slot="label"><i class="fa fa-gears" aria-hidden="true" title="其他"></i></template>
                <ul class="charts">
                  <li v-for="component in components.filter((c)=>c.type.find((t)=>t == 'other'))" :key="component.name" @click="addComponent(component)">
                    <img alt="" :src="api + 'public' + component.icon[0].url" v-if="component.icon && component.icon.length > 0">
                    <div class="name">{{component.label}}</div>
                    <div class="checked"></div>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </el-popover>
          <el-button type="text" v-popover:components class="comp">
            <li class="fa fa-bar-chart-o"/>
            图表
          </el-button>
          <el-popover
            ref="cmp"
            placement="bottom"
            width="600"
            trigger="click"
            v-model="popCmpVisible">
            <ul class="charts">
              <li v-for="component in components.filter((c)=>c.type[0] == 'cmp')" :key="component.name" @click="addComponent(component)">
                <img alt="" :src="api + 'public' + component.icon[0].url" v-if="component.icon && component.icon.length > 0">
                <div class="name">{{component.label}}</div>
                <div class="checked"></div>
              </li>
            </ul>
          </el-popover>
          <el-button type="text" v-popover:cmp class="comp">
            <li class="fa fa-cube"/>
            组件
          </el-button>
          <el-popover
            ref="map"
            placement="bottom"
            width="600"
            trigger="click"
            v-model="popMapVisible">
            <ul class="charts">
              <li v-for="component in components.filter((c)=>c.type[0] == 'map')" :key="component.name" @click="addComponent(component)">
                <img alt="" :src="api + 'public' + component.icon[0].url" v-if="component.icon && component.icon.length > 0">
                <div class="name">{{component.label}}</div>
                <div class="checked"></div>
              </li>
            </ul>
          </el-popover>
          <el-button type="text" v-popover:map class="comp">
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
              <li v-for="component in components.filter((c)=>c.type[0] == 'words')" :key="component.name" @click="addComponent(component)">
                <img alt="" :src="api + 'public' + component.icon[0].url" v-if="component.icon && component.icon.length > 0">
                <div class="name">{{component.label}}</div>
                <div class="checked"></div>
              </li>
            </ul>
          </el-popover>
          <el-button type="text" v-popover:text class="comp">
            <li class="fa fa-text-height"/>
            文字
          </el-button>
          <el-popover
            ref="other"
            placement="bottom"
            width="600"
            trigger="click"
            v-model="popOtherVisible">
            <ul class="charts">
              <li v-for="component in components.filter((c)=>c.type[0] == 'other')" :key="component.name" @click="addComponent(component)">
                <img alt="" :src="api + 'public' + component.icon[0].url" v-if="component.icon && component.icon.length > 0">
                <div class="name">{{component.label}}</div>
                <div class="checked"></div>
              </li>
            </ul>
          </el-popover>
          <el-button type="text" v-popover:other class="comp">
            <li class="fa fa-map-marker"/>
            其他
          </el-button>

        </el-col>
        <el-col :span="4" > <div style="width: 200px;"><el-slider v-model="computedScale" size="mini" :min="23" :max="184"></el-slider></div></el-col>
        <el-col :span="8" style="text-align: right">
          <el-button type="text" @click="goBack">
            <li class="fa fa-mail-reply"/>
            返回
          </el-button>
          <el-button type="text">
            <a :href="'/#/fullscreen/preview/' + id" target="_blank"> <li class="fa fa-eye"/>
            预览</a>
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
      <el-aside width="210px" style="overflow: hidden;">
        <div class="aside-title"><span style="font-size: 14px;">图层</span></div>
        <div class="layout-toolbar">
          <el-button-group>
            <el-button type="primary" icon="el-icon-upload2" style="color: #fff;" @click="upLayoutEnd" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-arrow-up" style="color: #fff;" @click="upLayout" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-arrow-down" style="color: #fff;" @click="downLayout" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-download" style="color: #fff;" @click="downLayoutEnd" size="mini"></el-button>
          </el-button-group>
        </div>
        <el-scrollbar class='page-component__scroll' tag="div">
        <el-table :data="screen.components" :highlight-current-row="false" :show-header="false" size="mini" @row-click="handleCurrentClick">
          <el-table-column prop="selected" width="28">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.selected"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="icon" width="50">
            <template slot-scope="scope">
              <img alt="" :src="api + 'public' + scope.row.icon[0].url" style="width: 40px;">
            </template>
          </el-table-column>
          <el-table-column prop="name">
            <template slot-scope="scope">
              <span>{{ scope.row.label }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="action" width="32">
            <template slot-scope="scope">
              <el-button type="text" @click="remove(scope.$index)">
                <li class="fa fa-remove"/>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <!----------------main开始-------------------->
        <div style="position: relative; width: 100%; height: 100%; background-color: #749e58">
          <div :style="'position: absolute; margin: 20px; -webkit-transform: scale(' + scale + ');'">
            <div ref='screen' id="screen"
               :style="'width:'
               + screen.page.canvas.width + 'px; height:'
               + screen.page.canvas.height + 'px; position: absolute;' + background">
            <vue-draggable-resizable v-for="(component,index) in screen.components" :key="component.uid"
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
              <template v-if="screenShoting == true">
                <component-container :component="component" :screen="screen" :scale="scale" v-if="component.name != 'v-box'" @notifyUpdate = "refreshData"></component-container>
              </template>
              <template v-else>
                <component-container :component="component" :screen="screen" :scale="scale" @notifyUpdate = "refreshData"></component-container>
              </template>
              <div v-if="component.selected" class="button-tip">
                <a title="拷贝" @click="handleCopy(index)"><i class="fa fa-plus-square-o" aria-hidden="true"></i></a>
                <a title="删除" @click="handleRemove(index)"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
              </div>
            </vue-draggable-resizable>
          </div>
          </div>
          <div ref='screenContainer' @click="clickScreen" style="width: 100%; height: 100%; background-image: url(/static/background-16-16.png);background-size: 8px 8px;">
          </div>
        </div>

      </el-main>
      <el-aside style="width:332px; overflow: hidden;">
        <!----------------right开始-------------------->
        <section v-if="!currentComponent.selected">
          <el-scrollbar class='page-component__scroll' tag="div">
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
            <el-form-item label="背景色">
              <el-color-picker v-model="screen.page.backgroundColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="背景图">
              <el-upload
                class="avatar-uploader"
                :action="api + 'api/attachment'"
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
              <el-button @click="draw" icon="fa fa-camera" style="color:#54B1CF" plain size="mini"> 截取画布</el-button>
              <p>
                <img v-if="screen.page.coverImage" :src="path + screen.page.coverImage" width="200" height="122" alt="" />
                <img v-else :src="`${path}datav-border/5b58307fe7d5ab0032d4bd34.png`" width="200" height="122" alt="" />
              </p>
            </el-form-item>


          </el-form>
          </el-scrollbar>
        </section>
        <section v-else>
          <setting-container :component="currentComponent"  :configs="settingOption" v-if="currentComponent"></setting-container>
        </section>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
  import errorTip from "@/components/Validate/errorTip";
  import {addItem} from "@/views/visualization/screen/api"
  import {getItem,getAll} from '@/views/datav/component/api'
  import {getApi, getPath,post as addScreenshot} from '@/views/dev/attachment/api'
  import VueDraggableResizable from 'vue-draggable-resizable'
  import componentContainer from '@/components/VisualizationSetting/componentContainer'
  import settingContainer from '@/components/VisualizationSetting/settingContainer'
  import * as UUID from "uuid";
  import html2Canvas from 'html2canvas'
  import ElButton from "element-ui/packages/button/src/button";
  import store from '@/store'
  import {getItem as getOptions} from '@/views/dev/option/api'

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
        popCmpVisible: false,
        popTextVisible: false,
        popMapVisible:false,
        popOtherVisible:false,
        layoutOperateName: 'style',
        active: 'active',
        screenWidth: 800,
        screenHeight: 600,
        scale: 1,
        screenShoting:false,
        settingOption:{
          fontOptions: [],
          dataSourceOptions: [],
        }
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

      this.fetchOptions();
    },
    methods: {
      refreshData(){
        this.screen.components = JSON.parse(JSON.stringify(this.screen.components));
      },
      fetchOptions() {
        getOptions('visualizationDatasource').then(response => {
          this.settingOption.dataSourceOptions = response.data.options
        });

        getOptions('font').then(response => {
          this.settingOption.fontOptions = response.data.options
        });
      },
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
        for (let item of this.screen.components) {
          item.active = false
          item.selected = false
        }
        this.currentComponent = {}
      },
      getComponents() {
        getAll(null,[{ "name": "active", "value": true}]).then(res => {
          this.components = res.data;
        })
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
      handleCurrentClick(component,event,column) {
        if(column.property != "selected")
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
      handleCopy(index){
        let cloneCmp = JSON.parse(JSON.stringify(this.screen.components[index]));
        cloneCmp.uid = UUID.v1();
        if(cloneCmp.option.style == null)
          cloneCmp.option.style = {};
        if(cloneCmp.option.style.size_location == null)
          cloneCmp.option.style.size_location = {};
        cloneCmp.option.style.size_location.z += 1;
        cloneCmp.option.style.size_location.x += 10;
        cloneCmp.option.style.size_location.y += 10;
        cloneCmp.option.animation = false;
        cloneCmp.option.cmpId = UUID.v1();
        this.screen.components.unshift(cloneCmp);
        this.currentComponent = cloneCmp;
      },
      handleRemove(index) {
        this.$confirm('此操作将删除组件, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.remove(index);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      remove(index) {
        if (index > -1) {
          this.screen.components.splice(index, 1)
        }
      },
      addComponent(component) {
        let z = 999;
        if (this.screen.components.length > 0)
          z = this.screen.components[0].option.style.size_location.z + 1;
        //为了获得一个新的对象
        let uid = UUID.v1();
        let newComponent = JSON.parse(JSON.stringify(component));
        newComponent.uid = uid;
        if(newComponent.option.style == null)
          newComponent.option.style = {};
        if(newComponent.option.style.size_location == null)
          newComponent.option.style.size_location = {};
        newComponent.option.style.size_location.z = z;
        newComponent.option.animation = false;
        newComponent.option.cmpId = UUID.v1();
        newComponent.selected = true;
        this.screen.components.unshift(newComponent);
        this.currentComponent = newComponent;
        this.popChartVisible = false;
        this.popCmpVisible = false;
        this.popTextVisible = false;
        this.popMapVisible = false;
        this.popOtherVisible = false;
      },
      upLayout() {
        var layout =this.screen.components.find((c) => c.selected == true);
        var index = this.screen.components.indexOf(layout)
        if (index != 0) {
          this.screen.components.splice(index, 1)
          this.screen.components.splice(index - 1, 0, layout)
        }

        let z = this.screen.components[0].option.style.size_location.z
        for (let item of this.screen.components) {
          item.option.style.size_location.z = z + 1;
        }
      },
      upLayoutEnd() {
        let layout = this.screen.components.find((c) => c.selected == true);
        let index = this.screen.components.indexOf(layout);
        if(index == 0)
          return;
        this.screen.components.splice(index, 1);
        this.screen.components.splice(0, 0, layout);
        let z = this.screen.components[0].option.style.size_location.z;
        for (let item of this.screen.components) {
          item.option.style.size_location.z = z + 1;
        }
      },
      downLayout() {
        var layout = this.screen.components.find((c) => c.selected == true);
        var index = this.screen.components.indexOf(layout);
        if (index != this.screen.components.length) //已经是最后一个了
        {
          this.screen.components.splice(index, 1);
          this.screen.components.splice(index + 1, 0, layout)
        }

        let z = this.screen.components[0].option.style.size_location.z
        for (let item of this.screen.components) {
          item.option.style.size_location.z = z + 1;
        }
      },
      downLayoutEnd() {
        let layout = this.screen.components.find((c) => c.selected == true);
        let index = this.screen.components.indexOf(layout);
        if(index == this.screen.components.length - 1)
          return;
        this.screen.components.splice(index, 1);
        this.screen.components.push(layout)
        let z = this.screen.components[0].option.style.size_location.z;
        for (let item of this.screen.components) {
          item.option.style.size_location.z = z + 1;
        }
      },
      handleUploadiconSuccess(res, file, fileList) {
        this.seticonFileList(fileList)
      },
      handleUploadiconRemove(res, file) {
        this.seticonFileList(file)
      },
      seticonFileList(fileList) {
        this.screen.page.backgrounds.splice(0, this.screen.page.backgrounds.length)
        for (let file of fileList) {
          if (file.response)
            this.screen.page.backgrounds.unshift({name: file.name, url: file.response.data.results})
          else
            this.screen.page.backgrounds.unshift({name: file.name, url: file.url})
        }
      },
      goBack(){
        this.$router.push('/visualization/myvisualization/list')
      },
      preview(){
        this.$router.push('/fullscreen/preview/' + this.id)
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
        this.screenShoting = true;
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        let _this = this;
        let imgScale = 240 / (this.screen.page.canvas.width * this.scale);  //减小截屏图片的尺寸，宽度保持在480px
        imgScale = imgScale > 1 ? 1 : imgScale;
        setTimeout(()=>{
          html2Canvas(document.querySelector('#screen'), { useCORS: true, allowTaint: false, taintTest: false, scale: imgScale }).then(function (canvas) {
            let image = canvas.toDataURL();
            let pos = image.indexOf("4")+2;
            image = image.substring(pos, image.length - pos);
            addScreenshot('api/attachment/screenshot',{ 'base64StrImgData': image,"name":_this.screen.name}).then(response => {
              _this.screen.page.coverImage = response.data.res.url;
              loading.close();
              _this.$message({
                message: '截取画布成功',
                type: 'success'
              });
              _this.screenShoting = false;
            })
          })
        },100);
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
      api() {
        return getApi()
      },
      path() {
        return getPath()
      },
      grid: function () {
        return [this.screen.page.grid, this.screen.page.grid]
      },
      background: function () {
        var backgroundColor = 'background-color: #000;'
        if(this.screen.page.backgroundColor)
          backgroundColor = 'background-color: ' + this.screen.page.backgroundColor + ';'

        if(this.screen.page.backgrounds && this.screen.page.backgrounds.length > 0){
          //var bgimage = 'background-image: url(' + this.screen.page.backgrounds[0].url + '); '
          var bgimage = 'background-image: url(/static/' + this.screen.page.backgrounds[0].name + '); '
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
  }
</script>
<style scoped>
  .el-checkbox {
    margin-right: 0px;
  }

  .el-button{
    color: #fff;
  }

  .el-button li{
    color: #00c1de;
  }

  .comp{
    color: #fff;
  }
  .comp li{
    color: #ffd04b;
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

  .el-header button {
    margin-right: 10px;
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
    width: 60px;
    height: 45px;
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
    border: 1px #00c1de dotted;
    border-radius: 3px;
    z-index: 99999;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }

  .part {
    text-align: center;
    vertical-align: baseline;
    align-items: center;
    justify-content: center;
  }

  .button-tip{
    position: absolute;
    background: #00c1de;
    padding: 0;
    height: 25px;
    margin-top: 0;
    top:0px;left:0px;
  }

  .button-tip a {
    display: inline-block;
    text-align: center;
    width: 22px;
    line-height: 25px;
    font-size: 20px;
    color: #333;
  }

  .el-main {
    padding: 0px;
  }

  .page-component__scroll {
    height: calc(100% + 18px);
    margin-top: 0px;
  }

</style>
