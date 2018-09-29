<template>
  <div class="app-container item">
    <h3>新建运行环境</h3>
    <!--本代码由系统自动生成，请在修改后予以去除-->
    <el-form ref="form" label-width="120px" size="mini">

      <el-form-item label="地址">

        <el-select
          v-model="host.addr"
          :multiple="false"
          :clearable="false"
          :filterable="false"
          :allow-create="true"
          name="addr" data-vv-as="地址">
          <el-option
            v-for="item in addrOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <error-tip :errs="errors" name="addr"></error-tip>
      </el-form-item>

      <el-form-item label="运行环境名称">

        <el-input
          v-model="host.name"
          type="text" :rows="2"
          :autosize="false"
          name="name" data-vv-as="运行环境名称" v-validate="'required'">
        </el-input>

        <error-tip :errs="errors" name="name"></error-tip>
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
    addHost,fetchIps
  } from "@/views/configuration/environment/api";
  import errorTip from "@/components/Validate/errorTip";

  export default {
    components: {errorTip},
    data() {
      return {
        id: this.$route.params.id,

        addrOptions:[],
        host: {
          name: '',
          addr: '',
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
      fetchaddrOptions() {
        fetchIps().then(response=>{
          this.addrOptions = response.data;
        })
      },
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
            addHost(this.host).then(response => {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.$router.push('/configuration/environment/list');
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
      this.fetchaddrOptions()
    }
  };
</script>
<style scoped>

</style>
