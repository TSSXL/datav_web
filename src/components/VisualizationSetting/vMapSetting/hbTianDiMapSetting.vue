<template>
  <base-setting  :component="component">
    <template slot="style">
      <el-form label-width="80px" size="mini" label-position="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="插件设置" name="full">
            <el-form-item label="工具条"></el-form-item>
            <el-form-item label="显示" style="margin-left: 20px;">
              <el-switch v-model="optionStyle.plugin.ToolBar.show"></el-switch>
            </el-form-item>
            <el-form-item label="精简模式" style="margin-left: 20px;">
              <el-switch v-model="optionStyle.plugin.ToolBar.liteStyle"></el-switch>
            </el-form-item>
            <el-form-item style="margin-left: 20px;" label-width="0px">
              <el-radio-group v-model="optionStyle.plugin.ToolBar.position">
                <el-radio-button label="LT">左上</el-radio-button>
                <el-radio-button label="RT">右上</el-radio-button>
                <el-radio-button label="LB">左下</el-radio-button>
                <el-radio-button label="RB">右下</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="类型"></el-form-item>
            <el-form-item label="显示" style="margin-left: 20px;">
              <el-switch v-model="optionStyle.plugin.MapType.show"></el-switch>
            </el-form-item>
            <el-form-item label="图层类型" style="margin-left: 20px;">
              <el-radio-group v-model="optionStyle.plugin.MapType.defaultType">
                <el-radio-button :label="1">地图</el-radio-button>
                <el-radio-button :label="0">卫星图</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="路况" style="margin-left: 20px;">
              <el-switch v-model="optionStyle.plugin.MapType.showTraffic"></el-switch>
            </el-form-item>
            <el-form-item label="路网" style="margin-left: 20px;" v-if="optionStyle.plugin.MapType.defaultType == 0">
              <el-switch v-model="optionStyle.plugin.MapType.showRoad"></el-switch>
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
  import errorTip from '@/components/Validate/errorTip';
  import BaseSetting from "../BaseSetting";
  import posSizeSetting from "../posSizeSetting";
  import {getApi, getPath,getAll} from '@/views/dev/attachment/api';
  import iconSelect from '@/components/Control/iconSelect';
  import dataSourceSetting from "../dataSourceSetting";
  import cmJsonEditor from '@/components/jsonEditor/cmJsonEditor';

  export default {
    name: 'hbTianDiMapSetting',
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
        activeNames: ['textStyle'],
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
        this.optionStyle.icon.push({
          "key": "down",
          "value": {
            "type": "fontIcon",
            "fontIcon": {
              "className": "fa fa-hdd-o"
            },
            "images": []
          }
        });
      },
      handleDelete(index){
        this.optionStyle.icon.splice(index, 1);
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
