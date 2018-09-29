<template>
  <section>
    <el-input :type="pwdType" v-model="myPassword" auto-complete="new-password" placeholder="请输入密码"
              name="password" v-validate="'mobile'"
              :class="errors.has('password') ? 'is-error' : ''">
      <icon-svg slot="prefix" icon-class="password"></icon-svg>
      <el-button slot="suffix" type="text" class="fa" :class="showclass" @click.native="showPwd"></el-button>
    </el-input>
  </section>
</template>
<script>
  import validateBus from '@/views/bus/validate'

  export default {
    components: {},
    props: {
      password: { type: String },
      required: { type: String, default: 'required' },
      strength: { type: String, default: 'medium' } // strong, medium and weak
    },
    data() {
      return {
        myPassword: this.password,
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
    watch: {
      password(val) {
        this.myPassword = val
      },
      myPassword(val) {
        this.$emit('on-result-change', val)
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
