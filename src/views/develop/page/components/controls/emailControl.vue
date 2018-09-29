<template>
  <el-input type="text" v-model="element.value" :placeholder="element.placeholder"
            name="email" v-validate="'email'"
            :readonly="element.readonly" :disabled="element.disabled"
            :class="errors.has('email') ? 'is-error' : ''">
    <li slot="prefix" class="fa fa-envelope-o fa-fw"></li>
  </el-input>
</template>
<script>
  import base from './base'

  export default {
    name: 'emailControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
