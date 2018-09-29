<template>
  <div>
    <div class="screen">
          <div class="image-wrap" @click="handleContainer()" :style="'cursor:pointer;  background-size: cover'">
            <div class="">
              <el-button type="primary" @click="handleContainer()" style="margin: 80px; margin-top: 60px;"> 容器  </el-button>
            </div>
          </div>
        </div>
    <div class="screen">
          <div class="image-wrap" @click="handleHost()" :style="'cursor:pointer;  background-size: cover'">
            <div class="">
              <el-button type="primary" @click="handleHost()" style="margin: 80px; margin-top: 60px;"> 主机  </el-button>
            </div>
          </div>
        </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getList} from '@/views/configuration/configtemplate/api'
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
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
        objQuery: []
      };
    },
    computed: {
      ...mapGetters([
        'appid'
      ]),
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        this.objQuery = []
        this.objQuery.push({refApp: this.appid})
        /*getListCover(this.listQuery, this.objQuery).then(response => {
          this.list = response.data.results;
          this.total = response.data.total;
          this.listLoading = false;
        });*/
      },
      create() {
        this.$router.push('/configuration/configtemplate/add')
      },
      dataMap(){
        this.$router.push('/visualization/datamap/list')
      },
      edit(item) {
        this.$router.push('/configuration/configtemplate/edit/' + item.id)
      },
      handleContainer(){
       this.$router.push('/configuration/environment/addcontainer')
      },
      handleHost(){
       this.$router.push('/configuration/environment/addhost')
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
        removeItem(item.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        })
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
    height: 170px;
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
    height: 210px;
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
