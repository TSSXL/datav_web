<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <el-form ref="form" label-width="120px" size="mini">
          <error-tip :errs="errors" name="topicName"></error-tip>
          <el-form-item label="名称">
            <el-input v-model="api.name" type="text" name="name" data-vv-as="名称" v-validate="'required'">
            </el-input>
            <error-tip :errs="errors" name="name"></error-tip>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="api.desc"
              type="textarea" :rows="1"
              :autosize="true"
              name="desc" data-vv-as="描述" v-validate="''">
            </el-input>
            <error-tip :errs="errors" name="desc"></error-tip>
          </el-form-item>

          <el-collapse v-model="activeApiParam">
            <el-collapse-item title="API参数设置" name="apiParam">
              <api-param :params="api.apiParam" :baseUrl="datasource.url"
                         :data="api.transScript"></api-param>
            </el-collapse-item>
          </el-collapse>
          <el-button type="text" @click="activeTab('pro')" class="link " :class="activeName=='pro'?'':'active'">消息格式设置</el-button>
          <div v-if="activeName == 'pro'">
            <trans-script :content="api.transScript"></trans-script>
          </div>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">编辑</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <!--<el-aside width="300px">
        <collapses v-model="api"></collapses>
      </el-aside>-->
    </el-container>
  </div>
</template>

<script>
  import {getItem,editItem} from "@/views/data/api/api";
  import errorTip from "@/components/Validate/errorTip";
  //import cron from '@/components/Control/cron';
  import apiParam from '@/views/data/api/apiparam';
  import transScript from '@/components/Control/transScript';
  import ElCollapse from "element-ui/packages/collapse/src/collapse";

  export default {
    components: {
      ElCollapse,
      errorTip, apiParam,transScript
    },
    data() {
      return {
        id: this.$route.params.id,
        api: {
          name: '',
          desc: '',
          apiParam: {
            url: '',
            method: 'get',
            queryParams: [],
            body: '',
            headers: [],
          },
          transScript: {
            originalMessage: '',
            translatorScriptContent: 'var obj=JSON.parse(o);\nt = obj;',
            formatMessage: ''
          }
        },
        datasource: {},
        activeApiParam: 'apiParam',
        activeTimeperiod: 'timeperiod',
        activeName: 'basic'
      };
    },
    methods: {
      fetchDatasourceData() {
      },
      activeTab(val) {
        this.activeName = val;
      },
      fetchData() {
        getItem(this.id).then(response => {
          this.api = response.data;
        })
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return;
          }

          if (result) {
            editItem(this.id,this.api).then(response => {
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
    },
    created() {
      this.fetchDatasourceData();
    },
    mounted() {
      this.$nextTick(function() {
        this.fetchData()
      })
    }
  };
</script>
<style scoped>
  .link{
    font-size: 13px;
    color: #2d2f33
  }
  .active{
    color: #54B1CF
  }
</style>
