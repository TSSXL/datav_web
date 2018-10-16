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
          <el-collapse-item title="标签" name="tagStyle">
            <el-form-item label="类目"></el-form-item>
            <el-form-item label="显示" style="margin-left: 20px;">
              <el-switch v-model="optionStyle.tagStyle.show"></el-switch>
            </el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.tagStyle.x.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.tagStyle.x.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 20px;">
              <el-select v-model="optionStyle.tagStyle.x.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数值"></el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.tagStyle.y.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.tagStyle.y.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 20px;">
              <el-select v-model="optionStyle.tagStyle.y.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="真实数值" style="margin-left: 20px;">
              <el-switch v-model="optionStyle.tagStyle.isVal"></el-switch>
            </el-form-item>
            <el-form-item label="换行">
              <el-switch v-model="optionStyle.tagStyle.isNewLine"></el-switch>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="圆形属性" name="axisStyle">
            <el-form-item label="圆心坐标">
              <el-row>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.series.center[0]"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.series.center[1]"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="半径">
              <el-row>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.series.radius[0]"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input style="width: 96px;" v-model="optionStyle.series.radius[1]"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="南丁格尔图">
              <el-radio-group v-model="optionStyle.series.roseType">
                <el-radio-button :label="false">否</el-radio-button>
                <el-radio-button :label="'radius'">半径</el-radio-button>
                <el-radio-button :label="'area'">区域</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="图例" name="legend">
            <el-form-item label="显示">
              <el-switch v-model="optionStyle.legend.show"></el-switch>
            </el-form-item>
            <el-form-item label="文本"></el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.legend.textStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.legend.textStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 20px;">
              <el-select v-model="optionStyle.legend.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="布局"></el-form-item>
            <el-form-item label="朝向" style="margin-left: 20px;">
              <el-radio-group v-model="optionStyle.legend.orient">
                <el-radio-button label="horizontal">水平</el-radio-button>
                <el-radio-button label="vertical">垂直</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="位置" style="margin-left: 20px;">
              <el-radio-group v-model="optionStyle.legend.left">
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
            <el-form-item label="间隔" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.legend.itemGap" :min="0" :max="100"></el-input-number>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="数据系列" name="dataSeries">
            <el-row style="text-align: right">
              <el-button @click="handleAdd" type="text" icon="fa fa-plus" style="margin-right: 10px;" size="mini"> 添加</el-button>
            </el-row>
            <el-form-item :label="`系列${index+1}`" v-for="(item,index) in optionStyle.serieColors" :key="index" label-width="50px">
              <el-form-item>
                <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(index)" size="mini" :disabled="optionStyle.serieColors.length <=1"> 删除</el-button>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker v-model="item.color" size="small"></el-color-picker>
              </el-form-item>
            </el-form-item>
          </el-collapse-item>
          <pos-size-setting :cStyle="optionStyle"></pos-size-setting>
        </el-collapse>
        <el-button @click="optionDialogVisible=true">显示json</el-button>
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
    name: 'mlPieBasicSetting',
    components: {
      BaseSetting,
      posSizeSetting,
      dataSourceSetting,
      iconSelect,
      errorTip,
      cmJsonEditor
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
