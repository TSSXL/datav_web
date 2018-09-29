<template>
  <section style="width: 300px; overflow: hidden">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本设置" name="basic">
        <template slot="title">
          <el-button type="text" class="title">
            <li class="fa fa-picture-o"/>
            基本设置
          </el-button>
        </template>
        <el-form label-width="60px" size="mini">
          <el-form-item label="图标">
            <icon v-model="value.icon" :icoSize="'64px'"></icon>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="公开策略" name="publishPolicy">
        <template slot="title">
          <el-button type="text" class="title">
            <li class="fa fa-lock"/>
            公开策略
          </el-button>
        </template>
        <el-form label-width="60px" size="mini">
          <el-form-item label="发布策略">
            <publish-policy-view v-model="value.publishPolicy"></publish-policy-view>
          </el-form-item>
          <el-form-item label="API地址" style="display: none;">
            https://api.cityos.com/{{value.id}}/apikey
          </el-form-item>
          <el-form-item label="API KEY">
            <api-key-view v-model="value.apikey"></api-key-view>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="标签和属性" name="tag">
        <template slot="title">
          <el-button type="text" class="title">
            <li class="fa fa-tags"/>
            标签和属性
          </el-button>
        </template>
        <el-form label-width="60px" size="mini">
          <el-form-item label="标签">
            <tag-view v-model="value.tag"></tag-view>
          </el-form-item>

          <el-form-item label="属性">
            <attributes-view :attributes="value.attributes"></attributes-view>
          </el-form-item>

        </el-form>
      </el-collapse-item>
    </el-collapse>

  </section>
</template>
<script>
  import validateBus from "@/views/bus/validate";
  import errorTip from "@/components/Validate/errorTip";
  import apiKeyView from '@/components/Control/apiKeyView';
  import publishPolicyView from '@/components/Control/publishPolicyView';
  import attributesView from '@/components/Control/attributesView';
  import tagView from '@/components/Control/tagView';
  import icon from '@/components/Control/icon';

  export default {
    props: {
      value: {type: Object}
    },
    components: {
      errorTip, apiKeyView, publishPolicyView, attributesView, tagView, icon
    },
    data() {
      return {
        activeNames: ['publishPolicy', 'tag', 'basic']
      }
    },
    methods: {},
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
  .title {
    font-size: 13px;
  }
</style>
