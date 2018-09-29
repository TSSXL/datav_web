<template>
    <div>
        <el-form-item label="上传地址">
          <el-input v-model="data.attributes.action" name="action">
          </el-input> 
        </el-form-item>

        <el-form-item label="是否在选取文件后立即进行上传">
          <el-switch v-model="data.attributes.auto_upload" active-text="" inactive-text="">
          </el-switch>
        </el-form-item>

        <el-form-item label="是否启用拖拽上传">
          <el-switch v-model="data.attributes.drag" active-text="" inactive-text="">
          </el-switch>
        </el-form-item>

        <el-form-item label="是否显示已上传文件列表">
          <el-switch v-model="data.attributes.show_file_list" active-text="" inactive-text="">
          </el-switch>
        </el-form-item>

        <el-form-item label="接受上传的文件类型">
          <el-input v-model="data.attributes.accept"></el-input>
        </el-form-item>

        <el-form-item label="文件列表的类型">
          <el-radio-group v-model="data.attributes.list_type">
            <el-radio-button label="text"></el-radio-button>
            <el-radio-button label="picture"></el-radio-button>
            <el-radio-button label="picture-card"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否支持多选文件">
          <el-switch v-model="data.attributes.multiple" active-text="" inactive-text="">
          </el-switch>
        </el-form-item>
        <el-form-item label="最大允许上传个数">
          <el-input-number v-model="data.attributes.limit" :min="1" :max="10" :step="1">            
          </el-input-number>
        </el-form-item>

        <el-form-item label="提示">
          <el-input v-model="data.attributes.tip"></el-input>
        </el-form-item>        

        <el-form-item label="值">
          <el-upload
            class="avatar-uploader"
            :action="data.attributes.action"
            :drag="data.attributes.drag"
            :show-file-list="data.attributes.show_file_list"
            :list-type = "data.attributes.list_type"
            :multiple = "data.attributes.multiple"
            :limit = "data.attributes.limit"
            :auto-upload="data.attributes.auto_upload">
            <i class="el-icon-plus"></i>
            <div slot="tip" v-if="data.attributes.tip != ''" class="el-upload__tip">{{data.attributes.tip}}</div>
          </el-upload>
        </el-form-item>
    </div>
</template>
<script>
import validateBus from "@/views/bus/validate";
import errorTip from "@/components/Validate/errorTip";

export default {
  name: "el-upload-setting",
  components: { errorTip },
  props: {
    data: { type: Object }
  },
  data() {
    return {
    };
  },
  methods:{
    
  },
  created() { 
    validateBus.$on("validate", target => {
      this.$validator.validateAll().then(result => {
        if (result) {          
          return;
        }
        validateBus.$emit("errors-changed", this.errors.items);
      });
    });
  }
};
</script>