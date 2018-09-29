<template>
  <div>
    <el-table :data="attributes" v-if="attributes && attributes.length > 0" v-loading.body="listLoading" element-loading-text="拼命加载中"
              highlight-current-row size="mini">
      <el-table-column label="名称" prop="name">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" placeholder="请输入名称" data-vv-as="名称" :class="errors.has('name'+ scope.$index) ? 'is-error' : ''"
                    :name="'name' + scope.$index" v-validate="validate"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="120" prop="type">
        <template slot-scope="scope">
          <el-select v-model="scope.row.type" placeholder="请选择"
                     data-vv-as="类型"
                     :class="errors.has('type'+ scope.$index) ? 'is-error' : ''"
                     :name="'type' + scope.$index" v-validate="validate">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="数据" min-width="140" prop="data">
        <template slot-scope="scope">
          <el-input v-model="scope.row.data" placeholder="请输入数据" data-vv-as="值"
                    :class="errors.has('data'+ scope.$index) ? 'is-error' : ''"
                    :name="'data' + scope.$index" v-validate="validate"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="96">
        <template slot-scope="scope">
          <el-button type="text" icon="fa fa-times-circle" @click="remove(scope.row)" size="mini"></el-button>
          <el-button type="text" icon="fa fa-arrow-circle-up" @click="up(scope.row)" size="mini"></el-button>
          <el-button type="text" icon="fa fa-arrow-circle-down" @click="down(scope.row)" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="text" @click="add">
      <li class="fa fa-plus"/>
      添加
    </el-button>
  </div>
</template>
<script>
  import validateBus from '@/views/bus/validate'

  export default {
    props: {
      attributes: {type: Array}
    },
    components: {},
    data() {
      return {
        typeOptions: [
          { value: 'string', label: 'string' },
          { value: 'boolean', label: 'boolean' },
          { value: 'number', label: 'number' },
          { value: 'object', label: 'object' }
        ],
        listLoading: false,
        validate: 'required',
        value: ''
      }
    },
    methods: {
      add() {
        this.attributes.push({ key: '', type: '', value: '' })
      },
      remove(item) {
        var index = this.attributes.indexOf(item)
        if (index !== -1) {
          this.attributes.splice(index, 1)
        }
      },
      up(item) {
        var index = this.attributes.indexOf(item)
        if (index === 0) {
          // 已经是第一个了
        } else {
          if (index !== -1) {
            this.attributes.splice(index, 1)
          }
          this.attributes.splice(index - 1, 0, item)
        }
      },
      down(item) {
        var index = this.attributes.indexOf(item)
        if (index === this.attributes.length) {
          // 已经是最后一个了
        } else {
          if (index !== -1) {
            this.attributes.splice(index, 1)
          }
          this.attributes.splice(index + 1, 0, item)
        }
      }
    },
    created() {
      validateBus.$on('validate', target => {
        this.$validator.validateAll().then(result => {
          if (result) {
            return
          }
          validateBus.$emit('errors-changed', this.errors.items)
        })
      })
    }
  }
</script>
<style scoped>
  .el-table--mini td, .el-table--mini th {
    padding: 0;
  }
</style>
