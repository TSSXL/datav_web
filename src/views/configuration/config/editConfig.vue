<template>
  <div class="page-component page-container">
    <el-scrollbar class='page-component__nav' tag="div">
      <el-button type="text" @click="expandAll(true)">展开</el-button>
      <el-button type="text" @click="expandAll(false)">折叠</el-button>
      <ul id="configTree" class="ztree"></ul>
      <div>
        <p><span>应用名称</span><span style="margin-left: 5px">{{config.name}}</span></p>
        <p><span>管理员</span><span style="margin-left: 5px">{{config.admin}}</span></p>
      </div>
    </el-scrollbar>
    <section class="page-component__content">
      <el-alert
        v-if="config == null && environmentConfig == null"
        title="提示"
        type="info"
        description="请选择配置"
        show-icon>
      </el-alert>
      <section v-else-if="environmentConfig != null">
        <div class="app-container list">
          <el-row>
            <el-col :span="18">
              <div>
                <span>{{environmentConfig.environment.name}}配置</span>
              </div>
            </el-col>
            <el-col :span="6" style="text-align: right;">
              <el-button type="primary" icon="plus" style="margin-right: 10px;"
                         @click="addConfigItem" size="mini">新增
              </el-button>
              <el-button type="primary" icon="plus" style="margin-right: 10px;" size="mini"
                         @click="publish(environmentConfig.id)">发布
              </el-button>
              <el-button type="primary" icon="plus" style="margin-right: 10px;" size="mini"
                         @click="rollback(environmentConfig.id)">回退
              </el-button>
            </el-col>
          </el-row>
          <el-row style="margin: 5px;">
            <el-col :span="18">
              <div>
                <el-button class="filter-item" @click="changeEditType(false, 1)" size="mini">
                  配置项
                </el-button>
                <el-button class="filter-item" @click="changeEditType(false, 2)" size="mini">
                  配置文件
                </el-button>
                <el-button class="filter-item" @click="changeEditType(false, 3)" size="mini">
                  更改历史
                </el-button>
              </div>
            </el-col>
            <el-col :span="6" style="text-align: right;"
                    v-show="environmentConfigEditType == 1">
              <el-input style="width: 100px;" class="filter-item" placeholder="配置项名称"
                        v-model="listSettings['environmentConfigItem'].objQuery[0].name.$regex" size="mini">
              </el-input>
              <el-button class="filter-item" type="primary" icon="search"
                         @click="handleFilter('environmentConfigItem')"  size="mini">搜索
              </el-button>
            </el-col>
            <el-col :span="6" style="text-align: right;"
                    v-show="environmentConfigEditType == 3">
              <el-input style="width: 100px;" class="filter-item" placeholder="配置项名称"
                        v-model="listSettings['environmentConfigItemHistory'].objQuery[0].name.$regex" size="mini">
              </el-input>
              <el-button class="filter-item" type="primary" icon="search"
                         @click="handleFilter('environmentConfigItemHistory')"  size="mini">搜索
              </el-button>
            </el-col>
          </el-row>
          <div v-show="environmentConfigEditType == 1">
          <el-table :data="listSettings['environmentConfigItem'].list"
                    v-loading.body="listSettings['environmentConfigItem'].isListLoading"
                    element-loading-text="拼命加载中" fit highlight-current-row size="mini">
            <el-table-column align="center" type="index" label="序号" width="84">
            </el-table-column>
            <el-table-column show-overflow-tooltip label="配置项名称" width="" align="center"
                             prop="name">
            </el-table-column>
            <el-table-column show-overflow-tooltip label="配置项值" width="120" align="center"
                             prop="value">
            </el-table-column>
            <el-table-column show-overflow-tooltip label="备注" width="120" align="center"
                             prop="memo">
            </el-table-column>
            <el-table-column show-overflow-tooltip label="修改人" width="120" align="center"
                             prop="modifyUser">
            </el-table-column>
            <el-table-column show-overflow-tooltip label="修改时间" width="120" align="center"
                             prop="modifyDate">
            </el-table-column>
            <el-table-column label="操作" width="128" align="center">
              <template slot-scope="scope">
                <el-button type="text" icon="fa fa-edit" size="mini"
                           @click="editConfigItem(scope.row)">修改
                </el-button>
                <el-button type="text" icon="fa fa-trash-o" size="mini"
                           @click="deleteConfigItem(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-show="!listSettings['environmentConfigItem'].isListLoading"
               class="pagination-container">
            <el-pagination
              @size-change="handleSizeChange('environmentConfigItem', arguments[0])"
              @current-change="handleCurrentChange('environmentConfigItem', arguments[0])"
              :current-page="listSettings['environmentConfigItem'].listQuery.pageNo"
              :page-sizes="[10,20,30,50]"
              :page-size="listSettings['environmentConfigItem'].listQuery.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="listSettings['environmentConfigItem'].total">
            </el-pagination>
          </div>
          </div>
          <div v-show="environmentConfigEditType == 2">
            <el-form ref="form" label-width="120px" size="mini">
              <el-form-item label="配置文件">
                <el-input
                  v-model="environmentConfig.fileContent"
                  type="textarea" :rows="2"
                  :autosize="false"
                  name="fileContent" data-vv-as="配置文件" v-validate="'required'">
                </el-input>
                <error-tip :errs="errors" name="fileContent"></error-tip>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="create">确认</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="environmentConfigEditType == 3">
            <el-table :data="listSettings['environmentConfigItemHistory'].list"
                      v-loading.body="listSettings['environmentConfigItemHistory'].isListLoading"
                      element-loading-text="拼命加载中" fit highlight-current-row size="mini">
              <el-table-column align="center" type="index" label="序号" width="84">
              </el-table-column>
              <el-table-column show-overflow-tooltip label="配置项名称" width="" align="center"
                               prop="name">
              </el-table-column>
              <el-table-column show-overflow-tooltip label="修改前" width="120" align="center"
                               prop="oldValue">
              </el-table-column>
              <el-table-column show-overflow-tooltip label="修改后" width="120" align="center"
                               prop="newValue">
              </el-table-column>
              <el-table-column show-overflow-tooltip label="备注" width="120" align="center"
                               prop="memo">
              </el-table-column>
              <el-table-column show-overflow-tooltip label="修改人" width="120" align="center"
                               prop="modifyUser">
              </el-table-column>
              <el-table-column show-overflow-tooltip label="修改时间" width="120" align="center"
                               prop="modifyDate">
              </el-table-column>
            </el-table>
            <div v-show="!listSettings['environmentConfigItemHistory'].isListLoading"
                 class="pagination-container">
              <el-pagination
                @size-change="handleSizeChange('environmentConfigItemHistory', arguments[0])"
                @current-change="handleCurrentChange('environmentConfigItemHistory', arguments[0])"
                :current-page="listSettings['environmentConfigItemHistory'].listQuery.pageNo"
                :page-sizes="[10,20,30,50]"
                :page-size="listSettings['environmentConfigItemHistory'].listQuery.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="listSettings['environmentConfigItemHistory'].total">
              </el-pagination>
            </div>
          </div>
        </div>
      </section>
      <section v-else>
        <div class="app-container list">
          <el-row>
            <el-col :span="18">
              <div>
                <span>{{config.name}}配置</span>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin: 5px;">
            <el-col :span="18">
              <div>
                <el-button class="filter-item" @click="changeEditType(true, 1)" size="mini">配置项
                </el-button>
                <el-button class="filter-item" @click="changeEditType(true, 2)" size="mini">配置文件
                </el-button>
              </div>
            </el-col>
            <el-col :span="6" style="text-align: right;" v-show="configEditType == 1">
              <el-input style="width: 100px;" class="filter-item" placeholder="配置项名称"
                        v-model="listSettings['configItem'].objQuery[0].name.$regex" size="mini">
              </el-input>
              <el-button class="filter-item" type="primary" icon="search"
                         @click="handleFilter('configItem')" size="mini">搜索
              </el-button>
            </el-col>
          </el-row>
          <div v-show="configEditType == 1">
            <el-table :data="listSettings['configItem'].list"
                      v-loading.body="listSettings['configItem'].isListLoading"
                      element-loading-text="拼命加载中" fit highlight-current-row size="mini">
              <el-table-column align="center" type="index" label="序号" width="84">
              </el-table-column>
              <el-table-column show-overflow-tooltip label="配置项名称" width=""
                               align="center" prop="name">
              </el-table-column>
              <el-table-column show-overflow-tooltip label="配置项值" width="120" align="center"
                               prop="value">
              </el-table-column>
              <el-table-column show-overflow-tooltip label="备注" width="120" align="center"
                               prop="memo">
              </el-table-column>
              <el-table-column show-overflow-tooltip label="修改人" width="120" align="center"
                               prop="modifyUser">
              </el-table-column>
              <el-table-column show-overflow-tooltip label="修改时间" width="120" align="center"
                               prop="modifyDate">
              </el-table-column>
            </el-table>
            <div v-show="!listSettings['configItem'].isListLoading" class="pagination-container">
              <el-pagination @size-change="handleSizeChange('configItem', arguments[0])"
                             @current-change="handleCurrentChange('configItem', arguments[0])"
                             :current-page="listSettings['configItem'].listQuery.pageNo"
                             :page-sizes="[10,20,30,50]"
                             :page-size="listSettings['configItem'].listQuery.pageSize"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="listSettings['configItem'].total">
              </el-pagination>
            </div>
          </div>
          <div v-show="configEditType == 2">
            <el-form ref="form" label-width="120px" size="mini">
              <el-form-item label="配置文件">
                <el-input
                  v-model="config.fileContent"
                  type="textarea" :rows="2"
                  :autosize="false"
                  name="fileContent" :disabled="true">
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </section>
      <ul id="log" class="log" style="display:none;"></ul>
    </section>
  </div>
</template>
<script>
  import validateBus from '@/views/bus/validate'
  import errorTip from '@/components/Validate/errorTip'
  import {
    deleteEnvironmentConfigItem,
    getConfig,
    getEnvironmentConfig,
    getEnvironmentConfigs,
    publishEnvironmentConfig,
    rollbackEnvironmentConfig,
    updateEnvironmentConfig,
    deleteEnvironmentConfig
  } from '@/views/configuration/config/api'

  export default {
    components: { errorTip },
    data: function() {
      return {
        listSettings: {
          configItem: {
            list: null,
            isListLoading: true,
            total: null,
            listQuery: {
              pageNo: 1,
              pageSize: 10
            },
            objQuery: [
              { name: { $regex: '' }}
            ]
          },
          environmentConfigItem: {
            list: null,
            isListLoading: true,
            total: null,
            listQuery: {
              pageNo: 1,
              pageSize: 10
            },
            objQuery: [
              { name: { $regex: '' }}
            ]
          },
          environmentConfigItemHistory: {
            list: null,
            isListLoading: true,
            total: null,
            listQuery: {
              pageNo: 1,
              pageSize: 10
            },
            objQuery: [
              { name: { $regex: '' }}
            ]
          }
        },
        configEditType: 1,
        environmentConfigEditType: 1,
        id: this.$route.params.id,
        config: {},
        environmentConfig: null,
        treeObj: null,
        setting: {
          view: {
            addHoverDom: (treeId, treeNode) => {
              const sObj = $(`#${treeNode.tId}_span`)
              if (treeNode.pId == null) {
                if (treeNode.editNameFlag || $(`#addBtn_${treeNode.tId}`).length > 0) {
                  return
                }
                const addStr = `<span class="button add" id="addBtn_${treeNode.tId}" title="添加运行环境" onfocus="this.blur();"></span>`
                sObj.after(addStr)
                const btn = $(`#addBtn_${treeNode.tId}`)
                if (btn) {
                  btn.bind('click', () => {
                    this.add(treeNode)
                    return false
                  })
                }
              } else {
                if (treeNode.editNameFlag || $(`#copyBtn_${treeNode.tId}`).length > 0) {
                  return
                }
                const copyStr = `<span class="button edit" id="copyBtn_${treeNode.tId}" title="复制运行环境" onfocus="this.blur();"></span>`
                sObj.after(copyStr)
                const btn = $(`#copyBtn_${treeNode.tId}`)
                if (btn) {
                  btn.bind('click', () => {
                    this.copy(treeNode)
                    return false
                  })
                }
              }
            },
            removeHoverDom: (treeId, treeNode) => {
              if (treeNode.pId == null) {
                $(`#addBtn_${treeNode.tId}`).unbind().remove()
              } else {
                $(`#copyBtn_${treeNode.tId}`).unbind().remove()
              }
              return false
            },
            selectedMulti: false,
            nameIsHTML: true,
            showIcon: false,
            showTitle: false
          },
          edit: {
            drag: {
              prev: true,
              inner: false,
              next: true,
              isMove: true
            },
            enable: true,
            editNameSelectAll: true,
            showRemoveBtn: this.showRemoveBtn,
            showRenameBtn: false,
            removeTitle: '删除'
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            beforeRemove: this.beforeRemove,
            onClick: this.onClick
          }
        }
      }
    },
    created() {
      validateBus.$on('errors-changed', errors => {
        errors.forEach(e => {
          this.errors.add(e.menu, e.msg, e.rule, e.scope)
        })
      })
    },
    methods: {
      create() {
        this.errors.clear()
        validateBus.$emit('validate')

        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            updateEnvironmentConfig(this.environmentConfig, this.environmentConfig.id).then(
              response => {
                this.$notify({
                  type: 'success',
                  message: '更新成功!'
                })
                this.freshEnvironmentConfig(this.environmentConfig.id)
              })
            return
          }
        })
      },
      addConfigItem() {
        this.$router.push(`/configuration/config/add/${this.environmentConfig.id}`)
      },
      editConfigItem(item) {
        this.$router.push(
          {
            path: `/configuration/config/add/${this.environmentConfig.id}`,
            query: {
              name: item.name,
              oldValue: item.value,
              oldGlobalName: item.globalName
            }
          })
      },
      deleteConfigItem(item) {
        this.$confirm('此操作将删除记录, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          const environmentConfigItem = {
            'environmentConfig': this.environmentConfig,
            'name': item.name,
            'oldValue': item.value,
            'oldGlobalName': item.globalName,
            'version': item.version
          }
          deleteEnvironmentConfigItem(environmentConfigItem, this.environmentConfig.id).then(
            response => {
              this.$notify({
                type: 'success',
                message: '删除成功!'
              })
              this.freshEnvironmentConfig(this.environmentConfig.id)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      add(treeNode) {
        this.$router.push(`/configuration/config/addEnvironment/${this.config.id}`)
      },
      copy(treeNode) {
        this.$router.push(`/configuration/config/copyEnvironment/${this.config.id}/${treeNode.id}`)
      },
      freshArea: function() {
        this.treeObj = $.fn.zTree.init($('#configTree'), this.setting, [])
        getConfig(this.id).then(response => {
          this.config = response.data
          getEnvironmentConfigs(this.id).then(response => {
            const environmentConfigs = response.data
            const zNodes = [
              {
                id: `config_${this.config.id}`,
                pId: null,
                name: this.config.name,
                open: true
              }
            ]
            for (const environmentConfig of environmentConfigs) {
              const node = {
                id: environmentConfig.id,
                pId: `config_${this.config.id}`,
                name: environmentConfig.environment.name,
                open: true
              }
              zNodes.push(node)
            }
            this.treeObj.addNodes(null, zNodes)
            this.freshList('configItem')
          })
        })
      },
      beforeRemove: function(treeId, treeNode) {
        this.$confirm('此操作将删除运行环境 ' + treeNode.name + ', 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          deleteEnvironmentConfig(treeNode.id).then(response => {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.environmentConfig = null
            this.freshArea()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        return false
      },
      onClick: function(event, treeId, treeNode, clickFlag) {
        this.environmentConfig = null
        if (treeNode.pId == null) {
          return false
        }
        this.errors.clear()
        this.freshEnvironmentConfig(treeNode.id)
      },
      showRemoveBtn: function(treeId, treeNode) {
        return treeNode.pId != null
      },
      expandAll(val) {
        const zTree = $.fn.zTree.getZTreeObj('configTree')
        zTree.expandAll(val)
      },
      changeEditType(isConfig, val) {
        if (isConfig) {
          this.configEditType = val
        } else {
          this.environmentConfigEditType = val
        }
      },
      handleFilter(type) {
        this.freshList(type)
      },
      handleSizeChange(type, val) {
        this.listSettings[type].listQuery.pageSize = val
        this.freshList(type)
      },
      handleCurrentChange(type, val) {
        this.listSettings[type].listQuery.pageNo = val
        this.freshList(type)
      },
      freshList(type) {
        let items = this.getItems(type)
        const listSetting = this.listSettings[type]
        items = items.filter(value => {
          return value.name.indexOf(listSetting.objQuery[0].name.$regex) > -1
        })
        const pageNo = listSetting.listQuery.pageNo
        const pageSize = listSetting.listQuery.pageSize
        const start = (pageNo - 1) * pageSize
        const end = pageNo * pageSize
        listSetting.list = items.slice(start, end)
        listSetting.total = items.length
        listSetting.isListLoading = false
      },
      getItems(type) {
        let items = []
        if (type == 'configItem') {
          items = this.config.items
        } else if (type == 'environmentConfigItem') {
          items = this.environmentConfig.items
        } else if (type == 'environmentConfigItemHistory') {
          items = this.environmentConfig.itemHistories
        }
        return items
      },
      freshEnvironmentConfig(id) {
        getEnvironmentConfig(id).then(response => {
          this.environmentConfig = response.data
          this.freshList('environmentConfigItem')
          this.freshList('environmentConfigItemHistory')
        })
      },
      publish(id) {
        publishEnvironmentConfig(id).then(response => {
          this.$notify({
            type: 'success',
            message: '发布成功!'
          })
          this.freshEnvironmentConfig(id)
        })
      },
      rollback(id) {
        let version = 0
        if (this.environmentConfig && this.environmentConfig.items.length > 0) {
          version = this.environmentConfig.items[0].version
        }
        if (version == 0) {
          this.$notify({
            type: 'warning',
            message: '当前没有发布任何版本!'
          })
        } else if (version == 1) {
          this.$notify({
            type: 'warning',
            message: '当前只发布了一个版本，不能回退!'
          })
        } else {
          this.$prompt(`请输入要回退到的版本（当前版本${version}）`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /[1-9]|[1-9]+[0-9]/,
            inputErrorMessage: '版本格式不正确'
          }).then(({ value }) => {
            rollbackEnvironmentConfig(id, parseInt(value, 10)).then(response => {
              this.$notify({
                type: 'success',
                message: '回退成功!'
              })
              this.freshEnvironmentConfig(id)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
        }
      }
    },
    mounted() {
      this.freshArea()
    }
  }
</script>
<style scoped>
  .page-component .page-component__content {
    padding-left: 180px;
    padding-bottom: 10px;
    box-sizing: border-box;
    margin-top: 40px;
  }

  .page-component .page-component__nav {
    height: calc(100% - 62px);
    width: 240px;
    margin-top: 80px;
  }
</style>
