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
          <el-scrollbar style="height: calc(100vh - 380px); ">
            <AceEditor
              :fontSize="14"
              :showPrintMargin="true"
              :showGutter="true"
              :highlightActiveLine="true"
              mode="javascript"
              theme="monokai"
              name="exp"
              height="550px"
              width="100%"
              :editorProps="{$blockScrolling: true}"
              :onChange="change"
            />
          </el-scrollbar>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>
<script>
  import { Ace as AceEditor} from 'vue2-brace-editor';
  import ace from 'brace';
  import 'brace/mode/javascript';
  import 'brace/theme/monokai';

  export default {
    name: 'dataSourceSetting',
    components: {
      AceEditor
    },
    props: {
      option: {type: Object},
      setting: {type: Object}
    },
    data() {
      return {
        editor:null,
        dataActiveNames: ['interface']
      }
    },
    methods: {
      change(jsonString) {
        this.option.data.static_data = JSON.parse(jsonString);
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.editor = ace.edit("exp");
        this.editor.setValue(JSON.stringify(this.option.data.static_data,null,2));
      })
    }
  }
</script>
<style scoped></style>
