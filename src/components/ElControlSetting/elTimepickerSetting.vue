<template>
    <div>
        <el-form-item label="起始时间" >
            <el-time-select
                placeholder="起始时间"
                v-model="data.attributes.pickerOptions.start"
                :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
            </el-time-select>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-time-select
                placeholder="结束时间"
                v-model="data.attributes.pickerOptions.end"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                    minTime: data.attributes.pickerOptions.start
                    }">
            </el-time-select>
        </el-form-item>
        <el-form-item label="值">
          <el-time-picker
                v-model="data.value"
                placeholder="选择时间点">
            </el-time-picker>
        </el-form-item>
    </div>
</template>
<script>
    export default {
        name: 'el-timepicker-setting',
        props: {
            data: { type: Object }
        },
        data () {
            return {
            }
        }
    }
</script>
