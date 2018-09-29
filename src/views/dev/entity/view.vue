<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="basic" size="mini">
        <el-form ref="form" label-width="120px" size="mini" class="view">
          <el-form-item label="名称">
            {{entity.name}}
          </el-form-item>
          <el-form-item label="描述">
            {{entity.desc}}
          </el-form-item>
          <el-form-item label="所属模块">
            {{entity.moduleName}}
          </el-form-item>
          <el-form-item label="创建者">
            {{entity.createUser}}
          </el-form-item>
          <el-form-item label="创建日期">
            {{entity.createDate}}
          </el-form-item>
          <el-form-item label="修改者">
            {{entity.modifyUser}}
          </el-form-item>
          <el-form-item label="修改日期">
            {{entity.modifyDate}}
          </el-form-item>
        </el-form>

      </el-tab-pane>
      <el-tab-pane label="字段信息" name="field"  size="mini">
        <field-setting :propId='id'></field-setting>

      </el-tab-pane>
      <el-tab-pane label="页面信息" name="page"  size="mini">
        <page-list :propId='id'></page-list>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import { getItem } from '@/api/entity'
import { getList } from '@/api/page'
import { parseTime } from '@/utils'
import fieldSetting from '@/views/dev/field/setting'
import pageList from '@/views/dev/page/list'

export default {
  components: { fieldSetting, pageList },
  data() {
    return {
      id: this.$route.params.id,
      activeName: this.$route.params.tab ? this.$route.params.tab : 'basic',
      entity: {},
      list: null,
      listLoading: true,
      total: null,
      listQuery: {
        entityId: this.$route.params.id,
        pageNo: 1,
        pageSize: 10,
        sort: '_id',
        order: -1
      },
      objQuery: [
        {name: { $regex: '' }},
        {desc: { $regex: '' }}
      ],
      filters:[{ text: '数据库注册', value: '数据库注册' }, { text: 'IT设备注册', value: 'IT设备注册' }]
    }
  },
  created() {
    this.fetchItem()
    this.activeName = 'basic'
  },
  methods: {
    fetchItem() {
      getItem(this.id).then(response => {
        this.entity = response.data
      })
    },
    filterTag(value, row) {
      return row.moduleName === value
    },
    parseTime(value) {
      return parseTime(value)
    },
    handleClick(tab, event) {
      //console.log(this.activeName);
      //console.log(this.$route.path);
      this.$router.push({path: this.activeName})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item__label{
  color: #999999;
}
</style>
