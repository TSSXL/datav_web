<template>
    <div>
        <el-form-item label="打开时的文字">
           <el-input v-model="data.attributes.active_text" :maxlength="10"></el-input>
        </el-form-item>

        <el-form-item label="关闭时的文字">
           <el-input v-model="data.attributes.inactive_text" :maxlength="10"></el-input>
        </el-form-item>   

        <el-form-item label="值">
          <el-switch
            v-model="data.value"
            :active-text="data.attributes.active_text"
            :inactive-text="data.attributes.inactive_text">
          </el-switch>
        </el-form-item>
    </div>
</template>
<script>
    export default {
        name: 'el-switch-setting',
        props: { 
            data:  { type: Object }
        },
        data () {
            return {   
                options: []
            }
        }
    }
</script>