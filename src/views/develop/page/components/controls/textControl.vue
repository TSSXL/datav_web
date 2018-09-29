<template>
  <span v-html="textDisplay" :style="'color:' + element.color + ';'"></span>
</template>
<script>
  export default {
    name: 'textDefault',
    props: {
      element: { type: Object }
    },
    data() {
      return { }
    },
    computed: {
      textDisplay: function() {
        return this.element.value.toString().replace(/\n/g, '<br/>')
      }
    },
    methods: {
    }
  }
</script>
