<template>
  <div class="app-container list">

    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini"></el-input>
      </el-col>
      <el-col :span="18">
        <el-button type="text" @click="refresh" size="mini"> 刷新 </el-button>
        <el-button type="text" @click="expand" size="mini"> 展开/收缩 </el-button>
        <el-button type="text" @click="handleAddRoot" size="mini"> 添加数据字段 </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="12" style="height: calc(100vh - 148px); overflow-y: auto">
        <el-tree
          :data="list"
          ref="tree"
          v-loading="listLoading"
          node-key="_id"
          :props="defaultProps"
          draggable
          @node-drop="nodeDrop"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span @click="() => nodeClick(node, data)"> <li class="fa fa-key" v-if="data.sysField"/><li class="fa fa-terminal" v-else/> {{ data.name }} / {{ node.label }} </span>
        <span>
          <span class="info">{{data.type}}
          <el-button
            v-if="!data.sysField && (data.name ==='properties' || data.type === 'Array')"
            type="text"
            size="mini"
            @click="() => handleAppend(node, data)">
            <li class="fa fa-plus"/>
          </el-button>
          </span>
          <el-button
            v-if="!data.sysField"
            type="text"
            size="mini"
            @click="() => handleUpdate(data)">
            <li class="fa fa-pencil"/>
          </el-button>
          <el-button
            v-if="!data.sysField"
            type="text"
            size="mini"
            @click="() => handleRemove(node, data)">
            <li class="fa fa-remove"/>
          </el-button>
        </span>
      </span>
        </el-tree>
      </el-col>
      <el-col :span="12" style="height: calc(100vh - 148px); overflow-y: auto">
        <obj-view :obj="currentNode" :props="viewProps" v-if="actionType=='view'"></obj-view>
        <span v-if="actionType=='add'">
          <span style="font-size: 14px;"> 新建数据字段</span>
        </span>
        <span v-if="actionType=='edit'">
          <span style="font-size: 14px;"> 编辑数据字段</span>
        </span>
        <el-form ref="form" label-width="120px" size="mini" v-if="actionType=='add' || actionType=='edit'">
          <el-form-item label="上级对象">
            {{newNode.parentId}}
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="newNode.name" type="text" name="name" v-validate="'required'"
                      placeholder="请输入字段名称" :class="errors.has('name') ? 'is-error' : ''"></el-input>
          </el-form-item>
          <el-form-item label="显示">
            <el-input v-model="newNode.label" type="text" name="label" v-validate="'required'"
                      placeholder="请输入字段显示名称" :class="errors.has('label') ? 'is-error' : ''"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="newNode.type" name="type" v-validate="'required'"
                       placeholder="请选择数据类型" :class="errors.has('type') ? 'is-error' : ''">
              <el-option label="字符串" value="String"></el-option>
              <el-option label="数字" value="Number"></el-option>
              <el-option label="日期" value="Date"></el-option>
              <el-option label="缓冲区" value="Buffer"></el-option>
              <el-option label="布尔值" value="Boolean"></el-option>
              <el-option label="混合" value="Mixed"></el-option>
              <el-option label="对象ID" value="Objectid"></el-option>
              <el-option label="数组" value="Array"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联模型" v-if="newNode.type === 'Objectid'">
            <el-input v-model="newNode.refObject" type="text">
            </el-input>
          </el-form-item>
          <el-form-item label="是否系统字段">
            <el-switch v-model="newNode.sysField"/>
          </el-form-item>
          <el-form-item label="必须">
            <el-switch
              v-model="newNode.rule.required">
            </el-switch>
          </el-form-item>
          <el-form-item label="format" v-if="newNode.type === 'String'">
            <el-input placeholder="请输入内容" v-model="newNode.rule.format">
              <template slot="prepend">RegExp</template>
            </el-input>
          </el-form-item>
          <el-form-item label="min" v-if="newNode.type === 'String' || newNode.type === 'Number' || newNode.type === 'Array'">
            <el-input-number v-model="newNode.rule.min" label="max"></el-input-number>
          </el-form-item>
          <el-form-item label="max" v-if="newNode.type === 'String' || newNode.type === 'Number' || newNode.type === 'Array'">
            <el-input-number v-model="newNode.rule.max" label="max"></el-input-number>
          </el-form-item>
          <el-form-item label="默认值">
            <el-input v-model="newNode.defaultValue" type="text"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="newNode.desc" type="text"></el-input>
          </el-form-item>
          <el-form-item v-if="actionType=='add'">
            <el-button @click="addDialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="append" size="mini">新 建</el-button>
          </el-form-item>
          <el-form-item v-if="actionType=='edit'">
            <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="update" size="mini">编 辑</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import baseIndex from '@/views/base/server/baseIndex'

  export default {
    extends: baseIndex,
    components: {},
    data() {
      return {
        MODEL_NAME: 'dataField',
        nodeObj: {
          type: null,
          refObject: null,
          sysField: false,
          rule: {
            required: false,
            format: null,
            min: null,
            max: null,
            defaultValue: null
          }
        },
        viewProps: ['_id', 'parentId', 'label', 'name', 'type', 'sysField', 'rule', 'defaultValue', 'desc']
      }
    },
    computed: { },
    methods: {
    },
    created() {

    }
  }
</script>
<style scoped>
</style>
