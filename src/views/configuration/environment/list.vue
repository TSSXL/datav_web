<template>
  <div>
    <div class="screen">
      <div class="new-wrap">
        <el-button type="text" class="screen_new_link" @click="create">+
        </el-button>
        <div><el-button type="text" @click="create">新建运行环境</el-button></div>
      </div>
    </div>

    <div class="screen" v-for="item in list">
      <div class="image-wrap" @click="view(item)" :style="'cursor:pointer;  background-size: cover'">
        <div class="">
          <el-button type="primary" @click="view(item)" style="margin: 80px; margin-top: 60px;"> 设计  </el-button>
        </div>
      </div>
      <div class="screen-bottom-wrap">
        <div class="screen_bottom">
          <el-button type="text" @click="view(item)">{{item.name}}</el-button>
        </div>
        <div class="screen-actions-box">
          <div class="screenActions">
            <ul class="">
              <li><el-button type="text" size="mini" @click="view(item)"><i class="fa fa-floppy-o"></i> <span>设计</span></el-button></li>
              <li><el-button type="text" size="mini" @click="handleDelete(item)"><i class="fa fa-trash-o"></i> <span>删除</span></el-button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="screen" v-show="isMore">
      <div class="new-wrap">
        <el-button type="text" class="screen_new_link" @click="showMore">...
        </el-button>
        <div>
          <el-button type="text" @click="showMore">更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getList,removeContainer,removeHost} from '@/views/configuration/environment/api'
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
    data() {
      return {
        list: null,
        listLoading: true,
        total: 0,
        listQuery: {
          page: 0,
          size: 7,
          sort: "id"
        },
        objQuery: []
      };
    },
    computed: {
      isMore: function() {
        return !this.total >= this.listQuery.page*this.listQuery.size;
      }
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        this.objQuery = []
        getList(this.listQuery, this.objQuery).then(response => {
          this.list=this.list||[];
          this.list=this.list.concat(response.data.results);
          this.total = response.data.total;
          this.listLoading = false;
        });
      },
      create() {
        this.$router.push('/configuration/environment/choice')
      },
      dataMap(){
        this.$router.push('/visualization/datamap/list')
      },
      edit(item) {
        this.$router.push('/configuration/configtemplate/edit/' + item.id)
      },
      view(item) {
        if(item.type==='H') {
          this.$router.push('/configuration/environment/'+ item.id+'/viewhost' )
        }else{
          this.$router.push('/configuration/environment/'+ item.id+'/viewcontainer')
        }
      },
      handleConfig(item){
       this.$router.push('/configuration/configtemplate/editconfigs')
      },
      handleDelete(item) {
        this.$confirm('此操作将删除记录, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.delete(item);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      delete(item){
        if(item.type==="container") {
          removeContainer(item.id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.list=[];
            this.listQuery.page=0;
            this.fetchData()
          })
        }else if(item.type==="host"){
          removeHost(item.id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.list=[];
            this.listQuery.page=0;
            this.fetchData()
          })
        }
      },
      showMore(){
        this.listQuery.page=this.listQuery.page+1;
        this.listQuery.size=8;
        this.fetchData();
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>
<style scoped>
  .screen {
    overflow: hidden;
    margin: 10px 7px 10px;
    position: relative;
    background: #fff;
    box-shadow: 0 0 4px 0 rgba(67, 87, 101, .1);
    float: left;
    width: 240px;
    height: 210px;
    border: 1px solid #ccc;
  }

  .new-wrap {
    overflow: hidden;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .new-wrap .screen_new_link {
    background: #fff;
    font-size: 116px;
    border-radius: .5px;
  }

  .image-wrap {
    max-width: 240px;
    height: 130px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
  }

  .image-wrap:hover .mask{
    display: block;
  }

  .mask{
    display: none;
    width: 100%;
    height: 100%;
    background-color: #1b1b1b;
    filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;
  }

  .leftNav {
    background: #373d41;
    height: calc(100vh);
  }

  .screen .screen-bottom-wrap .screen_bottom {
    width: 100%;
    line-height: 0px;
    position: relative;
    white-space: nowrap;
    padding: 3px;
    padding-left: 10px;
    border-bottom: 1px solid #e8ecf2;
    color: #b2c1d5;
    cursor: pointer;
  }

  .screen .screenActions ul {
    display: flex;
    justify-content: space-between;
    margin-left: -20px;
    margin-bottom: 0;
    margin-right: 20px;
    height: 30px;
    line-height: 30px;
  }

  .screen .screenActions ul li {
    font-size: 12px;
    cursor: pointer;
    color: #7f93ae;
  }

  ul {
    list-style: none;
    margin-top: 0;
  }
</style>
