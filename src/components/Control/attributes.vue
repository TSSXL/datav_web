<template>
  <div>
    <el-dialog title="属性编辑" :visible.sync="settingVisible">
      <el-button type="primary" @click="add"> 添加</el-button>
      <el-button type="primary" @click="save"> 应用</el-button>
      <el-table :data="results" v-loading.body="listLoading" element-loading-text="拼命加载中"
                highlight-current-row size="mini">
        <el-table-column align="center" type='index' width="72" label="序号">
        </el-table-column>
        <el-table-column label="名称" width="160"  align="center" prop="key">
          <template slot-scope="scope">
            <el-input v-model="scope.row.key" placeholder="请输入名称" data-vv-as="名称"
                      :name="'key' + scope.$index" v-validate.initial="validate" ></el-input>
            <error-tip :errs="errors" :name="'key'+ scope.$index"></error-tip>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="160" align="center" prop="type">
          <template slot-scope="scope">
            <el-input v-model="scope.row.type" placeholder="请输入类型" data-vv-as="类型"
                      :name="'type' + scope.$index" v-validate.initial="validate" ></el-input>
            <error-tip :errs="errors" :name="'type'+ scope.$index"></error-tip>
          </template>
        </el-table-column>
        <el-table-column label="值" min-width="160" align="center" prop="value">
          <template slot-scope="scope">
            <el-input v-model="scope.row.value" placeholder="请输入值" data-vv-as="值"
                      :name="'value' + scope.$index" v-validate.initial="validate" ></el-input>
            <error-tip :errs="errors" :name="'value'+ scope.$index"></error-tip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="156" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-delete" @click="remove(scope.row)" size="mini"></el-button>
            <el-button type="primary" icon="fa fa-long-arrow-up" @click="up(scope.row)" size="mini"></el-button>
            <el-button type="primary" icon="fa fa-long-arrow-down" @click="down(scope.row)"
                       size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>
    <span v-if="!attributes || attributes.length == 0">无  </span>
    <el-button type="text" @click="settingVisible = true"> 修改</el-button>
    <el-table v-if="attributes && attributes.length > 0"
              :data="attributes"
              style="width: 100%" size="mini">
      <el-table-column
        prop="key"
        label="名称"
        width="60">
      </el-table-column>
      <el-table-column
        prop="value"
        label="值">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import validateBus from "@/views/bus/validate";
  import errorTip from "@/components/Validate/errorTip";

  export default {
    props: {
      attributes: {type: Array}
    },
    components: {
      errorTip
    },
    data() {
      return {
        results: [],
        listLoading: false,
        validate: "required",
        value: "",
        settingVisible: false
      };
    },
    methods: {
      add() {
        if (this.results == undefined) {
          this['results'] = [];
        }
        else {
          this.results.push({key: "", type: '', value: ""});
        }
      },
      remove(item) {
        var index = this.results.indexOf(item);
        if (index !== -1) {
          this.results.splice(index, 1);
        }
      },
      up(item) {
        var index = this.results.indexOf(item);
        if (index == 0) //已经是第一个了
        {

        }
        else {
          if (index !== -1) {
            this.results.splice(index, 1);
          }
          this.results.splice(index - 1, 0, item)
        }
      },
      down(item) {
        var index = this.attributes.indexOf(item);
        if (index == this.attributes.length) //已经是最后一个了
        {

        }
        else {
          if (index !== -1) {
            this.attributes.splice(index, 1);
          }
          this.attributes.splice(index + 1, 0, item)
        }
      },
      save() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return;
          }
          this.attributes.splice(0,this.attributes.length);
          if (result) {
            for(let item of this.results)
            {
              this.attributes.push(item)
            }
            this.settingVisible = false;
            return;
          }
        });
      }
    },
    created() {
      validateBus.$on("validate", target => {
        this.$validator.validateAll().then(result => {
          if (result) {
            return;
          }
          validateBus.$emit("errors-changed", this.errors.items);
        });
      });
    }
  };
</script>
<style scoped>
  .el-table--mini td, .el-table--mini th {
    padding: 0;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
</style>
