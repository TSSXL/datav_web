<template>
  <div class="app-container">
    <h2>修改实体</h2>
     <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="名称">
        <el-input v-model="entity.name" v-validate="'required'" data-vv-as="名称" name="name"></el-input>
        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="entity.desc" v-validate="'required'" data-vv-as="描述" name="desc"></el-input>
        <error-tip :errs="errors" name="desc"></error-tip>
      </el-form-item>
      <el-form-item label="所属模块">
        <el-select v-model="entity.module" placeholder="请选择所属的系统模块"
            @change=changeValue
            v-validate="'required'" data-vv-as="所属模块" name="module">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <error-tip :errs="errors" name="module"></error-tip>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getItem, editItem } from "@/api/entity";
import { getList as getModuleList } from "@/views/dev/module/api";
import errorTip from "@/components/Validate/errorTip"

export default {
  components: { errorTip },
  data() {
    return {
      entity: {
        id: this.$route.params.id,
        name: '',
        desc: '',
        module: '',
        moduleName: '',
        isLocked: false
      },
      options: []
    }
  },
  methods: {
    fetchData() {
      getItem(this.entity.id).then(response => {
        this.entity = response.data;
      });
    },
    fetchModuleList(){
        getModuleList({pageNo: 1, pageSize: 100, sort: "_id", order: -1 }, {name: { $regex: '' }}).then(response => {
            this.options = response.data.results.map(item=>{return {value:item.value, label:item.name}});
        });
    },
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (this.errors.any()) {
          return;
        }

        if (result) {
          editItem(this.entity.id, this.entity).then(response => {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.$router.go(-1)
              //this.$router.push({ path: "/dev/entity" });
          });
          return;
        }
      });
    },
    onCancel(){
      this.$router.go(-1)
      //this.$router.push({ path: "/dev/entity" });
    },
    changeValue(value) {
      let obj = {};
      obj = this.options.find(item => {
        return item.value === value;
      });
      this.entity.moduleName = obj.label;
    }
  },
  created() {
    this.fetchData();
    this.fetchModuleList();
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    max-width: 720px;
  }
</style>
