<template>
  <section>
    <el-input :type="pwdType" v-model="value.password" auto-complete="new-password" placeholder="请输入密码" name="password" :v-validate="required" data-vv-as="密码">
      <icon-svg slot="prefix" icon-class="password"></icon-svg>
      <el-button slot="suffix" type="text" class="fa" :class="showclass" @click.native="showPwd"></el-button>
    </el-input>
    <error-tip :errs="errors" name="password"></error-tip>
  </section>
</template>
<script>
  import validateBus from '@/views/bus/validate'
  import errorTip from '@/components/Validate/errorTip'
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    components: {
      ElButton,
      errorTip },
    props: {
      value: { type: Object },
      required: { type: String, default: 'required' }
    },
    data() {
      return {
        pwdType: 'password',
        showclass: 'fa-eye'
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
    },
    created() {
      validateBus.$on('validate', target => {
        this.$validator.validateAll().then(result => {
          if (result) {
            return
          }
          validateBus.$emit('errors-changed', this.errors.items)
        })
      })
    }
  }
</script>
<style scoped>
</style>
