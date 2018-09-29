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
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.title.textStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.title.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对齐方式">
              <el-radio-group v-model="optionStyle.title.textAlign">
                <el-radio-button label="right">左</el-radio-button>
                <el-radio-button label="center">中</el-radio-button>
                <el-radio-button label="left">右</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="y坐标">
              <el-input v-model="optionStyle.title.top"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="圆形属性" name="pieAttr">
            <el-form-item label="横坐标">
              <el-input v-model="optionStyle.radius[0]"></el-input>
            </el-form-item>
            <el-form-item label="纵坐标">
              <el-input v-model="optionStyle.radius[1]"></el-input>
            </el-form-item>
            <el-form-item label="文本"><el-switch v-model="optionStyle.label.show"></el-switch></el-form-item>
            <el-form-item label="格式" style="margin-left: 20px;">
              <el-input v-model="optionStyle.label.formatter"></el-input>
            </el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.label.textStyle.fontSize"></el-input-number>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 20px;">
              <el-select v-model="optionStyle.label.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
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
              <el-radio-group v-model="optionStyle.legend.right">
                <el-radio-button label="left">左</el-radio-button>
                <el-radio-button label="center">中</el-radio-button>
                <el-radio-button label="right">右</el-radio-button>
              </el-radio-group>
              <el-radio-group v-model="optionStyle.legend.top">
                <el-radio-button label="top">上</el-radio-button>
                <el-radio-button label="middle">中</el-radio-button>
                <el-radio-button label="bottom">下</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="数据系列" name="percentStyle">
            <el-row style="text-align: right">
              <el-button @click="handleAdd" type="text" icon="fa fa-plus" style="margin-right: 10px;" size="mini"> 添加</el-button>
            </el-row>
            <el-form-item :label="`系列${index+1}`" v-for="(item,index) in optionStyle.seriesItems" :key="index" label-width="50px">
              <el-form-item>
                <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(index)" size="mini"  :disabled="optionStyle.seriesItems.length <=1"> 删除</el-button>
              </el-form-item>
              <el-form-item label="系列名">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="文本">
                <el-input v-model="item.text"></el-input>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker v-model="item.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="横坐标">
                <el-input v-model="item.center[0]"></el-input>
              </el-form-item>
              <el-form-item label="纵坐标">
                <el-input v-model="item.center[1]"></el-input>
              </el-form-item>
              <el-form-item label="起始角度">
                <el-input-number size="mini" v-model="item.startAngle"></el-input-number>
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
  import errorTip from '@/components/Validate/errorTip';
  import BaseSetting from "../BaseSetting";
  import posSizeSetting from "../posSizeSetting";
  import {getApi, getPath,getAll} from '@/views/dev/attachment/api';
  import iconSelect from '@/components/Control/iconSelect';
  import dataSourceSetting from "../dataSourceSetting";

  export default {
    name: 'dashboardPiePercentSetting',
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
      handleAdd(){
        let obj = JSON.parse(JSON.stringify(this.optionStyle.seriesItems[this.optionStyle.seriesItems.length - 1]));
        obj.name = "";
        this.optionStyle.seriesItems.push(obj);
      },
      handleDelete(index){
        this.optionStyle.seriesItems.splice(index, 1);
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
