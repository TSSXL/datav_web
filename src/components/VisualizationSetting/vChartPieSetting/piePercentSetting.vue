<template>
  <base-setting  :component="component">
    <template slot="style">
      <el-form label-width="80px" size="mini" label-position="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="标题样式" name="titleStyle">
            <el-form-item label="显示">
              <el-switch
                v-model="optionStyle.title.show">
              </el-switch>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="optionStyle.title.text"></el-input>
            </el-form-item>
            <el-form-item label="字体">
              <el-select v-model="optionStyle.title.textStyle.fontFamily" placeholder="请选择" size="mini">
                <el-option v-if="setting.fontOptions && setting.fontOptions.length > 0"
                           v-for="item in setting.fontOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
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
              <el-radio-group v-model="optionStyle.title.left">
                <el-radio-button label="left">左</el-radio-button>
                <el-radio-button label="center">中</el-radio-button>
                <el-radio-button label="right">右</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="饼图属性" name="pieAttr">
            <el-form-item label="外半径">
              <el-input-number v-model="optionStyle.series[0].radius[0]" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="内半径">
              <el-input-number v-model="optionStyle.series[0].radius[1]" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="填充色">
              <el-color-picker v-model="optionStyle.series[0].data[0].itemStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="底色">
              <el-color-picker v-model="optionStyle.series[0].data[1].itemStyle.color"></el-color-picker>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="百分比样式" name="percentStyle">
            <el-form-item label="文本格式">
              <el-input v-model="optionStyle.series[0].label.formatter"></el-input>
            </el-form-item>
            <el-form-item label="字体">
              <el-select v-model="optionStyle.series[0].label.fontFamily" placeholder="请选择" size="mini">
                <el-option v-if="setting.fontOptions && setting.fontOptions.length > 0"
                           v-for="item in setting.fontOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.series[0].label.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.series[0].label.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.series[0].label.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="间距"></el-form-item>
            <el-form-item label="上" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.series[0].label.padding[0]" :min="0" :max="500"></el-input-number>
            </el-form-item>
            <el-form-item label="右" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.series[0].label.padding[1]" :min="0" :max="500"></el-input-number>
            </el-form-item>
            <el-form-item label="下" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.series[0].label.padding[2]" :min="0" :max="500"></el-input-number>
            </el-form-item>
            <el-form-item label="左" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.series[0].label.padding[3]" :min="0" :max="500"></el-input-number>
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
    name: 'piePercentSetting',
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
        activeNames: ['titleStyle'],
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
          this.component.option = JSON.parse(val);
          this.optionStyle=this.component.option.style;
        } catch(e) {
          this.component.option = {};
        }
      },
      'optionStyle':{
        handler(curVal, oldVal) {
          this.component.option.style=curVal;
          this.option=JSON.stringify(this.component.option, null, 4);
        },
        deep: true

      }
    },
    created() {
      this.optionStyle = this.component.option.style;
      this.option=JSON.stringify(this.component.option, null, 4);
    }
  }
</script>
<style scoped></style>
