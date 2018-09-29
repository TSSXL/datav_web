<template>
  <section>
    <el-form-item label="可选时间段">
      <el-input v-model="formItem.selectableRange" placeholder="请输入可选时间段" />
      <div class="info"><li class="fa fa-info-circle"></li> 可选时间段，例如'18:30:00 - 20:30:00'或者传入数组['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']</div>
    </el-form-item>
    <el-form-item label="时间格式化">
      <el-input v-model="formItem.format" placeholder="请输入时间格式化" />
      <div class="info"><li class="fa fa-info-circle"></li> 小时：HH，分：mm，秒：ss，AM/PM A， 默认值 'HH:mm:ss'</div>
    </el-form-item>
    <el-form-item label="文本框可输入">
      <el-switch v-model="formItem.editable" />
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
