<template>
    <div>
        <el-form-item label="类型">
          <el-radio-group v-model="data.attributes.type">
            <el-radio-button v-for = "(item, index) in options" :label="item.value" :key="item.value">{{item.label}}</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="日期格式化" >
          <el-input v-model="data.attributes.format">            
          </el-input>
        </el-form-item>

        <el-form-item label="值">
          <el-date-picker
            v-model="data.value"
            :type="data.attributes.type"
            :format="data.attributes.format"
            placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
    </div>
</template>
<script>
export default {
  name: "el-datepicker-setting",
  props: {
    data: { type: Object }
  },
  data() {
    return {
      options: [
        { value: "datetime", label: "日期时间" },
        { value: "date", label: "日期" },
        { value: "year", label: "年" },
        { value: "month", label: "月" },
        { value: "week", label: "周" },
        { value: "datetimerange", label: "时间范围" },
        { value: "daterange", label: "日期范围" }
      ]
    };
  }
};
</script>