<template>
  <el-scrollbar class='page-component__scroll' tag="div">
  <div>
    <div class="screen">
      <div class="new-wrap">
        <el-button type="text" class="screen_new_link" @click="create">+
        </el-button>
        <div><el-button type="text" @click="create">新建可视化</el-button></div>
      </div>
    </div>
    <div class="screen" v-for="item in list">
      <template v-if="item.page.coverImage">
        <div class="image-wrap" @click="edit(item)" :style="'cursor:pointer; background-image: url('+ path + item.page.coverImage +'); background-size: cover'">
          <div class="mask">
            <el-button type="primary" @click="edit(item)" style="margin: 80px; margin-top: 60px;"> 设计  </el-button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="image-wrap" @click="edit(item)" :style="'cursor:pointer; background-size: cover'">
          <div class="mask">
            <el-button type="primary" @click="edit(item)" style="margin: 80px; margin-top: 60px;"> 设计  </el-button>
          </div>
        </div>
      </template>
      <div class="screen-bottom-wrap">
        <div class="screen_bottom">
          <el-button type="text" @click="edit(item)">{{item.name}}</el-button>
        </div>
        <div class="screen-actions-box">
          <div class="screenActions">
            <ul class="">
              <li><el-button type="text" size="mini" @click="copy(item)"><i class="fa fa-floppy-o"></i> <span>复制</span></el-button></li>
              <li><el-button type="text" size="mini" @click="preview(item.id)"><i class="fa fa-photo"></i> <span>预览</span></el-button></li>
              <li><el-button type="text" size="mini"><i class="fa fa-toggle-off"></i> <span>发布</span></el-button></li>
              <li><el-button type="text" size="mini" @click="handleDelete(item)"><i class="fa fa-trash-o"></i> <span>删除</span></el-button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  </el-scrollbar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getListCover, copyItem,removeItem} from '@/views/visualization/screen/api'
  import ElButton from "element-ui/packages/button/src/button";
  import {getPath} from '@/views/dev/attachment/api'

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
      path() {
        return getPath()
      },
      ...mapGetters([
        'appid'
      ]),
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        this.objQuery = []
        this.objQuery.push({refApp: this.appid})
        getListCover(this.listQuery, this.objQuery).then(response => {
          console.log(JSON.stringify(response))
          this.list = response.data.content;
          this.total = response.data.totalElements;
          this.listLoading = false;
        });
      },
      create() {
        this.$router.push('/visualization/vistemplate/select')
      },
      dataMap(){
        this.$router.push('/visualization/datamap/list')
      },
      edit(item) {
        this.$router.push('/visualization/screen/design/' + item.id)
      },
      copy(item) {
        if (item) {
          copyItem(item.id).then(response => {
            this.$message({
              message: '复制成功',
              type: 'success'
            });
            this.fetchData();
          });
        }
      },
      preview(id){
        window.open('/#/fullscreen/preview/' + id);
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
  .el-scrollbar{
    margin-bottom: 17px;
    padding-bottom: 17px;
  }
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
    background-color: #0f2a42;
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
