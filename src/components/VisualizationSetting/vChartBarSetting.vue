<template>
  <section>
    <el-form label-width="80px" size="mini" v-if="active=='style'">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="文本样式" name="text">
          <c-text-style-setting :textStyle="option.style.text"></c-text-style-setting>
        </el-collapse-item>
        <el-collapse-item title="网格" name="grid">
          <el-form-item label="左侧边距">
            <el-input-number v-model="option.style.grid.left" controls-position="right" :min="0"
                             :max="128"></el-input-number>
          </el-form-item>
          <el-form-item label="顶部边距">
            <el-input-number v-model="option.style.grid.top" controls-position="right" :min="0"
                             :max="128"></el-input-number>
          </el-form-item>
          <el-form-item label="右侧边距">
            <el-input-number v-model="option.style.grid.right" controls-position="right" :min="0"
                             :max="128"></el-input-number>
          </el-form-item>
          <el-form-item label="底部边距">
            <el-input-number v-model="option.style.grid.bottom" controls-position="right" :min="0"
                             :max="128"></el-input-number>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="x轴" name="xAxis">
          <el-form-item label="显示">
            <el-switch
              v-model="option.style.xAxis.show">
            </el-switch>
          </el-form-item>
          <c-text-style-setting :textStyle="option.style.xAxis.axisLabel"></c-text-style-setting>
          <el-form-item label="数据种类">
            <el-radio-group v-model="option.style.xAxis.type"
                            v-if="axisDataTypeOptions && axisDataTypeOptions.length > 0">
              <el-radio-button v-for="item in axisDataTypeOptions" :label="item.value" :key="item.value">
                {{item.label}}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="boundaryGap">
            <el-switch
              v-model="option.style.xAxis.boundaryGap">
            </el-switch>
          </el-form-item>
          <el-form-item label="位移">
            <el-input-number v-model="option.style.xAxis.axisLabel.margin" controls-position="right" :min="-128"
                             :max="128"></el-input-number>
          </el-form-item>
          <el-form-item label="角度">
            <el-radio-group v-model="option.style.xAxis.axisLabel.rotate"
                            v-if="axisLabelRotateOptions && axisLabelRotateOptions.length > 0">
              <el-radio-button v-for="item in axisLabelRotateOptions" :label="item.value" :key="item.value">
                {{item.label}}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="轴线显示">
            <el-switch
              v-model="option.style.xAxis.axisLine.show">
            </el-switch>
          </el-form-item>
          <el-form-item label="轴线颜色">
            <el-color-picker v-model="option.style.xAxis.axisLine.lineStyle.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="网格线显示">
            <el-switch
              v-model="option.style.xAxis.splitLine.show">
            </el-switch>
          </el-form-item>
          <el-form-item label="网格线颜色">
            <el-color-picker v-model="option.style.xAxis.splitLine.lineStyle.color"></el-color-picker>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="y轴" name="yAxis">
          <el-form-item label="显示">
            <el-switch
              v-model="option.style.yAxis.show">
            </el-switch>
          </el-form-item>
          <c-text-style-setting :textStyle="option.style.yAxis.axisLabel"></c-text-style-setting>
          <el-form-item label="最小值">
            <el-input style="width: 96px;" v-model="option.style.yAxis.min"></el-input>
          </el-form-item>
          <el-form-item label="最大值">
            <el-input style="width: 96px;" v-model="option.style.yAxis.max"></el-input>
          </el-form-item>
          <el-form-item label="位移">
            <el-input-number v-model="option.style.yAxis.axisLabel.margin" controls-position="right" :min="-128"
                             :max="128"></el-input-number>
          </el-form-item>
          <el-form-item label="角度">
            <el-radio-group v-model="option.style.yAxis.axisLabel.rotate"
                            v-if="axisLabelRotateOptions && axisLabelRotateOptions.length > 0">
              <el-radio-button v-for="item in axisLabelRotateOptions" :label="item.value" :key="item.value">
                {{item.label}}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="轴单位">
            <el-input style="width: 96px;" v-model="option.style.yAxis.name"></el-input>
          </el-form-item>
          <el-form-item label="轴线显示">
            <el-switch
              v-model="option.style.yAxis.axisLine.show">
            </el-switch>
          </el-form-item>
          <el-form-item label="轴线颜色">
            <el-color-picker v-model="option.style.yAxis.axisLine.lineStyle.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="网格线显示">
            <el-switch
              v-model="option.style.yAxis.splitLine.show">
            </el-switch>
          </el-form-item>
          <el-form-item label="网格线颜色">
            <el-color-picker v-model="option.style.yAxis.splitLine.lineStyle.color"></el-color-picker>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="图例" name="legend">
          <el-form-item label="显示">
            <el-switch
              v-model="option.style.legend.show">
            </el-switch>
          </el-form-item>
          <el-form-item label="字号">
            <el-input-number v-model="option.style.legend.textStyle.fontSize" controls-position="right" :min="1"
                             :max="128"></el-input-number>
          </el-form-item>
          <el-form-item label="字体颜色">
            <el-color-picker v-model="option.style.legend.textStyle.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="图例间距">
            <el-input-number style="width: 96px;" v-model="option.style.legend.itemGap"
                             controls-position="right" :min="1"
                             :max="128"></el-input-number>
          </el-form-item>
          <el-form-item label="布局">
            <el-radio-group v-model="option.style.legend.orient" v-if="orientOptions && orientOptions.length > 0">
              <el-radio-button v-for="item in orientOptions" :label="item.value" :key="item.value">
                {{item.label}}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="水平位置">
            <el-radio-group v-model="option.style.legend.left"
                            v-if="horizontalAlignOptions && horizontalAlignOptions.length > 0">
              <el-radio-button v-for="item in horizontalAlignOptions" :label="item.value" :key="item.value">
                {{item.label}}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="垂直位置">
            <el-radio-group v-model="option.style.legend.top"
                            v-if="verticalAlignOptions  && verticalAlignOptions.length > 0">
              <el-radio-button v-for="item in verticalAlignOptions" :label="item.value" :key="item.value">
                {{item.label}}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="数据系列" name="series">
          <el-button type="primary" @click="addSeries" size="mini"> + 添加</el-button>
          <div v-for="series in option.style.series" :key="series.value">
            <div style="padding:4px; font-size:12px; background-color: #7EC4CC">{{series.name}}</div>
            <c-series-line-setting :series="series"></c-series-line-setting>
          </div>
        </el-collapse-item>
        <el-collapse-item title="尺寸和位置" name="size_location">
          <el-form-item label="尺寸">
            <el-row>
              <el-col :span="12">
                <li class="fa fa-arrows-h"/>
                <el-input-number style="width: 96px;" v-model="option.style.size_location.width"
                                 controls-position="right"
                                 :min="1"
                                 :max="32800"></el-input-number>
              </el-col>
              <el-col :span="12">
                <li class="fa fa-arrows-v"/>
                <el-input-number style="width: 96px;" v-model="option.style.size_location.height"
                                 controls-position="right" :min="1"
                                 :max="32800"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="位置">
            <el-row>
              <el-col :span="12">
                x
                <el-input-number style="width: 96px;" v-model="option.style.size_location.x" controls-position="right"
                                 :min="1"
                                 :max="32800"></el-input-number>
              </el-col>
              <el-col :span="12">
                y
                <el-input-number style="width: 96px;" v-model="option.style.size_location.y" controls-position="right"
                                 :min="1"
                                 :max="32800"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <el-form label-width="80px" size="mini" v-if="active=='data'">
      <el-collapse v-model="dataActiveNames">
        <el-collapse-item title="数据接口" name="interface">
          <el-table
            :data="option.data.fields" size="mini"
            style="width: 100%;">
            <el-table-column
              prop="name"
              row-style="background-color: #1b1b1b; color: #333333;"
              label="字段"
              width="60">
            </el-table-column>
            <el-table-column
              prop="map"
              label="映射"
              width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.map" placeholder="可映射" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="desc"
              label="说明">
            </el-table-column>
          </el-table>

          <el-form label-width="80px" size="mini" style="margin-top: 12px;">
            <div>数据源类型</div>
            <el-col :span="24">
              <el-select v-model="option.data.data_type" placeholder="请选择" @change="changeDataType" size="mini">
                <el-option v-if="datasourceOptions && datasourceOptions.length > 0"
                           v-for="item in datasourceOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-col>

            <cm-json-editor v-if="option.data.data_type == 'static_data2'" v-model="staticData"
                            style="font-size: 10px;"></cm-json-editor>

            <div>选择时序数据</div>
            <el-col :span="18">
              <el-select v-model="option.data.datamap.id" placeholder="请选择" @change="changeDataMap" size="mini">
                <el-option v-for="item in this.datamaps"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="createDatamap" size="mini">新建</el-button>
            </el-col>

            <el-form-item label="自动更新">
              <el-checkbox v-model="option.data.auto_refresh"></el-checkbox>
              <el-input-number v-model="option.data.interval" controls-position="right" :min="1" :max="1200"
                               v-if="option.data.auto_refresh"></el-input-number>
              <span v-if="option.data.auto_refresh">秒一次</span>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </section>
</template>
<script>
  import validateBus from '@/views/bus/validate'
  import errorTip from '@/components/Validate/errorTip'
  import {getItem as getOptions} from '@/views/dev/option/api'
  import {getList as getDataMapList} from '@/views/visualization/datamap/api'
  import ElFooter from "element-ui/packages/footer/src/main";
  import jsonEditor from '@/components/jsonEditor'
  import cmJsonEditor from '@/components/jsonEditor/cmJsonEditor'
  import ElFormItem from "element-ui/packages/form/src/form-item";
  import cTextStyleSetting from '@/components/VisualizationSetting/cTextStyleSetting'
  import cSeriesLineSetting from '@/components/VisualizationSetting/cSeriesLineSetting'
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    name: 'vChartBarSetting',
    components: {
      ElButton,
      ElFormItem,
      ElFooter,
      errorTip,
      jsonEditor,
      cmJsonEditor,
      cTextStyleSetting,
      cSeriesLineSetting
    },
    props: {
      option: {type: Object},
      active: {type: String}
    },
    data() {
      return {
        activeNames: ['text'],
        dataActiveNames: ['interface'],
        axisDataTypeOptions: [],
        axisLabelRotateOptions: [],
        fontOptions: [],
        datasourceOptions: [],
        horizontalAlignOptions: [],
        verticalAlignOptions: [],
        orientOptions: [],
        staticData: '',
        dynamicData: '',
        datamaps: [],
        exampleData: ''
      }
    },
    methods: {
      fetchOptions() {
        getOptions('axisDataType').then(response => {
          this.axisDataTypeOptions = response.data.options
        })
        getOptions('axisLabelRotate').then(response => {
          this.axisLabelRotateOptions = response.data.options
        })
        getOptions('font').then(response => {
          this.fontOptions = response.data.options
        })
        getOptions('horizontalAlign').then(response => {
          this.horizontalAlignOptions = response.data.options
        })
        getOptions('verticalAlign').then(response => {
          this.verticalAlignOptions = response.data.options
        })
        getOptions('visualizationDatasource').then(response => {
          this.datasourceOptions = response.data.options
        })
        getOptions('orient').then(response => {
          this.orientOptions = response.data.options
        })
      },
      fetchDataMapList() {
        var listQuery = {pageNo: 1, pageSize: 10, sort: "_id", order: -1}
        var objQuery = [{name: {$regex: ''}}]
        getDataMapList(listQuery, objQuery).then(response => {
          this.datamaps = response.data.results
        });
      },
      addSeries() {
        var series = {
          "value": 1,
          "name": "系列一",
          "type": "line",
          "data": [
            33,
            56,
            72,
            13
          ],
          "smooth": false,
          "showSymbol": true,
          "symbolSize": 4,
          "lineStyle": {
            "color": null,
            "type": "solid",
            "width": 1
          },
          "label": {
            "show": true,
            "color": null
          },
          "itemStyle": {
            "color": null,
            "borderWidth": 4
          },
          "showArea": true,
          "areaStyle": {
            "color": null
          }
        }
        this.option.style.series.push(series);
      },
      changeDataType(val) {
        if(val == 'static_data'){

        } else if (val == 'map_data') {
          //this.fetchDataMapList()
        }
      },
      changeDataMap(val) {
        var item = this.datamaps.find(item => {
          return item.id == val
        })
        console.log(item)
        /*
        if (item) {
          this.staticData = item.transResult
        }
        */
      },
      createDatamap() {
        this.$router.push('/visualization/datamap/add')
      }
    },
    watch: {
      'staticData': function (val) {
        this.option.data.static_data = JSON.parse(val)
      }
      /*
      'option.data.static_data': {
        handler: function(val, oldVal){
          this.staticData = JSON.stringify(val)
        },
        deep: true
      }
      */
    },
    created() {
      validateBus.$on('validate', target => {
        this.$validator.validateAll().then(result => {
          if (result) {
            return
          }
          validateBus.$emit('errors-changed', this.errors.items)
        })
      })
      this.staticData = JSON.stringify(this.option.data.static_data, null, 2)
      this.fetchOptions()
      //if (this.option.data.data_type == 'map_data') {
      this.fetchDataMapList()
      //}
    }
  }
</script>
<style scoped>
  .el-tabs--card > .el-tabs__header {
    border-bottom: 0px !important;
  }

  .el-tabs__header {
    margin: 0 !important;
  }
</style>
