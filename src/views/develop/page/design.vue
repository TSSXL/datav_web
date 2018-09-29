<template>
  <div class="app-container">
    <el-dialog
      title="预览"
      :visible.sync="previewVisible"
      width="640">
      <preview :page="page"></preview>
    </el-dialog>
    <el-container>
      <el-header style="height: 32px; margin-top: 38px;">
        <el-row :gutter="20">
          <el-col :span="14" style="text-align: left">
            <h3 style="color:white;"> <li class="fa fa-puzzle-piece"/> 编辑页面 </h3>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="8" style="text-align: right">
            <el-button type="text" @click="onBack">
              <li class="fa fa-mail-reply"/>
              返回
            </el-button>
            <el-button type="text" @click="onPreview">
              <li class="fa fa-eye"/>
              预览
            </el-button>
            <el-button type="text" @click="onSubmit">
              <li class="fa fa-save"/>
              保存
            </el-button>
          </el-col>
        </el-row>

      </el-header>
      <design-adv :page="page" @on-result-change="onResultChange" ref="design"></design-adv>
    </el-container>
  </div>
</template>

<script>
  import designAdv from './components/designAdv'
  import preview from './components/preview'
  import { getItem, editItem } from '@/views/base/server/api'
  import { message } from '@/utils'

  export default {
    components: {
      designAdv, preview
    },
    data() {
      return {
        id: this.$route.params.id,
        page: {
          name: null,
          desc: null,
          layout: []
        },
        previewVisible: false
      }
    },
    methods: {
      onResultChange(val) {
        this.page = val
      },
      fetchData() {
        getItem('page', this.id).then(res => {
          this.page = res.data
        })
      },
      onSubmit() {
        editItem('page', this.id, this.page).then(res => {
          message(res)
        })
      },
      onPreview() {
        this.previewVisible = true
      },
      onBack() {
        this.$router.go(-1)
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #333333;
    font-size: 12px;
    color: #CCCCCC;
    height: 20px;
    line-height: 20px;
  }
  .el-main {
    /*background-color: #e7e6e7;*/
    background-color: #ffffff;
    color: #666666;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
