<template>
  <div class="dashboard-container bg">
    <div class="content">
      <el-row :gutter="20" style="height: 140px;">
        <el-col :span="6">
          一体化应用支撑
          <span class="count" v-if="endAppVal == -1"><li class="fa fa-spinner fa-spin" /></span>
          <span v-else class="count"><li class="fa fa-desktop" /> <count-to :startVal='startVal' :endVal='endAppVal' :duration='3000'></count-to></span>
        </el-col>
        <el-col :span="6">
          连接
          <span class="count" v-if="endTaskVal == -1"><li class="fa fa-spinner fa-spin" /></span>
          <span v-else class="count"><li class="fa fa-tasks" /> <count-to :startVal='startVal' :endVal='endTaskVal' :duration='3000'></count-to></span>
        </el-col>
        <el-col :span="6">
          节点
          <span class="count" v-if="endNodeVal == -1"><li class="fa fa-spinner fa-spin" /></span>
          <span v-else class="count"><li class="fa fa-share-alt"/> <count-to :startVal='startVal' :endVal='endNodeVal' :duration='3000'></count-to></span>
        </el-col>
        <el-col :span="6">
          可视化
          <span class="count" v-if="endVisVal == -1"><li class="fa fa-spinner fa-spin" /></span>
          <span v-else class="count"><li class="fa fa-area-chart" /> <count-to :startVal='startVal' :endVal='endVisVal' :duration='3000'></count-to></span>

        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          云资源
          <span class="count" v-if="endCloudVal == -1"><li class="fa fa-spin" /></span>
          <span class="count"><li class="fa fa-cloud" /> <count-to :startVal='startVal' :endVal='endCloudVal' :duration='3000'></count-to></span>
        </el-col>
        <el-col :span="6">
          API网关
          <span class="count" v-if="endApiVal == -1"><li class="fa fa-spin" /></span>
          <span class="count"><li class="fa fa-globe" /> <count-to :startVal='startVal' :endVal='endApiVal' :duration='3000'></count-to></span>
        </el-col>
        <el-col :span="6">
          安全指数
          <span class="count"><li class="fa fa-shield" /> 100%</span>
        </el-col>
        <el-col :span="6">
          运营指数
          <span class="count"><li class="fa fa-group"/> 98%</span>
        </el-col>
      </el-row>
      <div class="topic" style="false">
        <span><el-button type="text">经济建设</el-button></span> <span><el-button type="text">社会发展</el-button></span> <span><el-button type="text">医疗健康</el-button></span>
        <span><el-button type="text">环境资源</el-button></span> <span><el-button type="text">科技教育</el-button></span> <span><el-button type="text">民生服务</el-button></span>
        <span><el-button type="text">政府机构</el-button></span> <span><el-button type="text">城市建设</el-button></span> <span><el-button type="text">更多资源...</el-button></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { getCount as getVisCount } from "@/views/visualization/screen/api"
  import countTo from 'vue-count-to';

  export default {
    name: 'index',
    components: {countTo},
    data(){
      return {
        startVal: 0,
        endAppVal: -1,
        endTaskVal: -1,
        endNodeVal: -1,
        endVisVal: -1,
        endApiVal: 1260,
        endCloudVal: 398,
        listQuery: {
          pageNo: 1,
          pageSize: 2000,
          sort: '_id',
          order: -1
        },
        objQuery: [
          {name: { $regex: '' }}
        ],
        dataInt: null,
      }
    },
    methods: {
      getAppCount() {
      },
      getTaskCount() {
      },
        getNodeCount() {
        },
        getVisCount() {
          getVisCount().then(response => {
            this.endVisVal = response.data;
          });
      }
    },
    computed: {
//    ...mapGetters([
//      'name',
//      'roles'
//    ])
    },
    created() {
      this.getAppCount()
      this.getTaskCount()
      this.getNodeCount()
      this.getVisCount()

      /*
      if (this.dataInt)
        clearInterval(this.dataInt)

      var _this = this
      this.dataInt = setInterval(function () {
        _this.getAppCount()
        _this.getTaskCount()
        _this.getNodeCount()
        _this.getVisCount()
      }, 10000);
      */
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";

  .dashboard-container.bg {
    height: 100vh;
    margin-bottom: 0;
    background-image: url(/static/bg.jpg);
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .content {
    color: #fff;
    font-size: 14px;
    text-align: center;
    width: 80%;
    margin-left: auto; margin-right: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    padding-bottom: 80px;
  }
  .count {
    font-size: 48px;
    color: #F6416C;
    display: block;
    margin: 20px;
    font-weight: 500;
  }

  .cpi {
    font-size: 48px;
    color: #3bb590;
    display: block;
    margin: 20px;
    font-weight: 500;
  }

  .topic{
    margin-top: 40px;
  }
  .topic span{
    margin-right: 16px;
  }
</style>
