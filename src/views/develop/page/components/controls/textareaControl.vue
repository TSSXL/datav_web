<template>
  <section>
    <el-input v-model="element.value" type="textarea"
              :rows="element.rows"
              :autosize="element.autosize"
              :placeholder="element.placeholder"
              :maxlength="maxlength"
              :readonly="element.readonly"
              :disabled="element.disabled"
              v-validate="element.validate"
              :name="element.name"
              :class="{ 'is-error': errors.has(element.name) }"
              :data-vv-as="element.label" />
    <span v-if="errors.has(element.name)" class="has-error">{{errors.first(element.name)}}</span>
  </section>
</template>
<script>
  import base from './base'

  export default {
    name: 'textareaControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
