<template>
    <div class="page-component page-container">
        <el-scrollbar class='page-component__nav' tag="div">
            <el-button type="text" @click="list">列表查看</el-button>
            <el-button type="text" @click="expandAll">展开</el-button>
            <el-button type="text" @click="collapseAll">折叠</el-button>
            <ul id="organizeTree" class="ztree"></ul>
        </el-scrollbar>
        <div class="footer-toolbar">
          <el-button type="primary" @click="onSave">确 定</el-button>
          <el-button @click="list">取 消</el-button>
        </div>
        <section class="content" >
          <el-alert
            v-show="(selectOrganize == null || selectOrganize.name == null)"
            title="提示"
            type="info"
            description="请选择组织机构查看或编辑"
            show-icon>
          </el-alert>

          <section v-show="selectOrganize != null">
            <el-form :model="selectOrganize" v-if="selectOrganize" v-show="selectOrganize.name != null" label-position="right" label-width="148px"
                    style='width: 100%' size="mini">
              <h3><span v-if="selectOrganize.name != ''">编辑</span><span v-if="selectOrganize.id == null">新建</span>组织机构</h3>

                  <el-form-item label="上级机构">
                    <el-input v-model="selectOrganize.parentName" disabled></el-input>
                  </el-form-item>

                  <el-form-item label="机构名称">
                    <el-input v-model="selectOrganize.name" v-validate="'required'" data-vv-as="机构名称" name="name"></el-input>
                    <error-tip :errs="errors" name="name"></error-tip>
                  </el-form-item>

                  <el-form-item label="机构类别">
                    <el-select v-model="selectOrganize.orgType" v-validate="'required'" data-vv-as="机构类别"
                               name="orgType">
                      <el-option label="企业" value="company"></el-option>
                      <el-option label="政府" value="gov"></el-option>
                    </el-select>
                    <error-tip :errs="errors" name="orgType"></error-tip>
                  </el-form-item>

                  <el-form-item label="标签">
                    <el-tag
                      :key="tag"
                      type="small"
                      size=""
                      v-for="tag in selectOrganize.tag"
                      :closable="true"
                      :disable-transitions="true"
                      @close="handleTagtagClose(tag)">
                      {{tag}}
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="inputTagtagVisible"
                      v-model="inputTagtagValue"
                      ref="saveTagtagInput"
                      size=""
                      @keyup.enter.native="handleTagtagInputConfirm"
                      @blur="handleTagtagInputConfirm"
                    >
                    </el-input>
                    <el-button v-else size="" @click="showTagtagInput">+ 新标签</el-button>
                    <error-tip :errs="errors" name="tag"></error-tip>
                  </el-form-item>

                  <el-form-item label="描述">
                    <el-input
                      v-model="selectOrganize.desc"
                      type="textarea" :rows="5">
                    </el-input>
                    <error-tip :errs="errors" name="desc"></error-tip>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="create">应 用</el-button>
                  </el-form-item>


            </el-form>
            <ul id="log" class="log" style="display:none;"></ul>
          </section>
        </section>
    </div>
</template>

<script>
  import validateBus from "@/views/bus/validate"
  import errorTip from "@/components/Validate/errorTip"
  import faSelect from "@/components/Font-awesome/faSelect"
  import validateSetting from "@/components/Validate/validateSetting"
  import {getItem, editItem} from "./api";
  import * as UUID from "uuid";

  export default {
    components: {errorTip, faSelect},
    data: function () {
      return {
        id: this.$route.params.id,
        organize: {},
        inputTagtagVisible: false,
        inputTagtagValue: '',
        selectOrganize: {},
        treeObj: null,
        log: null,
        curDragNodes: [],
        autoExpandNode: null,
        className: "dark",
        setting: {
          view: {
            addHoverDom: (treeId, treeNode) => {
              var sObj = $("#" + treeNode.tId + "_span");
              if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
              var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='添加机构' onfocus='this.blur();'></span>";
              sObj.after(addStr);
              var btn = $("#addBtn_" + treeNode.tId);
              if (btn) btn.bind("click", () => {
                this.add(treeNode);
                return false;
              });
            },
            removeHoverDom: (treeId, treeNode) => {
              $("#addBtn_" + treeNode.tId).unbind().remove();
              return false;
            },
            selectedMulti: false,
            nameIsHTML: true, //为了可以使用fontawesome
            showIcon: false,
            showTitle: false
          },
          edit: {
            drag: {
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
          this.errors.add(e.organize, e.msg, e.rule, e.scope);
        });
      });
      this.fetchData();
    },
    methods: {
      fetchData() {
        getItem(this.id).then(response => {
          this.organize = response.data;
          let zNodes = [
            {id: this.organize.id, pId: 0, name: `<i class='fa fa-sitemap'></i> ${this.organize.name}`,organize:this.organize,open: true, drag: false, drop: false}
          ];
          if(this.organize.children != null && this.organize.children.length > 0)
            zNodes[0].children = this.organize.children;
          this.treeObj = $.fn.zTree.init($("#organizeTree"), this.setting, zNodes);
        });
      },
      create() {
        this.errors.clear();
        validateBus.$emit("validate"); //校验子组件
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            console.log("this.error.any() == true");
            return;
          }
          if (result) {
            if (this.oper == "add") {
              let parentNode = this.treeObj.getNodeByParam("id", this.selectOrganize.parentId, null);
              this.selectOrganize.id = UUID.v1();
              this.treeObj.addNodes(parentNode, {id:this.selectOrganize.id,pId:this.selectOrganize.parentId, name:`<i class='fa fa-user-circle'></i>${this.selectOrganize.name}`,organize:this.selectOrganize});
              this.add(parentNode);
            } else if (this.oper == "edit") {
              let node = this.treeObj.getNodeByParam("id", this.selectOrganize.id, null);
              node.name = `<i class='fa fa-user-circle'></i>${this.selectOrganize.name}`;
              node.organize = this.selectOrganize;
              this.treeObj.updateNode(node);
            }
          }
        });
      },
      add(treeNode) {
        this.errors.clear();
        this.selectOrganize = {
          name: "",
          parentId: treeNode.id,
          parentName:treeNode.organize.name,
          orgType:"company",
          desc: "",
          tag:[]
        };
        this.oper = "add";
      },
      beforeDrag: function (treeId, treeNodes) {
        for (let i = 0, l = treeNodes.length; i < l; i++) {
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
        if (targetNode.pId === null)
          return false;
      },
      onExpand: function (event, treeId, treeNode) {
        if (treeNode === this.autoExpandNode) {
          this.className = this.className === "dark" ? "" : "dark";
        }
      },
      beforeRemove: function (treeId, treeNode) {
        this.$confirm('此操作将删除机构 ' + treeNode.organize.name + ', 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.treeObj.removeNode(treeNode);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        return false;
      },
      showRemoveBtn: function (treeId, treeNode) {
        return treeNode.pId !== null;
      },
      onClick: function (event, treeId, treeNode, clickFlag) {
        this.errors.clear();
        this.selectOrganize = {};
        if (treeNode.pId === null)
          return false;
        this.selectOrganize = treeNode.organize;
        if(this.selectOrganize.tag == null)
          this.selectOrganize.tag = [];
        this.oper = "edit";
      },
      expandAll: function() {
        var zTree = $.fn.zTree.getZTreeObj("organizeTree")
        zTree.expandAll(true);
      },
      collapseAll: function() {
        var zTree = $.fn.zTree.getZTreeObj("organizeTree")
        zTree.expandAll(false);
      },
      list: function() {
        this.$router.push("/sm/organize/list");
      },
      handleTagtagClose(tag) {
        this.selectOrganize.tag.splice(this.selectOrganize.tag.indexOf(tag), 1);
      },
      showTagtagInput() {
        this.inputTagtagVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagtagInput.$refs.input.focus();
        });
      },
      handleTagtagInputConfirm() {
        let inputValue = this.inputTagtagValue;
        if (inputValue) {
          this.selectOrganize.tag.push(inputValue);
        }
        this.inputTagtagVisible = false;
        this.inputTagtagValue = '';
      },
      onSave() {
        let node = this.treeObj.getNodeByParam("id", this.organize.id, null);
        this.organize.children = node.children;
        editItem(this.id, this.organize).then(response => {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          });
          this.list();
        });
      }
    }
  };
</script>
<style scoped>
  @import "../../../../plugins/ztree/zTreeStyle.css";

  .content {
    padding-left: 240px;
    margin-top: 40px;
  }

  .page-component .page-component__nav {
    height: calc(100% - 22px);
    width: 240px;
    margin-top: 80px;
  }

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
