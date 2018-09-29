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
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.textStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.textStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="时间"></el-form-item>
            <el-form-item label="字体颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.timeStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 20px;">
              <el-select v-model="optionStyle.timeStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.timeStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="边框"></el-form-item>
            <el-form-item label="边框颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.border.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="边框粗细" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.border.width" :min="0" :max="50"></el-input-number>
            </el-form-item>
            <el-form-item label="边框样式" style="margin-left: 20px;">
              <el-radio-group v-model="optionStyle.border.type">
                <el-radio-button label="solid">实线</el-radio-button>
                <el-radio-button label="dashed">虚线</el-radio-button>
                <el-radio-button label="dotted">点线</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="背景样式" name="bgStyle">
            <el-form-item label="显示">
              <el-switch
                v-model="optionStyle.background.isBgColor">
              </el-switch>
            </el-form-item>
            <template v-if="optionStyle.background.isBgColor">
              <el-form-item label="类型">
                <el-radio-group v-model="optionStyle.background.isGradient">
                  <el-radio-button :label="false">普通</el-radio-button>
                  <el-radio-button :label="true">渐变</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="颜色" v-if="optionStyle.background.isGradient">
                <el-color-picker v-model="optionStyle.background.color1"></el-color-picker>
                <el-color-picker v-model="optionStyle.background.color2"></el-color-picker>
                <el-color-picker v-model="optionStyle.background.color3"></el-color-picker>
              </el-form-item>
              <el-form-item label="颜色" v-else>
                <el-color-picker v-model="optionStyle.background.bgColor"></el-color-picker>
              </el-form-item>
            </template>
          </el-collapse-item>
          <pos-size-setting :cStyle="optionStyle"></pos-size-setting>
        </el-collapse>
      </el-form>
    </template>
    <template slot="data">
      <span style="color:#dcdee3;font-size: 14px;"><i class="fa fa-universal-access" aria-hidden="true"></i> 该组件不需要配置数据</span>
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

  export default {
    name: 'vTimerSetting',
    components: {
      BaseSetting,
      posSizeSetting,
      dataSourceSetting,
      iconSelect,
      errorTip
    },
    props: {
      component: {type: Object},
      setting: { type: Object }
    },
    data() {
      return {
        activeNames: ['textStyle'],
        optionStyle:{},
        staticData: '',
        dynamicData: '',
        exampleData: '',
        fontWeights:["normal","bold","bolder","lighter","100","200"],
        selectIconDialog:false
      }
    },
    methods: {
      handleAdd(){
        this.optionStyle.icon.push({
          "key": "down",
          "value": {
            "type": "fontIcon",
            "fontIcon": {
              "className": "fa fa-hdd-o"
            },
            "images": []
          }
        });
      },
      handleDelete(index){
        this.optionStyle.icon.splice(index, 1);
      }
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

    },
    created() {
      this.optionStyle = this.component.option.style;
    }
  }
</script>
<style scoped></style>
