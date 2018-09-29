<template>
  <div class="app-container">
    <div class="side-wrapper">
      <div class="side-nav">
        <ul id="fieldTree" class="ztree"></ul>
      </div>
    </div>
    <div class="main-content">
      <section class="content">
        <div class="app-container" style="padding-top:0px;">
          <el-collapse v-model="activeNames">
          <el-collapse-item title="预览" name="preview">
          <template slot="title">
            <h3><i class="el-icon-view"></i> 预览</h3>
          </template>
          <div style="background-color: #e7ecf0; padding: 20px;">
            <h2>{{pageName}}</h2>
            <el-form ref="form" label-width="120px" size="mini">
              <el-form-item :label="field.label"  v-for="field in checkedFields" :key="field.id">
                <div v-if="field.type === 'relation'">
                  {{field.relation.name}}   {{field.relation.desc}}
                </div>

                <el-input v-else-if="field.control === 'el-input'"
                  v-model="field.value"
                  :type="field.attributes.type" :rows="field.attributes.rows"
                  :autosize="field.attributes.autosize" :disabled="field.attributes.disabled">
                </el-input>

                <el-autocomplete v-else-if="field.control === 'el-autocomplete'"
                  v-model="field.value"
                  :fetch-suggestions="querySearch"
                  :placeholder="field.attributes.placeholder"
                  :trigger-on-focus="field.attributes.trigger_on_focus"
                ></el-autocomplete>

                <el-switch v-else-if="field.control === 'el-switch'"
                  v-model="field.value"
                  :active-text="field.attributes.active_text"
                  :inactive-text="field.attributes.inactive_text">
                </el-switch>

                <el-radio-group v-else-if="field.control === 'el-radio'"
                  v-model="field.value">
                  <el-radio v-for = "(item, index) in field.option.options" :label="item.value" :key="item.value">{{item.label}}</el-radio>
                </el-radio-group>

                <el-radio-group v-else-if="field.control === 'el-radio-button'"
                  v-model="field.value">
                  <el-radio-button v-for = "(item, index) in field.option.options" :label="item.value" :key="item.value">{{item.label}}</el-radio-button>
                </el-radio-group>

                <el-checkbox-group v-else-if="field.control === 'el-checkbox'"
                  v-model="field.value">
                  <el-checkbox v-for= "(item, index) in field.option.options" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
                </el-checkbox-group>

                <el-checkbox-group v-else-if="field.control === 'el-checkbox-button'"
                  v-model="field.value">
                  <el-checkbox-button v-for= "(item, index) in field.option.options" :label="item.value" :key="item.value">{{item.label}}</el-checkbox-button>
                </el-checkbox-group>

                <el-input-number v-else-if="field.control === 'el-input-number'"
                  v-model="field.value" :min="field.attributes.min" :max="field.attributes.max" :step="field.attributes.step"></el-input-number>

                <el-select v-else-if="field.control === 'el-select'"
                  v-model="field.value" :multiple="field.attributes.multiple" :clearable="field.attributes.clearable" :filterable="field.attributes.filterable" :allow-create="field.attributes.allowCreate">
                  <el-option
                    v-for="item in field.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

                <el-time-select v-else-if="field.control === 'el-time-select'"
                  v-model="field.value"
                  :picker-options="field.attributes.pickerOptions">
                </el-time-select>

                <el-date-picker v-else-if="field.control === 'el-date-picker'"
                  v-model="field.value"
                  :type="field.attributes.type">
                </el-date-picker>

                <el-date-picker v-else-if="field.control === 'el-date-picker-range'"
                  v-model="field.value"
                  :type="field.attributes.type"
                  :picker-options="field.attributes.pickerOptions">
                </el-date-picker>

                <el-slider v-else-if="field.control === 'el-slider'"
                  v-model="field.value"
                  :range="field.attributes.range"
                  :step="field.attributes.step"
                  :show-stops="field.attributes.showStops"
                  :min="field.attributes.min"
                  :max="field.attributes.max"
                  :show-input="field.attributes.show_Input">
                </el-slider>

                <el-rate v-else-if="field.control === 'el-rate'"
                  v-model="field.value" :allow-half="field.attributes.allowHalf">
                </el-rate>

                <el-upload v-else-if="field.control === 'el-upload'"
                  class="avatar-uploader"
                  :action="field.attributes.action"
                  :drag="field.attributes.drag"
                  :show-file-list="field.attributes.show_file_list"
                  :list-type = "field.attributes.list_type"
                  :multiple = "field.attributes.multiple"
                  :limit = "field.attributes.limit">
                  <i class="el-icon-plus"></i>
                  <div slot="tip" v-if="field.attributes.tip != ''" class="el-upload__tip">{{field.attributes.tip}}</div>
                </el-upload>

                <section v-else-if="field.control === 'el-tag'">
                  <el-tag
                    :key="tag"
                    :type="field.attributes.type"
                    :size="field.attributes.size"
                    v-for="tag in field.value"
                    :closable="field.attributes.closable"
                    :disable-transitions="field.attributes.disable_transitions"
                    @close="handleClose(tag)">
                    {{tag}}
                  </el-tag>
                  </el-input>
                  <el-button size="small">+ 新标签</el-button>
                </section>

                <el-transfer v-else-if="field.control === 'el-transfer'"
                  :filterable="field.attributes.filterable"
                  :titles="field.attributes.titles"
                  :filter-method="filterMethod"
                  :filter-placeholder="field.attributes.placeholder"
                  v-model="field.value"
                  :props="{key: 'value',label: 'label'}">
                </el-transfer>

                <z-tree-select v-else-if="field.control === 'z-tree'" :treeid="field.name" v-model="field.value" :onlyleaf="field.option.onlyleaf" :options="field.option.options">
                </z-tree-select>

                <a-map v-else-if="field.control === 'a-map'" v-model="field.value" :width="field.attributes.width" :height="field.attributes.height" :zoom="field.attributes.zoom">
                </a-map>

                <account-input v-else-if="field.control === 'account-input'" v-model="field.value">
                </account-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="create" size="mini">确 定</el-button>
                <el-button size="mini">取 消</el-button>
              </el-form-item>
            </el-form>
          </div>

        </el-collapse-item>
        <el-collapse-item title="设置" name="setting">
        <template slot="title">
        <h3><i class="el-icon-setting"></i> 设置</h3>
        </template>
          <div style="padding-bottom:20px;">
            页面类型
            <el-radio-group v-model="pageType">
              <el-radio-button label="add">新建页面</el-radio-button>
              <el-radio-button label="edit">编辑页面</el-radio-button>
            </el-radio-group>
          </div>

        </el-collapse-item>
    </el-collapse>
        </div>
        <div class="footer-toolbar">
          <el-button type="primary" @click="create">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
        <ul id="log" class="log" style="display:none;"></ul>
      </section>
    </div>
  </div>


</template>

<script>
  import validateBus from "@/views/bus/validate"
  import errorTip from "@/components/Validate/errorTip"
  import validateSetting from "@/components/Validate/validateSetting"
  import {getItem, editItem} from "@/api/page";
  import {getList} from "@/api/field";
  import zTreeSelect from '@/components/Control/zTreeSelect';
  import aMap from '@/components/Control/aMap';
  import accountInput from '@/components/Control/accountInput';

  export default {
    components: {
      errorTip,
      validateSetting,
      zTreeSelect,
      aMap,
      accountInput
    },
    data: function () {
      return {
        id: this.$route.params.id,
        activeNames: ["preview", "setting"],
        page: { attributes:{ type: '', fields: []}},
        entity: {},
        entityId: "",
        checkedFields: [],
        pageType: '',
        log: null,
        autoExpandNode: null,
        className: "dark",
        filterMethod(query, item) {
          return item.value.indexOf(query) > -1;
        },
        setting: {
          view: {
            selectedMulti: true
          },
          edit: {

          },
          check: {
            enable: true
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            onCheck: this.onCheck,
            onClick: this.onClick
          }
        }
      };
    },
    created() {
      this.fetchData();
      validateBus.$on("errors-changed", errors => {
        errors.forEach(e => {
          this.errors.add(e.field, e.msg, e.rule, e.scope);
        });
      });
    },
    methods: {
      fetchData() {
        getItem(this.id).then(response => {
          this.page = response.data;
          //设置页面类型，是新建页面还是编辑页面
          if(this.page.attributes !== undefined && this.page.attributes.type === '')
          {
            if(this.page.name == 'add.vue')
              this.pageType = 'add';
            else if(this.page.name == 'edit.vue')
              this.pageType = 'edit';
          }
          else
            this.pageType = this.page.attributes.type;

          //选中项设置
          if(this.page.attributes !== undefined){
            for(let field of this.page.attributes.fields){
              this.checkedFields.push(field);
            }
          }
          this.entityId = this.page.entityId;
          this.freshArea();
          //this.getCheckedNodes();
        });
      },
      create() {
        if(this.page.attributes === undefined)
          this.page["attributes"] = {};
        this.page.attributes["type"] = this.pageType;
        this.page.attributes.fields = this.checkedFields;

        editItem(this.page.id, this.page).then(response => {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.$router.go(-1)
        });
        return;
      },
      cancel() {
        this.$router.go(-1)
      },
      getCheckedNodes(){
        var treeObj = $.fn.zTree.getZTreeObj("fieldTree");
        var nodes = treeObj.getCheckedNodes(true);
        this.checkedFields = [];

        nodes.forEach(function(el) {
          if(el.check_Child_State < 0) //只获取叶子节点
          {
            this.checkedFields.push(el.field)
          }
        }, this);
        //console.log(this.checkedFields)
      },
      onCheck: function(e, treeId, treeNode) {
        this.getCheckedNodes()
      },
      freshArea: function () {
        let treeObj = $.fn.zTree.init($("#fieldTree"), this.setting, []);
        let zNodes = [
          {id: 1, pId: 0, name: "基本字段", open: true, iconSkin:"category", drag: false, drop: false},
          {id: 2, pId: 0, name: "扩展字段", open: true, iconSkin:"category", drag: false, dropInner: false, drop: false, chkDisabled:true },
          {id: 3, pId: 0, name: "系统字段", open: true, iconSkin:"category", drag: false, dropInner: false, drop: false, chkDisabled:true}
        ];

        getList(this.entityId).then(response => {
          for (let row of response.data) {
            let node = null,iconSkin = "field";
            if (row.category == "basicField") {
              if(row.type == 'relation')
                iconSkin = "table"

              node = {id: row.id, pId: 1, name: row.label, field: row, open: true,iconSkin: iconSkin, drag: true, drop: true};
              node.checked = this.checkedFields.find(function(x){return x._id === row.id}) != undefined
            } else if (row.category == "extendField") {
              node = {id: row.id, pId: 2, name: row.label, field: row, open: true, iconSkin: iconSkin,drag: false, drop: false, chkDisabled:true};
            } else if (row.category == "systemField") {
              iconSkin = "sysfield"
              if (row.name == "id")
                iconSkin = "id"
              if (row.name == "createDate" || row.name == "modifyDate")
                iconSkin = "date"
              node = {id: row.id, pId: 3, name: row.label, field: row, open: true, iconSkin: iconSkin,drag: false, drop: false, chkDisabled:true};
            }
            zNodes.push(node);
          }
          treeObj.addNodes(null, zNodes);
        });
      },
      onExpand: function (event, treeId, treeNode) {
        if (treeNode === this.autoExpandNode) {
          this.className = this.className === "dark" ? "" : "dark";
          this.showLog(
            "[ " +
            this.getTime() +
            " onExpand ]&nbsp;&nbsp;&nbsp;&nbsp;" +
            treeNode.name
          );
        }
      },
      onClick: function (event, treeId, treeNode, clickFlag) {
        if (treeNode.pId != 1)
          return false;
        this.errors.clear();
        this.oper = "edit";
        this.field = treeNode.field;
        console.log(this.field)
      },
      showLog: function (str) {
        if (!this.log) this.log = $("#log");
        this.log.append("<li class='" + this.className + "'>" + str + "</li>");
        if (this.log.children("li").length > 8) {
          this.log.get(0).removeChild(this.log.children("li")[0]);
        }
      },
      getTime: function () {
        var now = new Date(),
          h = now.getHours(),
          m = now.getMinutes(),
          s = now.getSeconds(),
          ms = now.getMilliseconds();
        return h + ":" + m + ":" + s + " " + ms;
      },
      querySearch(queryString, cb) {
      }
    },
    mounted() {
      //this.freshArea();
    },
    computed:{
      pageName: function(){
        let name = '';
        if(this.pageType == 'add')
          name = '新建页面';
        else if(this.pageType == 'edit')
          name = '编辑页面';
        else
          name = '请选择页面类型';
        return name;
      }
    }
  };
</script>
<style scoped>
  @import "../../../../../plugins/ztree/zTreeStyle.css";

  .side-wrapper {
    width: 220px;
    position: fixed;
    top: 0;
    bottom: 0;
    margin-top: 80px;
    transition: padding-top .3s;
    overflow: hidden;
    margin-bottom: -17px;
    margin-right: -17px;
  }

  .side-nav {
    height: 100%;
    padding-top: 20px;
    padding-bottom: 50px;
    padding-right: 0;
    overflow: scroll;
    margin-bottom: -17px;
    margin-right: -17px;
  }

  .main-content {
    padding-top: 0px;
    margin-left: 220px;
  }


  .box-card {
    width: 720px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
</style>
