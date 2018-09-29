<template>
  <div class="app-container item">
    <h3>新建数据映射</h3>
    <!--本代码由系统自动生成，请在修改后予以去除-->
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="名称">

        <el-input
          v-model="datamap.name"
          type="text" :rows="2"
          :autosize="false"
          name="name" data-vv-as="名称" v-validate="'required'">
        </el-input>

        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>
      <el-form-item label="标签">

        <el-tag
          :key="tag"
          type="small"
          size=""
          v-for="tag in datamap.tag"
          :closable="true"
          :disable-transitions="true"
          @close="handleTagtagClose(tag)"
          name="tag" data-vv-as="标签" v-validate="''">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputTagtagVisible"
          v-model="inputTagtagValue"
          ref="saveTagtagInput"
          size=""
          @keyup.enter.native="handleTagtagInputConfirm"
          @blur="handleTagtagInputConfirm"
          name="tag" data-vv-as="标签" v-validate="''"
        >
        </el-input>
        <el-button v-else size="" @click="showTagtagInput">+ 新标签
        </el-button>

        <error-tip :errs="errors" name="tag"></error-tip>
      </el-form-item>
      <el-form-item label="描述">

        <el-input
          v-model="datamap.desc"
          type="textarea" :rows="1"
          :autosize="true"
          name="desc" data-vv-as="描述" v-validate="''">
        </el-input>

        <error-tip :errs="errors" name="desc"></error-tip>
      </el-form-item>

      <el-form-item label="已选择的任务">
        <el-table
          :data="datamap.collectTasks"
          style="width: 100%"
          @expand-change="handleExpandChange"
          highlight-current-row
          size="mini">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.data.values" size="mini">
                <el-table-column
                  type="index"
                  width="50">
                </el-table-column>
                <el-table-column :label="item" v-for="(item, index) in props.row.data.columns" :key="item">
                  <template slot-scope="scope">
                    {{scope.row[index]}}
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" width="128" >
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column prop="sql" label="SQL">
            <template slot-scope="scope">
            <el-input
              v-model="scope.row.data.sql"
              type="textarea" :rows="3"
              :autosize="false"
              name="sql">
            </el-input>
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="72" align="center" >
            <template slot-scope="scope">
              <el-button type="text" icon="fa fa-times" @click="handleDelete(scope.row)" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="text" @click="selectTask" v-if="!taskDisplay">选择</el-button>
        <el-button type="text" @click="selectTask" v-else>隐藏</el-button>
        <section v-show="taskDisplay">
        <el-tabs>
          <el-tab-pane label="采集任务" size="mini">
            <el-table
              :data="collectTasks"
              highlight-current-row
              @current-change="handleCollectTaskCurrentChange"
              style="width: 100%"
              size="mini">
              <el-table-column prop="name" label="名称" width="180">
              </el-table-column>
              <el-table-column prop="描述" label="描述">
              </el-table-column>
              <el-table-column prop="categoryPath" label="分类" width="180">
                <template slot-scope="scope">
                  {{scope.row.categoryPath.join(' / ')}}
                </template>
              </el-table-column>
            </el-table>
            <div v-show="!collectListLoading" class="pagination-container">
              <el-pagination @size-change="handleCollectSizeChange" @current-change="handleCollectCurrentChange" :current-page="collectListQuery.pageNo" :page-sizes="[10,20,30, 50]"
                             :page-size="collectListQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="collectTotal">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="订阅任务" size="mini">
            <el-table
              :data="subscribeTasks"
              highlight-current-row
              @current-change="handleCollectTaskCurrentChange"
              style="width: 100%"
              size="mini">
              <el-table-column prop="name" label="名称" width="180">
              </el-table-column>
              <el-table-column prop="描述" label="描述">
              </el-table-column>
              <el-table-column prop="categoryPath" label="分类" width="180">
                <template slot-scope="scope">
                  {{scope.row.categoryPath.join(' / ')}}
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        </section>
      </el-form-item>

      <el-form-item label="SQL">
        {{sql}}
        <br>
        <el-button type="text" @click="execSql" v-if="sql">执行</el-button>
        <br>
        var o = {}; //原始对象
        <cm-json-editor v-if="datamap.execSqlResult" v-model="datamap.execSqlResult" style="font-size: 10px;"></cm-json-editor>
      </el-form-item>

      <el-form-item label="转换脚本">
        var t = []; //输出数组
        <el-input
          v-model="datamap.transScript"
          type="textarea" :rows="6"
          :autosize="false"
          name="transScript">
        </el-input>
        <el-button type="text" @click="trans">
          <li class="fa fa-retweet"/>
          转换
        </el-button>
        <cm-json-editor v-if="datamap.transResult" v-model="datamap.transResult" style="font-size: 10px;"></cm-json-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {addItem} from "@/views/visualization/datamap/api";
  //import {getList as getTaskList} from "@/views/task/collecttask/api"
  //import {post, get} from "@/views/task/apiparam/api"
  import errorTip from "@/components/Validate/errorTip";
  import store from '@/store'
  import cmJsonEditor from '@/components/jsonEditor/cmJsonEditor'

  export default {
    components: { cmJsonEditor, errorTip},
    data() {
      return {
        id: this.$route.params.id,
        inputTagtagVisible: false,
        inputTagtagValue: '',
        datamap:
        {
          name: '',
          tag: [],
          desc: '',
          sql: '',
          transScript: '',
          execSqlResult: '',
          transResult: '',
          collectTasks: []
        },
        collectTasks: [],
        collectListLoading: true,
        collectTotal: null,
        collectListQuery: {
          pageNo: 1,
          pageSize: 10,
          sort: "_id",
          order: -1
        },
        collectOjQuery: [
          {taskType: 'collection'}, {state: 'running'}
        ],
        subscribeTasks: [],
        taskDisplay: false
      }
    },
    methods: {
      fetchCollectTasks() {
        /*getTaskList(this.collectListQuery, this.collectOjQuery).then(response => {
          this.collectTasks = response.data.results
          this.collectTotal = response.data.total;
          this.collectListLoading = false;
        })*/
      },
      fetchSubscribeTasks() {
        var listQuery = {
          pageNo: 1,
          pageSize: 10,
          sort: "_id",
          order: -1
        }
        var objQuery = [{taskType: 'subscription'}, {state: 'running'}]
        /*getTaskList(listQuery, objQuery).then(response => {
          this.subscribeTasks = response.data.results
        })*/
      },
      handleCollectSizeChange(val) {
        this.collectListQuery.pageSize = val;
        this.fetchCollectTasks();
      },
      handleCollectCurrentChange(val) {
        this.collectListQuery.pageNo = val;
        this.fetchCollectTasks();
      },
      handleExpandChange(val) {
        this.getDataView(val)
      },
      handleDelete(row){
        this.$confirm('此操作将取消选中的记录, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.delete(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      delete(row){
        const index = this.datamap.collectTasks.indexOf(row);
        this.datamap.collectTasks.splice(index, 1);
      },
      setCurrentParam(task){
        if (task.taskType == 'subscription') {
          task.data.api = store.getters.urls.influxdb_city_subscribe
          task.data.table = "c_" + task.id + "_" + task.consumeNodeId
        } else {
          task.data.api = store.getters.urls.influxdb_city_pc
          task.data.table = "c_" + task.refDataSource.id + "_" + task.id + "_" + task.consumeNodeId
        }
      },
      getDataView(row) {
        this.setCurrentParam(row)
        let sql = "SELECT * FROM " + row.data.table + " order by time desc limit 2"
        /*get(row.data.api + sql).then(response => {
          let result = {}
          if (response.data.results && response.data.results.length > 0 && response.data.results[0].series && response.data.results[0].series.length > 0) {
            result = response.data.results[0].series[0]
            row.data.values = result.values
            row.data.columns = result.columns
          }
        })*/
      },
      execSql(){
        var api = this.datamap.collectTasks[0].data.api
        var arrSql = []
        for(var task of this.datamap.collectTasks){
          arrSql.push(task.data.sql.replace('{T}', task.data.table))
        }
        var strSql = arrSql.join('%3B')
        console.log(api + strSql)
        /*get(api + strSql).then(response => {
          let result = {}
          if (response.data.results && response.data.results.length > 0 && response.data.results[0].series && response.data.results[0].series.length > 0) {
            result = response.data
            this.datamap.execSqlResult = JSON.stringify(result, null, 2)
          }
        })*/
      },
      trans(){
        try {
          var o = JSON.parse(this.datamap.execSqlResult)
          var t = []
          eval(this.datamap.transScript)
          this.datamap.transResult = JSON.stringify(t, null, 2)
        } catch (error) {
          this.$message.error('转换错误！')
        } finally {

        }
      },
      handleCollectTaskCurrentChange(val) {
        var task = {
          id: val.id,
          name: val.name,
          taskType: val.taskType,
          consumeNodeId: val.consumeNodeId,
          refDataSource: val.refDataSource,
          data: {
            api: '',
            table: '',
            sql: 'SELECT * FROM {T} order by time desc limit 1',
            values: [],
            columns: []
          }
        }
        this.setCurrentParam(task)
        this.datamap.collectTasks.push(task)
        this.taskDisplay = false
      },
      selectTask() {
        this.taskDisplay = !this.taskDisplay
      },
      createFilter(queryString) {
        return (options) => {
          return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleTagtagClose(tag) {
        this
          .datamap.tag.splice(this
          .datamap.tag.indexOf(tag), 1
        )
      },
      showTagtagInput() {
        this.inputTagtagVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagtagInput.$refs.input.focus();
        });
      },
      handleTagtagInputConfirm() {
        let inputValue = this.inputTagtagValue;
        if (inputValue) {
          this
            .datamap.tag.push(inputValue);
        }
        this.inputTagtagVisible = false;
        this.inputTagtagValue = '';
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            addItem(this.datamap).then(response => {
              this.$notify({
                title: '成功',
                message: '创建成功',
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
    },
    computed: {
      sql(){
        var arrSql = []
        for(let task of this.datamap.collectTasks){
          arrSql.push(task.data.sql)
        }
        return arrSql.join(';')
      }
    },
    created() {
      this.fetchCollectTasks()
      this.fetchSubscribeTasks()
    }
  }
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
