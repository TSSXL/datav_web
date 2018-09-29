
<template>
  <div class="app-container item">
    <h2>新建模块</h2>
    <el-form ref="form" label-width="120px" size="mini">
      
        <el-form-item label="名称">
                         
            <el-input 
              v-model="module.name" 
              type="text" :rows="2"
              :autosize="false">
            </el-input>
            
          <error-tip :errs="errors" name="name"></error-tip>
        </el-form-item>        
      
        <el-form-item label="描述">
                         
            <el-input 
              v-model="module.desc" 
              type="textarea" :rows="1"
              :autosize="true">
            </el-input>
            
          <error-tip :errs="errors" name="desc"></error-tip>
        </el-form-item>        
      
        <el-form-item label="值">
                         
            <el-input 
              v-model="module.value" 
              type="text" :rows="1"
              :autosize="true">
            </el-input>
            
          <error-tip :errs="errors" name="value"></error-tip>
        </el-form-item>        
      
        <el-form-item label="标签">
            
              <el-tag
                :key="tag"
                type="small"
                size=""
                v-for="tag in module.tag"
                :closable="true"
                :disable-transitions="true"
                @close="handleTagtagClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputTagtagVisible"
                v-model="inputTagtagValue"
                ref="saveTagtagInput"
                size=""
                @keyup.enter.native="handleTagtagInputConfirm"
                @blur="handleTagtagInputConfirm"
              >
              </el-input>
              <el-button v-else size="" @click="showTagtagInput">+ 新标签</el-button>
            
          <error-tip :errs="errors" name="tag"></error-tip>
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
      
      
      
      inputTagtagVisible: false,
      inputTagtagValue: '',
      
      module: {
        
          name: '',
        
          desc: '',
        
          value: '',
        
          tag: [],
        
      }
    };
  },
  methods: {
      
    
     
    
    
    
      handleTagtagClose(tag) {
        this.module.tag.splice(this.module.tag.indexOf(tag), 1);
      },
      showTagtagInput() {
        this.inputTagtagVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagtagInput.$refs.input.focus();
        });
      },
      handleTagtagInputConfirm() {
        let inputValue = this.inputTagtagValue;
        if (inputValue) {
          this.module.tag.push(inputValue);
        }
        this.inputTagtagVisible = false;
        this.inputTagtagValue = '';
      },
      
    
    onSubmit() {
      this.$validator.validateAll().then(result => {
      if (this.errors.any()) {
        return;
      }
      
        if (result) {         
          addItem(this.module).then(response => {
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
  
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  
</style>