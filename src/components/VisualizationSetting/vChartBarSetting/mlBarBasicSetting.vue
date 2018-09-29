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
            <el-form-item label="柱子样式">
              <el-form-item label="内间距" label-width="50px">
                <el-input-number size="mini" v-model="optionStyle.barCategoryGap" :step="10" :min="0" :max="100"></el-input-number>
              </el-form-item>
              <el-form-item label="宽度" label-width="50px">
                <el-input-number size="mini" v-model="optionStyle.barWidth" :step="10" :min="0" :max="100"></el-input-number>
              </el-form-item>
            </el-form-item>
            <el-form-item label="边距">
              <el-form-item label="顶部" label-width="50px">
                <el-input-number size="mini" v-model="optionStyle.grid.top" controls-position="right" :min="0" :max="128"></el-input-number>
              </el-form-item>
              <el-form-item label="底部" label-width="50px">
                <el-input-number size="mini" v-model="optionStyle.grid.bottom" controls-position="right" :min="0" :max="128"></el-input-number>
              </el-form-item>
              <el-form-item label="左侧" label-width="50px">
                <el-input-number size="mini" v-model="optionStyle.grid.left" controls-position="right" :min="0" :max="128"></el-input-number>
              </el-form-item>
              <el-form-item label="右侧" label-width="50px">
                <el-input-number size="mini" v-model="optionStyle.grid.right" controls-position="right" :min="0" :max="128"></el-input-number>
              </el-form-item>
            </el-form-item>
            <el-form-item label="标题">
              <el-switch v-model="optionStyle.title.show"></el-switch>
            </el-form-item>
            <el-form-item v-show="optionStyle.title.show" label-width="20px">
              <el-form-item label="文本">
                <el-input size="mini" v-model="optionStyle.title.text"></el-input>
              </el-form-item>
              <el-form-item label="字号">
                <el-input-number size="mini" v-model="optionStyle.title.textStyle.fontSize"></el-input-number>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker v-model="optionStyle.title.textStyle.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="字体粗细">
                <el-select v-model="optionStyle.title.textStyle.fontWeight" placeholder="请选择" size="mini">
                  <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="位置">
                <el-radio-group v-model="optionStyle.title.left">
                  <el-radio-button label="left">左</el-radio-button>
                  <el-radio-button label="center">中</el-radio-button>
                  <el-radio-button label="right">右</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form-item>
            <el-form-item label="值标签">
              <el-switch v-model="optionStyle.seriesLabel.show"></el-switch>
            </el-form-item>
            <el-form-item v-show="optionStyle.seriesLabel.show" label-width="20px">
              <el-form-item label="字号">
                <el-input-number size="mini" v-model="optionStyle.seriesLabel.fontSize"></el-input-number>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker v-model="optionStyle.seriesLabel.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="字体粗细">
                <el-select v-model="optionStyle.seriesLabel.fontWeight" placeholder="请选择" size="mini">
                  <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="位置">
                <el-radio-group v-model="optionStyle.seriesLabel.position">
                  <el-radio-button label="insideTop">顶部</el-radio-button>
                  <el-radio-button label="inside">中间</el-radio-button>
                  <el-radio-button label="insideBottom">底部</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="x轴" name="xaxis">
            <el-form-item label="显示">
              <el-switch v-model="optionStyle.xAxis[0].show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="字号">
                <el-input-number size="mini" v-model="optionStyle.xAxis[0].axisLabel.fontSize"></el-input-number>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker v-model="optionStyle.xAxis[0].axisLabel.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="字体粗细">
                <el-select v-model="optionStyle.xAxis[0].axisLabel.fontWeight" placeholder="请选择" size="mini">
                  <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
            <el-form-item label="轴标签">
              <el-switch v-model="optionStyle.xAxis[0].axisLabel.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="角度">
                <el-radio-group v-model="optionStyle.xAxis[0].axisLabel.rotate">
                  <el-radio-button :label="0">水平</el-radio-button>
                  <el-radio-button :label="-45">斜角</el-radio-button>
                  <el-radio-button :label="-90">垂直</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="轴间隔">
                <el-input-number size="mini" v-model="optionStyle.xAxis[0].axisLabel.interval" :min="0"></el-input-number>
              </el-form-item>
            </el-form-item>
            <el-form-item label="轴线">
              <el-switch v-model="optionStyle.xAxis[0].axisLine.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="轴线颜色">
                <el-color-picker v-model="optionStyle.xAxis[0].axisLine.lineStyle.color" size="small"></el-color-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="网格线">
              <el-switch v-model="optionStyle.xAxis[0].splitLine.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="网格线颜色">
                <el-color-picker v-model="optionStyle.xAxis[0].splitLine.lineStyle.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="网格线类型">
                <el-radio-group v-model="optionStyle.xAxis[0].splitLine.lineStyle.type">
                  <el-radio-button label="solid">实线</el-radio-button>
                  <el-radio-button label="dashed">虚线</el-radio-button>
                  <el-radio-button label="dotted">点线</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="y轴" name="yaxis">
            <el-form-item label="显示">
              <el-switch v-model="optionStyle.yAxis[0].show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="字号">
                <el-input-number size="mini" v-model="optionStyle.yAxis[0].axisLabel.fontSize"></el-input-number>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker v-model="optionStyle.yAxis[0].axisLabel.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="字体粗细">
                <el-select v-model="optionStyle.yAxis[0].axisLabel.fontWeight" placeholder="请选择" size="mini">
                  <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
            <el-form-item label="轴标签">
              <el-switch v-model="optionStyle.yAxis[0].axisLabel.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="轴单位">
                <el-input v-model="optionStyle.yAxis[0].name"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="轴线">
              <el-switch v-model="optionStyle.yAxis[0].axisLine.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="轴线颜色">
                <el-color-picker v-model="optionStyle.yAxis[0].axisLine.lineStyle.color" size="small"></el-color-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="网格线">
              <el-switch v-model="optionStyle.yAxis[0].splitLine.show"></el-switch>
            </el-form-item>
            <el-form-item label-width="20px">
              <el-form-item label="网格线颜色">
                <el-color-picker v-model="optionStyle.yAxis[0].splitLine.lineStyle.color" size="small"></el-color-picker>
              </el-form-item>
              <el-form-item label="网格线类型">
                <el-radio-group v-model="optionStyle.yAxis[0].splitLine.lineStyle.type">
                  <el-radio-button label="solid">实线</el-radio-button>
                  <el-radio-button label="dashed">虚线</el-radio-button>
                  <el-radio-button label="dotted">点线</el-radio-button>
                </el-radio-group>
              </el-form-item>
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
          <el-collapse-item title="数据系列" name="series">
            <el-row style="text-align: right">
              <el-button @click="handleAdd" type="text" icon="fa fa-plus" style="margin-right: 10px;" size="mini"> 添加</el-button>
            </el-row>
            <el-form-item :label="`系列${index+1}`" v-for="(item,index) in optionStyle.seriesValues" :key="index" label-width="50px">
              <el-form-item>
                <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(index)" size="mini"> 删除</el-button>
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
    name: 'mlBarBasicSetting',
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
          this.component.option = JSON.parse(val)
        } catch(e) {
          this.component.option = {};
        }
      }
    },
    created() {
      this.optionStyle = this.component.option.style;
      this.option=JSON.stringify(this.component.option, null, 4);
    }
  }
</script>
