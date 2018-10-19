<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="原始消息">
        let o = {}; //原始对象
        <codemirror v-model="content.originalMessage" :options="cmOptions" ref="myEditor"></codemirror>
        <error-tip :errs="errors" name="message"></error-tip>
      </el-form-item>
      <el-form-item label="转换脚本">
        let t = {}; //输出对象
        <p v-if="content.showMessage==true">let m={};//消息对象</p>
        <codemirror v-model="content.translatorScriptContent" :options="cmOptions"></codemirror>
        <error-tip :errs="errors" name="script"></error-tip>
        <el-button type="text" @click="trans">
          <li class="fa fa-retweet"/>
          转换
        </el-button>
      </el-form-item>
      <el-form-item label="最终消息格式">
        <codemirror v-model="content.formatMessage" :options="cmOptions"></codemirror>
        <error-tip :errs="errors" name="messageformat"></error-tip>
      </el-form-item>
      <!-- 监控用告警预警消息 -->
      <el-form-item label="最终告警消息" v-if="content.showMessage==true">
        <codemirror v-model="content.errorMessage" :options="cmOptions"></codemirror>

      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import validateBus from "@/views/bus/validate";
  import errorTip from "@/components/Validate/errorTip";
  import {getItem as getOptions} from "@/views/dev/option/api"
  import {codemirror} from 'vue-codemirror'
  import 'codemirror/lib/codemirror.css'
  // language js
  import 'codemirror/mode/javascript/javascript.js'
  // theme css
  import 'codemirror/theme/eclipse.css'
  import ElInput from "element-ui/packages/input/src/input";

  export default {
    components: {
      ElInput,
      errorTip, codemirror, draggable
    },
    props: {
      content: {type: Object}
    },
    data() {
      return {
        popRemoveVisible: false,
        fieldTypeOption: [],
        comparisonOperators: [],
        triggerActionOption: [],
        validate: "required",
        cmOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'text/javascript',
          theme: 'eclipse',
          lineNumbers: true,
          viewportMargin: Infinity
          // more codemirror options, 更多 codemirror 的高级配置...
        },
        currentRowIndex: -1,
        msgField: {
          example: "",
          desc: "",
          type: "",
          label: "",
          unit: "",
          triggers: [],
          fns: []
        },
        unitOption: [],
        dialogVisible: false,
        computingVisible: false,
        editable: true,
        isDragging: false,
        delayedDragging: false,
        fnActive: '',
        fnItem: ''
      };
    },
    methods: {
      fetchFieldTypeOptions() {
        getOptions('5a614515396b251ba0e64d0b').then(response => {
          this.fieldTypeOption = response.data.options;
        });
      },
      fetchUnitTypeOptions() {
        getOptions('5a162e2fb92f5e2c208e4f40').then(response => {
          this.unitOption = response.data.options;
        });
      },
      fetchComparisonOperatorsOptions() {
        getOptions('5a656d204705e401456df667').then(response => {
          this.comparisonOperators = response.data.options;
        });
      },
      fetchTriggerActionOption() {
        getOptions('5a65778e4705e401456df668').then(response => {
          this.triggerActionOption = response.data.options;
        });
      },
      fetchFunctionsOptions() {
      },
      trans() {
        if (!this.content.originalMessage)
          return;

        try {
          let o = this.content.originalMessage
          let t = {};
          let m="";
          eval(this.content.translatorScriptContent)
          this.content.formatMessage = JSON.stringify(t, null, 2)
          //监控用告警预警消息
          this.content.errorMessage = JSON.stringify(m, null, 2)
        } catch (error) {
          this.$message.error('转换错误！');
        } finally {

        }
      },
      transField(row) {
        if (!row.source || !row.fn)
          return;

        try {
          let o = row.source
          let t = {};
          eval(row.fn)
          row.result = JSON.stringify(t, null, 2)
        } catch (error) {
          this.$message.error('转换错误！');
        } finally {

        }
      },
      transAllField() {
        var index = 0;
        for (let row of this.msgField.fns) {
          if (index ==0 && (!row.source || !row.fn))
            return;

          if(!row.fn)
            return;

          if(index > 0)
            row.source = this.msgField.fns[index-1].result;

          try {
            let o = row.source
            let t = {};
            eval(row.fn)
            row.result = JSON.stringify(t, null, 2)
            index +=1;
          } catch (error) {
            this.$message.error('转换错误！');
          } finally {

          }
        }
      },
      handleRest() {
        if (this.content.msgFields.length == 0) {
          this.reset()
          return;
        }

        this.$confirm('重设消息字段后字段描述、单位、触发等设置将丢失！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.reset()
        }).catch(() => {

        });
      },
      reset() {
        try {
          let t = JSON.parse(this.content.formatMessage)
          var keys = Object.keys(t);
          this.content.msgFields = [];
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
            this.content.msgFields.push({
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
      addItem() {
        this.content.msgFields.push({label: '', type: '', desc: '', example: '', unit: '', triggers: [], fns:[]})
      },
      editItem(index, item) {
        this.currentRowIndex = index;
        this.msgField = {
          example: item.example,
          desc: item.desc,
          type: item.type,
          label: item.label,
          unit: item.unit,
          triggers: item.triggers ? item.triggers : [],
          fns: item.fns ? item.fns : []
        }
        this.dialogVisible = true
      },
      editFns(index, item) {
        this.currentRowIndex = index;
        this.msgField = {
          example: item.example,
          desc: item.desc,
          type: item.type,
          label: item.label,
          unit: item.unit,
          fns: item.fns ? item.fns : [],
          triggers: item.triggers ? item.triggers : [],
        }
        this.computingVisible = true
      },
      editTriggers(){

      },
      acceptEditItem() {
        let item = {
          example: this.msgField.example,
          desc: this.msgField.desc,
          type: this.msgField.type,
          label: this.msgField.label,
          unit: this.msgField.unit,
          fns: this.msgField.fns,
          triggers: this.msgField.triggers
        }
        this.content.msgFields.splice(this.currentRowIndex, 1, item);
        this.dialogVisible = false
      },
      removeItem(item) {
        var index = this.content.msgFields.indexOf(item);
        if (index !== -1) {
          this.content.msgFields.splice(index, 1);
        }
      },
      upItem(item) {
        var index = this.content.msgFields.indexOf(item);
        if (index == 0) //已经是第一个了
        {

        }
        else {
          if (index !== -1) {
            this.content.msgFields.splice(index, 1);
          }
          this.content.msgFields.splice(index - 1, 0, item)
        }
      },
      downItem(item) {
        var index = this.content.msgFields.indexOf(item);
        if (index == this.content.msgFields.length) //已经是最后一个了
        {

        }
        else {
          if (index !== -1) {
            this.content.msgFields.splice(index, 1);
          }
          this.content.msgFields.splice(index + 1, 0, item)
        }
      },
      addTrigger() {
        this.msgField.triggers.push({operator: '', value: '', action: ''})
      },
      removeTrigger(item) {
        var index = this.msgField.triggers.indexOf(item);
        if (index !== -1) {
          this.msgField.triggers.splice(index, 1);
        }
      },
      upTrigger(item) {
        var index = this.msgField.triggers.indexOf(item);
        if (index == 0) //已经是第一个了
        {

        }
        else {
          if (index !== -1) {
            this.msgField.triggers.splice(index, 1);
          }
          this.msgField.triggers.splice(index - 1, 0, item)
        }
      },
      downTrigger(item) {
        var index = this.msgField.triggers.indexOf(item);
        if (index == this.msgField.triggers.length) //已经是最后一个了
        {

        }
        else {
          if (index !== -1) {
            this.msgField.triggers.splice(index, 1);
          }
          this.msgField.triggers.splice(index + 1, 0, item)
        }
      },
      removeFn(item) {
        var index = this.msgField.fns.indexOf(item);
        if (index !== -1) {
          this.msgField.fns.splice(index, 1);
        }
      },
      onMove({relatedContext, draggedContext}) {
        //const relatedElement = relatedContext.element;
        //const draggedElement = draggedContext.element;
        //return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      },
      fnClick(item) {
        let index = this.msgField.fns.indexOf(item);
        this.fnActive = item.name;
        this.fnItem = item;
        if (index == 0) {
          this.fnItem.source = this.msgField.example;
        } else {
          this.fnItem.source = this.msgField.fns[index - 1].result;
        }
      },
      addFunction(val){
        let index = this.msgField.fns.length;
        if (index > 4)
          return;
        if (index == 0)
          this.fnItem = {name: val.name, fn: val.function, source: this.msgField.example, result: ''};
        else {
          this.fnItem = {name: val.name, fn:  val.function, source: this.msgField.fns[index - 1].result, result: ''};
        }

        this.fnActive = name;
        this.msgField.fns.push(this.fnItem)
      },
      addScript() {
        let index = this.msgField.fns.length;
        if (index > 4)
          return;
        let name = 'new script ' + (index + 1);
        if (index == 0)
          this.fnItem = {name: name, fn: 'var obj=JSON.parse(o);\nt=obj;', source: this.msgField.example, result: ''};
        else {
          this.fnItem = {name: name, fn: 'var obj=JSON.parse(o);\nt=obj;', source: this.msgField.fns[index - 1].result, result: ''};
        }

        this.fnActive = name;
        this.msgField.fns.push(this.fnItem)
      },
    },
    computed: {
      originalMsg: {
        get: function () {
          if (this.content.originalMessage) {
            return JSON.parse(this.content.originalMessage)
          } else {
            return {}
          }
        },
        set: function (val) {
          this.content.originalMessage = val;
        }
      },
      formatMsg: function () {
        if (this.content.formatMessage) {
          return JSON.parse(this.content.formatMessage)
        } else {
          return {}
        }
      },
      dragOptions() {
        return {
          animation: 0,
          group: 'description',
          disabled: !this.editable,
          ghostClass: 'ghost'
        };
      },
      lastResult() {
        if (!this.msgField.fns || this.msgField.fns.length == 0)
          return '';
        return this.msgField.fns[this.msgField.fns.length - 1].result ? this.msgField.fns[this.msgField.fns.length - 1].result : '';
      }
    },
    watch: {
      isDragging(newValue) {
        if (newValue) {
          this.delayedDragging = true
          return
        }
        this.$nextTick(() => {
          this.delayedDragging = false
        })
      }
    },
    mounted() {

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
      this.fetchFieldTypeOptions();
      this.fetchUnitTypeOptions();
      this.fetchComparisonOperatorsOptions();
      this.fetchTriggerActionOption();
      this.fetchFunctionsOptions();
      this.trans();
    }

  };
</script>
<style scoped>
  .draggable-container {
    height: 128px;
    width: 480px;
    margin: 0 auto;
    position: relative;
  }

  .list-group {
    text-align: center;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .list-group-item {
    font-size: 12px;
    float: left; /* 往左浮动 */
    display: block;
    padding: 10px 15px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #ddd;
    width: 82px;
    height: 72px;
  }

  .list-group-item > .badge {
    float: right;
  }

  .badge {
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #777;
    border-radius: 10px;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: .5;
    background: #C8EBFB;
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    cursor: pointer;
  }

  .list-group-item i {
    cursor: pointer;
  }

  .active {
    background-color: #7EC4CC;
  }

  .el-checkbox {
    margin-right: 0px;
  }
</style>
