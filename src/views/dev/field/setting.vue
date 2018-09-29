<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <ul id="fieldTree" class="ztree"></ul>
      </el-col>
      <el-col :span="20">
        <div v-if="!hasField" tabindex="0" class="create-button-card"
             style="margin-bottom: 12px; margin-left:auto; margin-right:auto;" @click="add">
          <div style="padding-top:24px;"><i class="el-icon-plus"></i></div>
          <el-button type="text">新建字段</el-button>
        </div>
        <el-alert
          v-show="field != null && (field.category=='extendField' || field.category=='systemField')"
          title="提示"
          type="info"
          description="您选择的是扩展字段或系统字段"
          show-icon>
        </el-alert>
        <el-alert
          v-show="hasField && (field == null || field.category == null)"
          title="提示"
          type="info"
          description="请选择字段查看或编辑"
          show-icon>
        </el-alert>
        <section class="content" v-show="field != null && field.category == 'basicField'">
          <el-form :model="field" v-if="field" v-show="field.name != null" label-position="right" label-width="132px"
                   size="mini">
            <h3>基本</h3>
            <div>
              <el-form-item label="名称">
                <el-input v-model="field.name" v-validate="'required|alpha|not_in:'+notinFields" data-vv-as="名称"
                          name="name"
                ></el-input>
                <error-tip :errs="errors" name="name"></error-tip>
              </el-form-item>

              <el-form-item label="显示">
                <el-input v-model="field.label" v-validate="'required'" data-vv-as="显示" name="label"></el-input>
                <error-tip :errs="errors" name="label"></error-tip>
              </el-form-item>

              <el-form-item label="选择控件">
                <el-select v-model="selectField" placeholder="请选择" @change="changeValue" name="selectField">
                  <el-option v-for="item in  controlTypeOptions" :key="item.key" :label="item.display_name"
                             :value="item.key">{{item.display_name}}
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="类型" v-if="field.hasOwnProperty('type')">
                <el-radio-group v-model="field.type" placeholder="请选择" v-validate="'required'" data-vv-as="类型"
                                name="type">
                  <el-radio-button v-for="item in fieldTypeOptions"
                                   v-if="item.controls.indexOf(field.control)>-1||item.controls.length === 0"
                                   :key="item.key" :label="item.key">
                    {{item.display_name}}
                  </el-radio-button>
                </el-radio-group>
                <error-tip :errs="errors" name="type"></error-tip>
              </el-form-item>

              <el-form-item label="选择实体" v-if="field.type === 'relation'">
                <entity-list :relation="field.relation"></entity-list>
              </el-form-item>
            </div>
            <h3>控件</h3>
            <div v-if="field.control">
              <el-form-item label="控件" v-if="field.hasOwnProperty('control')">
                {{field.control}}
              </el-form-item>

              <el-switch-setting v-if="field.control == 'el-switch'" :data="field"/>
              <el-input-setting v-if="field.control == 'el-input'" :data="field"/>
              <el-autocomplete-setting v-if="field.control == 'el-autocomplete'" :data="field"/>
              <el-inputnumber-setting v-if="field.control == 'el-input-number'" :data="field"/>
              <el-radio-setting v-if="field.control == 'el-radio'" :data="field"/>
              <el-radiobutton-setting v-if="field.control == 'el-radio-button'" :data="field"/>
              <el-checkbox-setting v-if="field.control == 'el-checkbox'" :data="field"/>
              <el-checkboxbutton-setting v-if="field.control == 'el-checkbox-button'" :data="field"/>
              <el-datepicker-setting v-if="field.control == 'el-date-picker'" :data="field"/>
              <el-timepicker-setting v-if="field.control == 'el-time-picker'" :data="field"/>
              <el-time-range-setting v-if="field.control == 'el-date-picker-range'" :data="field"/>
              <el-timeselect-setting v-if="field.control == 'el-time-select'" :data="field"/>
              <el-slider-setting v-if="field.control == 'el-slider'" :data="field"/>
              <el-select-setting v-if="field.control == 'el-select'" :data="field"/>
              <el-cascader-setting v-if="field.control == 'el-cascader'" :data="field"/>
              <el-upload-setting v-if="field.control == 'el-upload'" :data="field"/>
              <el-tag-setting v-if="field.control == 'el-tag'" :data="field"/>
              <el-transfer-setting v-if="field.control == 'el-transfer'" :data="field"/>
              <a-map-setting v-if="field.control == 'a-map'" :data="field"/>
              <z-tree-setting v-if="field.control == 'z-tree'" :data="field"/>
              <account-input-setting v-if="field.control == 'account-input'" :data="field"/>
            </div>
            <h3>验证</h3>
            <validate-setting :rules="field.rules"></validate-setting>
            <div class="footer-toolbar">
              <el-button type="primary" @click="create">确 定</el-button>
              <el-button @click="cancel">取 消</el-button>
            </div>
          </el-form>
          <ul id="log" class="log" style="display:none;"></ul>
        </section>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import validateBus from "@/views/bus/validate"
  import elSwitchSetting from "@/components/ElControlSetting/elSwitchSetting"
  import elInputSetting from "@/components/ElControlSetting/elInputSetting"
  import elAutocompleteSetting from "@/components/ElControlSetting/elAutocompleteSetting"
  import elInputnumberSetting from "@/components/ElControlSetting/elInputnumberSetting"
  import elRadioSetting from "@/components/ElControlSetting/elRadioSetting"
  import elRadiobuttonSetting from "@/components/ElControlSetting/elRadiobuttonSetting"
  import elCheckboxSetting from "@/components/ElControlSetting/elCheckboxSetting"
  import elCheckboxbuttonSetting from "@/components/ElControlSetting/elCheckboxbuttonSetting"
  import elDatepickerSetting from "@/components/ElControlSetting/elDatepickerSetting"
  import elTimepickerSetting from "@/components/ElControlSetting/elTimepickerSetting"
  import elTimeRangeSetting from "@/components/ElControlSetting/elTimeRangeSetting"
  import elTimeselectSetting from "@/components/ElControlSetting/elTimeselectSetting"
  import elSelectSetting from "@/components/ElControlSetting/elSelectSetting"
  import elCascaderSetting from "@/components/ElControlSetting/elCascaderSetting"
  import elSliderSetting from "@/components/ElControlSetting/elSliderSetting"
  import elUploadSetting from "@/components/ElControlSetting/elUploadSetting"
  import elTagSetting from "@/components/ElControlSetting/elTagSetting"
  import elTransferSetting from "@/components/ElControlSetting/elTransferSetting"
  import zTreeSetting from "@/components/ExtControlSetting/zTreeSetting"
  import aMapSetting from "@/components/ExtControlSetting/aMapSetting"
  import accountInputSetting from "@/components/ExtControlSetting/accountInputSetting"

  import errorTip from "@/components/Validate/errorTip"
  import validateSetting from "@/components/Validate/validateSetting"
  import {getList, getItem, addItem, editItem, removeItem, editSort} from "@/api/field";

  import entityList from '@/views/dev/entity/selectList'
  import {getItem as getOptions} from "@/views/dev/option/api"

  const inputAttributes = {type: 'text', maxlength: 256, minlength: 0, placeholder: '', rows: 2, autosize: false};
  const autocompleteAttributes = {label: '', value: 'value', placeholder: '', trigger_on_focus: true};
  const switchAttributes = {active_text: '', inactive_text: ''};
  const radioAttributes = {disabled: false};
  const checkboxAttributes = {disabled: false};
  const inputNumberAttributes = {min: 10, max: Infinity, step: 1};
  const selectAttributes = {
    multiple: false,
    clearable: false,
    multiple_limit: 0,
    placeholder: '请选择',
    filterable: false,
    allow_create: false,
    remote: false,
    remote_method: null
  };
  const cascaderAttributes = {
    expand_trigger: 'hover',
    show_all_levels: false,
    filterable: true
  };
  const sliderAttributes = {range: true, step: 1, min: 0, max: 100, show_Stops: true,show_Input:true};
  const datepickerAttributes = {pickerOptions: {start: "", end: "", step: ""}};
  const timerangeAttributes = {pickerOptions: {start: "", end: "", step: ""}};
  const timeselectAttributes = {pickerOptions: {start: "", end: "", step: ""}};
  const timepickerAttributes = {pickerOptions: {start: "", end: ""}};
  const uploadAttributes = {
    action: 'http://localhost:3000/api/imglib/files',
    auto_upload: true,
    drag: false,
    show_file_list: true,
    list_type: '',
    multiple: false,
    limit: 1
  };
  const tagAttributes = {type: 'primary', closable: true, disable_transitions: true, type: 'small'};
  const transferAttributes = {titles: ['待选项', '选中项'], filterable: true};
  const aMapAttributes = {lng: 0, lat: 0, altitude: 0, address: "", zoom: 15, width: 500, height: 400};
  const zTreeAttributes = {};
  const accountInputAttributes = {placeholderAccount: '请输入连接账户', placeholderPassword: '请输入连接密码'};

  export default {
    components: {
      errorTip,
      elSwitchSetting,
      elInputSetting,
      elAutocompleteSetting,
      elInputnumberSetting,
      elRadioSetting,
      elRadiobuttonSetting,
      elCheckboxSetting,
      elCheckboxbuttonSetting,
      elDatepickerSetting,
      elTimepickerSetting,
      elTimeRangeSetting,
      elTimeselectSetting,
      elSliderSetting,
      elSelectSetting,
      elCascaderSetting,
      elUploadSetting,
      elTagSetting,
      elTransferSetting,
      validateSetting,
      entityList,
      aMapSetting,
      zTreeSetting,
      accountInputSetting
    },
    props: {
      propId: {type: String}
    },
    data: function () {
      return {
        entityId: this.propId != undefined ? this.propId : this.$route.params.id,
        field: {},
        notinFields: "",
        hasField: false,
        oper: "",
        selectField: '',
        treeObj: null,
        fieldTypeOptions: [
          {
            key: "string",
            display_name: "string",
            controls: ["el-input", "el-autocomplete", "el-radio", "el-radio-button", "el-select"]
          },
          {key: "number", display_name: "number", controls: ["el-input-number", "el-slider", "el-rate"]},
          {
            key: "date",
            display_name: "date",
            controls: ["el-date-picker", "el-date-picker-range", "el-time-picker", "el-time-select"]
          },
          {key: "object", display_name: "object", controls: ["a-map", "account-input"]},
          {key: "boolean", display_name: "boolean", controls: ["el-switch"]},
          {
            key: "array",
            display_name: "array",
            controls: ["el-checkbox", "el-checkbox-button", "el-upload", "el-tag", "el-transfer", "z-tree", "el-cascader"]
          },
          {key: "relation", display_name: "relation", controls: []}
        ],
        controlTypeOptions: [],
        log: null,
        curDragNodes: [],
        autoExpandNode: null,
        className: "dark",
        setting: {
          view: {
            addHoverDom: (treeId, treeNode) => {
              if (treeNode.id != 1) return false;
              var sObj = $("#" + treeNode.tId + "_span");
              if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
              var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='添加节点' onfocus='this.blur();'></span>";
              sObj.after(addStr);
              var btn = $("#addBtn_" + treeNode.tId);
              if (btn) btn.bind("click", () => {
                this.add(treeNode);
                return false;
              });
            },
            removeHoverDom: (treeId, treeNode) => {
              if (treeNode.id == 1)
                $("#addBtn_" + treeNode.tId).unbind().remove();
              return false;
            },
            selectedMulti: false
          },
          edit: {
            drag: {
//              autoExpandTrigger: true,
              prev: true,
              inner: false,
              next: true,
              isMove: true
            },
            enable: true,
            editNameSelectAll: true,
            showRemoveBtn: this.showRemoveBtn,
            showRenameBtn: false,
            removeTitle: "删除",
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            beforeDrag: this.beforeDrag,
            beforeDrop: this.beforeDrop,
            onDrop: this.onDrop,
            onExpand: this.onExpand,
            beforeEditName: this.beforeEditName,
            beforeRemove: this.beforeRemove,
            onRemove: this.onRemove,
            beforeClick: this.beforeClick,
            onClick: this.onClick
          }
        }
      };
    },
    created() {
      validateBus.$on("errors-changed", errors => {
        errors.forEach(e => {
          this.errors.add(e.field, e.msg, e.rule, e.scope);
        });
      });
      this.fetchControlOptions();
    },
    methods: {
      changeValue(value) {
        switch (value) {
          case "el-input":
            this.field.attributes = undefined;
            this.field.attributes = inputAttributes;
            this.field.value = undefined;
            this.field.value = '';
            this.field.control = "el-input";
            this.field.type = "string";
            break;
          case "el-autocomplete":
            this.field.attributes = undefined;
            this.field.attributes = autocompleteAttributes;
            this.field.value = undefined;
            this.field.value = '';
            this.field.control = "el-autocomplete";
            this.field.type = "string";
            break;
          case "el-switch":
            this.field.attributes = undefined;
            this.field.attributes = switchAttributes;
            this.field.value = undefined;
            this.field.value = '';
            this.field.control = "el-switch";
            this.field.type = "boolean";
            break;
          case "el-radio":
            //this.field.attributes = undefined;
            this.field.attributes = radioAttributes;
            //this.field.value = undefined;
            this.field.value = '';
            this.field.control = "el-radio";
            this.field.type = "string";
            break;
          case "el-radio-button":
            //this.field.attributes = undefined;
            this.field.attributes = radioAttributes;
            //this.field.value = undefined;
            this.field.value = '';
            this.field.control = "el-radio-button";
            this.field.type = "string";
            break;
          case "el-checkbox":
            //this.field.attributes = undefined;
            this.field.attributes = checkboxAttributes;
            this.field.value = undefined;
            this.field.value = [];
            this.field.control = "el-checkbox";
            this.field.type = "array";
            break;
          case "el-checkbox-button":
            //this.field.attributes = undefined;
            this.field.attributes = checkboxAttributes;
            this.field.value = undefined;
            this.field.value = [];
            this.field.control = "el-checkbox-button";
            this.field.type = "array";
            break;
          case "el-input-number":
            //this.field.attributes = undefined;
            this.field.attributes = inputNumberAttributes;
            this.field.value = undefined;
            this.field.value = 0;
            this.field.control = "el-input-number";
            this.field.type = "number";
            break;
          case "el-select":
            //this.field.attributes = undefined;
            this.field.attributes = selectAttributes;
            this.field.value = undefined;
            this.field.value = '';
            this.field.control = "el-select";
            this.field.type = "string";
            break;
          case "el-cascader":
            this.field.attributes = cascaderAttributes;
            this.field.value = undefined;
            this.field.value = [];
            this.field.control = "el-cascader";
            this.field.type = "array";
            break;
          case "el-date-picker":
            this.field.attributes = datepickerAttributes;
            this.field.value = undefined;
            this.field.value = '';
            this.field.control = "el-date-picker";
            this.field.type = "date";
            break;
          case "el-date-picker-range":
            this.field.attributes = timerangeAttributes;
            this.field.value = undefined;
            this.field.value = '';
            this.field.control = "el-date-picker-range";
            this.field.type = "date";
            break;
          case "el-time-select":
            this.field.attributes = timeselectAttributes;
            this.field.value = undefined;
            this.field.value = '';
            this.field.control = "el-time-select";
            this.field.type = "date";
            break;
          case "el-time-picker":
            this.field.attributes = timepickerAttributes;
            this.field.value = undefined;
            this.field.value = '';
            this.field.control = "el-time-picker";
            this.field.type = "string";
            break;
          case "el-upload":
            this.field.attributes = uploadAttributes;
            this.field.value = undefined;
            this.field.value = '';
            this.field.control = "el-upload";
            break;
          case "el-tag":
            this.field.attributes = tagAttributes;
            this.field.value = undefined;
            this.field.value = [];
            this.field.control = "el-tag";
            this.field.type = "array";
            break;
          case "el-transfer":
            this.field.attributes = transferAttributes;
            this.field.value = undefined;
            this.field.value = [];
            this.field.control = "el-transfer";
            this.field.type = "array";
            break;
          case "a-map":
            this.field.attributes = aMapAttributes;
            this.field.value = undefined;
            this.field.value = {lng: 0, lat: 0, altitude: 0, address: "", zoom: 15};
            this.field.control = "a-map";
            this.field.type = "object";
            break;
          case "z-tree":
            this.field.attributes = zTreeAttributes;
            this.field.value = undefined;
            this.field.value = [];
            this.field.control = "z-tree";
            this.field.type = "object";
            break;
          case "account-input":
            this.field.attributes = accountInputAttributes;
            this.field.value = undefined;
            this.field.value = {username: '', password: ''};
            this.field.control = "account-input";
            this.field.type = "object";
            break;
          case "el-slider":
            this.field.attributes = undefined;
            this.field.attributes = sliderAttributes;
            this.field.value = undefined;
            this.field.value = '';
            this.field.control = "el-slider";
            this.field.type = "number";
            break;
        }
      },
      fetchControlOptions() {
        getOptions('5a4d97f5f789ce0824e70e1b').then(response => {
          this.controlTypeOptions = response.data.options.map(item => {
              //console.log(item);
            return {key: item.value, display_name: item.label}
          });
        });
      },
      create() {
        this.errors.clear();
        validateBus.$emit("validate"); //校验子组件

        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            //console.log("this.error.any() == true");
            return;
          }

          if (result) {
            if (this.oper == "add") {
              addItem(this.field).then(response => {
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                });

                let node = this.treeObj.getNodeByParam("id", 1, null);
                this.add(node);
                this.freshArea();
              });
            } else if (this.oper == "edit") {
              editItem(this.field.id, this.field).then(response => {
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                });
                this.freshArea();
              });
            }
            return;
          }

          //console.log("Correct them errors!");
        });
      },
      add(treeNode) {
        this.errors.clear();
        this.oper = "add";
        this.field = {
          name: "",
          value: "",
          label: "",
          type: "string",
          control: "el-input",
          relation: {},
          attributes: inputAttributes,
          option: {
            type: "input",
            onlyleaf: true,
            option: {id: '', name: '', desc: ''},
            entity: {id: '', module: '', name: '', desc: '', map: ''},
            options: []
          },
          options: [],
          rules: {required: true},
          entityId: this.entityId,
          category: "basicField"
        };

        this.hasField = true;
        let nodes = treeNode.children;
        if (nodes !== undefined) {
          let childrenNodes = [];
          for (let node of treeNode.children)
            childrenNodes.push(node.field.name);
          this.notinFields = childrenNodes.join(",");
        }
      },
      cancel() {
        this.$router.push({path: "/dev/entity"});
      },
      freshArea: function () {
        this.treeObj = $.fn.zTree.init($("#fieldTree"), this.setting, []);
        let zNodes = [
          {id: 1, pId: 0, name: "基本字段", open: true, iconSkin: "category", drag: false, drop: false},
          {id: 2, pId: 0, name: "扩展字段", open: true, iconSkin: "category", drag: false, dropInner: false, drop: false},
          {id: 3, pId: 0, name: "系统字段", open: true, iconSkin: "category", drag: false, dropInner: false, drop: false}
        ];
        getList(this.entityId).then(response => {
          this.hasField = false;
          //console.log(response.data)
          for (let row of response.data) {
            //console.log(row)
            if (row.relation == undefined || row.relation == null) //设置关联实体的默认值
              row["relation"] = {id: null, name: null, desc: null};

            let node = null, iconSkin = "field";
            if (row.category == "basicField") {
              this.hasField = true; //有创建的字段了
              if (row.type == 'relation')
                iconSkin = "table"
              node = {
                id: row.id,
                pId: 1,
                name: row.label,
                field: row,
                open: true,
                iconSkin: iconSkin,
                drag: true,
                drop: true
              };
            } else if (row.category == "extendField") {
              node = {
                id: row.id,
                pId: 2,
                name: row.label,
                field: row,
                open: true,
                iconSkin: iconSkin,
                drag: false,
                drop: false
              };
            } else if (row.category == "systemField") {
              iconSkin = "sysfield"
              if (row.name == "id")
                iconSkin = "id"
              if (row.name == "createDate" || row.name == "modifyDate")
                iconSkin = "date"
              node = {
                id: row.id,
                pId: 3,
                name: row.label,
                field: row,
                open: true,
                iconSkin: iconSkin,
                drag: false,
                drop: false
              };
            }
            zNodes.push(node);
          }
          this.treeObj.addNodes(null, zNodes);
        });
      },
      beforeDrag: function (treeId, treeNodes) {
        for (var i = 0, l = treeNodes.length; i < l; i++) {
          if (treeNodes[i].drag === false) {
            return false;
          }
        }
        return true;
      },
      beforeDrop: function (treeId, treeNodes, targetNode, moveType, isCopy) {
        return targetNode ? targetNode.drop !== false : true;
      },
      onDrop: function (event, treeId, treeNodes, targetNode, moveType, isCopy) {
        let baseNode = targetNode.getParentNode();
        let nodes = baseNode.children;
        let sorts = [];
        for (let i = 0; i < nodes.length; i++) {
          sorts.push({
            id: nodes[i].field.id,
            sort: i + 1,
          })
        }
        editSort(sorts).then(response => {
          this.$notify({
            title: '成功',
            message: '排序成功',
            type: 'success',
            duration: 2000
          });
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
      beforeRemove: function (treeId, treeNode) {
        this.$confirm('此操作将删除节点 ' + treeNode.name + ', 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          removeItem(treeNode.id).then(response => {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            });
            //let node = this.treeObj.getNodeByParam("id", 1, null);
            //this.add(node);
            this.field = null;
            this.freshArea();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        return false;
        //return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
      },
      onRemove: function (e, treeId, treeNode) {
        /*
        removeItem(treeNode.id).then(response => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          });
          this.freshArea();
        });
        */
      },
      showRemoveBtn: function (treeId, treeNode) {
        return treeNode.pId == 1;
      },
      onClick: function (event, treeId, treeNode, clickFlag) {
        //if(this.field && this.field.id !== treeNode.field.id) {
        //  this.selectField = treeNode.field.control;
        //}

        this.field = treeNode.field;
        this.selectField = treeNode.field.control;
        //暂时增加
        if (!this.field.option.entity)
          this.field.option.entity = {id: '', module: '', name: '', desc: '', map: ''};
        if (treeNode.pId != 1)
          return false;
        this.errors.clear();
        this.oper = "edit";
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
      }
    },
    mounted() {
      this.freshArea();
    }
  };
</script>
<style scoped>
  @import "../../../../plugins/ztree/zTreeStyle.css";

  .content {
    padding-left: 20px;
  }

  .create-button-card {
    background-color: #fbfdff;
    border: 2px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 128px;
    height: 128px;
    cursor: pointer;
    line-height: 24px;
    vertical-align: top;
    outline: none;
    text-align: center;
    font-weight: 900;
  }

  .create-button-card i {
    font-size: 48px;
    color: #8c939d;
  }
</style>
