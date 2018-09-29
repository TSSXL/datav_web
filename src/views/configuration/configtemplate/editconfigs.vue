<template>
  <div>

    <div class="app-container list">
      <el-row>
        <el-col :span="18">
          <div>
            <span> {{name}}({{fileName}})</span>
          </div>
        </el-col>
        <el-col :span="6" style="text-align: right;">
          <el-button type="primary" icon="plus" style="margin-right: 10px;"
                     @click="addConfigItem" size="mini">新增
          </el-button>
          <el-button type="primary" icon="plus" style="margin-right: 10px;" @click="handlePublish" size="mini">发布
          </el-button>
          <el-button type="primary" icon="plus" style="margin-right: 10px;" @click="handleRollback" size="mini">回退
          </el-button>
        </el-col>
      </el-row>
      <el-row style="margin: 5px;">
        <el-col :span="18">
          <div>
            <el-button class="filter-item" @click="changeEditType(1)" size="mini">
            配置项
            </el-button>
            <el-button class="filter-item" @click="changeEditType(2)" size="mini">
              配置配置文件
            </el-button>
            <el-button class="filter-item" @click="changeEditType(3)" size="mini">
              更改历史
            </el-button>
          </div>
        </el-col>
        <el-col :span="6" style="text-align: right;"
                v-show="formIndex == 1">
          <el-input style="width: 100px;" class="filter-item" v-model="objQuery[0].name.$regex" placeholder="配置项名称" size="mini">
          </el-input>
          <el-button class="filter-item" type="primary" icon="search"
                     @click="handleFilter(1)" size="mini">搜索
          </el-button>
        </el-col>
        <el-col :span="6" style="text-align: right;"
                v-show="formIndex == 3">
          <el-input style="width: 100px;" class="filter-item" v-model="objQuery[2].name.$regex" placeholder="配置项名称" size="mini">
          </el-input>
          <el-button class="filter-item" type="primary" icon="search"
                     @click="handleFilter(3)" size="mini">搜索
          </el-button>
        </el-col>
      </el-row>
      <div v-if="formIndex == 1">
        <edit-list :url="currurl" :editurl="editurl" ref="c1"></edit-list>
      </div>

      <div v-if="formIndex == 2">
        <el-input
          v-model="entity.fileContent"
          type="textarea" :rows="5"
          :autosize="true"
          name="fileContent" data-vv-as="配置文件" v-validate="''"></el-input>
      </div>
      <div v-if="formIndex == 3">
        <history-list :url="historyurl" ref="c3"></history-list>
      </div>
    </div>
    </section>
    <ul id="log" class="log" style="display:none;"></ul>
  </div>
</template>

<script>
  import {get,publish} from "@/views/configuration/configtemplate/api";
  import {getList} from '@/api/page'
  import {parseTime} from '@/utils'
  import fieldSetting from '@/views/dev/field/setting'
  import editList from '@/views/configuration/page/editlist'
  import historyList from '@/views/configuration/page/history'

  export default {
    components: {fieldSetting, editList, historyList},
    data() {
      return {
        formIndex: 1,
        id: this.$route.params.id,
        filterName:'',
        currurl:'/api/configtemplate/'+this.$route.params.id+'/item',
        editurl:'/configuration/configtemplate/'+this.$route.params.id+'/editval/',
        historyurl:'/api/configtemplate/'+this.$route.params.id+'/historyitem/',
        activeName: this.$route.params.tab ? this.$route.params.tab : 'basic',
        entity: {},
        objQuery: [
          {name: { $regex: '' }},
          {name: { $regex: '' }},
          {name: { $regex: '' }}
        ],
        listLoading: true,
      }
    },computed: {
      name: function() {
        return `${this.entity.name}`
      },
      fileName: function() {

        return `${this.entity.fileName}`+(!!!this.entity.disVer?"":"- V"+this.entity.disVer);
      }
    },
    created() {
      this.activeName = 'basic'
      this.fetch()
    },
    methods: {
      handleFilter(index){
        if(index===1){
          this.$refs.c1.handleFilter(this.objQuery[index-1].name.$regex);
        }else if(index===3){
          this.$refs.c3.handleFilter(this.objQuery[index-1].name.$regex);
        }
      },
      changeEditType(index){
        this.formIndex = index;
      },
      fetch() {
        get(this.id).then(response => {
          this.entity = response.data
        })
      },
      filterTag(value, row) {
        return row.moduleName === value
      },
      parseTime(value) {
        return parseTime(value)
      },
      handleClick(tab, event) {
        //console.log(this.activeName);
        //console.log(this.$route.path);
        //this.$router.push({path: this.activeName})
      },
      addConfigItem(){
        this.$router.push('/configuration/configtemplate/'+this.$route.params.id+'/addval');
      },
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
          message: '已取消发布'
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
      handleRollback(){
        this.$router.push('/configuration/configtemplate/'+this.$route.params.id+'/version');
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item__label {
    color: #999999;
  }
</style>
