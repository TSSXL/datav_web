<template>
</template>
<script>
  import validateBus from '@/views/bus/validate'
  export default {
    props: {
      element: { type: Object }
    },
    computed: {
      maxlength: function() {
        return this.element.maxlength === 0 ? null : this.element.maxlength
      }
    },
    data() {
      return {

      }
    },
    methods: {
    },
    mounted() {
      this.$nextTick(function() {
        validateBus.$on('validate', target => {
          this.$validator.validateAll().then(result => {
            if (result) {
              return
            }
            validateBus.$emit('errors-changed', this.errors.items)
          })
        })
      })
    }
  }
</script>
