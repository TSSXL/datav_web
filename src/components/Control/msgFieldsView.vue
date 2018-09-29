<template>
  <div class="app-container">
    {{content.category}}
        <el-table :data="content.transScript.msgFields" v-if="content.category!='iot'"
                  highlight-current-row size="mini">
          <el-table-column type="expand" width="50">
            <template slot-scope="props">
              <el-card class="box-card">
                <line-chart-view :table="tableName" :field="props.row.label"></line-chart-view>
              </el-card>
            </template>
          </el-table-column>
          <el-table-column label="字段名称" align="center" prop="label" width="96">
            <template slot-scope="scope">
              {{scope.row.label}}
            </template>
          </el-table-column>
          <el-table-column label="数据类型" align="center" prop="label" width="96">

            <template slot-scope="scope" >
              {{scope.row.type}}
            </template>
          </el-table-column>
          <el-table-column label="字段描述" align="center" prop="desc">
            <template slot-scope="scope">
              {{scope.row.desc}}
            </template>
          </el-table-column>
          <el-table-column label="单位" align="center" prop="desc" width="48">

            <template slot-scope="scope" >
              {{scope.row.unit}}
            </template>
          </el-table-column>
        </el-table>

        <!-- iot显示 -->
        <el-table :data="content.transScript.msgFields" v-if="content.category=='iot'"
              highlight-current-row size="mini">
      <el-table-column type="expand" width="50">
        <template slot-scope="props">
          <el-card class="box-card">
            <line-chart-view :table="tableName" :field="props.row.label"></line-chart-view>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column label="字段名称" align="center" prop="label" width="96">
        <template slot-scope="scope">
          {{scope.row.label}}
        </template>
      </el-table-column>
      <el-table-column label="数据类型" align="center" prop="label" width="96">

        <template slot-scope="scope" >
          {{scope.row.type.label}}
        </template>
      </el-table-column>
      <el-table-column label="字段描述" align="center" prop="desc">
        <template slot-scope="scope">
          {{scope.row.desc}}
        </template>
      </el-table-column>
      <el-table-column label="单位" align="center" prop="desc" width="48">

        <template slot-scope="scope" >
          {{scope.row.unit.label}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import validateBus from "@/views/bus/validate";
  import errorTip from "@/components/Validate/errorTip";
  import lineChartView from '@/components/Control/lineChartView';

  export default {
    components: { errorTip, lineChartView },
    props: {
      content: { type: Object }
    },
    data() {
      return {

      };
    },
    methods: {

    },
    computed: {
      tableName(){
        return "c_" + this.content.refDataSource.id + "_" + this.content.id + "_" + this.content.consumeNodeId
      }
    },
    created() {
    }
  }
</script>
<style scoped>
</style>
