<template>
  <base-setting  :component="component">
    <template slot="style">
      <el-form label-width="80px" size="mini" label-position="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="文本样式" name="style">
            <el-form-item label="字体">
              <el-select v-model="optionStyle.text.fontFamily" placeholder="请选择">
                <el-option v-if="setting.fontOptions && setting.fontOptions.length > 0"
                           v-for="item in setting.fontOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.text.fontSize" controls-position="right" :min="1"
                               :max="128"></el-input-number>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.text.color"></el-color-picker>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="边框样式" name="borderStyle">
            <el-form-item label="显示">
              <el-switch v-model="optionStyle.border.show"></el-switch>
            </el-form-item>
            <el-form-item label="边框颜色">
              <el-color-picker v-model="optionStyle.border.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="边框大小">
              <el-input-number v-model="optionStyle.border.width" :min="0" :max="50"></el-input-number>
            </el-form-item>
            <el-form-item label="边框样式">
              <el-radio-group v-model="optionStyle.border.type">
                <el-radio-button label="solid">实线</el-radio-button>
                <el-radio-button label="dashed">虚线</el-radio-button>
                <el-radio-button label="dotted">点线</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="边距">
              <el-input-number v-model="optionStyle.border.padding" :min="0" :max="500"></el-input-number>
            </el-form-item>
            <el-form-item label="阴影颜色">
              <el-color-picker v-model="optionStyle.border.boxShadowColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="阴影大小">
              <el-input-number v-model="optionStyle.border.boxShadowWidth" :min="0" :max="50"></el-input-number>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="超链接" name="hyperlink">
            <el-form-item label="URL">
              <el-input placeholder="请输入内容" v-model="optionStyle.hyperlink.url"></el-input>
            </el-form-item>
            <el-form-item label="新开窗口">
              <el-switch v-model="optionStyle.hyperlink.blank">
              </el-switch>
            </el-form-item>
          </el-collapse-item>
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
  import cmJsonEditor from '@/components/jsonEditor/cmJsonEditor';

  export default {
    name: 'titleSetting',
    components: {
      BaseSetting,
      posSizeSetting,
      dataSourceSetting,
      errorTip,cmJsonEditor
    },
    props: {
      component: {type: Object},
      setting: { type: Object },
      active: {type: String}
    },
    data() {
      return {
        activeNames: ['style'],
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
