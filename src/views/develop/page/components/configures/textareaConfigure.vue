<template>
  <section>
    <el-form-item label="标题">
      <el-input v-model="formItem.label" name="name" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="占位文本">
      <el-input v-model="formItem.placeholder" name="name" placeholder="请输入输入框占位文本" />
    </el-form-item>
    <el-form-item label="行数">
      <el-input-number v-model="formItem.rows" />
    </el-form-item>
    <el-form-item label="自适应高度">
      <el-switch v-model="formItem.autosize" />
    </el-form-item>
    <el-form-item label="最大输入长度">
      <el-input-number v-model="formItem.maxlength" />
      <div class="info"><li class="fa fa-info-circle"></li> 0 表示不限制最大输入长度</div>
    </el-form-item>
  </section>
</template>

<script>
  export default {
    props: {
      formItem: { type: Object }
    },
    components: { },
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>
