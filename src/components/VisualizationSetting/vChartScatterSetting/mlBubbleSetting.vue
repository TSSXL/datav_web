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
            <el-form-item label="顶部边距">
              <el-input-number size="mini" v-model="optionStyle.grid.top" controls-position="right" :min="0" :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="底部边距">
              <el-input-number size="mini" v-model="optionStyle.grid.bottom" controls-position="right" :min="0" :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="左侧边距">
              <el-input-number size="mini" v-model="optionStyle.grid.left" controls-position="right" :min="0" :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="右侧边距">
              <el-input-number size="mini" v-model="optionStyle.grid.right" controls-position="right" :min="0" :max="128"></el-input-number>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="x轴" name="xAxis">
            <el-form-item label="显示">
              <el-switch v-model="optionStyle.xAxis.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="0px">文本</el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number v-model="optionStyle.xAxis.axisLabel.fontSize" controls-position="right" :min="1"
                               :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.xAxis.axisLabel.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 20px;">
              <el-select v-model="optionStyle.xAxis.axisLabel.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="轴标签"><el-switch v-model="optionStyle.xAxis.axisLabel.show"></el-switch></el-form-item>
            <el-form-item label="角度" style="margin-left: 20px;">
              <el-radio-group v-model="optionStyle.xAxis.axisLabel.rotate">
                <el-radio-button :label="0">水平</el-radio-button>
                <el-radio-button :label="-45">斜角</el-radio-button>
                <el-radio-button :label="-90">垂直</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="轴间隔" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.xAxis.axisLabel.interval" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="轴线">
              <el-switch v-model="optionStyle.xAxis.axisLine.show"></el-switch>
            </el-form-item>
            <el-form-item label="轴线颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.xAxis.axisLine.lineStyle.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="网格线">
              <el-switch v-model="optionStyle.xAxis.splitLine.show"></el-switch>
            </el-form-item>
            <el-form-item label="网格线颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.xAxis.splitLine.lineStyle.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="网格线类型" style="margin-left: 20px;">
              <el-radio-group v-model="optionStyle.xAxis.splitLine.lineStyle.type">
                <el-radio-button label="solid">实线</el-radio-button>
                <el-radio-button label="dashed">虚线</el-radio-button>
                <el-radio-button label="dotted">点线</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="y轴" name="yAxis">
            <el-form-item label="显示">
              <el-switch
                v-model="optionStyle.yAxis.show">
              </el-switch>
            </el-form-item>
            <el-form-item label-width="0px">文本</el-form-item>
            <el-form-item label="字号" style="margin-left: 20px;">
              <el-input-number size="mini" v-model="optionStyle.yAxis.axisLabel.fontSize"></el-input-number>
            </el-form-item>
            <el-form-item label="颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.yAxis.axisLabel.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 20px;">
              <el-select v-model="optionStyle.yAxis.axisLabel.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="轴标签">
              <el-switch v-model="optionStyle.yAxis.axisLabel.show"></el-switch>
            </el-form-item>
            <el-form-item label="最大值">
              <el-input v-model="optionStyle.yAxis.max" size="mini" style="width:100px;"></el-input>&nbsp;<el-button type="text" size="mini" @click="optionStyle.yAxis.max = null">自动</el-button>
            </el-form-item>
            <el-form-item label="最小值">
              <el-input v-model="optionStyle.yAxis.min" size="mini" style="width:100px;"></el-input>&nbsp;<el-button type="text" size="mini" @click="optionStyle.yAxis.min = null">自动</el-button>
            </el-form-item>
            <el-form-item label="分割段数">
              <el-input-number size="mini" v-model="optionStyle.yAxis.splitNumber"></el-input-number>
            </el-form-item>
            <el-form-item label="辅助线距离">
              <el-input-number size="mini" v-model="optionStyle.yAxis.axisLabel.margin" :step="0.5" :min="-40" :max="40" ></el-input-number>
            </el-form-item>
            <el-form-item label="轴单位">
              <el-input v-model="optionStyle.yAxis.name"></el-input>
            </el-form-item>
            <el-form-item label="轴线">
              <el-switch v-model="optionStyle.yAxis.axisLine.show"></el-switch>
            </el-form-item>
            <el-form-item label="轴线颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.yAxis.axisLine.lineStyle.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="网格线">
              <el-switch v-model="optionStyle.yAxis.splitLine.show"></el-switch>
            </el-form-item>
            <el-form-item label="网格线颜色" style="margin-left: 20px;">
              <el-color-picker v-model="optionStyle.yAxis.splitLine.lineStyle.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="网格线类型" style="margin-left: 20px;">
              <el-radio-group v-model="optionStyle.yAxis.splitLine.lineStyle.type">
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
            <el-form-item label="字号">
              <el-input-number size="mini" v-model="optionStyle.legend.textStyle.fontSize"></el-input-number>
            </el-form-item>
            <el-form-item label="颜色">
              <el-color-picker v-model="optionStyle.legend.textStyle.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.legend.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="左右间距">
              <el-input-number size="mini" v-model="optionStyle.legend.itemGap" :step="10" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="位置">
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
              <el-form-item label="边框颜色">
                <el-color-picker v-model="item.borderColor" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="边框粗细">
                <el-input-number size="mini" v-model="item.borderWidth"></el-input-number>
              </el-form-item>
            </el-form-item>
          </el-collapse-item>
          <pos-size-setting :cStyle="optionStyle"></pos-size-setting>
          <el-button @click="optionDialogVisible=true">显示json</el-button>
        </el-collapse>
        <el-dialog
          title="JSON"
          :visible.sync="optionDialogVisible">
          <cm-json-editor v-model="option" style="font-size: 10px;" @close="optionDialogVisible=false"></cm-json-editor>
        </el-dialog>
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
  import cmJsonEditor from '@/components/jsonEditor/cmJsonEditor'

  export default {
    name: 'mlBubbleSetting',
    components: {
      BaseSetting,
      posSizeSetting,
      dataSourceSetting,
      errorTip,cmJsonEditor
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
        let obj = JSON.parse(JSON.stringify(this.optionStyle.seriesItems[this.optionStyle.seriesItems.length - 1]));
        obj.name = "";
        this.optionStyle.seriesItems.push(obj);
      },
      handleDelete(index){
        this.optionStyle.seriesItems.splice(index, 1);
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
