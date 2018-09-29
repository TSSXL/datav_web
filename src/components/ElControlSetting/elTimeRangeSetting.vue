<template>
  <div>

    <el-form-item label="任意时间范围" >
      <el-time-picker
        is-range
        v-model="value4"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
        :type="data.attributes.type">
      </el-time-picker>
    </el-form-item>

  </div>
</template>

<script>
  export default {
    name:'el-time-range-setting',
    props: {
      data: { type: Object }
    },
    data() {
      return {
        value4: [new Date(2017, 9, 10, 8, 40), new Date(2017, 9, 10, 9, 40)]
      };
    }
  }
</script>
