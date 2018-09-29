<template>
  <section>
    <span class="info">{{displayValue}}</span>

    <el-popover
      ref="popBreakInherit"
      placement="top"
      width="160"
      v-model="popBreakInheritVisible">
      <span class="info"><li class="fa fa-info-circle"/> 此操作将取消和上级对象的继承关系</span>
      <div style="text-align: right; margin: 0">
        <el-button type="warning" size="mini" @click="breakInherit">确定</el-button>
        <el-button plain size="mini" @click="popBreakInheritVisible = false">取消</el-button>
      </div>
    </el-popover>
    <el-button v-show="value.inherit" type="text" v-popover:popBreakInherit size="mini">
      <li class="fa fa-unlink"/>
    </el-button>

    <el-button v-show="!value.inherit && !settingVisible" type="text" @click="settingVisible = true">
      修改
    </el-button>
    <div class="apikey-container" v-if="settingVisible">
      <div>
        <span class="info"><li class="fa fa-info-circle"/> 公开数据API的访问Key</span>
      </div>
      <el-input v-model="result" size="mini"></el-input>
      <el-button v-if="!value.inherit" type="text" @click="genKey" size="mini">
        <li class="fa fa-key"/>
        生成KEY
      </el-button>
      <el-button v-if="!value.inherit" type="text" @click="cleanKey" size="mini">
        <li class="fa fa-times"/>
        清除
      </el-button>

      <el-popover
        ref="popInherit"
        placement="top"
        width="160"
        v-model="popInheritVisible">
        <span class="info"><li class="fa fa-info-circle"/>此操作将继承自上级对象</span>
        <div style="text-align: right; margin: 0">
          <el-button type="warning" size="mini" @click="inherit">确定</el-button>
          <el-button plain size="mini" @click="popInheritVisible = false">取消</el-button>
        </div>
      </el-popover>
      <el-button v-show="!value.inherit && value.parentKey && value.parentKey != ''" type="text" v-popover:popInherit
                 size="mini">
        <li class="fa fa-link"/>
        继承自上级对象
      </el-button><br>

      <el-button type="primary" @click="save" size="mini">
        <li class="fa fa-check"/>
      </el-button>
      <el-button type="primary" @click="cancel" size="mini">
        <li class="fa fa-reply"/>
      </el-button>
    </div>
  </section>
</template>
<script>
  import * as UUID from "uuid";

  export default {
    props: {
      value: {type: Object}
    },
    data() {
      return {
        result: '',
        settingVisible: false,
        popBreakInheritVisible: false,
        popInheritVisible: false
      };
    },
    watch: {
      'value.key': {
        handler: function (val, oldVal) {
          this.result = val;
        },
        deep: true
      }
    },
    computed: {
      displayValue: function () {
        let result = '';
        if (this.value.inherit) //继承
        {
          result = this.value.parentKey ? this.value.parentKey.substr(0, 4) + '**********' : '无'
        } else { //非继承
          result = this.value.key ? this.value.key.substr(0, 4) + '**********' : '无'
        }
        return result;
      }
    },
    methods: {
      breakInherit() {
        this.value.inherit = false
        this.popBreakInheritVisible = false;
        this.settingVisible = true;
      },
      inherit() {
        this.value.inherit = true
        this.popInheritVisible = false;
        this.settingVisible = false;
      },
      genKey() {
        this.result = UUID.v1();
      },
      cleanKey() {
        this.result = '';
      },
      save() {
        this.value.key = this.result;
        this.settingVisible = false;
      },
      cancel() {
        this.settingVisible = false;
      }
    }
  };
</script>
<style scoped>
  .apikey-container .bottom-line {
    width: 160px;
    float: left;
    margin-right: 12px;
    padding-right: 12px;
    color: #999999;
  }

  .apikey-container:after {
    clear: both;
  }
</style>
