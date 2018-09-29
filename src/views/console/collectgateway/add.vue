
<template>
  <div class="app-container item">
    <h2>新建采集网关</h2>
    <el-form ref="form" label-width="120px" size="mini">
      
        <el-form-item label="名称">
                         
            <el-input 
              v-model="collectgateway.name" 
              type="text" :rows="2"
              :autosize="false"
              name="name" data-vv-as="名称" v-validate="'required'">
            </el-input>
            
          <error-tip :errs="errors" name="name"></error-tip>
        </el-form-item>        
      
        <el-form-item label="描述">
                         
            <el-input 
              v-model="collectgateway.desc" 
              type="textarea" :rows="2"
              :autosize="false"
              name="desc" data-vv-as="描述" v-validate="'required'">
            </el-input>
            
          <error-tip :errs="errors" name="desc"></error-tip>
        </el-form-item>        
      
        <el-form-item label="API地址">
                         
            <el-input 
              v-model="collectgateway.api" 
              type="textarea" :rows="2"
              :autosize="false"
              name="api" data-vv-as="API地址" v-validate="'required'">
            </el-input>
            
          <error-tip :errs="errors" name="api"></error-tip>
        </el-form-item>        
      
        <el-form-item label="令牌">
                         
            <el-input 
              v-model="collectgateway.token" 
              type="text" :rows="2"
              :autosize="false"
              name="token" data-vv-as="令牌" v-validate="'required'">
            </el-input>
            
          <error-tip :errs="errors" name="token"></error-tip>
        </el-form-item>        
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button  @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template> 
 
<script>
import { addItem } from "./api";
import errorTip from "@/components/Validate/errorTip";





export default {
  components: { errorTip },
  data() {
    return {
      id: this.$route.params.id,
      
      
      
      collectgateway: {
        
          name: '',
        
          desc: '',
        
          api: '',
        
          token: '',
        
      }
    };
  },
  methods: {
      
    
     
    
    
      
    
    onSubmit() {
      this.$validator.validateAll().then(result => {
      if (this.errors.any()) {
        return;
      }
      
        if (result) {         
          addItem(this.collectgateway).then(response => {
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
  ,created() {
    
    
    
  }  
};
</script>
<style scoped>
  
</style>