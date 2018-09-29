<template>
  <div class="app-container">

    <el-dialog title="单字段计算设置" :visible.sync="streamVisible" fullscreen>
      <single-set :msgField="msgField" :content="content" :currentRowIndex="currentRowIndex" :status="status" :streamType="streamType"></single-set>
    </el-dialog>

    <el-form ref="form" label-width="80px" size="mini">
      <el-form-item label="">
        <el-table v-if="content.msgFields && content.msgFields.length > 0" :data="content.msgFields"
                  highlight-current-row size="mini">
          <!--<el-table-column label="选择" align="center" prop="checked" width="48">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
          </el-table-column>-->
          <el-table-column label="字段名称" align="center" prop="label" width="96">
            <template slot-scope="scope">
              {{scope.row.label}}
            </template>
          </el-table-column>
          <el-table-column label="数据类型" align="center" prop="label" width="96">
            <template slot-scope="scope">
              {{scope.row.type}}
            </template>
          </el-table-column>
          <el-table-column label="字段描述" align="center" prop="desc">
            <template slot-scope="scope">
              <el-input v-model="scope.row.desc" placeholder="请输入字段描述" data-vv-as="字段描述"
                        :name="'desc' + scope.$index"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="" width="64" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="fa fa-crosshairs"  @click="config(scope.$index, scope.row)" ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <span v-else ><li class="fa fa-exclamation-circle" /> 请初始化消息</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import errorTip from "@/components/Validate/errorTip";
  import singleSet from "@/views/workflow/designer/components/singleFieldCalculationSet"

  export default {
    components: { errorTip ,singleSet},
    props: {
      content: {type: Object},
      status:{type:String}
    },
    data() {
      return {
        streamType:"stream",
        validate: "required",
        streamVisible:false,
        currentRowIndex: -1,
        msgField: {
          example: "",
          desc: "",
          type: "",
          label: "",
          unit: "",
          fns: {},
          outputExample:""
        },
      };
    },
    methods: {
      config(index, item){
        this.currentRowIndex = index;
        let example = '{'+'"'+item.label+'":"'+JSON.parse(this.content.formatMessage)[item.label]+'"}';
        this.msgField = {
          example: example,
          desc: item.desc,
          type: item.type,
          label: item.label,
          unit: item.unit,
          fns: item.fns ? item.fns : {},
          outputExample : item.outputExample,
          checked:true
        }
        this.streamVisible = true
      }
    },
    computed: {

    },
    created() {
    }
  };
</script>
<style scoped>
</style>
