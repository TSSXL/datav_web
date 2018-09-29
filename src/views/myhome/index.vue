<template>
  <div class="app-container">
    <ul class="app-list">
      <li v-for="app in list" :key="app.id" class="app-left">
        <el-card class="box-card app-list-card">
          <el-row  :gutter="40">
            <el-col :span="9" class="line">
              <el-button type="text" @click="handleView(app.id)">
                <icon v-model="app.icon"></icon>
              </el-button>
            </el-col>
            <el-col :span="15">
              <div class="app-info">
                <el-button type="text" @click="handleView(app.id)" class="name">{{app.name}}</el-button>
                <div class="desc">{{app.desc}}</div>
              </div>
              <el-row>
                <el-col :span="8" class="info">
                      <span class="fa fa-database" title="数据源"></span> {{app.dataSourceCount}}
                </el-col>
                <el-col :span="8" class="info">
                     <span class="fa fa-tasks" title="任务"></span> {{app.taskCount}}
                </el-col>
                <el-col :span="8" class="info">
                    <span class="fa fa-line-chart" size="mini" title="可视化"></span> {{app.visualizationCount}}
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import icon from '@/components/Control/icon';
  import {getCount as getVisualizationCount} from "@/views/visualization/screen/api"

  export default {
    name: 'index',
    components: {icon},
    data() {
      return {
        list: [],
        listLoading: true,
        total: null,
        listQuery: {
          pageNo: 1,
          pageSize: 30,
          sort: "_id",
          order: -1
        },
        objQuery: [
          {name: {$regex: ''}},
        ]
      }
    },
    methods: {
      create() {
        this.$router.push('/console/app/add');
      },
      fetchList() {
        this.listLoading = true;

      },
      foreachList(list,i){

          if(i>=list.length){
              return ;
          }
        let _this=this
        let result=list[i];
      },

      handleView(id) {
        this.$store.dispatch('SetAppId', id).then((res) => {
        });
        this.$router.push({path: "/app/nav/detail"});
      }
    },
    created() {
      this.fetchList();
    },
  }
</script>
<style scoped>
  .app-list {
    min-width: 960px;
    max-width: 1140px;
    margin-left: auto;
    margin-right: auto;
    zoom: 1;
  }

  ul.app-list li {
    width: 235px;
    height: 148px;
    margin-left: 2%;
    text-align: left;
  }

  .app-left {
    float: left !important;
  }

  .app-left, .app-right {
    display: inline;
  }
  ul.cell-list .brand-list a p {
    height: 30px;
    color: #6d6d6d;
  }
  ul.app-list .name {
    font-size: 14px;
    line-height: 1.2;
    font-weight: 400;
    margin: 0;
    padding: 8px 0px 0px 0px;
  }
  ul.app-list .desc {
    font-size: 12px;
    color: #999999;
    padding: 0;
    width: 164px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ul.app-list .count .el-button {
    padding: 1px;
    min-width: 24px;
  }
  .app-info{
    height: 64px;
    overflow: hidden;
  }
  .line {
    border-right: 1px solid #CCCCCC;

  }
</style>
