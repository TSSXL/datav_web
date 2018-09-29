<template>
  <el-input type="text" v-model="element.value" :placeholder="element.placeholder"
            name="ip" v-validate="'ip'"
            :readonly="element.readonly" :disabled="element.disabled"
            :class="errors.has('ip') ? 'is-error' : ''">
    <li slot="prefix" class="fa fa-ellipsis-h"></li>
  </el-input>
</template>
<script>
  import base from './base'

  export default {
    name: 'ipControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
