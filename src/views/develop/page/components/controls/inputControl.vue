<template>
  <section class="control">
    <el-input v-model="element.value" type="text"
              :placeholder="element.placeholder"
              :maxlength="maxlength"
              :disabled="element.disabled"
              :name="element.name"
              :class="{ 'is-error': errors.has(element.name) }"
              v-validate="element.validate"
              :data-vv-as="element.label" />
      <span v-if="errors.has(element.name)" class="has-error">{{errors.first(element.name)}}</span>
  </section>
</template>
<script>
  import base from './base'

  export default {
    name: 'inputControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
