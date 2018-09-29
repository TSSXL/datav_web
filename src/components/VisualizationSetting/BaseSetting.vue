<template>
  <el-tabs v-model="active" type="border-card">
    <el-tab-pane label="样式" name="style" style="height: calc(100vh - 140px);">
      <el-scrollbar class='page-component__scroll' tag="div">
        <div style="height: 30px;">
          <span>{{component.label}}</span> <span style="font-size:12px;color:#666">v{{component.version}}</span>
        </div>
        <slot name="style"></slot>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="数据" name="data" style="height: calc(100vh - 140px);">
      <el-scrollbar class='page-component__scroll' tag="div">
        <div style="height: 30px;">
          <span>{{component.label}}</span> <span style="font-size:12px;color:#666">v{{component.version}}</span>
        </div>
        <slot name="data"></slot>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="交互" name="action" style="height: calc(100vh - 140px);">
      <el-scrollbar class='page-component__scroll' tag="div">
        <div style="height: 30px;">
          <span>{{component.label}}</span> <span style="font-size:12px;color:#666">v{{component.version}}</span>
        </div>
        <slot name="action"></slot>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import validateBus from '@/views/bus/validate'
  import errorTip from '@/components/Validate/errorTip'

  export default {
    name: 'settingContainer',
    components: {
      errorTip
    },
    props: {
      component: { type: Object }
    },
    data() {
      return {
        active: 'style'
      }
    },
    methods: {
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
  .el-tabs__header {
    margin: 0 !important;
  }
  .page-component__scroll {
    height: calc(100vh - 110px);
    margin-top: 0px;
  }
</style>
