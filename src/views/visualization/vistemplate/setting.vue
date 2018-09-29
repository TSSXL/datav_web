<template>
  <el-container>
    <el-header style="height: 32px;">
      <el-row :gutter="20">
        <el-col :span="16" style="text-align: left">
          <el-popover
            ref="chart"
            placement="bottom"
            width="600"
            trigger="click"
            v-model="popChartVisible">
            <ul class="charts">
              <li v-for="chart in charts" :key="chart.icon" @click="selectChart(chart)">
                <img alt="" :src="'/static/charts/' + chart.icon">
                <div class="name">{{chart.name}}</div>
                <div class="checked"></div>
              </li>
            </ul>
          </el-popover>
          <el-button type="text" v-popover:chart>
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
              <li v-for="chart in charts" :key="chart.icon" @click="selectChart(chart)">
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
        <el-col :span="8" style="text-align: right">
          <el-button type="text">
            <li class="fa fa-eye"/>
            预览
          </el-button>
          <el-button type="text">
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
        <el-table :data="layouts" highlight-current-row :show-header="false"
                  @current-change="handleCurrentChange" size="mini">
          <el-table-column prop="checked" width="32">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="icon" width="56">
            <template slot-scope="scope">
              <li v-if="scope.row.type=='text'" class="fa fa-text-height" style="font-size: 32px"/>
              <li v-else-if="scope.row.name=='globe'" class="fa fa-globe" style="font-size: 48px"/>
              <img v-else alt="" :src="'/static/charts/' + scope.row.icon" width="45" @click="handleCurrentClick(scope.row)">
            </template>
          </el-table-column>
          <el-table-column prop="name">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
      <el-main>
        <!----------------main开始-------------------->
        <div
          :style="'width:' + page.screen.width + 'px; height:' + page.screen.height + 'px; background-color: #000000; position: absolute;' + background">
          <vue-draggable-resizable v-for="component in layouts" :key="component.name"
                                   :w="component.option.style.size_location.width" :h="component.option.style.size_location.height"
                                   :x="component.option.style.size_location.x" :y="component.option.style.size_location.y"
                                   :z="component.option.style.size_location.z"
                                   :grid="grid"
                                   :active.sync="component.active"
                                   v-on:dragging="onDrag" v-on:resizing="onResize"
                                   @activated="onActivated(component)" @deactivated="onDeactivated"
                                   :parent="true" class="part" :class="component == currentComponent ? active : ''">
            <v-text-title v-if="component.name == 'title'" :option="component.option"></v-text-title>
            <v-chart-pie v-if="component.name == 'basic pie'" :option="component.option"></v-chart-pie>
            <v-chart-bar v-if="component.name == 'basic bar'" :option="component.option"></v-chart-bar>
            <v-gl-globe v-if="component.name == 'globe'" :option="component.option"></v-gl-globe>
          </vue-draggable-resizable>
          <div class="charts">
            <div id="myChart" :style="'width:300px;height:200px'"></div>
          </div>
        </div>
      </el-main>
      <el-aside style="width:332px; overflow: hidden;">
        <!----------------right开始-------------------->
        <section v-if="!currentComponent.selected">
          <div class="aside-title">页面设置</div>
          <el-form label-width="80px" :model="page" class="demo-form-inline" size="mini">
            <el-form-item label="屏幕大小">
              <el-row>
                <el-col :span="12">
                  <li class="fa fa-arrows-h"/>
                  <el-input-number style="width: 96px;" v-model="page.screen.width" controls-position="right" :min="1"
                                   :max="32800"></el-input-number>
                </el-col>
                <el-col :span="12">
                  <li class="fa fa-arrows-v"/>
                  <el-input-number style="width: 96px;" v-model="page.screen.height" controls-position="right" :min="1"
                                   :max="32800"></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="背景图">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:3000/api/imglib/files"
                :multiple="false"
                :limit="1"
                :auto-upload="true"
                :fileList="page.backgrounds"
                :on-success="handleUploadiconSuccess"
                :on-remove="handleUploadiconRemove">
                <img v-if="page.backgrounds.length>0" :src="page.backgrounds[0].url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="缩放方式">
              <el-radio-group v-model="page.fill">
                <el-radio label="x">等比例缩放宽度铺满</el-radio>
                <el-radio label="y">等比例缩放高度铺满</el-radio>
                <el-radio label="full">全屏铺满</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="栅格间距">
              <el-input-number style="width: 96px;" v-model="page.grid" controls-position="right" :min="1"
                               :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="项目封面">

            </el-form-item>
          </el-form>
        </section>
        <section v-else>
          <div class="aside-title">{{currentComponent.label}}设置</div>
          <setting-container :component="currentComponent"></setting-container>
        </section>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts-gl'
  import VueDraggableResizable from 'vue-draggable-resizable'
  import settingContainer from '@/components/VisualizationSetting/settingContainer'
  import vTextTitle from '@/components/Visualization/words/vTextTitle'
  import vChartPie from '@/components/Visualization/vChartPie'
  import vChartBar from '@/components/Visualization/vChartBar'
  import vGlGlobe from '@/components/Visualization/vMap/vGlGlobe'

  export default {
    components: {VueDraggableResizable, settingContainer, vTextTitle, vChartPie, vChartBar, vGlGlobe},
    data() {
      return {
        currentLayout: {},
        currentComponent: {},
        page: { screen: { width: 960, height: 480 }, grid: 10, fill: 'full', backgrounds: [] },
        layouts: [],
        charts: [{name: '折线图', type: 'chart', icon: 'line.png'}, {name: '柱状图', type: 'chart', icon: 'bar.png'},
          {name: '散点图', type: 'chart', icon: 'scatter.png'}, {name: '饼图', type: 'chart', icon: 'pie.png'},
          {name: '雷达图', type: 'chart', icon: 'radar.png'}, {name: 'K线图', type: 'chart', icon: 'candlestick.png'},
          {name: '关系图', type: 'chart', icon: 'graph.png'}, {name: '仪表盘', type: 'chart', icon: 'gauge.png'}
        ],
        title: {
          label: '通用标题',
          name: 'title',
          version: '1.0.0',
          type: 'text',
          icon: 'text.png',
          active: false,
          selected: true,
          option: {
            title: '标题名',
            style: {
              text: {
                font_family: '',
                font_size: '32',
                color: '#FFFFFF',
                font_weight: 'normal',
                text_align: 'center'
              },
              hyperlink: {
                url: '',
                blank: false
              },
              size_location: {
                width: 360,
                height: 80,
                x: 320,
                y: 28,
                z: 999
              }
            },
            data: {
              fields: [{ name: 'value', map: '', desc: '标题值', state: '' }],
              data_type: 'static_data',
              static_data: [{ value: '全球环境监测大屏应用', url: '' }],
              auto_refresh: false,
              interval: 3
            },
          }
        },
        pie: {
          label: '基础饼图',
          name: 'basic pie',
          type: 'chart',
          version: '1.0.0',
          icon: 'pie.png',
          active: false,
          selected: true,
          option: {
            title: '基础饼图',
            style: {
              label:{

              },
              text: {
                font_family: '',
                font_size: '32',
                color: '#FFFFFF',
                font_weight: 'normal',
                text_align: 'center'
              },
              hyperlink: {
                url: '',
                blank: false
              },
              size_location: {
                width: 280,
                height: 180,
                x: 40,
                y: 48,
                z: 998
              }
            },
            data: {
              fields: [{name: 'value', map: '', desc: '标题值', state: ''}],
              data_type: 'static_data',
              static_data: [
                {
                  "x": "设备",
                  "y": 188
                },
                {
                  "x": "建材",
                  "y": 12
                },
                {
                  "x": "食品",
                  "y": 12
                }
              ],
              auto_refresh: false,
              interval: 3
            },
          }
        },
        bar: {
          label: '基础柱状图',
          name: 'basic bar',
          type: 'chart',
          version: '1.0.0',
          icon: 'bar.png',
          active: false,
          selected: true,
          option: {
            title: '基础柱状图',
            style: {
              label:{

              },
              text: {
                font_family: '',
                font_size: '32',
                color: '#FFFFFF',
                font_weight: 'normal',
                text_align: 'center'
              },
              hyperlink: {
                url: '',
                blank: false
              },
              size_location: {
                width: 280,
                height: 280,
                x: 740,
                y: 248,
                z: 997
              }
            },
            data: {
              fields: [{name: 'value', map: '', desc: '标题值', state: ''}],
              data_type: 'static_data',
              static_data: [
                {
                  "x": "设备",
                  "y": 188
                },
                {
                  "x": "建材",
                  "y": 12
                },
                {
                  "x": "食品",
                  "y": 12
                }
              ],
              auto_refresh: false,
              interval: 3
            },
          }
        },
        globe: {
          label: 'GL地球',
          name: 'globe',
          type: 'gl',
          version: '1.0.0',
          icon: 'pie.png',
          active: false,
          selected: true,
          option: {
            title: 'GL地球',
            style: {
              label:{

              },
              text: {
                font_family: '',
                font_size: '32',
                color: '#FFFFFF',
                font_weight: 'normal',
                text_align: 'center'
              },
              hyperlink: {
                url: '',
                blank: false
              },
              size_location: {
                width: 380,
                height: 380,
                x: 290,
                y: 80,
                z: 996
              }
            },
            data: {
              fields: [{name: 'value', map: '', desc: '标题值', state: ''}],
              data_type: 'static_data',
              static_data: [
                {
                  "x": "设备",
                  "y": 188
                },
                {
                  "x": "建材",
                  "y": 12
                },
                {
                  "x": "食品",
                  "y": 12
                }
              ],
              auto_refresh: false,
              interval: 3
            },
          }
        },
        popChartVisible: false,
        popTextVisible: false,
        layoutOperateName: 'style',
        active: 'active',

      }
    },
    created() {
      this.$nextTick(function () {
        this.layouts.push(this.title)
        this.layouts.push(this.pie)
        this.layouts.push(this.bar)
        this.layouts.push(this.globe)
      })
    },
    methods: {
      onResize: function (x, y, width, height) {
        if(this.currentComponent && this.currentComponent.option) {
          this.currentComponent.option.style.size_location.x = x
          this.currentComponent.option.style.size_location.y = y
          this.currentComponent.option.style.size_location.width = width
          this.currentComponent.option.style.size_location.height = height
          //this.drawChart()
        }
      },
      onDrag: function (x, y) {
        this.currentComponent.option.style.size_location.x = x
        this.currentComponent.option.style.size_location.y = y
      },
      onActivated: function(val) {
        this.currentComponent = val
      },
      onDeactivated: function () {
        //this.currentLayout.active = false;
      },
      handleCurrentChange(val) {
        this.currentComponent = val
        this.currentComponent.active = true;
        this.currentComponent.selected = true;
      },
      handleCurrentClick(val) {
        this.currentComponent = val;
        this.currentComponent.active = true;
        this.currentComponent.selected = true;
      },
      selectChart(chart) {
        var z = 999;
        if (this.layouts.length > 0)
          z = this.layouts[0].z + 1;

        var item = {
          name: chart.name,
          type: chart.type,
          icon: chart.icon,
          width: 240,
          height: 96,
          x: 0,
          y: 0,
          z: z,
          active: true,
          selected: true
        }
        this.layouts.unshift(item);
        this.currentComponent = item;
        this.popChartVisible = false;
      },
      upLayout() {
        var layout = this.currentComponent
        var index = this.layouts.indexOf(layout)
        if (index != 0) {
          this.layouts.splice(index, 1)
          this.layouts.splice(index - 1, 0, layout)
        }

        let z = this.layouts[0].option.style.size_location.z
        for (let item of this.layouts) {
          z = z - 1
          item.option.style.size_location.z = z
        }
      },
      downLayout() {
        var layout = this.currentComponent;
        var index = this.layouts.indexOf(layout);
        if (index != this.layouts.length) //已经是最后一个了
        {
          this.layouts.splice(index, 1);
          this.layouts.splice(index + 1, 0, layout)
        }

        let z = this.layouts[0].option.style.size_location.z
        for (let item of this.layouts) {
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
      }
    },
    computed: {
      grid: function () {
        return [this.page.grid, this.page.grid]
      },
      background: function () {
        var bgimage = 'background-image: url(/static/main-bg.jpg); '
        var bgfill = 'background-size: cover; '
        var css = ' background-position: center center; background-repeat: no-repeat; '
        if (this.page.fill == 'x') {

        } else if (this.page.fill == 'y') {

        } else { //full
          return bgimage + bgfill + css;
        }
      }
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
    height: calc(100vw);
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
</style>
