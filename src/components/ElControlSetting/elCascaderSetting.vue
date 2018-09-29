<template>
  <div>
    <el-form-item label="次级菜单的展开方式">
      <el-radio-group v-model="data.attributes.expand_trigger">
        <el-radio-button label="click"></el-radio-button>
        <el-radio-button label="hover"></el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="输入框中是否显示选中值的完整路径">
      <el-switch v-model="data.attributes.show_all_levels" active-text="" inactive-text="">
      </el-switch>
    </el-form-item>

    <el-form-item label="是否可搜索选项">
      <el-switch v-model="data.attributes.filterable" active-text="" inactive-text="">
      </el-switch>
    </el-form-item>

    <options-setting :field="data"></options-setting>

    <el-form-item label="选中值">
      <el-cascader
        :expand-trigger="data.attributes.expand_trigger"
        :show-all-levels-trigger="data.attributes.show_all_levels"
        :filterable="data.attributes.filterable"
        :options="data.option.options"
        :props="{value:'name', label:'name'}"
        v-model="data.value">
      </el-cascader>
    </el-form-item>
  </div>
</template>
<script>
  import optionsSetting from '@/components/Control/optionsSetting';

  export default {
    name: 'el-cascader-setting',
    props: {
      data: {type: Object}
    },
    components: {optionsSetting},
    data() {
      return { }
    }
  }
</script>
