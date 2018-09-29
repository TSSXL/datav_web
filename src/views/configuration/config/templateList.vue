<template>
  <div>
    <div class="screen">
      <div class="new-wrap">
        <el-button type="text" class="screen_new_link" @click="createWithoutTemplate">+
        </el-button>
        <div>
          <el-button type="text" @click="createWithoutTemplate">新建配置（没有模板）</el-button>
        </div>
      </div>
    </div>
    <div class="screen" v-for="item in list">
      <div class="image-wrap" @click="createWithTemplate(item)"
           :style="'cursor:pointer;  background-size: cover'">
        <div>
          <el-button type="primary" @click="createWithTemplate(item)"
                     style="margin: 60px 40px 60px;">
            新建配置（有模板）
          </el-button>
        </div>
      </div>
      <div class="screen-bottom-wrap">
        <div class="screen_bottom">
          <el-button type="text" @click="createWithTemplate(item)">{{item.name}}</el-button>
        </div>
        <div class="screen-actions-box">
          <div class="screenActions">
            <ul class="">
              <li><el-button type="text" size="mini" @click="createWithTemplate(item)">
                <i class="fa fa-floppy-o"></i> <span>新建配置（有模板）</span>
              </el-button></li>
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
  import { getList } from '@/views/configuration/configtemplate/api'
  import ElButton from 'element-ui/packages/button/src/button'

  export default {
    components: { ElButton },
    data() {
      return {
        listLoading: true,
        list: null,
        total: null,
        currentPage: 1,
        listQuery: {
          page: 0,
          size: 3,
          sort: 'id',
          order: -1
        },
        objQuery: []
      }
    },
    computed: {
      isMore: function() {
        return this.total > this.listQuery.pageSize
      }
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList(this.listQuery, this.objQuery).then(response => {
          this.list = response.data.results
          this.total = response.data.total
          this.listLoading = false
        })
      },
      createWithoutTemplate() {
        this.$router.push('/configuration/config/addWithoutTemplate')
      },
      createWithTemplate(item) {
        this.$router.push(`/configuration/config/addWithTemplate/${item.id}`)
      },
      showMore() {
        if (this.listQuery.pageSize < this.total) {
          this.listQuery.pageSize *= this.currentPage + 1
          this.listLoading = true
          getList(this.listQuery, this.objQuery).then(response => {
            this.list = response.data.results
            this.total = response.data.total
            this.listLoading = false
            this.listQuery.currentPage += 1
          })
        }
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
