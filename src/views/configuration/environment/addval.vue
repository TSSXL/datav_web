<template>
  <div class="app-container item">
    <h3>新建运行环境配置项</h3>
    <el-form ref="form" label-width="120px" size="mini">

      <el-form-item label="名称">

        <el-input
          v-model="item.name"
          type="text" :rows="2"
          :autosize="false"
          name="name" data-vv-as="名称" v-validate="'required'">
        </el-input>

        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>

      <el-form-item label="值">

        <el-input
          v-model="item.value"
          type="text" :rows="2"
          :autosize="false"
          name="value" data-vv-as="值" v-validate="'required'">
        </el-input>

        <error-tip :errs="errors" name="value"></error-tip>
      </el-form-item>
      <el-form-item label="备注">

        <el-input
          v-model="item.memo"
          type="textarea" :rows="5"
          :autosize="true"
          name="memo" data-vv-as="备注" v-validate="''"></el-input>
        <error-tip :errs="errors" name="memo"></error-tip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    addItem
  } from "@/views/configuration/environment/api";
  import errorTip from "@/components/Validate/errorTip";

  export default {
    components: {errorTip},
    data() {
      return {
        configTemplateId: this.$route.params.id,

        item: {
          name: '',
          value: '',
          memo:''
        }
        ,
        filterMethod(query, item)
        {
          return item.label.indexOf(query) > -1;
        }
      }
        ;
    },
    methods: {
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
          return;
        }

        if (result) {
          addItem(this.configTemplateId,this.item).then(response => {
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
<style scoped>

</style>
