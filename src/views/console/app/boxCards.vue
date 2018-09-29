<template>
  <section>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><li class="fa fa-picture-o"/> 基本设置</span>
        <el-button class="btn" type="text">
          <li class="fa fa-sort-up"/>
        </el-button>
      </div>
      <el-form label-width="60px" size="mini">
        <el-form-item label="图标">
          <icon-select v-model="value.icon" :icoSize="'64px'"></icon-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><li class="fa fa-lock"/> 公开策略</span>
        <el-button class="btn" type="text">
          <li class="fa fa-sort-up"/>
        </el-button>
      </div>
      <el-form label-width="60px" size="mini">
        <el-form-item label="发布策略">
          <publish-policy v-model="value.publishPolicy"></publish-policy>
        </el-form-item>
        <el-form-item label="API地址" style="display: none;">
          https://api.cityos.com/{{value.id}}/apikey
        </el-form-item>
        <el-form-item label="API KEY">
          <api-key-input v-model="value.apikey"></api-key-input>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><li class="fa fa-tags"/> 标签和属性</span>
        <el-button class="btn" type="text">
          <li class="fa fa-sort-up"/>
        </el-button>
      </div>
      <el-form label-width="60px" size="mini">
        <el-form-item label="标签">
          <tag v-model="value.tag"></tag>
        </el-form-item>

        <el-form-item label="属性">
          <attributes :attributes="value.attributes"></attributes>
        </el-form-item>

      </el-form>
    </el-card>

  </section>
</template>
<script>
  import validateBus from "@/views/bus/validate";
  import errorTip from "@/components/Validate/errorTip";
  import apiKeyInput from '@/components/Control/apiKeyInput';
  import publishPolicy from '@/components/Control/publishPolicy';
  import attributes from '@/components/Control/attributes';
  import tag from '@/components/Control/tag';
  import iconSelect from '@/components/Control/iconSelect';

  export default {
    props: {
      value: { type: Object }
    },
    components: {
      errorTip, apiKeyInput, publishPolicy, attributes, tag, iconSelect
    },
    data() {
      return {

      }
    },
    methods: {

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
  .box-card {
    font-size: 12px;
    color: #666666;
    margin-top: 16px;
  }

  .box-card .btn {
    float: right;
    padding: 3px 0
  }

  .box-card .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
</style>
