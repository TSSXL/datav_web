<template>
  <div class="app-container view">

    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="名称">
        {{attachment.filename}}
      </el-form-item>

      <el-form-item label="category">
        {{attachment.category}}
      </el-form-item>

      <el-form-item label="current url">
        {{attachment.url}}
      </el-form-item>

      <el-form-item label="extname">
        {{attachment.extname}}
      </el-form-item>

      <el-form-item label="desc">
        {{attachment.desc}}
      </el-form-item>

      <el-form-item label="添加新版本">
        <el-button @click="handleUpload()" type="text" size="mini">上传文件
        </el-button>
      </el-form-item>
      <el-form-item label="版本列表">
        <el-table :data="attachment.versions" fit highlight-current-row size="mini">

          <el-table-column key='id'
                           label="id"
                           align="center" prop="id" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row._id}}
            </template>
          </el-table-column>

          <el-table-column key='created'
                           label="created"
                           align="center" prop="created">
            <template slot-scope="scope">
              <a :href="path + scope.row.url" target="_blank">{{parseTime(scope.row.created)}}</a>
            </template>
          </el-table-column>

          <el-table-column key='desc'
                           label="描述"
                           align="center" prop="desc" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.desc}}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="258" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="fa fa-history" @click="handleReversion(scope.row)" size="mini" v-if="scope.row._id != attachment.currentVersion"> 设为当前版本</el-button>
              <el-button type="text" icon="fa fa-trash-o" @click="handleDelversion(scope.row)" size="mini" v-if="scope.row._id != attachment.currentVersion"> 删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {get, del, getApi, getPath} from "@/views/dev/attachment/api"
  import { parseTime, message } from '@/utils'

  export default {
    data() {
      return {
        id: this.$route.params.id,
        attachment: {},
      };
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route'(to, from) {
        this.fetchData()
      }
    },
    computed: {
      ...mapGetters([
        'currentPath', 'params'
      ]),
      api() {
        return getApi()
      },
      path() {
        return getPath()
      }
    },
    methods: {
      fetchData() {
        get('api/attachment/item/' + this.id).then(response => {
          this.attachment = response.data.res
        })
      },
      handleUpload() {
        this.$router.push({ path: '/dev/attachment/uploadVersion/' + this.id })
      },
      handleReversion(row) {
        get('api/attachment/reversion/' + this.id + '/' + row._id).then(res => {
          message(res)
          this.fetchData()
        })
      },
      handleDelversion(row) {
        this.$confirm('此操作将删除此版本, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.delete(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      delete(row) {
        del('api/attachment/delversion/' + this.id + '/' + row._id).then(res => {
          message(res)
          this.fetchData()
        })
      },
      parseTime(value) {
        return parseTime(value)
      }
    }
  }
</script>
