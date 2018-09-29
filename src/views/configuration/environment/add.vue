<template>
  <div class="app-container item">
    <h3>新建运行环境</h3>
    <!--本代码由系统自动生成，请在修改后予以去除-->
    <el-form ref="form" label-width="120px" size="mini">

      <el-form-item label="名称">

        <el-input
          v-model="environment.name"
          type="text" :rows="2"
          :autosize="false"
          name="name" data-vv-as="名称" v-validate="'required'">
        </el-input>

        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>

      <el-form-item label="主机地址">

        <el-input
          v-model="environment.ipAddr"
          type="text" :rows="2"
          :autosize="false"
          name="ipAddr" data-vv-as="主机地址" v-validate="'required|ip'">
        </el-input>

        <error-tip :errs="errors" name="ipAddr"></error-tip>
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
    addContainer
  } from "@/views/configuration/environment/api";
  import errorTip from "@/components/Validate/errorTip";

  export default {
    components: {errorTip},
    data() {
      return {
        id: this.$route.params.id,
        environment: {
          name: '',
          ipAddr: '',

        }
        ,
        filterMethod(query, item)
        {
          return item.label.indexOf(query) > -1;
        }
      };
    },
    methods: {
      createFilter(queryString) {
        return (options) => {
          return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return;
          }

          if (result) {
            addContainer(this.environment).then(response => {
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
    , created() {
    }
  };
</script>
<style scoped>

</style>
