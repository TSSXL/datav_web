<template>
</template>

<script>
  import { addItem } from './api'
  import validateBus from '@/views/bus/validate'
  import { message } from '@/utils'

  export default {
    components: { },
    data() {
      return {
        MODEL_NAME: null,
        model: {
          name: '',
          desc: ''
        }
      }
    },
    computed: { },
    methods: {
      onSubmit() {
        this.errors.clear()
        // 校验子组件
        validateBus.$emit('validate')

        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            addItem(this.MODEL_NAME, this.model).then(res => {
              message(res)
              if (res.success) {
                this.$router.go(-1)
              }
            })
            return
          }
        })
      },
      onCancel() {
        this.$router.go(-1)
      }
    },
    created() {
      validateBus.$on('errors-changed', errors => {
        errors.forEach(e => {
          this.errors.add(e.field, e.msg, e.rule, e.scope)
        })
      })
    }
  }
</script>
<style scoped>

</style>
