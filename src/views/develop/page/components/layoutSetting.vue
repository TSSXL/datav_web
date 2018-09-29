<template>
  <section>
    <el-dialog
      title="编辑行"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form label-width="80px" size="mini">
        <el-form-item label="列数">
          <el-input-number v-model="colNum" :min="1" :max="12" @change="changeColNum"></el-input-number>
        </el-form-item>
        <div class="layout">
          <el-row :gutter="6">
            <el-col v-for="(col, index) in cols" :key="index" :span="col">
              <div class="grid-content bg-purple" style="text-align: center">
                <el-button type="text" @click="colMinus(index)"><li class="fa fa-caret-left"/></el-button>
                {{cols[index]}}
                <el-button type="text" @click="colPlus(index)"><li class="fa fa-caret-right"/></el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-alert v-if="colTotal > 24"
          title="布局分栏数请不要超过 24"
          type="warning">
        </el-alert>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="acceptRowSetting" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <div class="sub-title"> <li class="fa fa-columns" /> 页面布局</div>
    <draggable v-model="result" :options="{group:'layouts'}" @start="drag=true" @end="drag=false">
      <el-row v-for="(row, index) in result" :key="index">
        <el-col :span="20">
          <div class="layout">
            <el-row :gutter="6">
              <el-col v-for="(col, index) in row.cols" :key="index" :span="col.span"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="4" style="padding-left: 4px;">
          <el-button type="text" @click="editRow(index)"> <li class="fa fa-cog" /> </el-button>
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
        <el-button type="primary" @click="addRow" size="mini" width="100%">添加行</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    props: {
      layout: { type: Array }
    },
    components: { draggable },
    data() {
      return {
        popVisibles: [],
        addColNum: 1,
        result: this.layout,
        dialogVisible: false,
        currentIndex: -1,
        colNum: 1,
        cols: [24]
      }
    },
    watch: {
      layout(val) {
        this.result = val
        this.popVisibles = []
        // 绑定删除行确认提示框显示变量
        for (var i = 0; i < this.result.length; i++) {
          this.popVisibles.push(false)
        }
      },
      result(val) {
        this.$emit('on-result-change', val)
      }
    },
    computed: {
      colTotal: function() {
        var sum = 0
        this.cols.forEach(x => {
          sum += x
        })
        return sum
      }
    },
    methods: {
      colPlus(index) {
        var val = this.cols[index] + 1
        if (val >= 24) return
        this.cols.splice(index, 1, val)
      },
      colMinus(index) {
        var val = this.cols[index] - 1
        if (val <= 2) return
        this.cols.splice(index, 1, val)
      },
      changeColNum(val) {
        this.cols = []
        if (val === 5) {
          this.cols = [5, 5, 5, 5, 4]
        } else if (val === 7){
          this.cols = [4, 4, 4, 3, 3, 3, 3]
        } else if (val === 9){
          this.cols = [3, 3, 3, 3, 3, 3, 2, 2, 2]
        } else if (val === 10){
          this.cols = [3, 3, 3, 3, 2, 2, 2, 2, 2, 2]
        } else if (val === 11){
          this.cols = [3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2]
        } else {
          var cellWidth = parseInt(24/val)
          for (var i = 0; i < val; i++) {
            this.cols.push(cellWidth)
          }
        }
      },
      addRow() {
        this.changeColNum(this.addColNum)
        var cols = []
        for (const item of this.cols) {
          cols.push({ data: [], span: item })
        }
        this.result.push({ cols: cols })
      },
      editRow(index) {
        this.dialogVisible = true
        this.currentIndex = index
        this.cols = this.result[index].cols.map(x => { return x.span })
        this.colNum = this.cols.length
      },
      delRow(index) {
        this.result.splice(index, 1)
        this.popVisibles.splice(index, 1)
      },
      acceptRowSetting() {
        var currentRow = this.result[this.currentIndex]
        var currentColTotal = currentRow.cols.length
        var newResult = []
        this.cols.forEach((val, index) => {
          if (currentColTotal >= index + 1) {
            newResult.push({ data: currentRow.cols[index].data, span: val })
          } else {
            newResult.push({ data: [], span: val })
          }
        })
        // 当减少列数，需要处理data
        var v = currentColTotal - this.cols.length
        if (v > 0) {
          for (var i = 0; i < v; i++) {
            for (const item of currentRow.cols[this.cols.length + i].data) {
              newResult[newResult.length - 1].data.push(item)
            }
          }
        }

        this.result.splice(this.currentIndex, 1, { cols: newResult })
        this.currentIndex = -1
        this.dialogVisible = false
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
    border-radius: 4px;
    line-height: 32px;
    min-height: 32px;
  }
  .grid-content input{
    padding: 0;
  }
</style>
