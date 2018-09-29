<template>
  <el-form label-width="80px" size="mini">
    <el-collapse v-model="dataActiveNames">
      <el-collapse-item title="数据接口" name="interface">
        <el-form-item label-width="0px">
          <el-table
            :data="Object.keys(option.data.datamap)" size="mini" :highlight-current-row="false" style="width: 100%;">
            <el-table-column
              prop="name"
              label="字段"
              width="60">
              <template slot-scope="scope">{{scope.row}}</template>
            </el-table-column>
            <el-table-column
              prop="map"
              label="映射"
              width="100">
              <template slot-scope="scope">
                <el-input v-model="option.data.datamap[scope.row].map" placeholder="可自定义" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="desc"
              label="说明">
              <template slot-scope="scope">{{option.data.datamap[scope.row].desc}}</template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="数据源类型">
          <el-select v-model="option.data.data_type" placeholder="请选择" size="mini">
            <el-option v-if="setting.dataSourceOptions && setting.dataSourceOptions.length > 0"
                       v-for="item in setting.dataSourceOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="API接口" v-if="option.data.data_type=='API'">
          <el-input v-model="option.data.data_api"  size="mini"></el-input>
        </el-form-item>
        <el-form-item label="默认ID" v-if="option.data.data_type=='API'">
          <el-input v-model="option.data.data_api_id"  size="mini"></el-input>
        </el-form-item>
        <el-form-item label-width="0px" v-if="option.data.data_type == 'static_data'">
          <el-scrollbar style="height: calc(100vh - 400px); ">
            <cm-json-editor v-if="option.data.static_data" v-model="jsonString" style="font-size: 10px;"></cm-json-editor>
          </el-scrollbar>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>
<script>
  import cmJsonEditor from '@/components/jsonEditor/cmJsonEditor'

  export default {
    name: 'dataSourceSetting',
    components: {
      cmJsonEditor
    },
    props: {
      option: {type: Object},
      setting: {type: Object}
    },
    data() {
      return {
        dataActiveNames: ['interface'],
        jsonString:JSON.stringify(this.option.data.static_data,null,4)
      }
    },
    watch: {
      jsonString(){
        this.option.data.static_data = JSON.parse(this.jsonString);
      }
    }
  }
</script>
<style scoped></style>
