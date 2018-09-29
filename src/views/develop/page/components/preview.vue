<template>
  <section>
    <el-form ref="form" label-width="80px" size="mini">
      <el-row v-for="(row, index) in page.layout" :key="index">
        <el-col v-for="(col, index) in row.cols" :key="index" :span="col.span">
          <el-form-item v-for="(element, index) in col.data" :key="index" :label="element.label" label-width="100px">
            <control-display :element="element"></control-display>
          </el-form-item>
        </el-col>
      </el-row>
  </el-form>
  </section>
</template>

<script>
  import controlDisplay from './controlDisplay'

  export default {
    components: {
      controlDisplay
    },
    props: {
      page: { type: Object }
    },
    data() {
      return {
      }
    },
    methods: {
    },
    mounted() {
    },
    watch: {}
  }
</script>

<style scoped>
  li {
    list-style-type: none;
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 6px;
  }
</style>
