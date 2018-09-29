<template>
  <div class="app-container item">
    <h3>新建模型</h3>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="名称">
        <el-input v-model="model.name" type="text" name="name" v-validate="'required'"
                  placeholder="请输入名称" :class="errors.has('name') ? 'is-error' : ''">
        </el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="model.desc" type="textarea" :rows="1" :autosize="true" name="desc" v-validate="'required'"
                  placeholder="请输入描述" :class="errors.has('desc') ? 'is-error' : ''">
        </el-input>
      </el-form-item>

      <el-form-item label="所属模块">
        <el-select v-model="model.refModule" data-vv-as="所属模块" name="module" v-validate="'required'"
                   placeholder="请选择所属的系统模块" :class="errors.has('module') ? 'is-error' : ''">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Client">
        <el-radio-group v-model="model.client">
          <el-radio-button label="none">无</el-radio-button>
          <el-radio-button label="vue">Vue</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Server">
        <el-radio-group v-model="model.server">
          <el-radio-button label="none">无</el-radio-button>
          <el-radio-button label="node_egg">Node EGG</el-radio-button>
          <el-radio-button label="java" disabled>JAVA</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="持久化">
        <el-radio-group v-model="model.dataStorage">
          <el-radio-button label="none">无</el-radio-button>
          <el-radio-button label="mongodb">MongoDB</el-radio-button>
          <el-radio-button label="mysql" disabled>MySql</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="唯一性校验">
        <el-input v-model="model.exist" type="text">
        </el-input>
      </el-form-item>

      <el-form-item label="属性">
       <attributes-edit :attributes="model.attributes"></attributes-edit>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import baseAdd from '@/views/base/server/baseAdd'
  import { getAll } from '@/views/base/server/api'
  import attributesEdit from '@/components/attributes/attributesEdit'

  export default {
    extends: baseAdd,
    components: { attributesEdit },
    data() {
      return {
        MODEL_NAME: 'model',
        options: [],
        model: {
          refModule: '',
          dataStorage: 'none',
          client: 'none',
          server: 'none',
          attributes: []
        }
      }
    },
    computed: {},
    methods: {
      fetchModules() {
        getAll('module').then(res => {
          this.options = res.data.map(x => {
            return { value: x._id, label: `${x.desc} / ${x.name}` }
          })
        })
      }
    },
    created() {
      this.fetchModules()
    }
  }
</script>
<style scoped>

</style>
