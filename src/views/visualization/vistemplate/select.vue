<template>
  <el-container>
    <el-header style="height: 32px; margin-top: 38px;">
      <el-row :gutter="20">
        <el-col :span="8" style="text-align: left">
          <el-button type="text" @click="goBack">
            <li class="fa fa-mail-reply"/>
            返回
          </el-button>
        </el-col>
        <el-col :span="8" style="text-align: right">

        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="320px">
        <el-table :data="emptyTemplates" highlight-current-row :show-header="false" size="mini">
          <el-table-column prop="icon" width="172">
            <template slot-scope="scope">
              <div class="image-wrap" :style="'cursor:pointer; background-size: cover'" @click="handleCurrentChange(screen)">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
              <div class="info">
                <span>由空白画布创建</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="templates" highlight-current-row :show-header="false" size="mini">
          <el-table-column prop="icon" width="172">
            <template slot-scope="scope">
              <div class="image-wrap" :style="'cursor:pointer; background-image: url('+ scope.row.page.coverImage +'); background-size: cover'" @click="handleCurrentChange(scope.row)">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
              <div class="info">
                <span>比例 {{ scope.row.page.ratio }}</span><br>
                <span>{{ scope.row.page.canvas.width }}x{{ scope.row.page.canvas.height }}px</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
      <el-main>
        <!----------------main开始-------------------->
        <div style="width: 100%; height: 100%;">
          <el-dialog
            title="请输入可视化应用的名称"
            :visible.sync="dialogVisible"
            width="30%">
            <div><el-input v-model="screen.name" placeholder="请输入名称" size="mini"></el-input></div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="create" size="mini">确 定</el-button>
            </span>
          </el-dialog>
          <div v-if="currentTemplate.type && currentTemplate.type == 'empty'" class="image-wrap image-big-wrap">
            <div style="position: relative; top: 50%; transform: translateY(-50%); text-align: center">
              <el-button type="primary" class="img-btn" @click="dialogVisible = true">  创建  </el-button>
              <div style="margin-top: 40px;">由空白画布创建可视化应用</div>
            </div>
          </div>
          <div v-else>
            <div class="image-wrap image-big-wrap" :style="'cursor:pointer; background-image: url('+ currentTemplate.page.coverImage +'); background-size: cover'" >
              <div class="mask">
                <el-button type="primary" class="btn" @click="dialogVisible = true">  创建  </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { addItem } from "@/views/visualization/screen/api";
  import { getList } from "@/views/visualization/vistemplate/api";
  import {mapGetters} from 'vuex'

  export default {
    components: {},
    data() {
      return {
        currentTemplate: { name: '空白画布', desc: '由空白画布自由创建', type: 'empty' },
        emptyTemplates: [{ name: '空白画布', desc: '由空白画布自由创建', type: 'empty' }],
        dialogVisible: false,
        screen: {
          name: '',
          desc: '',
          tag: [],
          publish: {},
          version: '',
          page: { canvas: { width: 960, height: 480 }, grid: 10, fill: 'full', backgroundColor: '#000', backgrounds: [], coverImage: '' },
          components: [],
          refApp: {}
        },
        templates: [],
        listLoading: true,
        total: null,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          sort: '_id',
          order: -1
        },
        objQuery: [ { name: { $regex: '' }} ]
      }
    },
    created() {
      this.$nextTick(function () {

      })
      this.fetchList()
    },
    methods: {
      fetchList() {
        this.listLoading = true;
        getList(this.listQuery, this.objQuery).then(response => {
          this.templates = response.data.results
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.currentTemplate = val
        this.screen = val
      },
      create() {
        this.onSubmit()
      },
      goBack(){
        this.$router.push('/app/myvisualization/list')
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            this.screen.refApp = this.appid
            delete this.screen._id
            delete this.screen.id
            addItem(this.screen).then(response => {
              this.$router.push('/visualization/screen/design/' + response.data)
            })
            this.dialogVisible = false
          }
        })
      }
    },
    computed: {
      ...mapGetters([
        'appid'
      ])
    }
  }
</script>
<style scoped>
  .info {
    font-size: 11px;
  }

  .el-container {
    height: calc(100vw);
  }

  .el-header, .el-footer {
    background-color: #333333;
    font-size: 12px;
    color: #CCCCCC;
    height: 20px;
    line-height: 20px;
  }

  .el-aside {
    background-color: #f7f8fa;
    color: #333;
  }

  .el-main {
    background-color: #e7e6e7;
    color: #FFF;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  ul, ol {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .charts li {
    position: relative;
    vertical-align: top;
    padding-top: 5px;
    padding-bottom: 28px;
    margin-top: 10px;
    margin-bottom: 10px;
    list-style: none;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    float: left;
    width: 89px;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }

  .charts li:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .charts li img {
    width: 45px;
    vertical-align: middle;
  }

  .charts li .name {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 20px;
  }
  .image-wrap {
    width: 160px;
    height: 100px;
    overflow: hidden;
    background-color: #0f2a42;
    align-items: center;
    justify-content: center;
  }
  .image-big-wrap{
    width: 800px;
    height: 420px;
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
    text-align: center;
  }

  .btn{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
