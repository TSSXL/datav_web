<template>
  <div class="app-container item">
    <h3>新建模块</h3>
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
  import attributesEdit from '@/components/attributes/attributesEdit'

  export default {
    extends: baseAdd,
    components: { attributesEdit },
    data() {
      return {
        MODEL_NAME: 'module',
        model: {
          attributes: []
        }
      }
    },
    computed: {

    },
    methods: {

    },
    created() {

    }
  }
</script>
<style scoped>

</style>
