<template>
  <section>
    <draggable v-model="formItem.columns" :options="{group:'layouts'}" @start="drag=true" @end="drag=false">
      <el-row v-for="(col, index) in formItem.columns" :key="index">
        <el-col :span="20">
          <div class="layout">
            <el-row :gutter="4">
              <el-col :span="10"><div class="grid-content bg-purple">&nbsp;{{col.label}}</div></el-col>
              <el-col :span="14"><div class="grid-content bg-purple">&nbsp;{{col.dataField.join(' / ')}}</div></el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="4" style="padding-left: 4px;">
          <el-button type="text" icon="el-icon-edit-outline" @click="editColumn(col, index)" size="mini"></el-button>
          <el-popover
            placement="top"
            width="160"
            trigger="click"
            v-model="popVisibles[index]">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="popVisibles.splice(index, 1, false)">取消</el-button>
              <el-button type="warning" size="mini" @click="delColumn(index)">确定</el-button>
            </div>
            <el-button slot="reference" type="text" icon="el-icon-circle-close-outline" size="mini"></el-button>
          </el-popover>
        </el-col>
      </el-row>
    </draggable>
    <el-button type="primary" icon="el-icon-circle-plus" @click="addColumn" size="mini">添加列</el-button>
    <el-dialog title="表格列设置" :visible.sync="dialogColumnVisible" width="40%">
      <el-form :model="currentColumn" label-width="80px" size="mini">
        <el-form-item label="数据字段">
          <el-cascader
            :options="fields"
            :clearable="true"
            :props="props"
            v-model="currentColumn.dataField"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="列名">
          <el-input v-model="currentColumn.label"></el-input>
        </el-form-item>
        <el-form-item label="列宽">
          <el-input-number v-model="currentColumn.width" :min="1" :max="900" :step="20"></el-input-number>
        </el-form-item>
        <el-form-item label="排序">
          <el-switch v-model="currentColumn.sortable"></el-switch>
        </el-form-item>
        <el-form-item label="搜索">
          <el-switch v-model="currentColumn.search"></el-switch>
        </el-form-item>
        <el-form-item label="列类型">
          <el-radio-group v-model="currentColumn.type">
            <el-radio-button label="default"></el-radio-button>
            <el-radio-button label="operate"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="按钮" v-if="currentColumn.type === 'operate'">
          <el-checkbox-group v-model="currentColumn.buttons">
            <el-checkbox label="view" border>查看</el-checkbox>
            <el-checkbox label="edit" border>编辑</el-checkbox>
            <el-checkbox label="del" border>删除</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitColumnSetting">完成</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import { getTree } from './api'
  import draggable from 'vuedraggable'

  export default {
    components: {draggable},
    props: {
      formItem: {type: Object},
      model: {type: String}
    },
    data() {
      return {
        dialogColumnVisible: false,
        currentColumn: {},
        currentColumnIndex: -1,
        popVisibles: [],
        fields: [],
        props: {
          label: 'name',
          value: 'name',
          children: 'children'
        }
      }
    },
    created() {
      this.fetchFields()
    },
    methods: {
      addColumn() {
        this.formItem.columns.push({ dataField: [], label: '', width: '180', sortable: true, buttons: [], type: 'default' })
      },
      editColumn(val, index) {
        this.dialogColumnVisible = true
        this.currentColumn = val
        this.currentColumnIndex = index
      },
      submitColumnSetting() {
        this.formItem.columns.splice(this.currentColumnIndex, 1, this.currentColumn)
        this.dialogColumnVisible = false
        this.currentColumn = {}
        this.currentColumnIndex = -1
      },
      delColumn(index) {
        this.formItem.columns.splice(index, 1)
      },
      fetchFields() {
        getTree(this.model).then(res => {
          this.fields = res.data
          console.log(this.fields)
        })
      },
      handleChange(val) {
        var fields = this.fields
        val.forEach((x, index) => {
          var field = fields.find(y => {
            return y.name === x
          })
          if (index === val.length - 1) {
            this.currentColumn.label = field.label
          } else {
            fields = field.children
          }
        })
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
    padding: 4px;
    font-size: 10px;
    color: #5a5e66;
    border-radius: 4px;
    line-height: 16px;
    min-height: 16px;
  }
  .grid-content input{
    padding: 0;
  }
  .el-checkbox {
    margin-right: 0px;
  }
</style>
