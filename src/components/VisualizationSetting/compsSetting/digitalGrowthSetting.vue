<template>
  <base-setting  :component="component">
    <template slot="style">
      <el-form label-width="80px" size="mini" label-position="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="文本样式" name="textStyle">
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
            <el-form-item label="字体颜色">
              <el-color-picker v-model="optionStyle.textStyle.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="字号">
              <el-input-number v-model="optionStyle.textStyle.fontSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="字体粗细">
              <el-select v-model="optionStyle.textStyle.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="间距">
              <el-input-number v-model="optionStyle.spacing" :min="5" :max="50"></el-input-number>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="图标样式" name="iconStyle">
            <el-form-item label="图标颜色">
              <el-color-picker v-model="optionStyle.iconColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="图标尺寸">
              <el-input-number v-model="optionStyle.iconSize" :min="10" :max="200"></el-input-number>
            </el-form-item>
            <el-row style="text-align: right">
              <el-button @click="handleAdd" type="text" icon="fa fa-plus" style="margin-right: 10px;" size="mini"> 添加</el-button>
            </el-row>
            <template v-for="(item,index) in optionStyle.icon">
              <el-form-item :label="`图标${index+1}`" label-width="50px">
                <el-col :span="15">
                  <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(index)" size="mini" v-if="optionStyle.icon.length > 1"> 删除</el-button>
                  <el-input v-model="item.key"></el-input>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="7">
                  <icon-select v-model="item.value" :icoSize="'50px'"></icon-select>
                </el-col>
              </el-form-item>
            </template>
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
  import BaseSetting from "../BaseSetting";
  import posSizeSetting from "../posSizeSetting";
  import {getApi, getPath,getAll} from '@/views/dev/attachment/api';
  import iconSelect from '@/components/Control/iconSelect';
  import dataSourceSetting from "../dataSourceSetting";

  export default {
    name: 'digitalGrowthSetting',
    components: {
      BaseSetting,
      posSizeSetting,
      dataSourceSetting,
      iconSelect,
      errorTip
    },
    props: {
      component: {type: Object},
      setting: { type: Object }
    },
    data() {
      return {
        activeNames: ['textStyle'],
        optionStyle:{},
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

    },
    created() {
      this.optionStyle = this.component.option.style;
    }
  }
</script>
<style scoped></style>
