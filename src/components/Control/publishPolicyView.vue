<template>
  <section>
    <span class="info">{{displayValue}}</span>
  </section>
</template>
<script>
  import {getItem as getOptions} from "@/views/dev/option/api"

  export default {
    props: {
      value: {type: Object}
    },
    data() {
      return {
        result: []
      };
    },
    watch: {
    },
    computed: {
      displayValue: function () {
        let result = '';
        if (this.value.inherit) //继承
        {
          result = this.value.parentPolicy ? this.value.parentPolicy.join(' / ') : '无'
        } else { //非继承
          result = this.value.policy ? this.value.policy.join(' / ') : '无'
        }
        return result;
      }
    },
    methods: {
    },
    created() {

    }
  };
</script>
<style scoped>
  .info {
    color: #999999;
  }
</style>
