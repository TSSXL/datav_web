<template>
  <base-setting  :component="component">
    <template slot="style">
      <el-form label-width="80px" size="mini" label-position="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="标题样式" name="titleStyle">
            <el-form-item label="标题">
              <el-input v-model="optionStyle.textStyle.name"></el-input>
            </el-form-item>
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
          </el-collapse-item>
          <el-collapse-item title="指标样式" name="indexStyle">
            <el-form-item label="垂直位置">
              <el-input v-model="optionStyle.title.top"></el-input>
            </el-form-item>
            <el-form-item label="外圈颜色">
              <el-color-picker v-model="optionStyle.color[0]"></el-color-picker>
            </el-form-item>
            <el-form-item label="内圈颜色">
              <el-color-picker v-model="optionStyle.color[1]"></el-color-picker>
            </el-form-item>
            <el-form-item label="文本字体">
              <el-select v-model="optionStyle.title.textStyle.fontFamily" placeholder="请选择" size="mini">
                <el-option v-if="setting.fontOptions && setting.fontOptions.length > 0"
                           v-for="item in setting.fontOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文本字号">
              <el-input-number v-model="optionStyle.title.textStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="文本颜色">
              <el-color-picker v-model="optionStyle.title.textStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="数值字体">
              <el-select v-model="optionStyle.title.subtextStyle.fontFamily" placeholder="请选择" size="mini">
                <el-option v-if="setting.fontOptions && setting.fontOptions.length > 0"
                           v-for="item in setting.fontOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数值字号">
              <el-input-number v-model="optionStyle.title.subtextStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="数值颜色">
              <el-color-picker v-model="optionStyle.title.subtextStyle.color"></el-color-picker>
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
    name: 'macroEconomySetting',
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
        activeNames: ['titleStyle'],
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
