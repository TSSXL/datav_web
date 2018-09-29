
<template>
  <div class="app-container">
    <h2>编辑图片库</h2>
    <el-form ref="form" label-width="120px">
      <el-upload
          action="http://localhost:3000/api/imglib/files"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>     
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">编辑</el-button>
        <el-button  @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template> 
 
<script>
import { getItem, editItem } from "@/views/dev/imglib/api";
import errorTip from "@/components/Validate/errorTip";

export default {
  components: { errorTip },
  data() {
    return {
      id: this.$route.params.id,
       dialogImageUrl: '',
      dialogVisible: false,
      imglib: {
        
          filename: '',
        
          originalname: '',
        
          mimetype: '',
        
          buffer: {},
        
          size: '',
        
      }
    };
  },
  methods: {
    
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    fetchData() {
      getItem(this.id).then(response => {
        this.imglib = response.data;
      });
    },
    
    onSubmit() {
      this.$validator.validateAll().then(result => {
      if (this.errors.any()) {
        return;
      }
      
      
        if (result) {         
          editItem(this.id, this.imglib).then(response => {
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
<style rel="stylesheet/scss" lang="scss" scoped>

</style>