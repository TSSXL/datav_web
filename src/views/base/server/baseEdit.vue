<template>
</template>

<script>
  import { getItem, editItem } from './api'
  import validateBus from '@/views/bus/validate'
  import { message } from '@/utils'

  export default {
    components: {},
    data() {
      return {
        MODEL_NAME: null,
        id: this.$route.params.id,
        model: {
          name: '',
          desc: ''
        }
      }
    },
    computed: { },
    methods: {
      fetchData() {
        getItem(this.MODEL_NAME, this.id).then(res => {
          this.model = res.data
        })
      },
      onSubmit() {
        this.errors.clear()
        validateBus.$emit('validate') // 校验子组件

        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            editItem(this.MODEL_NAME, this.id, this.model).then(res => {
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
      this.fetchData()
    }
  }
</script>
<style scoped>

</style>
