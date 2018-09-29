<template>
  <section>
    <el-tag v-for="tag of tags" :key="tag" size="mini">{{tag}}</el-tag>
  </section>
</template>
<script>
  export default {
    name: 'tagDefault',
    props: {
      element: {type: Object}
    },
    data() {
      return {}
    },
    computed: {
      tags: function() {
        return this.element.value.split(';')
      }
    },
    methods: {}
  }
</script>
