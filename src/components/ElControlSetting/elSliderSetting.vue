<template>
    <div>
        <el-form-item label="是否为范围选择">
           <el-switch v-model="data.attributes.range" on-text="" off-text="">
           </el-switch>
        </el-form-item>

        <el-form-item label="步长">
            <el-input-number v-model="data.attributes.step"></el-input-number>
        </el-form-item>

        <el-form-item label="最小值">
            <el-input-number v-model="data.attributes.min"></el-input-number>
        </el-form-item>

        <el-form-item label="最大值">
            <el-input-number v-model="data.attributes.max"></el-input-number>
        </el-form-item>

        <el-form-item label="是否显示间断点">
           <el-switch v-model="data.attributes.show_Stops" on-text="" off-text="">
           </el-switch>
        </el-form-item>

        <el-form-item label="是否显示输入框">
          <el-switch v-model="data.attributes.show_Input" on-text="" off-text="">
          </el-switch>
        </el-form-item>




        <el-form-item label="值">
           <el-slider
              v-model="data.value"
              :range= "data.attributes.range"
              :show-stops= "data.attributes.show_Stops"
              :step="data.attributes.step"
              :min="data.attributes.min"
              :max="data.attributes.max"
              :show-input="data.attributes.show_Input">
            </el-slider>
        </el-form-item>
    </div>
</template>
<script>
    export default {
        name: 'el-slide-setting',
        props: {
            data:  { type: Object }
        },
        data () {
            return {
                options: [{value:'text', label:'单行文本框'}, {value:'textarea', label:'多行文本框'}],
                inputvalue: ''
            }
        }
    }
</script>
