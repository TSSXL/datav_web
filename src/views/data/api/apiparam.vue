<template>
  <div class="app-container">
    <!--已手工修改-->
    <el-form ref="form" label-width="120px" size="mini">

      <el-form-item label="URL">
        <el-input
          v-model="params.url"
          type="text"
          name="url" data-vv-as="URL" v-validate="'required'">
        </el-input>
        <error-tip :errs="errors" name="url"></error-tip>
      </el-form-item>

      <el-form-item label="Method">
        <el-select
          v-model="params.method"
          :multiple="false"
          :clearable="false"
          :filterable="false"
          :allow-create="false"
          name="method" data-vv-as="Method" v-validate="'required'">
          <el-option
            v-for="item in methodOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="link" type="text" size="mini">
          <li class="fa fa-refresh"/>
          测试连接
        </el-button>
        <error-tip :errs="errors" name="method"></error-tip>
      </el-form-item>

      <el-form-item label="Query Parameters">
        <parameter :items="params.queryParams" btnText="add query parameter"></parameter>
      </el-form-item>

      <el-form-item label="Body" v-if="params.method != 'get'">
        <el-input
          v-model="params.body"
          type="textarea" :rows="6"
          :autosize="false"
          name="body" data-vv-as="Body" v-validate="''">
        </el-input>
        <error-tip :errs="errors" name="body"></error-tip>
      </el-form-item>

      <el-form-item label="Headers">
        <parameter :items="params.headers" btnText="add header"></parameter>
      </el-form-item>

      <el-form-item label="格式化消息">
        <el-button @click="handleFormat" type="primary" size="mini">
          <li class="fa fa-file-text"/>
          格式化消息
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import errorTip from "@/components/Validate/errorTip";
  import parameter from "@/components/Control/parameter";
  //import {getItem as getOptions} from "@/views/dev/option/api"
  import {postServer} from "@/views/data/api/api"

  export default {
    components: {errorTip, parameter},
    props: {
      params: {type: Object},
      baseUrl: {type: String},
      data: {type: Object}
    },
    data() {
      return {
        methodOptions: []
      };
    },
    methods: {
      link() {

      },
      handleFormat() {

          this.formatData()

      },
      formatData() {
        postServer(this.params).then(response => {
          if (!response || !response.data)
            return

          this.data.originalMessage = JSON.stringify(response.data, null, 2);
          this.$message({
            message: '获取数据成功',
            type: 'success'
          })
          this.trans()
          this.reset()
        }).catch( err => {
          this.$message.error('获取数据失败')
        })
      },
      trans() {
        if (!this.data.originalMessage)
          return;

        try {
          let o = this.data.originalMessage
          let t = {};
          eval(this.data.translatorScriptContent)
          this.data.formatMessage = JSON.stringify(t, null, 2)
        } catch (error) {
          this.$message.error('转换错误！');
        } finally {

        }
      },
      reset() {
        try {
          let t = JSON.parse(this.data.formatMessage)
          var keys = Object.keys(t);
          this.data.msgFields = [];
          var gettype = Object.prototype.toString
          for (var i = 0; i < keys.length; i++) {
            let prototype = gettype.call(t[keys[i]])
            let type = '';
            let example = '';
            example = t[keys[i]].toString();
            if (prototype == '[object Object]') {
              type = "Object";
              example = JSON.stringify(t[keys[i]], null, 2);
            }
            else if (prototype == '[object Array]') {
              type = "Array"
              example = JSON.stringify(t[keys[i]], null, 2);
            }
            else if (prototype == '[object Number]') {
              type = "Number"
            }
            else if (prototype == '[object Boolean]') {
              type = "Boolean"
            }
            else if (prototype == '[object String]') {
              type = "String"
            }
            else {
              type = "String"
            }
            this.data.msgFields.push({
              checked: true,
              label: keys[i],
              type: type,
              desc: '',
              example: example,
              unit: '',
              triggers: []
            })
          }
        } catch (error) {
          this.$message.error('重设消息字段错误！');
        } finally {

        }
      },
      fetchmethodOptions() {
        this.methodOptions = [{ "value": "get", "label": "get" },
          { "value": "post", "label": "post" }, { "value": "put", "label": "put" },
          { "value": "delete", "label": "delete" }, { "value": "patch", "label": "patch" }];
      }
    },
    computed: {
      queryParams: function(){
        let url = this.params.url;
        //组装queryParams参数
        let arrParam = []
        let q = this.params.queryParams
        if(q && q.length > 0){
          for(var param of q){
            arrParam.push(param.key + '=' + param.value)
          }
          url += '?' + arrParam.join('&')
        }
        return {url: url}
      }
    },
    created() {
      this.fetchmethodOptions();
    }
  };
</script>
<style scoped>

</style>
