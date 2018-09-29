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
            <el-form-item label="最大字号">
              <el-input-number v-model="optionStyle.series[0].sizeRange[1]" :min="12" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="最小字号">
              <el-input-number v-model="optionStyle.series[0].sizeRange[0]" :min="12" :max="100"></el-input-number>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="标题样式" name="titleStyle">
            <el-form-item label="显示">
              <el-switch
                v-model="optionStyle.title.show">
              </el-switch>
            </el-form-item>
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
              <el-radio-group v-model="optionStyle.title.left">
                <el-radio-button label="left">左</el-radio-button>
                <el-radio-button label="center">中</el-radio-button>
                <el-radio-button label="right">右</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="布局" name="layout">
            <el-form-item label="位置">
              <el-radio-group v-model="optionStyle.series[0].left">
                <el-radio-button label="left">左</el-radio-button>
                <el-radio-button label="center">中</el-radio-button>
                <el-radio-button label="right">右</el-radio-button>
              </el-radio-group>
              <el-radio-group v-model="optionStyle.series[0].top">
                <el-radio-button label="top">上</el-radio-button>
                <el-radio-button label="center">中</el-radio-button>
                <el-radio-button label="bottom">下</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="旋转范围">
              <el-row>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.series[0].rotationRange[0]"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.series[0].rotationRange[1]"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="内径">
              <el-row>
                <el-col :span="2">宽</el-col>
                <el-col :span="10">
                  <el-input style="width: 76px;" v-model="optionStyle.series[0].width"></el-input>
                </el-col>
                <el-col :span="2">高</el-col>
                <el-col :span="10">
                  <el-input style="width: 76px;" v-model="optionStyle.series[0].height"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="间距">
              <el-input-number v-model="optionStyle.series[0].gridSize" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="形状">
              <el-select v-model="optionStyle.series[0].shape" placeholder="请选择" size="mini">
                <el-option key="circle" label="圆形" value="circle"></el-option>
                <el-option key="cardioid" label="心形体" value="cardioid"></el-option>
                <el-option key="diamond" label="菱形" value="diamond"></el-option>
                <el-option key="triangle-forward" label="增量三角形" value="triangle-forward"></el-option>
                <el-option key="triangle" label="三角形" value="triangle"></el-option>
                <el-option key="pentagon" label="五角形" value="pentagon"></el-option>
                <el-option key="star" label="星形" value="star"></el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="系列" name="dataSeries">
            <el-row style="text-align: right">
              <el-button @click="handleAdd" type="text" icon="fa fa-plus" style="margin-right: 10px;" size="mini"> 添加</el-button>
            </el-row>
            <el-form-item :label="`系列${index+1}`" v-for="(item,index) in optionStyle.serieColors" :key="index" label-width="50px">
              <el-form-item>
                <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(index)" size="mini" :disabled="optionStyle.serieColors.length <=1"> 删除</el-button>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker v-model="optionStyle.serieColors[index]" size="small"></el-color-picker>
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
    name: 'mlGCloudSetting',
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
        let obj = JSON.parse(JSON.stringify(this.optionStyle.serieColors[this.optionStyle.serieColors.length - 1]));
        this.optionStyle.serieColors.push(obj);
      },
      handleDelete(index){
        this.optionStyle.serieColors.splice(index, 1);
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
