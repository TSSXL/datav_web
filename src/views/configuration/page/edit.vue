<template>
 <div class="app-container">
    <h2>修改页面</h2>
    <el-form ref="form" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="entity.name" v-validate="'required'" data-vv-as="名称" name="name"></el-input>
        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="entity.desc" v-validate="'required'" data-vv-as="名称" name="desc"></el-input>
        <error-tip :errs="errors" name="desc"></error-tip>
      </el-form-item>
      <el-form-item label="模板">
        <el-select v-model="entity.template" placeholder="请选择模板"
            v-validate="'required'" data-vv-as="模板" name="template">
          <el-option-group key="client" label="client">
            <el-option label="list" value="list.ejs"></el-option>
            <el-option label="add" value="add.ejs"></el-option>
            <el-option label="edit" value="edit.ejs"></el-option>
            <el-option label="view" value="view.ejs"></el-option>
            <el-option label="api" value="api.ejs"></el-option>
          </el-option-group>
          <el-option-group key="server" label="server">
            <el-option label="model" value="model.ejs"></el-option>
            <el-option label="controller" value="controller.ejs"></el-option>
            <el-option label="repository" value="repository.ejs"></el-option>
          </el-option-group>
        </el-select>
        <error-tip :errs="errors" name="template"></error-tip>
      </el-form-item>      
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button  @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getItem, editItem } from "@/api/page";
import errorTip from "@/components/Validate/errorTip"

export default {
  components: { errorTip },
  data() {
    return {
      entity: {
        id: this.$route.params.id,
        entityId: this.$route.query.entityId,
        name: '',
        desc: '',
        template: '',
        createDate: '',
        createUser: '',
        modifyDate: '',
        modifyUser: '',
      }
    }
  },
  methods: {
    fetchData() {
      getItem(this.entity.id).then(response => {
        this.entity = response.data;
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
              //this.$router.push({ path: "/dev/page/list?entityId=" + this.entity.entityId });
          });
          return;
        }
      });      
    },
    onCancel(){
      this.$router.go(-1)
      //this.$router.push({ path: "/dev/page/list?entityId=" + this.entity.entityId });
    }
  },
  created() {
    this.fetchData();
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>  
  .app-container {
    max-width: 720px;
  }
</style>