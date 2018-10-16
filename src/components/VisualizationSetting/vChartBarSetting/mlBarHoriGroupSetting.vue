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
            <el-form-item label="柱子样式"></el-form-item>
            <el-form-item label="柱子内间距" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.barCategoryGap" :min="0" :max="100" :step="10"></el-input-number>
            </el-form-item>
            <el-form-item label="柱子宽度" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.barWidth" :min="0" :max="100" :step="10"></el-input-number>
            </el-form-item>
            <el-form-item label="边距"></el-form-item>
            <el-form-item label="顶部" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.grid.top" controls-position="right" :min="0" :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="底部" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.grid.bottom" controls-position="right" :min="0" :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="左侧" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.grid.left" controls-position="right" :min="0" :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="右侧" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.grid.right" controls-position="right" :min="0" :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="值标签">
              <el-switch v-model="optionStyle.seriesLabel.show"></el-switch>
            </el-form-item>
            <template v-if="optionStyle.seriesLabel.show">
              <el-form-item label="字号" style="margin-left: 20px;">
                <el-input-number size="mini" v-model="optionStyle.seriesLabel.fontSize"></el-input-number>
              </el-form-item>
              <el-form-item label="颜色" style="margin-left: 20px;">
                <el-color-picker v-model="optionStyle.seriesLabel.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="字体粗细" style="margin-left: 20px;">
                <el-select v-model="optionStyle.seriesLabel.fontWeight" placeholder="请选择" size="mini">
                  <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="位置" style="margin-left: 20px;">
                <el-radio-group v-model="optionStyle.seriesLabel.position">
                  <el-radio-button label="insideLeft">左侧</el-radio-button>
                  <el-radio-button label="inside">中间</el-radio-button>
                  <el-radio-button label="right">右侧</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </template>
          </el-collapse-item>
          <el-collapse-item title="x轴" name="xaxis">
            <el-form-item label="显示">
              <el-switch v-model="optionStyle.xAxis.show"></el-switch>
            </el-form-item>
            <el-form-item label="文本"></el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.xAxis.axisLabel.fontSize"></el-input-number>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.xAxis.axisLabel.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 20px;">
              <el-select v-model="optionStyle.xAxis.axisLabel.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="轴标签">
              <el-switch v-model="optionStyle.xAxis.axisLabel.show"></el-switch>
            </el-form-item>
            <el-form-item label="最小值" style="margin-left: 20px;">
              <el-button type="text" size="mini" @click="optionStyle.xAxis.min = null">自动</el-button>&nbsp;&nbsp;<el-input v-model="optionStyle.xAxis.min" size="mini" style="width:100px;"></el-input>
            </el-form-item>
            <el-form-item label="最大值" style="margin-left: 20px;">
              <el-button type="text" size="mini" @click="optionStyle.xAxis.max = null">自动</el-button>&nbsp;&nbsp;<el-input v-model="optionStyle.xAxis.max" size="mini" style="width:100px;"></el-input>
            </el-form-item>
            <el-form-item label="数量" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.xAxis.splitNumber"></el-input-number>
            </el-form-item>
            <el-form-item label="轴单位">
              <el-input size="mini" v-model="optionStyle.xAxis.name"></el-input>
            </el-form-item>
            <el-form-item label="轴线">
              <el-switch v-model="optionStyle.xAxis.axisLine.show"></el-switch>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.xAxis.axisLine.lineStyle.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="网格线">
              <el-switch v-model="optionStyle.xAxis.splitLine.show"></el-switch>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.xAxis.splitLine.lineStyle.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="类型" style="margin-left: 20px;">
              <el-radio-group v-model="optionStyle.xAxis.splitLine.lineStyle.type">
                <el-radio-button label="solid">实线</el-radio-button>
                <el-radio-button label="dashed">虚线</el-radio-button>
                <el-radio-button label="dotted">点线</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="y轴" name="yaxis">
            <el-form-item label="显示">
              <el-switch v-model="optionStyle.yAxis[0].show"></el-switch>
            </el-form-item>
            <el-form-item label="文本"></el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.yAxis[0].axisLabel.fontSize"></el-input-number>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.yAxis[0].axisLabel.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 20px;">
              <el-select v-model="optionStyle.yAxis[0].axisLabel.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="轴标签">
              <el-switch v-model="optionStyle.yAxis[0].axisLabel.show"></el-switch>
            </el-form-item>
            <el-form-item label="角度" style="margin-left: 20px;">
              <el-radio-group v-model="optionStyle.yAxis[0].axisLabel.rotate">
                <el-radio-button :label="0">水平</el-radio-button>
                <el-radio-button :label="-45">斜角</el-radio-button>
                <el-radio-button :label="-90">垂直</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="轴线">
              <el-switch v-model="optionStyle.yAxis[0].axisLine.show"></el-switch>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.yAxis[0].axisLine.lineStyle.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="网格线">
              <el-switch v-model="optionStyle.yAxis[0].splitLine.show"></el-switch>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.yAxis[0].splitLine.lineStyle.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="类型" style="margin-left: 20px;">
              <el-radio-group v-model="optionStyle.yAxis[0].splitLine.lineStyle.type">
                <el-radio-button label="solid">实线</el-radio-button>
                <el-radio-button label="dashed">虚线</el-radio-button>
                <el-radio-button label="dotted">点线</el-radio-button>
              </el-radio-group>
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
          </el-collapse-item>
          <el-collapse-item title="数据系列" name="series">
            <el-row style="text-align: right">
              <el-button @click="handleAdd" type="text" icon="fa fa-plus" style="margin-right: 10px;" size="mini"> 添加</el-button>
            </el-row>
            <el-form-item :label="`系列${index+1}`" v-for="(item,index) in optionStyle.seriesValues" :key="index" label-width="50px">
              <el-form-item>
                <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(index)" size="mini" :disabled="optionStyle.seriesValues.length <=1"> 删除</el-button>
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
  import errorTip from '@/components/Validate/errorTip'
  import BaseSetting from "../BaseSetting";
  import posSizeSetting from "../posSizeSetting";
  import dataSourceSetting from "../dataSourceSetting";
  import cmJsonEditor from '@/components/jsonEditor/cmJsonEditor'

  export default {
    name: 'mlBarHoriGroupSetting',
    components: {
      BaseSetting,
      posSizeSetting,
      dataSourceSetting,
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
        fontWeights:["normal","bold","bolder","lighter","100","200"]
      }
    },
    methods: {
      handleAdd(){
        let obj = JSON.parse(JSON.stringify(this.optionStyle.seriesValues[this.optionStyle.seriesValues.length - 1]));
        obj.name = "";
        this.optionStyle.seriesValues.push(obj);
      },
      handleDelete(index){
        this.optionStyle.seriesValues.splice(index, 1);
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
