<template>
  <el-collapse-item title="图表尺寸位置" name="size_location">
    <el-form-item label="尺寸" label-width="60px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="宽" label-width="15px">
            <el-input-number style="width: 96px;" v-model="cStyle.size_location.width"
                             controls-position="right"
                             :min="1"
                             :max="32800"></el-input-number>
          </el-form-item>

        </el-col>
        <el-col :span="12">
          <el-form-item label="高" label-width="15px">
            <el-input-number style="width: 96px;" v-model="cStyle.size_location.height"
                             controls-position="right" :min="1"
                             :max="32800"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="位置" label-width="60px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="x" label-width="15px">
            <el-input-number style="width: 96px;" v-model="cStyle.size_location.x" controls-position="right"
                             :min="1"
                             :max="32800"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="y" label-width="15px">
            <el-input-number style="width: 96px;" v-model="cStyle.size_location.y" controls-position="right"
                             :min="1"
                             :max="32800"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
  </el-collapse-item>
</template>
<script>
  export default {
    name: 'posSizeSetting',
    props: {
      cStyle: {type: Object}
    },
  }
</script>
<style scoped></style>
