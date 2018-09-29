<template>
  <el-input type="text" v-model="element.value" :placeholder="element.placeholder"
            name="mobile" v-validate="'mobile'"
            :readonly="element.readonly" :disabled="element.disabled"
            :class="errors.has('mobile') ? 'is-error' : ''">
    <li slot="prefix" class="fa fa-mobile"></li>
  </el-input>
</template>
<script>
  import base from './base'

  export default {
    name: 'mobileControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
