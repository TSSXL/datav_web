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
              <el-switch
                v-model="optionStyle.xAxis.show">
              </el-switch>
            </el-form-item>
            <el-form-item label="颜色">
              <el-color-picker v-model="optionStyle.xAxis.axisLabel.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="字号">
              <el-slider v-model="optionStyle.xAxis.axisLabel.fontSize" :step="0.5" :min="10" :max="100" size="mini"></el-slider>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.xAxis.axisLabel.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="y轴" name="yAxis">
            <el-form-item label="显示">
              <el-switch
                v-model="optionStyle.yAxis.show">
              </el-switch>
            </el-form-item>
            <el-form-item label="颜色">
              <el-color-picker v-model="optionStyle.yAxis.axisLabel.color" size="small"></el-color-picker>
            </el-form-item>
            <el-form-item label="字号">
              <el-slider v-model="optionStyle.yAxis.axisLabel.fontSize" :step="0.5" :min="10" :max="100" size="mini"></el-slider>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.yAxis.axisLabel.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最大值">
              <el-input v-model="optionStyle.yAxis.max" size="mini"></el-input><el-button type="text" size="mini" @click="optionStyle.yAxis.max = null">自动</el-button>
            </el-form-item>
            <el-form-item label="最小值">
              <el-input v-model="optionStyle.yAxis.min" size="mini"></el-input><el-button type="text" size="mini" @click="optionStyle.yAxis.min = null">自动</el-button>
            </el-form-item>
            <el-form-item label="坐标轴分割段数">
              <el-input-number size="mini" v-model="optionStyle.yAxis.splitNumber"></el-input-number>
            </el-form-item>
            <el-form-item label="文字距辅助线距离">
              <el-slider v-model="optionStyle.yAxis.axisLabel.margin" ::step="0.5" :min="-40" :max="40" size="mini"></el-slider>
            </el-form-item>
          </el-collapse-item>
          <!--<el-collapse-item title="数据系列" name="dataSeries">-->
          <!--</el-collapse-item>-->
          <pos-size-setting :cStyle="optionStyle"></pos-size-setting>
          <el-button @click="optionDialogVisible=true">显示json</el-button>
        </el-collapse>

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
    name: 'mlScatterPlotSetting',
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
      addData(){
        this.option.style.color.push(this.option.style.color[this.option.style.color.length - 1]);
      },
      removeData(index){
        this.option.style.color.splice(index, 1);
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
