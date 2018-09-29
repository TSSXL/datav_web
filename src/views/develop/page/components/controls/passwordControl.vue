<template>
  <section>
    <el-input :type="pwdType" v-model="element.value" auto-complete="new-password"
              name="password" v-validate="'required'"
              :class="errors.has('password') ? 'is-error' : ''">
      <icon-svg slot="prefix" icon-class="password"></icon-svg>
      <el-button slot="suffix" type="text" class="fa" :class="showclass" @click.native="showPwd"></el-button>
    </el-input>
  </section>
</template>
<script>
  import base from './base'

  export default {
    name: 'passwordControl',
    extends: base,
    data() {
      return {
        pwdType: 'password',
        showclass: 'fa-eye',
        // 强：字母+数字+特殊字符
        passStrong: 'regex:^(?![a-zA-z]+$)(?!\\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\\d!@#$%^&*]+$)[a-zA-Z\\d!@#$%^&*]+$',
        // 中：字母+数字，字母+特殊字符，数字+特殊字符
        passMedium: 'regex:^(?![a-zA-z]+$)(?!\\d+$)(?![!@#$%^&*]+$)[a-zA-Z\\d!@#$%^&*]+$',
        // 弱：纯数字，纯字母，纯特殊字符
        passWeak: 'regex:^(?:\\d+|[a-zA-Z]+|[!@#$%^&*]+)$'
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
          this.showclass = 'fa-eye-slash'
        } else {
          this.pwdType = 'password'
          this.showclass = 'fa-eye'
        }
      }
    }
  }
</script>
<style scoped>
</style>
