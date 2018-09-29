<template>
  <div class="app-container item">
    <h3>编辑配置模版</h3>
    <!--本代码由系统自动生成，请在修改后予以去除-->
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="配置文件">

        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/api/imglib/files"
          :drag="false"
          :show-file-list="false"
          list-type="text"
          :multiple="false"
          :limit="1"
          :auto-upload="true"
          :fileList="configtemplate.configFile"
          :on-success="handleUploadconfigFileSuccess"
          :on-remove="handleUploadconfigFileRemove">
          <i class="el-icon-plus"></i>

          <div slot="tip" class="el-upload__tip"></div>

        </el-upload>

        <error-tip :errs="errors" name="configFile"></error-tip>
      </el-form-item>
      <el-form-item label="名称">

        <el-input
          v-model="configtemplate.name"
          type="text" :rows="2"
          :autosize="false"
          name="name" data-vv-as="名称" v-validate="'required'">
        </el-input>

        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>


      <el-form-item label="">
        <el-button @click="handleClick(1)">配置项</el-button>
        <el-button @click="handleClick(2)">配置文件</el-button>
      </el-form-item>
      <el-form-item label="">application.yml
        <el-input v-model="configtemplate.fileName"
                  type="hidden" name="fileName"></el-input>
      </el-form-item>
      <el-form-item v-if="formIndex==1">

        <page-list :propId='id'></page-list>

      </el-form-item>
      <el-form-item v-else>
        <el-input
          v-model="configtemplate.fileContent"
          type="textarea" :rows="5"
          :autosize="true"
          name="fileContent" data-vv-as="配置文件" v-validate="''">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {get, edit} from "@/views/configuration/configtemplate/api";
  import errorTip from "@/components/Validate/errorTip";
  import pageList from '@/views/configuration/page/list'

  export default {
    components: {errorTip,pageList},
    data() {
      return {
        id: this.$route.params.id,
        formIndex: 1,
        configtemplate: {
          name: '',
          configFile: [],
          fileName: '',
          fileContent: ""
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

      handleClick(index){
        this.formIndex = index;
      },
      createFilter(queryString) {
        return (options) => {
          return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      handleUploadconfigFileSuccess(res, file, fileList) {
        this.setconfigFileFileList(fileList)
      },
      handleUploadconfigFileRemove(res, file) {
        this.setconfigFileFileList(fileList)
      },
      setconfigFileFileList(fileList) {
        this.configtemplate.configFile = [];
        for (let file of fileList) {
          if (file.response) {
            this
            .configtemplate.configFile.push({name: file.name, url: file.response.data.results})
          } else
            this
            .configtemplate.configFile.push({name: file.name, url: file.url})
        }
      },

      fetchData() {
        get(this.id).then(response => {
          this.configtemplate = response.data;
        });
      },

      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return;
          }

          if (result) {
            editItem(this.id, this.configtemplate).then(response => {
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
    , created() {

      this.fetchData();

    }
  };
</script>
<style scoped>

</style>
