<template>
  <div class="app-container">
    <el-row>
      <el-col :span="15">
        <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="名称"
                    v-model="objQuery[0].name.$regex" size="small">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="描述"
                    v-model="objQuery[1].desc.$regex" size="small">
          </el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="handleFilter" size="small">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="9" style="text-align: right;">
        <el-button @click="handleCreate" type="primary" icon="plus" style="margin-right: 4px;" size="small">添加
        </el-button>
        <el-button @click="handleInit" type="primary" icon="plus" style="margin-right: 4px;"
                   v-if="!entity.isLocked || entity.isLocked == false" size="small">初始化
        </el-button>
        <el-button @click="handleBatchCreate" type="warning" icon="plus" style="margin-right: 4px;"
                   :disabled="multipleSelection.length===0" v-if="!entity.isLocked || entity.isLocked == false"
                   size="small">批量生成
        </el-button>
      </el-col>
    </el-row>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
              @selection-change="selectionChange"
              @sort-change="sortChange" highlight-current-row size="mini">
      <el-table-column align="center" label='选择' width="76" type="selection">
      </el-table-column>
      <el-table-column width="32">
        <template slot-scope="scope" prop="desc">
          <el-button type="text"
                     icon="fa fa-puzzle-piece"
                     class="info"
                     @click="handleCreateComponent(scope.row)"
                     v-if="scope.row.component && !scope.row.componentExist"
                     :disabled="scope.row.componentExist"
                     size="mini">
          </el-button>
          <el-button type="text"
                     icon="fa fa-puzzle-piece"
                     @click="handleDeleteComponent(scope.row)"
                     v-if="scope.row.component && scope.row.componentExist"
                     size="mini">
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="名称" sortable prop="name">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="显示" width="160" align="center" prop="desc">
        <template slot-scope="scope">
          <span>{{scope.row.desc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板" width="160" align="center" prop="template">
        <template slot-scope="scope">
          {{scope.row.template}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="276" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="fa fa-edit" @click="handleUpdate(scope.row)" size="mini"> 修改</el-button>
          <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(scope.row)" size="mini"> 删除</el-button>
          <el-button type="text" icon="fa fa-cog" @click="handleSetting(scope.row)"
                     :disabled="scope.row.template!=='list.ejs'&&scope.row.template!=='edit.ejs'&&scope.row.template!=='add.ejs'"
                     size="mini"> 设置
          </el-button>
          <el-button type="text" icon="fa fa-file-code-o" @click="handleGenerate(scope.row)"
                     v-if="!entity.isLocked || entity.isLocked == false" size="mini"> 生成
          </el-button>
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
  import {getList, removeItem, generateCode, initPages} from "@/api/page";
  import {exist as componentExist, addItem as createComponent, removeItem as removeComponent} from "@/views/sm/component/api"
  import {message} from '@/utils'

  export default {
    data() {
      return {
        list: null,
        entity: {
          isLocked: false
        },
        listLoading: true,
        total: null,
        multipleSelection: [],
        entityId: this.propId != undefined ? this.propId : this.$route.params.entityId,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          sort: '_id',
          order: -1
        },
        objQuery: [
          {name: {$regex: ''}},
          {desc: {$regex: ''}}
        ]
      };
    },
    props: {
      propId: {type: String}
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listQuery.entityId = this.propId != undefined ? this.propId : this.entityId
        this.listLoading = true
        getList(this.listQuery, this.objQuery).then(response => {
          this.entity = response.data.entity
          if (this.entity.isLocked == null)
            this.entity.isLocked = false
          this.list = response.data.results.map(x => {
            if (x.desc.indexOf('.vue') >= 0) {
              x['component'] = true
              x['componentExist'] = true
            }
            return x
          })
          this.getComponents()
          this.total = response.data.total
          this.listLoading = false
        })
      },
      getComponents() {
        for (let item of this.list) {
          if (item.component) {
            componentExist(this.entity.module, this.entity.name, item.name.replace('.vue', '')).then(res => {
              item.componentExist = res.data != null
              // console.log(item.name + ':' + item.componentExist)
            })
          }
        }
      },
      handleCreateComponent(row) {
        const page = row.name.replace('.vue', '')
        const component = {
          name: `${this.entity.module}_${this.entity.name}_${page}`,
          file: `${this.entity.module}/${this.entity.name}/${page}`,
          module: this.entity.module,
          entity: this.entity.name,
          page: page,
          type: 'page',
          desc: ''
        }
        createComponent(component).then(res => {
          console.log(res)
          message(res)
          if (res.success) {
            row.componentExist = true
          }
        })
      },
      handleDeleteComponent(row) {
        this.$confirm('此操作将删除组件, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.deleteComponent(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      deleteComponent(row) {
        componentExist(this.entity.module, this.entity.name, row.name.replace('.vue', '')).then(res => {
          if (res.data != null) {
            removeComponent(res.data._id).then(res => {
              message(res)
              if (res.success) {
                row.componentExist = false
              }
            })
          }
        })
      },
      handleFilter() {
        this.fetchData()
      },
      handleInit() {
        this.$confirm('此操作将初始化页面数据, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.initPages()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消初始化'
          })
        })
      },
      handleCreate() {
        this.$router.push({path: "/dev/page/add?entityId=" + this.entityId})
      },
      selectionChange(val) {
        this.multipleSelection = val;
      },
      handleBatchCreate() {
        this.$confirm('此操作将批量生成页面, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          for (let row of this.multipleSelection) {
            this.generateCode(row);
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消生成'
          });
        });
      },
      handleUpdate(row) {
        this.$router.push({path: "/dev/page/edit/" + row.id})
      },
      handleSetting(row) {
        if (row.template == "list.ejs")
          this.$router.push({path: "/dev/page/default/list/" + row.id})
        if (row.template == "add.ejs")
          this.$router.push({path: "/dev/page/default/edit/" + row.id})
        if (row.template == "edit.ejs")
          this.$router.push({path: "/dev/page/default/edit/" + row.id})
      },
      handleGenerate(row) {
        this.$confirm('此操作将生成页面, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.generateCode(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消生成'
          });
        });
      },
      generateCode(row) {
        generateCode(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '生成 ' + row.name + ' 页面成功!'
          });
        })
      },
      initPages() {
        initPages(this.entityId).then(response => {
          this.fetchData();
          this.$message({
            type: 'success',
            message: '初始化页面成功!'
          });
        })
      },
      handleDelete(row) {
        this.$confirm('此操作将删除记录, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.delete(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      delete(row) {
        removeItem(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //this.$router.push({ path: "/dev/entity" });
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
        });
      },
      handleFieldsSetting(entityid) {
        this.$router.push({path: "/dev/page/fieldList/" + entityid});
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.fetchData();
      },
      sortChange(obj) {
        //console.log(obj);
      },
      filterTag(value, row) {
        return row.model === value;
      }
    }
  };
</script>
<style scoped>
  .app-container {
    padding-top: 0px;
  }
</style>
