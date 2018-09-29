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
            <el-form-item label="文字上边距">
              <el-input-number size="mini" v-model="optionStyle.textStyle.top" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="文本样式"></el-form-item>
            <el-form-item label="字体颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.textStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.textStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 20px;">
              <el-select v-model="optionStyle.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数字样式"></el-form-item>
            <el-form-item label="字体颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.numberStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.numberStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 20px;">
              <el-select v-model="optionStyle.numberStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="箭头样式" name="arrowStyle">
            <el-form-item label="显示">
              <el-switch
                v-model="optionStyle.arrow.show">
              </el-switch>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.arrow.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.arrow.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="间距">
              <el-input-number size="mini" v-model="optionStyle.spacing" :min="0" :max="500"></el-input-number>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="数据系列" name="dataSeries">
            <el-row style="text-align: right">
              <el-button @click="handleAdd" type="text" icon="fa fa-plus" style="margin-right: 10px;" size="mini"> 添加</el-button>
            </el-row>
            <el-form-item :label="`系列${index+1}`" v-for="(item,index) in optionStyle.seriesItems" :key="index" label-width="50px">
              <el-form-item>
                <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(index)" size="mini" :disabled="optionStyle.seriesItems.length <=1"> 删除</el-button>
              </el-form-item>
              <el-form-item label="系列名">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker v-model="item.color" size="small"></el-color-picker>
              </el-form-item>
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
    name: 'circleStateSetting',
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
      handleAdd(){
        let obj = JSON.parse(JSON.stringify(this.optionStyle.seriesItems[this.optionStyle.seriesItems.length - 1]));
        obj.name = "";
        this.optionStyle.seriesItems.push(obj);
      },
      handleDelete(index){
        this.optionStyle.seriesItems.splice(index, 1);
      }
    },
    watch: {

    },
    created() {
      this.optionStyle = this.component.option.style;
    }
  }
</script>
