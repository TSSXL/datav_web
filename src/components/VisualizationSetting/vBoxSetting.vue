<template>
  <base-setting  :component="component">
    <template slot="style">
      <el-form label-width="80px" size="mini" label-position="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="文本样式" name="titleSet">
            <el-form-item label="显示">
              <el-switch v-model="optionStyle.textStyle.show"></el-switch>
            </el-form-item>
            <el-form-item label="标题名">
              <el-input v-model="optionStyle.textStyle.title"></el-input>
            </el-form-item>
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
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.textStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.textStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对齐方式">
              <el-select v-model="optionStyle.textStyle.textAlign" placeholder="请选择" size="mini">
                <el-option v-for="item in aligns" :key="item.name" :label="item.label" :value="item.name"></el-option>
              </el-select>
            </el-form-item>

          </el-collapse-item>
          <el-collapse-item title="边框设置" name="borderSet">
            <el-form-item label="样式">
              <el-select v-model="borderImgUrl" placeholder="请选择" size="mini" @change="setBorder">
                <el-option v-for="item in component.option.data.borderImages" :key="item.label" :label="item.label" :value="item.url"></el-option>
              </el-select>
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
      <span style="color:#dcdee3;font-size: 14px;"><i class="fa fa-universal-access" aria-hidden="true"></i> 该组件不需要配置数据</span>
    </template>
  </base-setting>
</template>
<script>
  import errorTip from '@/components/Validate/errorTip'
  import BaseSetting from "./BaseSetting";
  import posSizeSetting from "./posSizeSetting";
  import cmJsonEditor from '@/components/jsonEditor/cmJsonEditor'

  export default {
    name: 'vBoxSetting',
    components: {
      BaseSetting,
      posSizeSetting,
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
        aligns:[{
          "label":"左对齐",
          "name":"left",
        },{
          "label":"右对齐",
          "name":"right",
        },{
          "label":"居中对齐",
          "name":"center",
        }],
        objQuery: [
          {category: {$regex: 'datav-border'}}
        ],
        borderImgUrl:""
      }
    },
    methods: {
      setBorder(){
        this.component.option.style.borderIndex = this.component.option.data.borderImages.findIndex((item)=>item.url == this.borderImgUrl);
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
      this.borderImgUrl = this.component.option.data.borderImages[this.optionStyle.borderIndex].url;
    }
  }
</script>
<style scoped></style>
