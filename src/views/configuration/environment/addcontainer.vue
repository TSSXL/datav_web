<template>
  <div class="app-container item">
    <h3>新建容器</h3>
    <!--本代码由系统自动生成，请在修改后予以去除-->
    <el-form ref="form" label-width="120px" size="mini">

      <el-form-item label="模式">

        <el-select
          v-model="environment.mode"
          :multiple="false"
          :clearable="false"
          :filterable="false"
          :allow-create="false"
          name="mode" data-vv-as="模式" v-validate="'required'">
          <el-option
            v-for="item in modeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <error-tip :errs="errors" name="mode"></error-tip>
      </el-form-item>

      <el-form-item label="主机地址" v-if="environment.mode === 'proxy'">
        <el-select
          v-model="environment.addr"
          :multiple="false"
          :clearable="false"
          :filterable="false"
          :allow-create="true"
          name="addr" data-vv-as="主机地址" v-validate="'required'">
          <el-option
            v-for="item in addrOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <error-tip :errs="errors" name="addr"></error-tip>
      </el-form-item>
      <el-form-item label="地址" v-if="environment.mode === 'normal'">

        <el-input
          v-model="environment.addr"
          type="text" :rows="2"
          :autosize="false"
          name="addr" data-vv-as="地址" v-validate="'required'">
        </el-input>

        <error-tip :errs="errors" name="addr"></error-tip>
      </el-form-item>

      <el-form-item label="命名空间">

        <el-select
          v-model="environment.namespace"
          :multiple="false"
          :clearable="false"
          :filterable="false"
          :allow-create="true"
          name="namespace" data-vv-as="命名空间" v-validate="'required'">
          <el-option
            v-for="item in namespaceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <error-tip :errs="errors" name="namespace"></error-tip>
      </el-form-item>

      <el-form-item label="运行环境名称">

        <el-input
          v-model="environment.name"
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
    addContainer, fetchNamespaces,fetchIps
  } from "@/views/configuration/environment/api";
  import errorTip from "@/components/Validate/errorTip";

  import {getItem as getOptions} from "@/views/dev/option/api"

  export default {
    components: {errorTip},
    data() {
      return {
        id: this.$route.params.id,

        modeOptions: [],
        addrOptions:[],
        namespaceOptions: [],

        environment: {
          name: '',
          mode: 'proxy',
          addr: '',
          namespace: '',

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

      fetchmodeOptions() {

        getOptions('5ae1344f979d6f234c4d4168').then(response => {
          this.modeOptions = response.data.options;
        });

      },
      fetchnamespaceOptions() {
        fetchNamespaces().then(response=>{
          this.namespaceOptions = response.data;
        })
      },
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
          if (this.errors.any()
      )
        {
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
            this.$router.push('/configuration/environment/list');
        })
          ;
          return;
        }
      })
        ;
      },
      onCancel() {
        this.$router.go(-1)
      }
    }
    , created() {

      this.fetchmodeOptions();

      this.fetchnamespaceOptions();
      this.fetchaddrOptions();
    }
  };
</script>
<style scoped>

</style>
