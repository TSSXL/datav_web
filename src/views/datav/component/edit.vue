<template>
  <div class="app-container item">
    <h3>编辑可视化组件</h3>
    <!--本代码由系统自动生成，请在修改后予以去除-->
    <el-form ref="form" label-width="120px" size="mini">

      <el-form-item label="文本">

        <el-input
          v-model="component.label"
          type="text" :rows="2"
          :autosize="false"
          name="label" data-vv-as="文本" v-validate="'required'">
        </el-input>

        <error-tip :errs="errors" name="label"></error-tip>
      </el-form-item>

      <el-form-item label="名称">

        <el-input
          v-model="component.name"
          type="text" :rows="2"
          :autosize="false"
          name="name" data-vv-as="名称" v-validate="'required'">
        </el-input>

        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>

      <el-form-item label="描述">

        <el-input
          v-model="component.desc"
          type="textarea" :rows="1"
          :autosize="true"
          name="desc" data-vv-as="描述" v-validate="''">
        </el-input>

        <error-tip :errs="errors" name="desc"></error-tip>
      </el-form-item>

      <el-form-item label="类型">

        <el-cascader
          :options="typeOptions"
          v-model="component.type"
        >
        </el-cascader>

        <error-tip :errs="errors" name="type"></error-tip>
      </el-form-item>

      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="api + 'api/attachment'"
          :drag="false"
          :show-file-list="true"
          list-type="picture-card"
          :multiple="false"
          :limit="1"
          :auto-upload="true"
          :file-list="iconUrl"
          :on-success="handleUploadiconSuccess"
          :on-remove="handleUploadiconRemove">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传.jpg .gif .png图片文件</div>
        </el-upload>

        <error-tip :errs="errors" name="icon"></error-tip>
      </el-form-item>

      <el-form-item label="版本">

        <el-input
          v-model="component.version"
          type="text" :rows="2"
          :autosize="false"
          name="version" data-vv-as="版本" v-validate="''">
        </el-input>

        <error-tip :errs="errors" name="version"></error-tip>
      </el-form-item>

      <el-form-item label="选项">
        <AceEditor
          :fontSize="14"
          :showPrintMargin="true"
          :showGutter="true"
          :highlightActiveLine="true"
          mode="javascript"
          theme="monokai"
          name="exp"
          height="550px"
          width="100%"
          :editorProps="{$blockScrolling: true}"
        />
      </el-form-item>

      <el-form-item label="active">

        <el-switch
          v-model="component.active"
          active-text=""
          inactive-text=""
          name="active" data-vv-as="active" v-validate="''">
        </el-switch>

        <error-tip :errs="errors" name="active"></error-tip>
      </el-form-item>

      <el-form-item label="selected">

        <el-switch
          v-model="component.selected"
          active-text=""
          inactive-text=""
          name="selected" data-vv-as="selected" v-validate="''">
        </el-switch>

        <error-tip :errs="errors" name="selected"></error-tip>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">编辑</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getItem, editItem} from "./api";
  import typeOptions from "./typeOptions";
  import errorTip from "@/components/Validate/errorTip";
  import {getApi, getPath} from '@/views/dev/attachment/api'
  import { Ace as AceEditor} from 'vue2-brace-editor';
  import ace from 'brace';
  import 'brace/mode/javascript';
  import 'brace/theme/monokai';

  export default {
    components: {errorTip,AceEditor},
    data() {
      return {
        id: this.$route.params.id,
        typeOptions:typeOptions.data,
        editor:null,
        component:
          {
            label: '',
            name: '',
            desc: '',
            tag: [],
            type: [],
            icon: [],
            version: '',
            option: {},
            active: false,
            selected: false,
          },
        iconUrl:[],
        filterMethod(query, item) {
          return item.label.indexOf(query) > -1;
        }
      };
    },
    computed: {
      api() {
        return getApi()
      },
      path() {
        return getPath()
      }
    },
    methods: {
      createFilter(queryString) {
        return (options) => {
          return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }
      },
      handleUploadiconSuccess(res, file, fileList) {
        this.seticonFileList(fileList)
      },
      handleUploadiconRemove(res, file) {
        this.seticonFileList(file)
      },
      seticonFileList(fileList) {
        this.component.icon.splice(0, this.component.icon.length)
        for (let file of fileList) {
          if (file.response)
            this.component.icon.unshift({ name: file.name, url: file.response.data.res.url })
          else
            this.component.icon.unshift({name: file.name, url: file.url})
        }
      },
      fetchData() {
        getItem(this.id).then(response => {
          this.component = response.data;
          if(this.component.option != null){
            this.editor = ace.edit("exp");
            this.editor.setValue(JSON.stringify(this.component.option, null, 2));
          }

          this.iconUrl = JSON.parse(JSON.stringify(this.component.icon));
          this.iconUrl[0].url = this.path + this.iconUrl[0].url;
        })
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }
          if (result) {
            this.editor = ace.edit("exp");
            if(this.editor.getValue() != ""){
              this.component.option = JSON.parse(this.editor.getValue());
            }else{
              this.component.option = {};
            }
            editItem(this.id, this.component).then(response => {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.$router.go(-1)
            })
            return
          }
        })
      },
      onCancel() {
        this.$router.go(-1)
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.fetchData()
      })
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
