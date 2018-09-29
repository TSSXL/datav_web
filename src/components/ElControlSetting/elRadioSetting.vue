<template>
    <div>
        <options-setting :field="data"></options-setting>

        <el-form-item label="选中值">
          <el-radio-group v-model="data.value" v-if="data.option.options.length > 0 && data.option.options[0].value != ''">
            <el-radio v-for="option in data.option.options" 
              v-if="option.value != ''"
              :label="option.value" 
              :key="option.value">{{option.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
    </div>
</template>
<script>
    import optionsSetting from '@/components/Control/optionsSetting';
    export default {
        name: 'el-radio-setting',
        props: { 
            data:  { type: Object }
        },
        components: { optionsSetting },
        data () {
            return {}
        },
        methods:
        {
            
        }
    }
</script>