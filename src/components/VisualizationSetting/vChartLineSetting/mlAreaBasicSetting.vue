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
          <el-collapse-item title="标题" name="titleStyle">
            <el-form-item label="显示">
              <el-switch
                v-model="optionStyle.title.show">
              </el-switch>
            </el-form-item>
            <el-form-item label="标题名">
              <el-input v-model="optionStyle.title.text"></el-input>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.title.textStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.title.textStyle.color"></el-color-picker>
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
          </el-collapse-item>
          <el-collapse-item title="x轴" name="xaxis">
            <el-form-item label="显示">
              <el-switch v-model="optionStyle.xAxis[0].show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="字号">
                <el-input-number size="mini" v-model="optionStyle.xAxis[0].axisLabel.fontSize"></el-input-number>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker v-model="optionStyle.xAxis[0].axisLabel.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="字体粗细">
                <el-select v-model="optionStyle.xAxis[0].axisLabel.fontWeight" placeholder="请选择" size="mini">
                  <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
            <el-form-item label="轴标签">
              <el-switch v-model="optionStyle.xAxis[0].axisLabel.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="角度">
                <el-radio-group v-model="optionStyle.xAxis[0].axisLabel.rotate">
                  <el-radio-button :label="0">水平</el-radio-button>
                  <el-radio-button :label="-45">斜角</el-radio-button>
                  <el-radio-button :label="-90">垂直</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="轴间隔">
                <el-input-number size="mini" v-model="optionStyle.xAxis[0].axisLabel.interval" :min="0"></el-input-number>
              </el-form-item>
            </el-form-item>
            <el-form-item label="轴线">
              <el-switch v-model="optionStyle.xAxis[0].axisLine.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="轴线颜色">
                <el-color-picker v-model="optionStyle.xAxis[0].axisLine.lineStyle.color" size="small"></el-color-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="网格线">
              <el-switch v-model="optionStyle.xAxis[0].splitLine.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="网格线颜色">
                <el-color-picker v-model="optionStyle.xAxis[0].splitLine.lineStyle.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="网格线类型">
                <el-radio-group v-model="optionStyle.xAxis[0].splitLine.lineStyle.type">
                  <el-radio-button label="solid">实线</el-radio-button>
                  <el-radio-button label="dashed">虚线</el-radio-button>
                  <el-radio-button label="dotted">点线</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="y轴" name="yaxis">
            <el-form-item label="显示">
              <el-switch v-model="optionStyle.yAxis[0].show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="字号">
                <el-input-number size="mini" v-model="optionStyle.yAxis[0].axisLabel.fontSize"></el-input-number>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker v-model="optionStyle.yAxis[0].axisLabel.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="字体粗细">
                <el-select v-model="optionStyle.yAxis[0].axisLabel.fontWeight" placeholder="请选择" size="mini">
                  <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
            <el-form-item label="轴标签">
              <el-switch v-model="optionStyle.yAxis[0].axisLabel.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="轴单位">
                <el-input v-model="optionStyle.yAxis[0].name"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="轴线">
              <el-switch v-model="optionStyle.yAxis[0].axisLine.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="轴线颜色">
                <el-color-picker v-model="optionStyle.yAxis[0].axisLine.lineStyle.color" size="small"></el-color-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="网格线">
              <el-switch v-model="optionStyle.yAxis[0].splitLine.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="网格线颜色">
                <el-color-picker v-model="optionStyle.yAxis[0].splitLine.lineStyle.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="网格线类型">
                <el-radio-group v-model="optionStyle.yAxis[0].splitLine.lineStyle.type">
                  <el-radio-button label="solid">实线</el-radio-button>
                  <el-radio-button label="dashed">虚线</el-radio-button>
                  <el-radio-button label="dotted">点线</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="数据系列" name="dataset">
            <el-form-item label="折线"></el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.series[0].lineStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="样式" style="margin-left: 20px;">
              <el-radio-group v-model="optionStyle.series[0].lineStyle.type">
                <el-radio-button label="solid">实线</el-radio-button>
                <el-radio-button label="dashed">虚线</el-radio-button>
                <el-radio-button label="dotted">点线</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="粗细" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.series[0].lineStyle.width" controls-position="right" :min="1"
                               :max="8"></el-input-number>
            </el-form-item>
            <el-form-item label="平滑曲线" style="margin-left: 20px;">
              <el-switch
                v-model="optionStyle.series[0].smooth">
              </el-switch>
            </el-form-item>
            <el-form-item label="圆点"></el-form-item>
            <el-form-item label="显示" style="margin-left: 20px;">
              <el-switch
                v-model="optionStyle.series[0].showSymbol">
              </el-switch>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.series[0].itemStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="半径" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.series[0].symbolSize" controls-position="right" :min="1"
                               :max="64"></el-input-number>
            </el-form-item>
            <el-form-item label="区域"></el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.series[0].areaStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="透明度" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.series[0].areaStyle.opacity" :min="0"
                               :max="1" :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item label="标签"></el-form-item>
            <el-form-item label="显示" style="margin-left: 20px;">
              <el-switch
                v-model="optionStyle.series[0].label.show">
              </el-switch>
            </el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.series[0].label.fontSize" controls-position="right" :min="1"
                               :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.series[0].label.color"></el-color-picker>
            </el-form-item>
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
  import errorTip from '@/components/Validate/errorTip';
  import BaseSetting from "../BaseSetting";
  import posSizeSetting from "../posSizeSetting";
  import {getApi, getPath,getAll} from '@/views/dev/attachment/api';
  import iconSelect from '@/components/Control/iconSelect';
  import dataSourceSetting from "../dataSourceSetting";
  import cmJsonEditor from '@/components/jsonEditor/cmJsonEditor'

  export default {
    name: 'mlAreaBasicSetting',
    components: {
      BaseSetting,
      posSizeSetting,
      dataSourceSetting,
      iconSelect,
      errorTip,cmJsonEditor
    },
    props: {
      component: {type: Object},
      setting: { type: Object }
    },
    data() {
      return {
        activeNames: ['full'],
        optionStyle:{},
        option:"",
        optionDialogVisible:false,
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
      api() {
        return getApi()
      },
      path() {
        return getPath()
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
    }
  }
</script>
<style scoped></style>
