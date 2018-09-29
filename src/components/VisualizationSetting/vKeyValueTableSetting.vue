<template>
  <base-setting  :component="component">
    <template slot="style">
      <el-form label-width="80px" size="mini" label-position="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="表格" name="table">
            <el-form-item label="自适应">
              <el-switch v-model="optionStyle.table.isResponsive"></el-switch>
            </el-form-item>
            <el-form-item label="边框线"></el-form-item>
            <el-form-item label="线条粗细" style="margin-left: 30px;">
              <el-input-number v-model="optionStyle.table.lineWidth" :min="0" :max="50"></el-input-number>
            </el-form-item>
            <el-form-item label="线条颜色" style="margin-left: 30px;">
              <el-color-picker v-model="optionStyle.table.lineColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="文本样式"></el-form-item>
            <el-form-item label="字体" style="margin-left: 30px;">
              <el-select v-model="optionStyle.table.fontFamily" placeholder="请选择" size="mini">
                <el-option v-if="setting.fontOptions && setting.fontOptions.length > 0"
                           v-for="item in setting.fontOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="单元格" name="tableCell">
            <el-form-item label="左边距">
              <el-input-number size="mini" v-model="optionStyle.tableCell.paddingLeft" :min="0" :max="50"></el-input-number>
            </el-form-item>
            <el-form-item label="右边距">
              <el-input-number size="mini" v-model="optionStyle.tableCell.paddingRight" :min="0" :max="50"></el-input-number>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="表头" name="tableHead">
            <el-form-item label="显示">
              <el-switch v-model="optionStyle.tableHead.show"></el-switch>
            </el-form-item>
            <div v-show="optionStyle.tableHead.show">
              <el-form-item label="高度">
                <el-input-number size="mini" v-model="optionStyle.tableHead.height" :min="20" :max="100"></el-input-number>
              </el-form-item>
              <el-form-item label="文本样式"></el-form-item>
              <el-form-item label="字体颜色" style="margin-left: 30px;">
                <el-color-picker v-model="optionStyle.tableHead.color"></el-color-picker>
              </el-form-item>
              <el-form-item label="字号" style="margin-left: 30px;">
                <el-input-number v-model="optionStyle.tableHead.fontSize" :min="10" :max="200"></el-input-number>
              </el-form-item>
              <el-form-item label="字体粗细" style="margin-left: 30px;">
                <el-select v-model="optionStyle.tableHead.fontWeight" placeholder="请选择" size="mini">
                  <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="背景颜色">
                <el-color-picker v-model="optionStyle.tableHead.backgroundColor"></el-color-picker>
              </el-form-item>
            </div>
          </el-collapse-item>
          <el-collapse-item title="列" name="column">
            <el-form-item label="宽度百分比%" label-width="110px">
              <el-input-number size="mini" v-model="optionStyle.column.firstColumnWidth" controls-position="right" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="分割线"></el-form-item>
            <el-form-item label="线条粗细" style="margin-left: 30px;">
              <el-input-number v-model="optionStyle.column.splitLine.lineWidth" :min="0" :max="50"></el-input-number>
            </el-form-item>
            <el-form-item label="线条颜色" style="margin-left: 30px;">
              <el-color-picker v-model="optionStyle.column.splitLine.lineColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="第一列"></el-form-item>
            <el-form-item label="字体颜色" style="margin-left: 30px;">
              <el-color-picker v-model="optionStyle.column.firstColumn.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字号" style="margin-left: 30px;">
              <el-input-number v-model="optionStyle.column.firstColumn.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 30px;">
              <el-select v-model="optionStyle.column.firstColumn.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="背景颜色" style="margin-left: 30px;">
              <el-color-picker v-model="optionStyle.column.firstColumn.backgroundColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="对齐方式" style="margin-left: 30px;">
              <el-radio-group v-model="optionStyle.column.firstColumn.textAlign">
                <el-radio-button label="left">左</el-radio-button>
                <el-radio-button label="center">中</el-radio-button>
                <el-radio-button label="right">右</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="第二列"></el-form-item>
            <el-form-item label="字体颜色" style="margin-left: 30px;">
              <el-color-picker v-model="optionStyle.column.secondColumn.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字号" style="margin-left: 30px;">
              <el-input-number v-model="optionStyle.column.secondColumn.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="字体粗细" style="margin-left: 30px;">
              <el-select v-model="optionStyle.column.secondColumn.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="背景颜色" style="margin-left: 30px;">
              <el-color-picker v-model="optionStyle.column.secondColumn.backgroundColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="对齐方式" style="margin-left: 30px;">
              <el-radio-group v-model="optionStyle.column.secondColumn.textAlign">
                <el-radio-button label="left">左</el-radio-button>
                <el-radio-button label="center">中</el-radio-button>
                <el-radio-button label="right">右</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="行" name="tableRow">
            <el-form-item label="分割线"></el-form-item>
            <el-form-item label="线条粗细" style="margin-left: 30px;">
              <el-input-number v-model="optionStyle.tableRow.splitLine.lineWidth" :min="0" :max="50"></el-input-number>
            </el-form-item>
            <el-form-item label="线条颜色" style="margin-left: 30px;">
              <el-color-picker v-model="optionStyle.tableRow.splitLine.lineColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="区分奇偶行" label-width="110px">
              <el-switch v-model="optionStyle.tableRow.ifOddEven"></el-switch>
            </el-form-item>
            <div v-show="optionStyle.tableRow.ifOddEven">
              <el-form-item label="奇数行背景色" label-width="110px">
                <el-color-picker v-model="optionStyle.tableRow.oddBgColor"></el-color-picker>
              </el-form-item>
              <el-form-item label="偶数行背景色" label-width="110px">
                <el-color-picker v-model="optionStyle.tableRow.evenBgColor"></el-color-picker>
              </el-form-item>
            </div>
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
  import BaseSetting from "./BaseSetting";
  import posSizeSetting from "./posSizeSetting";
  import dataSourceSetting from "./dataSourceSetting";

  export default {
    name: 'vKeyValueTableSetting',
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
        activeNames: ['table'],
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
    watch: {

    },
    created() {
      this.optionStyle = this.component.option.style;
    }
  }
</script>
<style scoped></style>
