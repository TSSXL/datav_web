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
            <el-form-item label="图标">
              <icon-select v-model="optionStyle.img" :icoSize="'64px'"></icon-select>
            </el-form-item>
            <el-form-item label="图标尺寸">
              <el-input-number v-model="optionStyle.imgSize" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="边框颜色">
              <el-color-picker v-model="optionStyle.border.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="边框大小">
              <el-input-number v-model="optionStyle.border.width" :min="0" :max="50"></el-input-number>
            </el-form-item>
            <el-form-item label="边框样式">
              <el-radio-group v-model="optionStyle.border.type">
                <el-radio-button label="solid">实线</el-radio-button>
                <el-radio-button label="dashed">虚线</el-radio-button>
                <el-radio-button label="dotted">点线</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="时段" name="timeStyle">
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.timeStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.timeStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.timeStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="标签" name="tagStyle">
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.tagStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.tagStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.tagStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="背景颜色">
              <el-color-picker v-model="optionStyle.tagStyle.bgColor"></el-color-picker>
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
  import {getApi, getPath,getAll} from '@/views/dev/attachment/api';
  import iconSelect from '@/components/Control/iconSelect';
  import dataSourceSetting from "../dataSourceSetting";

  export default {
    name: 'restrictedSectionSetting',
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
