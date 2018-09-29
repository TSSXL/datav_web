
<template>
  <div class="app-container">
    <h2>新建选项</h2>
    <el-form ref="form" label-width="120px" size="mini">

        <el-form-item label="名称">
          <el-input
            v-model="option.name"
            type="text" :rows="2"
            :autosize="false">
          </el-input>
          <error-tip :errs="errors" name="name"></error-tip>
        </el-form-item>

        <el-form-item label="描述">
          <el-input
            v-model="option.desc"
            type="textarea" :rows="2"
            :autosize="false">
          </el-input>
          <error-tip :errs="errors" name="desc"></error-tip>
        </el-form-item>

        <el-form-item label="类型">
          <el-radio-group v-model="option.type">
            <el-radio-button label="standard">标准</el-radio-button>
            <el-radio-button label="tree">树形</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="树形选项值" v-if="option.type === 'tree'">
          <z-tree-options :options="option.options"/>
          <error-tip :errs="errors" name="options"></error-tip>
        </el-form-item>
        <el-form-item label="选项值" v-else>
          <options :options="option.options"/>
          <error-tip :errs="errors" name="options"></error-tip>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button  @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addItem } from "@/views/dev/option/api";
import errorTip from "@/components/Validate/errorTip";
import options from '@/components/Control/options';
import zTreeOptions from '@/components/Control/zTreeOptions';

export default {
  components: { errorTip, options, zTreeOptions },
  data() {
    return {
      id: this.$route.params.id,
      option: {
          name: null,
          desc: null,
          options: [],
          type: 'standard'
      },
    };
  },
  methods: {

    onSubmit() {
      this.$validator.validateAll().then(result => {
      if (this.errors.any()) {
        return;
      }

        if (result) {
          addItem(this.option).then(response => {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.$router.go(-1)
          });
          return;
        }


      });
    },
    onCancel() {
      this.$router.go(-1)
    }
  }

};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
