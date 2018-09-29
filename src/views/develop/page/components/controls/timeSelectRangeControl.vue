<template>
  <section>
    <el-time-select
      :placeholder="element.startOption.placeholder"
      v-model="element.value.startTime"
      :picker-options="{
          start: element.startOption.start,
          step: element.startOption.step,
          end: element.startOption.end
        }"
      :editable="element.editable"
      :readonly="element.readonly"
      :disabled="element.disabled">
    </el-time-select>
    <el-time-select
      :placeholder="element.endOption.placeholder"
      v-model="element.value.endTime"
      :picker-options="{
         start: element.endOption.start,
          step: element.endOption.step,
          end: element.endOption.end,
          minTime: element.value.startTime
        }"
      :editable="element.editable"
      :readonly="element.readonly"
      :disabled="element.disabled">
    </el-time-select>
  </section>
</template>
<script>
  import base from './base'

  export default {
    name: 'timeSelectRangeControl',
    extends: base,
    data() {
      return {}
    },
    methods: {}
  }
</script>
