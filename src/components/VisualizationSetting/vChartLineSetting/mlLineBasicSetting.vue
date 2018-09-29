<template>
  <base-setting  :component="component">
    <template slot="style">
      <el-form label-width="80px" size="mini" label-position="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="文本样式" name="text">
            <el-form-item label="字体">
              <el-select v-model="optionStyle.textStyle.fontFamily" placeholder="请选择" size="mini">
                <el-option v-if="setting.fontOptions && setting.fontOptions.length > 0"
                           v-for="item in setting.fontOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.textStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.textStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="网格" name="grid">
            <el-form-item label="顶部边距">
              <el-input-number size="mini" v-model="optionStyle.grid.top" controls-position="right" :min="0" :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="底部边距">
              <el-input-number size="mini" v-model="optionStyle.grid.bottom" controls-position="right" :min="0" :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="左侧边距">
              <el-input-number size="mini" v-model="optionStyle.grid.left" controls-position="right" :min="0" :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="右侧边距">
              <el-input-number size="mini" v-model="optionStyle.grid.right" controls-position="right" :min="0" :max="128"></el-input-number>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="x轴" name="xAxis">
            <el-form-item label="显示">
              <el-switch
                v-model="optionStyle.xAxis.show">
              </el-switch>
            </el-form-item>
            <c-text-style-setting :textStyle="optionStyle.xAxis.axisLabel"></c-text-style-setting>
            <el-form-item label="数据种类">
              <el-radio-group v-model="optionStyle.xAxis.type"
                              v-if="axisDataTypeOptions && axisDataTypeOptions.length > 0">
                <el-radio-button v-for="item in axisDataTypeOptions" :label="item.value" :key="item.value">
                  {{item.label}}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="boundaryGap">
              <el-switch
                v-model="optionStyle.xAxis.boundaryGap">
              </el-switch>
            </el-form-item>
            <el-form-item label="位移">
              <el-input-number v-model="optionStyle.xAxis.axisLabel.margin" controls-position="right" :min="-128"
                               :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="角度">
              <el-radio-group v-model="optionStyle.xAxis.axisLabel.rotate"
                              v-if="axisLabelRotateOptions && axisLabelRotateOptions.length > 0">
                <el-radio-button v-for="item in axisLabelRotateOptions" :label="item.value" :key="item.value">
                  {{item.label}}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="轴线显示">
              <el-switch
                v-model="optionStyle.xAxis.axisLine.show">
              </el-switch>
            </el-form-item>
            <el-form-item label="轴线颜色">
              <el-color-picker v-model="optionStyle.xAxis.axisLine.lineStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="网格线显示">
              <el-switch
                v-model="optionStyle.xAxis.splitLine.show">
              </el-switch>
            </el-form-item>
            <el-form-item label="网格线颜色">
              <el-color-picker v-model="optionStyle.xAxis.splitLine.lineStyle.color"></el-color-picker>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="y轴" name="yAxis">
            <el-form-item label="显示">
              <el-switch
                v-model="optionStyle.yAxis.show">
              </el-switch>
            </el-form-item>
            <c-text-style-setting :textStyle="optionStyle.yAxis.axisLabel"></c-text-style-setting>
            <el-form-item label="最小值">
              <el-input style="width: 96px;" v-model="optionStyle.yAxis.min"></el-input>
            </el-form-item>
            <el-form-item label="最大值">
              <el-input style="width: 96px;" v-model="optionStyle.yAxis.max"></el-input>
            </el-form-item>
            <el-form-item label="位移">
              <el-input-number v-model="optionStyle.yAxis.axisLabel.margin" controls-position="right" :min="-128"
                               :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="角度">
              <el-radio-group v-model="optionStyle.yAxis.axisLabel.rotate"
                              v-if="axisLabelRotateOptions && axisLabelRotateOptions.length > 0">
                <el-radio-button v-for="item in axisLabelRotateOptions" :label="item.value" :key="item.value">
                  {{item.label}}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="轴单位">
              <el-input style="width: 96px;" v-model="optionStyle.yAxis.name"></el-input>
            </el-form-item>
            <el-form-item label="轴线显示">
              <el-switch
                v-model="optionStyle.yAxis.axisLine.show">
              </el-switch>
            </el-form-item>
            <el-form-item label="轴线颜色">
              <el-color-picker v-model="optionStyle.yAxis.axisLine.lineStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="网格线显示">
              <el-switch
                v-model="optionStyle.yAxis.splitLine.show">
              </el-switch>
            </el-form-item>
            <el-form-item label="网格线颜色">
              <el-color-picker v-model="optionStyle.yAxis.splitLine.lineStyle.color"></el-color-picker>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="图例" name="legend">
            <el-form-item label="显示">
              <el-switch
                v-model="optionStyle.legend.show">
              </el-switch>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.legend.textStyle.fontSize" controls-position="right" :min="1"
                               :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.legend.textStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="图例间距">
              <el-input-number style="width: 96px;" v-model="optionStyle.legend.itemGap"
                               controls-position="right" :min="1"
                               :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="布局">
              <el-radio-group v-model="optionStyle.legend.orient" v-if="orientOptions && orientOptions.length > 0">
                <el-radio-button v-for="item in orientOptions" :label="item.value" :key="item.value">
                  {{item.label}}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="水平位置">
              <el-radio-group v-model="optionStyle.legend.left"
                              v-if="horizontalAlignOptions && horizontalAlignOptions.length > 0">
                <el-radio-button v-for="item in horizontalAlignOptions" :label="item.value" :key="item.value">
                  {{item.label}}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="垂直位置">
              <el-radio-group v-model="optionStyle.legend.top"
                              v-if="verticalAlignOptions  && verticalAlignOptions.length > 0">
                <el-radio-button v-for="item in verticalAlignOptions" :label="item.value" :key="item.value">
                  {{item.label}}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="数据系列" name="series">
            <el-row style="text-align: right">
              <el-button @click="addSeries" type="text" icon="fa fa-plus" style="margin-right: 10px;" size="mini"> 添加</el-button>
            </el-row>
            <div v-for="series in optionStyle.series" :key="series.value">
              <div style="padding:4px; font-size:12px; background-color: #7EC4CC">{{series.name}}</div>
              <c-series-line-setting :series="series"></c-series-line-setting>
            </div>
          </el-collapse-item>
          <pos-size-setting :cStyle="optionStyle"></pos-size-setting>
          <el-button @click="optionDialogVisible=true">显示json</el-button>
        </el-collapse>
      </el-form>
      <el-dialog
        title="JSON"
        :visible.sync="optionDialogVisible">
        <cm-json-editor v-model="option" style="font-size: 10px;" @close="optionDialogVisible=false"></cm-json-editor>
      </el-dialog>
    </template>
    <template slot="data">
      <data-source-setting :option="component.option" :setting="setting"></data-source-setting>
    </template>
  </base-setting>
</template>
<script>
  import errorTip from '@/components/Validate/errorTip'
  import {getItem as getOptions} from '@/views/dev/option/api'
  import ElFooter from "element-ui/packages/footer/src/main";
  import jsonEditor from '@/components/jsonEditor'
  import cmJsonEditor from '@/components/jsonEditor/cmJsonEditor'
  import ElFormItem from "element-ui/packages/form/src/form-item";
  import cTextStyleSetting from '@/components/VisualizationSetting/cTextStyleSetting'
  import cSeriesLineSetting from '@/components/VisualizationSetting/cSeriesLineSetting'
  import ElButton from "element-ui/packages/button/src/button";
  import BaseSetting from "../BaseSetting";
  import posSizeSetting from "../posSizeSetting";
  import dataSourceSetting from "../dataSourceSetting";

  export default {
    name: 'mlLineBasicSetting',
    components: {
      ElButton,
      ElFormItem,
      ElFooter,
      errorTip,
      jsonEditor,
      cmJsonEditor,
      cTextStyleSetting,
      cSeriesLineSetting,
      posSizeSetting,
      BaseSetting,
      dataSourceSetting
    },
    props: {
      component: {type: Object},
      setting: { type: Object }
    },
    data() {
      return {
        activeNames: ['text'],
        optionStyle:{},
        option:"",
        optionDialogVisible:false,
        staticData: '',
        dynamicData: '',
        exampleData: '',
        fontWeights:["normal","bold","bolder","lighter","100","200"],
        axisDataTypeOptions: [],
        axisLabelRotateOptions: [],
        datasourceOptions: [],
        horizontalAlignOptions: [],
        verticalAlignOptions: [],
        orientOptions: [],
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
      addSeries() {
        let series = {
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
        this.optionStyle.series.push(series);
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
      },
      createDatamap() {
        this.$router.push('/visualization/datamap/add')
      }
    },
    watch: {
      'option': function(val){
        try {
          this.component.option = JSON.parse(val)
        } catch(e) {
          this.component.option = {};
        }
      }
    },
    created() {
      this.optionStyle = this.component.option.style;
      this.option=JSON.stringify(this.component.option, null, 4);
      this.fetchOptions()
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
