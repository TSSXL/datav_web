<template>
  <div class="page-component page-container">
    <el-scrollbar class='page-component__nav' tag="div">
      <div>
        <p><span>名称</span><span style="margin-left: 5px">{{container.name}}</span></p>
      </div>
    </el-scrollbar>
    <section class="page-component__content">
      <el-alert
        v-if="config == null && environment == null"
        title="提示"
        type="info"
        description="请选择配置"
        show-icon>
      </el-alert>
      <section>
        <div class="app-container list">
          <el-row>
            <el-col :span="18">
              <div>
                <span>全局配置</span>
              </div>
            </el-col>
            <el-col :span="6" style="text-align: right;">
              <el-button type="primary" icon="plus" style="margin-right: 10px;"
                         @click="addEnvironmentItem" size="mini">新增
              </el-button>
              <el-button type="primary" icon="plus" style="margin-right: 10px;" @click="handlePublish" size="mini">发布
              </el-button>
              <el-button type="primary" icon="plus" style="margin-right: 10px;" @click="rollback" size="mini">回退
              </el-button>
            </el-col>
          </el-row>
          <el-row style="margin: 5px;">
            <el-col :span="18">
              <div>
                <el-button class="filter-item" @click="changeEditType(1)" size="mini">
                  配置项
                </el-button>
                <el-button class="filter-item" @click="changeEditType(3)" size="mini">
                  更改历史
                </el-button>
              </div>
            </el-col>
            <el-col :span="6" style="text-align: right;"
                    v-show="environmentEditType == 1">
              <el-input style="width: 100px;" class="filter-item" v-model="objQuery[0].name.$regex" placeholder="配置项名称" size="mini">
              </el-input>
              <el-button class="filter-item" type="primary" icon="search"
                         @click="handleFilter(1)"  size="mini">搜索
              </el-button>
            </el-col>
            <el-col :span="6" style="text-align: right;"
                    v-show="environmentEditType == 3">
              <el-input style="width: 100px;" class="filter-item" v-model="objQuery[2].name.$regex" placeholder="配置项名称" size="mini">
              </el-input>
              <el-button class="filter-item" type="primary" icon="search"
                         @click="handleFilter(3)"  size="mini">搜索
              </el-button>
            </el-col>
          </el-row>
          <div v-if="environmentEditType == 1">
            <edit-list :url="currurl" :editurl="editurl" ref="c1"></edit-list>
          </div>

          <div v-if="environmentEditType == 3">
            <history-list :url="historyurl" ref="c3"></history-list>
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
    getHost,publish
  } from '@/views/configuration/environment/api'
  import editList from '@/views/configuration/page/editlist';
  import historyList from '@/views/configuration/page/history';

  export default {
    components: { errorTip,editList,historyList },
    data: function() {
      return {
        id:this.$route.params.id,
        configItemList: null,
        isConfigItemListLoading: true,
        configItemTotal: null,
        configItemObjQuery: [
          { name: { $regex: '' }}
        ],
        environmentConfigItemList: null,
        isEnvironmentConfigItemListLoading: true,
        environmentConfigItemTotal: null,
        environmentConfigItemListQuery: {
          pageNo: 1,
          pageSize: 10,
          sort: 'name',
          order: -1
        },
        environmentConfigItemObjQuery: [
          { name: { $regex: '' }}
        ],
        environmentConfigItemHistoryList: null,
        isEnvironmentConfigItemHistoryListLoading: true,
        environmentConfigItemHistoryTotal: null,
        environmentConfigItemHistoryListQuery: {
          pageNo: 1,
          pageSize: 10,
          sort: 'name',
          order: -1
        },
        environmentConfigItemHistoryObjQuery: [
          { name: { $regex: '' }}
        ],
        configEditType: 1,
        environmentEditType: 1,
        id: this.$route.params.id,
        config: {},
        container:{},
        currurl:'/api/environment/'+this.$route.params.id+'/item',
        editurl:'/configuration/environment/'+this.$route.params.id+'/editval/',
        historyurl:'/api/environment/'+this.$route.params.id+'/historyitem/',
        objQuery: [
          {name: { $regex: '' }},
          {name: { $regex: '' }},
          {name: { $regex: '' }}
        ]
      }
    },
    created() {
      this.get();
    },
    methods: {
      get(){
        getHost(this.id).then(response => {
          this.container=response.data;
        });
      },
      addEnvironmentItem(){
        this.$router.push('/configuration/environment/'+this.$route.params.id+'/addval');
      },changeEditType(type){
        this.environmentEditType=type;
      },
      handleFilter(index) {
        if(index===1){
          this.$refs.c1.handleFilter(this.objQuery[index-1].name.$regex);
        }else if(index===3){
          this.$refs.c3.handleFilter(this.objQuery[index-1].name.$regex);
        }
      }
      ,
      handlePublish(){

        this.$confirm('发布新版本, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.doPublish();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      doPublish(){
        publish(this.id).then(response=>{
          this.$notify({
            title: '成功',
            message: '发布成功',
            type: 'success',
            duration: 2000
          })
          this.fetch();
        })
      },
      rollback(){
        this.$router.push('/configuration/environment/'+this.$route.params.id+'/version');
      }
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
