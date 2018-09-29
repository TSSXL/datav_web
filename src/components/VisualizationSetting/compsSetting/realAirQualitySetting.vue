<template>
  <base-setting  :component="component">
    <template slot="style">
      <el-form label-width="80px" size="mini" label-position="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="全局样式" name="full">
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
            <el-form-item label="边距">
              <el-form-item label="顶部" label-width="50px">
                <el-input-number size="mini" v-model="optionStyle.grid.top" controls-position="right" :min="0" :max="128"></el-input-number>
              </el-form-item>
              <el-form-item label="底部" label-width="50px">
                <el-input-number size="mini" v-model="optionStyle.grid.bottom" controls-position="right" :min="0" :max="128"></el-input-number>
              </el-form-item>
              <el-form-item label="左侧" label-width="50px">
                <el-input-number size="mini" v-model="optionStyle.grid.left" controls-position="right" :min="0" :max="128"></el-input-number>
              </el-form-item>
              <el-form-item label="右侧" label-width="50px">
                <el-input-number size="mini" v-model="optionStyle.grid.right" controls-position="right" :min="0" :max="128"></el-input-number>
              </el-form-item>
            </el-form-item>
            <el-form-item label="标题">
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="文本">
                <el-input size="mini" v-model="optionStyle.title.text"></el-input>
              </el-form-item>
              <el-form-item label="字号">
                <el-input-number size="mini" v-model="optionStyle.title.textStyle.fontSize"></el-input-number>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker v-model="optionStyle.title.textStyle.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="字体粗细">
                <el-select v-model="optionStyle.title.textStyle.fontWeight" placeholder="请选择" size="mini">
                  <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="位置">
                <el-radio-group v-model="optionStyle.title.left">
                  <el-radio-button label="left">左</el-radio-button>
                  <el-radio-button label="center">中</el-radio-button>
                  <el-radio-button label="right">右</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="数据样式" name="valueStyle">
            <el-form-item label="字体">
              <el-select v-model="optionStyle.valueStyle.fontFamily" placeholder="请选择" size="mini">
                <el-option v-if="setting.fontOptions && setting.fontOptions.length > 0"
                           v-for="item in setting.fontOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number size="mini" v-model="optionStyle.valueStyle.fontSize"></el-input-number>
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

  export default {
    name: 'realAirQualitySetting',
    components: {
      BaseSetting,
      posSizeSetting,
      dataSourceSetting,
      errorTip
    },
    props: {
      component: {type: Object},
      setting: { type: Object }
    },
    data() {
      return {
        activeNames: ['full'],
        optionStyle:{},
        staticData: '',
        dynamicData: '',
        exampleData: '',
        fontWeights:["normal","bold","bolder","lighter","100","200"]
      }
    },
    methods: {
    },
    watch: {

    },
    created() {
      this.optionStyle = this.component.option.style;
    }
  }
</script>
