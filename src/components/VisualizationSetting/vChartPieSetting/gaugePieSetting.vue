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
          </el-collapse-item>
          <el-collapse-item title="标题样式" name="titleStyle">
            <el-form-item label="标题">
              <el-input v-model="optionStyle.title.text"></el-input>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.title.textStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.title.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.title.textStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="位置">
              <el-row>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.title.x"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.title.y"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="刻度" name="gaugeStyle">
            <el-form-item label="半径">
              <el-input v-model="optionStyle.series[0].radius"></el-input>
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number v-model="optionStyle.series[0].splitNumber" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="最小值">
              <el-input-number v-model="optionStyle.series[0].min" :min="0" :max="2000"></el-input-number>
            </el-form-item>
            <el-form-item label="最大值">
              <el-input-number v-model="optionStyle.series[0].max" :min="0" :max="2000"></el-input-number>
            </el-form-item>
            <el-form-item label="开始角度">
              <el-input-number v-model="optionStyle.series[0].startAngle" :min="0" :max="360"></el-input-number>
            </el-form-item>
            <el-form-item label="结束角度">
              <el-input-number v-model="optionStyle.series[0].endAngle" :min="0" :max="360"></el-input-number>
            </el-form-item>
            <el-form-item label="网格线">
              <el-switch v-model="optionStyle.series[0].splitLine.show"></el-switch>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.series[0].splitLine.lineStyle.color" size="small"></el-color-picker>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="圆形属性" name="axisStyle">
            <el-form-item label="半径">
              <el-row>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.series[1].radius[0]"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.series[1].radius[1]"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="开始角度">
              <el-input-number v-model="optionStyle.series[1].startAngle" :min="0" :max="360"></el-input-number>
            </el-form-item>
            <el-form-item label="颜色">
              <template v-for="(item,index) of optionStyle.color">
                <el-color-picker v-model="optionStyle.color[index]" size="small"></el-color-picker>
              </template>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="图例" name="legend">
            <el-form-item label="显示">
              <el-switch v-model="optionStyle.legend.show"></el-switch>
            </el-form-item>
            <el-form-item label="文本"></el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.legend.textStyle.fontSize"></el-input-number>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.legend.textStyle.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 20px;">
              <el-select v-model="optionStyle.legend.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="布局"></el-form-item>
            <el-form-item label="左右间距" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.legend.itemGap" :step="10" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="位置" style="margin-left: 20px;">
              <el-radio-group v-model="optionStyle.legend.left">
                <el-radio-button label="left">左</el-radio-button>
                <el-radio-button label="center">中</el-radio-button>
                <el-radio-button label="right">右</el-radio-button>
              </el-radio-group>
              <el-radio-group v-model="optionStyle.legend.top">
                <el-radio-button label="top">上</el-radio-button>
                <el-radio-button label="20%">中</el-radio-button>
                <el-radio-button label="55%">下</el-radio-button>
              </el-radio-group>
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
  import errorTip from '@/components/Validate/errorTip';
  import BaseSetting from "../BaseSetting";
  import posSizeSetting from "../posSizeSetting";
  import dataSourceSetting from "../dataSourceSetting";

  export default {
    name: 'gaugePieSetting',
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
        fontWeights:["normal","bold","bolder","lighter","100","200"],
        selectIconDialog:false
      }
    },
    methods: {
    },
    computed: {

    },
    watch: {

    },
    created() {
      this.optionStyle = this.component.option.style;
    }
  }
</script>
<style scoped></style>
