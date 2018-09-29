<template>
  <section class="control">
    <tinymce :height="element.height" v-model="element.value"></tinymce>
  </section>
</template>
<script>
  import base from './base'
  import Tinymce from '@/components/Tinymce'

  export default {
    name: 'inputControl',
    extends: base,
    components: { Tinymce },
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
