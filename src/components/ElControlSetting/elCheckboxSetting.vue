<template>
    <div>
        <options-setting :field="data"></options-setting>

        <el-form-item label="选中值">
          <el-checkbox-group v-model="data.value">
            <el-checkbox v-for="option in data.option.options"
              v-if="option.value !== ''" 
              :label="option.value" 
              :key="option.value">{{option.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
    </div>
</template>
<script>
    import optionsSetting from '@/components/Control/optionsSetting';
    export default {
        name: 'el-checkbox-setting',
        props: { 
            data:  { type: Object }
        },
        components: { optionsSetting },
        data () {
            return {  
            }
        }
    }
</script>