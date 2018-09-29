<template>
  <base-setting  :component="component">
    <template slot="style">
      <el-form label-width="80px" size="mini" label-position="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="标题样式" name="titleStyle">
            <el-form-item label="标题">
              <el-input v-model="optionStyle.textStyle.name"></el-input>
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="optionStyle.textStyle.unit"></el-input>
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
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对齐方式">
              <el-select v-model="optionStyle.textStyle.textAlign" placeholder="请选择" size="mini">
                <el-option v-for="item in aligns" :key="item.name" :label="item.label" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="数据样式" name="valStyle">
            <el-form-item label="总数颜色">
              <el-color-picker v-model="optionStyle.textStyle.allColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="总数字号">
              <el-input-number v-model="optionStyle.textStyle.allFontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="男人颜色">
              <el-color-picker v-model="optionStyle.textStyle.manColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="女人颜色">
              <el-color-picker v-model="optionStyle.textStyle.womanColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="数值字号">
              <el-input-number v-model="optionStyle.textStyle.valFontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="百分比字号">
              <el-input-number v-model="optionStyle.textStyle.percentFontSize" :min="10" :max="200"></el-input-number>
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
    name: 'populationStatSetting',
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
        aligns:[{
          "label":"左对齐",
          "name":"left",
        },{
          "label":"右对齐",
          "name":"right",
        },{
          "label":"居中对齐",
          "name":"center",
        }]
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
