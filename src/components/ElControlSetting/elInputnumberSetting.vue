<template>
    <div>
        <el-form-item>
          <el-col :span="4">
            <el-checkbox v-model="ismin">最小值</el-checkbox>
          </el-col>
          <el-col :span="16">
            <el-input-number v-show="ismin" v-model="data.attributes.min" >
            </el-input-number>
          </el-col>
        </el-form-item> 

        <el-form-item>
          <el-col :span="4">
            <el-checkbox v-model="ismax">最大值</el-checkbox>
          </el-col>
          <el-col :span="16">
            <el-input-number v-show="ismax" v-model="data.attributes.max">            
            </el-input-number> 
          </el-col>
        </el-form-item> 

        <el-form-item>
          <el-col :span="4">
            <el-checkbox v-model="isstep">计数器步长</el-checkbox>
          </el-col>
          <el-col :span="16">
            <el-input-number v-show="isstep" v-model="data.attributes.step">            
            </el-input-number> 
          </el-col>
        </el-form-item> 

        <el-form-item label="值">
          <el-input-number v-model="data.value" 
            :step="data.attributes.step" 
            :max="data.attributes.max" 
            :min="data.attributes.min"></el-input-number>
        </el-form-item>
    </div>
</template>
<script>
    export default {
        name: 'el-inputnumber-setting',
        props: { 
            data:  { type: Object }
        },
        data () {
            return {  
                ismin: true,
                ismax: true,
                isstep: true
            }
        },
        created(){
            if(!this.data.attributes.hasOwnProperty('min'))
              this.ismin = false;

            if(!this.data.attributes.hasOwnProperty('max'))
              this.ismax = false;

            if(!this.data.attributes.hasOwnProperty('step'))
              this.isstep = false;
        }
    }
</script>