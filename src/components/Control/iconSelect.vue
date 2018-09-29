<template>

  <el-container id="main" style="height: 100px">
    <el-button v-if="value && value.type =='fontIcon'" type="text" @click="selectIconDialog=true"
               :icon="value.fontIcon.className" :style="'color: #999999; font-size: ' + icoSize"></el-button>
    <el-button v-if="value && value.type =='image' && value.images && value.images.length > 0"
               @click="selectIconDialog=true">
      <img :src="path + value.images[0].url" :width="64"/>
    </el-button>
    <el-button v-if="value && value.type =='upload' && value.uploads && value.uploads.length > 0"
               @click="selectIconDialog=true">
      <img :src="path + value.uploads[0].url" :width="64"/>
    </el-button>
    <el-button v-if="value.type == '' || (value.type == 'fontIcon' && !value.fontIcon.className)
                      || (value.type == 'image' && value.images.length == 0)
                      || (value.type == 'upload' && value.uploads.length == 0)" type="text"
               @click="selectIconDialog=true"> 选择
    </el-button>

    <el-dialog title="选择图标" :visible.sync="selectIconDialog">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="选择图标" name="fa">
          <fa v-model="value" @close="selectIconDialog=false"></fa>
        </el-tab-pane>
        <el-tab-pane label="图片库" name="img">
          <img-lib-select v-model="value" @close="selectIconDialog=false"></img-lib-select>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            :action="api + 'api/attachment'"
            :drag="false"
            :show-file-list="true"
            list-type="picture-card"
            :multiple="false"
            :limit="1"
            :auto-upload="true"
            :on-success="handleUploadiconSuccess"
            :on-remove="handleUploadiconRemove">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">只能上传.jpg .gif .png图片文件</div>
          </el-upload>

        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
              <el-button @click="selectIconDialog = false">取 消</el-button>
              <el-button type="primary" @click="selectIconDialog = false">确 定</el-button>
            </span>
    </el-dialog>
  </el-container>
</template>

<script>
  import imgLibSelect from "@/views/dev/attachment/imgSelect"
  import imgSelect from "@/views/dev/imglib/select"
  import errorTip from "@/components/Validate/errorTip";
  import fa from "@/components/Font-awesome/fa";
  import {getApi, getPath} from '@/views/dev/attachment/api'

  export default {
    components: {errorTip, imgSelect, fa, imgLibSelect},

    props: {
      value: {type: Object},
      icoSize: {type: String, default: 'medium'}
    },
    data: function () {
      return {
        selectIconDialog: false,
        activeName: 'fa'
      }
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
      selectIcon(event) {
        this.value.fontIcon.className = event.target.className;
        this.selectIconDialog = false;
      },
      handleUploadiconSuccess(file, fileList) {
        console.log('handleUploadiconSuccess')
        console.log(file)
        console.log(fileList)
        this.seticonFileList(fileList)
      },
      handleUploadiconRemove(file) {
        this.value.uploads = []
      },
      handlePreview(file) {
        console.log('handlePreview')
        //console.log(file)
      },
      seticonFileList(file) {
        this.value.uploads.splice(0, this.value.uploads.length)
        this.value.uploads.unshift({ name: file.name, url: file.response.data.res.url })
        this.value.type = 'upload'
        this.selectIconDialog = false
      }
    },



  }
</script>
<style scoped>

</style>
