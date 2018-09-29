<template>
  <section>
    <el-dialog
      title="数据字段选择"
      :visible.sync="fieldsSelectVisible"
      width="30%">

      <el-tree
        :data="dataFields"
        ref="tree"
        v-loading="listLoading"
        node-key="name"
        show-checkbox
        :default-checked-keys="formItem.cols.map(x => {return x.name})"
        :props="defaultProps"
        :highlight-current="true"
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span> <li class="fa fa-key" v-if="data.sysField"/><li class="fa fa-terminal" v-else/> {{ data.name }} / {{ node.label }} </span>
          <span class="info">{{data.type}}</span>
        </span>
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="fieldsSelectVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="getCheckedNodes" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <div class="sub-title"> <li class="fa fa-columns" /> 字段布局</div>
    <draggable v-model="formItem.cols" :options="{group:'layouts'}" @start="drag=true" @end="drag=false">
      <el-row v-for="(col, index) in formItem.cols" :key="index">
        <el-col :span="20">
          <div class="layout">
            <el-row :gutter="4">
              <el-col :span="8"><div class="grid-content bg-purple">{{col.label}}</div></el-col>
              <el-col :span="16"><div class="grid-content bg-purple">{{col.name}}</div></el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="4" style="padding-left: 4px;">
          <el-button type="text" @click="editRow(index)"><li class="fa fa-cog" /></el-button>
          <el-popover
            placement="top"
            width="160"
            trigger="click"
            v-model="popVisibles[index]">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="popVisibles.splice(index, 1, false)">取消</el-button>
              <el-button type="warning" size="mini" @click="delRow(index)">确定</el-button>
            </div>
            <el-button slot="reference" type="text"> <li class="fa fa-times" /> </el-button>
          </el-popover>
        </el-col>
      </el-row>
    </draggable>
    <el-form ref="form" label-width="60px" size="mini">
      <el-form-item label="分栏数">
        <el-input-number v-model="addColNum" :min="1" :max="12" size="mini"></el-input-number>
        <el-button type="primary" @click="addCol" size="mini" width="100%">添加列</el-button>
        <el-button type="primary" @click="selectFields" size="mini" width="100%">选择字段</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import draggable from 'vuedraggable'
  import { getTree } from '@/views/base/server/api'

  export default {
    props: {
      formItem: { type: Object },
      model: { type: String }
    },
    components: { draggable },
    data() {
      return {
        fieldsSelectVisible: false,
        fieldsListLoading: false,
        listLoading: false,
        dataFields: [],
        addColNum: 1,
        popVisibles: [],
        currentIndex: -1,
        colNum: 1,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      fetchDataFields() {
        this.fieldsListLoading = true
        getTree('dataField', this.model).then(response => {
          this.dataFields = response.data
          this.fieldsListLoading = false
        })
      },
      getCheckedNodes() {
        var checks = this.$refs.tree.getCheckedNodes()
        this.formItem.cols = []
        checks.forEach(x => {
          this.formItem.cols.push({ name: x.name, label: x.label, parent: x.parentId })
        })
        this.fieldsSelectVisible = false
      },
      addCol() {
      },
      selectFields() {
        this.fetchDataFields()
        this.fieldsSelectVisible = true
      }
    }
  }
</script>
<style scoped>
  .layout .el-row {
    margin-bottom: 6px;
  &:last-child {
     margin-bottom: 0;
   }
  }

  .layout .el-col {
    border-radius: 4px;
  }
  .layout .bg-purple {
    background: #d3dce6;
  }
  .layout .grid-content {
    padding: 2px;
    font-size: 10px;
    color: #5a5e66;
    border-radius: 4px;
    line-height: 32px;
    min-height: 32px;
  }
  .grid-content input{
    padding: 0;
  }
</style>
