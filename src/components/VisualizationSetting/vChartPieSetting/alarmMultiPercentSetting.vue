<template>
  <base-setting  :component="component">
    <template slot="style">
      <el-form label-width="80px" size="mini" label-position="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="标题样式" name="titleStyle">
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
            <el-form-item label="x坐标">
              <el-input-number v-model="optionStyle.title.left"></el-input-number>
            </el-form-item>
            <el-form-item label="y坐标">
              <el-input-number v-model="optionStyle.title.top"></el-input-number>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="圆形属性" name="pieAttr">
            <el-form-item label="横坐标">
              <el-input-number v-model="optionStyle.center.x" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="纵坐标">
              <el-input-number v-model="optionStyle.center.y" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="间隔">
              <el-input-number v-model="optionStyle.spacing" :min="10" :max="80"></el-input-number>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="图例" name="legend">
            <el-form-item label="显示">
              <el-switch
                v-model="optionStyle.legend.show">
              </el-switch>
            </el-form-item>
            <el-form-item label="位置">
              <el-radio-group v-model="optionStyle.legend.top">
                <el-radio-button label="top">上</el-radio-button>
                <el-radio-button label="middle">中</el-radio-button>
                <el-radio-button label="bottom">下</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="间隔">
              <el-input-number v-model="optionStyle.legend.itemGap" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.legend.textStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.legend.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.legend.textStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="数据系列" name="percentStyle">
            <el-row style="text-align: right">
              <el-button @click="handleAdd" type="text" icon="fa fa-plus" style="margin-right: 10px;" size="mini"> 添加</el-button>
            </el-row>
            <el-form-item :label="`系列${index+1}`" v-for="(item,index) in optionStyle.seriesItems" :key="index" label-width="50px">
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
  import errorTip from '@/components/Validate/errorTip';
  import BaseSetting from "../BaseSetting";
  import posSizeSetting from "../posSizeSetting";
  import {getApi, getPath,getAll} from '@/views/dev/attachment/api';
  import iconSelect from '@/components/Control/iconSelect';
  import dataSourceSetting from "../dataSourceSetting";
  import cmJsonEditor from '@/components/jsonEditor/cmJsonEditor'
  export default {
    name: 'alarmMultiPercentSetting',
    components: {
      BaseSetting,
      posSizeSetting,
      dataSourceSetting,
      iconSelect,
      errorTip,cmJsonEditor
    },
    props: {
      component: {type: Object},
      setting: { type: Object }
    },
    data() {
      return {
        activeNames: ['titleStyle'],
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
