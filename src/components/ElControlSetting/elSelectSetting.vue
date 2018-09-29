<template>
    <div>
        <el-form-item label="是否多选" style="display:none;">
          <el-switch v-model="data.attributes.multiple" active-text="" inactive-text="">
          </el-switch> 
        </el-form-item>

        <el-form-item label="可清空单选">
          <el-switch v-model="data.attributes.clearable" active-text="" inactive-text="">
          </el-switch> 
        </el-form-item>

        <el-form-item label="是否可搜索">
          <el-switch v-model="data.attributes.filterable" active-text="" inactive-text="">
          </el-switch> 
        </el-form-item>

        <el-form-item label="创建条目">
          <el-switch v-model="data.attributes.allow_create" active-text="" inactive-text="">
          </el-switch> 
        </el-form-item>

        <options-setting :field="data"></options-setting>

        <el-form-item label="值">
            <el-select v-model="data.value" 
                :multiple="data.attributes.multiple"
                :clearable="data.attributes.clearable"
                :filterable="data.attributes.filterable"
                :allow-create = "data.attributes.allow_create"
                >
                <el-option
                    v-for="item in data.option.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
            </el-select>
        </el-form-item>    
    </div>
</template>
<script>
    import optionsSetting from '@/components/Control/optionsSetting';
    export default {
        name: 'el-select-setting',
        props: { 
            data:  { type: Object }
        },
        components: { optionsSetting },
        data () {
            return {   
                validate: 'required'
            }
        },
        methods:
        {
            
        }
    }
</script>