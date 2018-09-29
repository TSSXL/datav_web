<template>
  <div class="app-container">
    <!--已手工修改-->
    <el-container>
      <el-main>
        <el-form ref="form" label-width="120px" size="mini">
          <el-form-item label="系统名称">
            <el-input
              v-model="app.name"
              type="text" :rows="2"
              :autosize="false"
              name="name" data-vv-as="系统名称" v-validate="'required'">
            </el-input>
            <error-tip :errs="errors" name="name"></error-tip>
          </el-form-item>

          <el-form-item label="访问地址">

            <el-input
              v-model="app.address"
              type="text" :rows="2"
              :autosize="false"
              name="address" data-vv-as="访问地址" v-validate="'required'">
            </el-input>

            <error-tip :errs="errors" name="address"></error-tip>
          </el-form-item>

          <el-form-item label="所属单位">

            <z-tree-select v-model="app.department"
                           :treeid="'department'"
                           :onlyleaf="true"
                           :options="departmentOptions">
            </z-tree-select>


            <error-tip :errs="errors" name="department"></error-tip>
          </el-form-item>

          <el-form-item label="管理单位">

            <z-tree-select v-model="app.management"
                           :treeid="'management'"
                           :onlyleaf="true"
                           :options="managementOptions">
            </z-tree-select>


            <error-tip :errs="errors" name="management"></error-tip>
          </el-form-item>

          <el-form-item label="分类">

            <el-checkbox-group
              v-if="categoryOptions.length>0"
              v-model="app.category">
              <el-checkbox v-for="item in categoryOptions" :key="item.value" :label="item.value"
                           name="category" data-vv-as="分类"
                           v-validate="''">{{item.label}}
              </el-checkbox>
            </el-checkbox-group>

            <error-tip :errs="errors" name="category"></error-tip>
          </el-form-item>

          <el-form-item label="描述">

            <el-input
              v-model="app.desc"
              type="textarea" :rows="6"
              :autosize="false"
              name="desc" data-vv-as="描述" v-validate="'required'">>
            </el-input>

            <error-tip :errs="errors" name="desc"></error-tip>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">新建</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-aside width="320px">
        <collapses v-model="app"></collapses>
      </el-aside>
    </el-container>

  </div>
</template>

<script>
  import {addItem} from "@/views/console/app/api";
  import errorTip from "@/components/Validate/errorTip";
  import {getItem as getOptions} from "@/views/dev/option/api"
  import zTreeSelect from '@/components/Control/zTreeSelect';
  import boxCards from '@/views/console/app/boxCards';
  import collapses from '@/views/console/app/collapses';

  export default {
    components: {errorTip, zTreeSelect, boxCards, collapses},
    data() {
      return {
        id: this.$route.params.id,
        departmentOptions: [],
        managementOptions: [],
        categoryOptions: [],
        app: {
          name: '',
          address: '',
          department: [],
          management: [],
          category: [],
          tag: [],
          icon : {
            uploads : [],
            images : [],
            fontIcon : { className : "fa fa-list-alt" },
            type : "fontIcon"
          },
          desc: '',
          publishPolicy: {policy: ['全公开'], parentPolicy: '', inherit: false},
          apikey: {key: '', parentKey: '', inherit: false},
          attributes: []
        },
        filterMethod(query, item) {
          return item.label.indexOf(query) > -1;
        }
      }
    },
    methods: {
      fetchdepartmentOptions() {
        getOptions('5a0d030ef09737308c9db813').then(response => {
          this.departmentOptions = response.data.options;
        });
      },
      fetchmanagementOptions() {
        getOptions('5a0d030ef09737308c9db813').then(response => {
          this.managementOptions = response.data.options;
        });
      },
      fetchcategoryOptions() {
        getOptions('5a044f481ccacd23d49b181a').then(response => {
          this.categoryOptions = response.data.options;
        });
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
            addItem(this.app).then(response => {
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
      this.fetchdepartmentOptions();
      this.fetchmanagementOptions();
      this.fetchcategoryOptions();
    }
  };
</script>
<style scoped>
</style>
