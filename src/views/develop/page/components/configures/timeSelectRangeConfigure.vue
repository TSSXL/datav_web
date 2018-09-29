<template>
  <section>
    <div class="sub-title"><li class="fa fa-clock-o" /> 起始时间</div>
    <el-form-item label="占位文本">
      <el-input v-model="formItem.startOption.placeholder" name="name" placeholder="请输入输入框占位文本" />
    </el-form-item>
    <el-form-item label="起始时间">
      <el-input v-model="formItem.startOption.start" name="name" placeholder="请输入起始时间" />
    </el-form-item>
    <el-form-item label="步长">
      <el-input v-model="formItem.startOption.step" name="name" placeholder="请输入步长" />
    </el-form-item>
    <el-form-item label="结束时间">
      <el-input v-model="formItem.startOption.end" name="name" placeholder="请输入结束时间" />
    </el-form-item>
    <div class="sub-title"><li class="fa fa-clock-o" /> 结束时间</div>
    <el-form-item label="占位文本">
      <el-input v-model="formItem.endOption.placeholder" name="name" placeholder="请输入输入框占位文本" />
    </el-form-item>
    <el-form-item label="起始时间">
      <el-input v-model="formItem.endOption.start" name="name" placeholder="请输入起始时间" />
    </el-form-item>
    <el-form-item label="步长">
      <el-input v-model="formItem.endOption.step" name="name" placeholder="请输入步长" />
    </el-form-item>
    <el-form-item label="结束时间">
      <el-input v-model="formItem.endOption.end" name="name" placeholder="请输入结束时间" />
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
