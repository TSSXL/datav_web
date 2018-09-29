<template>
  <section>
    <el-input-number
      v-model="element.value" :min="1" :max="100" label="请输入数字"
      :disabled="element.disabled"
      :name="element.name"
      :class="{ 'is-error': errors.has(element.name) }"
      v-validate="element.validate"
      :data-vv-as="element.label"
    />
    <span v-if="errors.has(element.name)" class="has-error">{{errors.first(element.name)}}</span>
  </section>
</template>
<script>
  import base from './base'

  export default {
    name: 'inputNumberControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
