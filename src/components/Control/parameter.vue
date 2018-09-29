<template>
    <div>
      <el-table v-if="items && items.length>0" :data="items" v-loading.body="listLoading" element-loading-text="拼命加载中"
        highlight-current-row size="mini" :show-header="false" empty-text>
        <el-table-column label="label" align="center" prop="label">
          <template slot-scope="scope">
            <el-input v-model="scope.row.key" placeholder="请输入KEY" v-validate.initial="validate" data-vv-as="KEY" :name="'key' + scope.$index"></el-input>
           <error-tip :errs="errors" :name="'key'+ scope.$index"></error-tip>
          </template>
        </el-table-column>
        <el-table-column label="value" width="160" align="center" prop="value">
          <template slot-scope="scope">
           <el-input v-model="scope.row.value" placeholder="请输入VALUE" v-validate.initial="validate" data-vv-as="VALUE" :name="'value' + scope.$index"></el-input>
           <error-tip :errs="errors" :name="'value'+ scope.$index"></error-tip>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="80" align="center" >
          <template slot-scope="scope">
            <el-button type="text" icon="fa fa-times-circle"  @click="removeItem(scope.row)"></el-button>
            <el-button type="text"  icon="fa fa-arrow-circle-up" @click="upItem(scope.row)"></el-button>
            <el-button type="text"  icon="fa fa-arrow-circle-down" @click="downItem(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button type="text" @click="addItem"><li class="fa fa-plus" /> {{btnText}}</el-button>

    </div>
</template>
<script>
import validateBus from "@/views/bus/validate";
import errorTip from "@/components/Validate/errorTip";
export default {
  props: {
    items: { type: Array },
    btnText: { type: String }
  },
  components: { errorTip },
  data() {
    return {
      listLoading:false,
      validate: "required",
      value: ""
    };
  },
  methods: {
    addItem() {
        if(this.items==undefined){
            this['items']=[];
        }
        else{
            this.items.push({ value: "", key: "" });
        }
    },
    removeItem(item) {
      var index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    upItem(item){
      var index = this.items.indexOf(item);
      if(index==0) //已经是第一个了
      {

      }
      else{
        if (index !== -1) {
          this.items.splice(index, 1);
        }
        this.items.splice(index -1, 0, item)
      }
    },
    downItem(item){
      var index = this.items.indexOf(item);
      if(index==this.items.length) //已经是最后一个了
      {

      }
      else{
        if (index !== -1) {
          this.items.splice(index, 1);
        }
        this.items.splice(index +1, 0, item)
      }
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
  .el-table__empty-block{
    display: none;
  }
</style>
