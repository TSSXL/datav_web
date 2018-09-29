<template>
    <div>
        <el-form-item label="开始时间" >
          <el-time-select name="startTime"
              v-model="data.attributes.pickerOptions.start"
              :picker-options="{
                  step: '00:15'
                }">
            </el-time-select>
        </el-form-item>

        <el-form-item label="结束时间" >
          <el-time-select
              v-model="data.attributes.pickerOptions.end"
              :picker-options="{
                step: '00:15',
                minTime: data.attributes.pickerOptions.start
              }">
            </el-time-select>
        </el-form-item>

        <el-form-item label="间隔时间" >
          <el-time-select
              v-model="data.attributes.pickerOptions.step"
              :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '12:00'
                }">
            </el-time-select>
        </el-form-item>

        <el-form-item label="值">
          <el-time-select
            v-model="data.value"
            :picker-options="{
                start: data.attributes.pickerOptions.start,
                step: data.attributes.pickerOptions.step,
                end: data.attributes.pickerOptions.end
            }"
            placeholder="选择时间">
            </el-time-select>
        </el-form-item>
    </div>
</template>
<script>
    export default {
        name: 'el-timeselect-setting',
        props: {
            data: { type: Object }
        },
        data () {
            return {
            }
        }
    }
</script>
