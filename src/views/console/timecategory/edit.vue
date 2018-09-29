
<template>
  <div class="app-container item">
    <h2>编辑时间策略</h2>
    <el-form ref="form" label-width="120px" size="mini">
      
        <el-form-item label="名称">
                         
            <el-input 
              v-model="timecategory.name" 
              type="text" :rows="2"
              :autosize="false"
              name="name" data-vv-as="名称" v-validate="'required'">
            </el-input>
            
          <error-tip :errs="errors" name="name"></error-tip>
        </el-form-item>        
      
        <el-form-item label="备注">
                         
            <el-input 
              v-model="timecategory.desc" 
              type="textarea" :rows="2"
              :autosize="false"
              name="desc" data-vv-as="备注" v-validate="'required'">
            </el-input>
            
          <error-tip :errs="errors" name="desc"></error-tip>
        </el-form-item>        
      
        <el-form-item label="内容">
                         
            <el-input 
              v-model="timecategory.content" 
              type="textarea" :rows="2"
              :autosize="false"
              name="content" data-vv-as="内容" v-validate="'required'">
            </el-input>
            
          <error-tip :errs="errors" name="content"></error-tip>
        </el-form-item>        
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">编辑</el-button>
        <el-button  @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template> 
 
<script>
import { getItem, editItem } from "./api";
import errorTip from "@/components/Validate/errorTip";





export default {
  components: { errorTip },
  data() {
    return {
      id: this.$route.params.id,
      
      
      
      timecategory: {
        
          name: '',
        
          desc: '',
        
          content: '',
        
      }
    };
  },
  methods: {
      
    
     
    
    
      
    
    fetchData() {
      getItem(this.id).then(response => {
        this.timecategory = response.data;
      });
    },
    
    onSubmit() {
      this.$validator.validateAll().then(result => {
      if (this.errors.any()) {
        return;
      }
      
      
        if (result) {         
          editItem(this.id, this.timecategory).then(response => {
              this.$notify({
                title: '成功',
                message: '修改成功',
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
  ,created() {
    
    
    
    this.fetchData();
    
  }  
};
</script>
<style scoped>
  
</style>