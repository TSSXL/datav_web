<template>
  <section>
    <el-form-item label="占位文本">
      <el-input v-model="formItem.placeholder" name="name" placeholder="请输入输入框占位文本" />
    </el-form-item>
    <el-form-item label="最大输入长度">
      <el-input-number v-model="formItem.maxlength" placeholder="最大输入长度" />
      <div class="info"><li class="fa fa-info-circle"></li> 0 表示不限制最大输入长度</div>
    </el-form-item>
  </section>
</template>

<script>
  export default {
    props: {
      formItem: { type: Object }
    },
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>
