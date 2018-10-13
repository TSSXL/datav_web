<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <div class="filter-container">

            <span>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;"
                          class="filter-item" placeholder="图片名称" v-model="objQuery[0].filename.$regex" size="mini">
                </el-input>
            </span>
          <el-button class="filter-item" type="primary" icon="search" @click="handleFilter" size="mini">搜索</el-button>

        </div>
      </el-col>
      <el-col :span="12" style="text-align: right;" class="filter-container">
        <el-button @click="handleUpload" type="primary" icon="plus" style="margin-right: 10px;" size="mini">上传文件
        </el-button>

        <el-button @click="handleUrl" type="primary" icon="plus" style="margin-right: 10px;" size="mini">上传远程图片
        </el-button>

        <el-button @click="handleUploads" type="primary" icon="plus" style="margin-right: 10px;" size="mini">批量上传
        </el-button>

      </el-col>
    </el-row>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
              @sort-change="sortChange" fit highlight-current-row size="mini">

      <el-table-column align="center" type="index" label="序号" width="84">
      </el-table-column>

      <el-table-column key='filename'
                       label="名称" sortable="custom"
                       width="120" align="center" prop="filename">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDownload(scope.row)" size="mini">
            <el-button type="text" @click="handleView(scope.row)" size="mini">
              {{scope.row.filename}}
            </el-button>
          </el-button>
        </template>
      </el-table-column>

      <el-table-column key='desc'
                       label="描述"
                       align="center" prop="desc" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.desc}}
        </template>
      </el-table-column>

      <el-table-column key='category'
                       label="目录"
                       align="center" prop="category" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.category}}
        </template>
      </el-table-column>

      <el-table-column key='created'
                       label="created"
                       width="160" align="center" prop="created">
        <template slot-scope="scope">
          {{scope.row.created}}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="196" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="fa fa-file-text-o" @click="handleView(scope.row)" size="mini">
            {{scope.row.versions ? scope.row.versions.length : 1}}
          </el-button>
          <a :href="path + scope.row.url" target="_blank"> <li class="fa fa-external-link"></li> 打开</a>
          <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(scope.row)" size="mini"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {get, post, del, getApi, getPath} from "@/views/dev/attachment/api"
  import {parseTime, message} from '@/utils'

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        total: null,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          sort: "_id",
          order: -1
        },
        objQuery: [
          {filename: {$regex: ''}}
        ]
      };
    },
    created() {
      if (this.$route.query != null && this.$route.query.pageNo != null) {
        this.listQuery.pageNo = parseInt(this.$route.query.pageNo);
        this.listQuery.pageSize = parseInt(this.$route.query.pageSize);
        this.listQuery.order = parseInt(this.$route.query.order);
      }
      this.fetchData();
    },
    watch: {
      '$route'(to, from) {
        this.fetchData();
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
        this.listLoading = true;
        var query = `api/attachment?pageNo=${this.listQuery.pageNo}&pageSize=${this.listQuery.pageSize}&sort=${this.listQuery.sort}&order=${this.listQuery.order}&search=${JSON.stringify(this.objQuery)}&isPaging=true`
        get(query).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.fetchData()
      },
      handleDownload() {

      },
      handleUpload() {
        this.$router.push({path: "/datav/attachment/uploadNew"})
      },
      handleUrl() {
        this.$router.push({path: "/datav/attachment/url"})
      },
      handleUploads() {
        this.$router.push({path: "/datav/attachment/uploads"})
      },
      handleUpdate(row) {
        this.$router.push({path: "/datav/attachment/edit/" + row._id})
      },
      handleView(row) {
        this.$router.push({path: "/datav/attachment/view/" + row._id})
      },
      handleDelete(row) {
        this.$confirm('此操作将删除记录, 是否继续?', '提示', {
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
        var url = 'api/attachment/' + row._id
        del(url).then(res => {
          message(res)
          this.fetchData()
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val
        this.fetchData()
      },
      sortChange(obj) {
        this.listQuery.sort = obj.prop
        this.listQuery.order = obj.order == "ascending" ? 1 : -1
        this.fetchData()
      },
      parseTime(value) {
        return parseTime(value)
      }
    }
  }
</script>
