<template>
  <section>
    <span class="info">{{displayValue}}</span><el-button v-if="!value.inherit" type="text" @click="view" size="mini">
    <li class="fa fa-key"/>
    生成KEY
  </el-button>
  </section>
</template>
<script>
  import * as UUID from "uuid";

  export default {
    props: {
      value: {type: Object}
    },
    data() {
      return {
        result: ''
      };
    },
    watch: {
    },
    computed: {
      displayValue: function () {
        let result = '';
        if (this.value.inherit) //继承
        {
          result = this.value.parentKey ? this.value.parentKey.substr(0, 4) + '**********' : '无'
        } else { //非继承
          result = this.value.key ? this.value.key.substr(0, 4) + '**********' : '无'
        }
        return result;
      }
    },
    methods: {
      view() {
        this.settingVisible = false;
      }
    }
  };
</script>
<style scoped>
  .apikey-container .bottom-line {
    width: 160px;
    float: left;
    margin-right: 12px;
    padding-right: 12px;
    color: #999999;
  }

  .apikey-container:after {
    clear: both;
  }
</style>
