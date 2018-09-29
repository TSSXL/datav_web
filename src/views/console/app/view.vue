<template>
  <div class="app-container">
    <!--已手工修改-->
    <el-form ref="form" label-width="120px" size="mini" class="view">

      <el-form-item label="系统名称">
        {{system.name}}
      </el-form-item>

      <el-form-item label="访问地址">
        {{system.adress}}
      </el-form-item>

      <el-form-item label="所属单位">
        <el-tag v-for="tag in system.department" :key="tag" size="mini">{{tag}}</el-tag>
      </el-form-item>

      <el-form-item label="管理单位">
        <el-tag v-for="tag in system.management" :key="tag" size="mini">{{tag}}</el-tag>
      </el-form-item>

      <el-form-item label="分类">
        <el-tag v-for="tag in system.category" :key="tag" size="mini">{{tag}}</el-tag>
      </el-form-item>

      <el-form-item label="描述">
        {{system.desc}}
      </el-form-item>

      <el-form-item label="公开策略">
        {{system.publishPolicy ? system.publishPolicy.policy.join(' / ') : '无'}}
      </el-form-item>

      <el-form-item label="API KEY">
        {{system.apikey ? system.apikey.key : '无'}}
      </el-form-item>

      <el-form-item label="标签">
        <el-tag v-for="tag in system.tag" :key="tag" size="mini">{{tag}}</el-tag>
      </el-form-item>

      <el-form-item label="属性">
        共包含 {{system.attributes ? system.attributes.length : '0'}} 个属性
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getItem, editItem} from "./api";

  export default {
    components: {},
    props: {
      appId: {type: String}
    },
    data() {
      return {
        id: this.appId != undefined ? this.appId : this.$route.params.id,
        system: {
          name: '',
          adress: '',
          department: [],
          management: [],
          category: [],
          tag: [],
          icon: [],
          desc: '',
          publishPolicy: {policy: [], parentPolicy: '',inherit: true},
          apikey: {key: '',  parentKey:'', inherit: true},
          attributes: []
        }
      };
    },
    methods: {
      fetchData() {
        getItem(this.id).then(response => {
          this.system = response.data;
        });
      }
    },
    created() {
      this.fetchData();
    }
  };
</script>
<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

</style>
