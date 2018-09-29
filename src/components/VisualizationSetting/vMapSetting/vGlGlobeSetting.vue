<template>
  <base-setting  :component="component">
    <template slot="style">
      <el-form label-width="80px" size="mini" label-position="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="文本样式" name="style">
            <el-form-item label="字体">
              <el-select v-model="optionStyle.text.fontFamily" placeholder="请选择">
                <el-option v-if="setting.fontOptions && setting.fontOptions.length > 0"
                           v-for="item in setting.fontOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.text.fontSize" controls-position="right" :min="1"
                               :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.text.color"></el-color-picker>
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
              <el-radio-group v-model="optionStyle.legend.left" v-if="horizontalAlignOptions && horizontalAlignOptions.length > 0">
                <el-radio-button v-for="item in horizontalAlignOptions" :label="item.value" :key="item.value">
                  {{item.label}}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item  label="垂直位置">
              <el-radio-group v-model="optionStyle.legend.top" v-if="verticalAlignOptions  && verticalAlignOptions.length > 0">
                <el-radio-button v-for="item in verticalAlignOptions" :label="item.value" :key="item.value">
                  {{item.label}}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="圆心和半径" name="center_radius">
            <el-form-item label="圆心坐标">
              <el-row>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.center_radius.center[0]"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.center_radius.center[1]"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="半径">
              <el-row>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.center_radius.radius[0]"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.center_radius.radius[1]"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-collapse-item>
          <pos-size-setting :cStyle="optionStyle"></pos-size-setting>
        </el-collapse>
      </el-form>
    </template>
    <template slot="data">
      <data-source-setting :option="component.option" :setting="setting"></data-source-setting>
    </template>
  </base-setting>
</template>
<script>
  import errorTip from '@/components/Validate/errorTip'
  import BaseSetting from "../BaseSetting";
  import posSizeSetting from "../posSizeSetting";
  import dataSourceSetting from "../dataSourceSetting";
  import {getItem as getOptions} from '@/views/dev/option/api'

  export default {
    name: 'vGlGlobeSetting',
    components: {
      BaseSetting,
      posSizeSetting,
      dataSourceSetting,
      errorTip
    },
    props: {
      component: {type: Object},
      setting: { type: Object },
      active: {type: String}
    },
    data() {
      return {
        activeNames: ['style'],
        optionStyle:{},
        staticData: '',
        dynamicData: '',
        exampleData: '',
        fontWeights:["normal","bold","bolder","lighter","100","200"],
        dataActiveNames: ['interface'],
        fontOptions: [],
        datasourceOptions: [],
        horizontalAlignOptions: [],
        verticalAlignOptions: [],
        orientOptions: []
      }
    },
    methods: {
      fetchOptions() {
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
      }
    },
    watch: {

    },
    created() {
      this.optionStyle = this.component.option.style;
      this.fetchOptions();

    }
  }
</script>
