<template>
    <div>
      <el-form-item label="选择数据源">
        <el-radio-group v-model="field.option.type">
          <el-radio-button label="input">输入数据</el-radio-button>
          <el-radio-button label="option">选项数据</el-radio-button>
          <el-radio-button label="entity">实体数据</el-radio-button>
          <el-radio-button label="api">api数据</el-radio-button>                  
        </el-radio-group>
      </el-form-item>

      <el-form-item label="输入数据" v-if="field.option.type == 'input'">
        <options :options="field.option.options"/>                
      </el-form-item>
      <el-form-item label="选项数据" v-if="field.option.type == 'option'">                
        <option-list :option="field.option"></option-list>
      </el-form-item>
      <el-form-item label="实体数据" v-if="field.option.type == 'entity'">                
        <entity-list :relation="field.option.entity"></entity-list>
        <el-input v-model="field.option.entity.map" placeholder="可输入数据源字段映射 value:item.id, label:item.name+'/'+item.unit"></el-input>
      </el-form-item>
      <el-form-item label="API" v-if="field.option.type == 'api'">
          <el-input placeholder="请输入内容"></el-input>
      </el-form-item>              
    </div>
</template>
<script>
import optionList from '@/views/dev/option/selectList'
import options from '@/components/Control/options';
import entityList from '@/views/dev/entity/selectList'

export default {
  props: {
    field: { type: Object }
  },
  components: {optionList, options, entityList},
  data() {
    return {
    };
  }
};
</script>