<template>
    <div class="page-component page-container">
        <el-scrollbar class='page-component__nav' tag="div">
            <el-button type="text" @click="expandAll">展开</el-button>
            <el-button type="text" @click="collapseAll">折叠</el-button>
            <ul id="resourceEntityTree" class="ztree"></ul>
        </el-scrollbar>

        <section class="content" >
          <el-alert
            v-show="(active == null || active == '')"
            title="提示"
            type="info"
            description="请选择主体查看或编辑"
            show-icon>
          </el-alert>

          <section v-show="active != null && active != ''">
            <el-form label-position="right" label-width="148px" style='width: 100%;' size="mini">
              <div v-if="active == 'resourceEntity_add' || active == 'resourceEntity_edit'">
                <el-container>
                  <el-main class="el-main">
                    <el-row>
                      <el-col :span="14"><h3><i class="el-icon-menu"></i>主体编辑</h3></el-col>
                      <el-col :span="10" style="text-align: right">
                        <el-button type="text" @click="addKeys"><i class="el-icon-circle-plus"></i>业务主键</el-button>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="主体名称">
                          <el-input
                            v-model="resourceEntity.name"
                            type="text" :rows="2"
                            :autosize="false"
                            name="name" data-vv-as="主体名称" v-validate="'required'">
                          </el-input>
                          <error-tip :errs="errors" name="name"></error-tip>
                        </el-form-item>
                        <el-form-item label="主体描述">
                          <el-input
                            v-model="resourceEntity.desc"
                            type="textarea" :rows="5">
                          </el-input>
                          <error-tip :errs="errors" name="desc"></error-tip>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>

                <el-container v-for="(entityKey, index) in entityKeys" :key="entityKey.keyId">
                  <el-main class="el-main">
                    <el-row>
                      <el-col :span="14"><h3><i class="el-icon-setting"></i>业务主键{{index+1}}</h3></el-col>
                      <el-col :span="10" style="text-align: right">
                        <el-button type="text" @click="removeKeys(index)"><i class="el-icon-close">删除</i></el-button>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="业务主键名称">
                          <el-input
                            v-model="entityKey.keyName"
                            type="text" :rows="2"
                            :autosize="false"
                            :name="'keyName_'+index" data-vv-as="业务主键名称" v-validate="'required'">
                          </el-input>
                          <error-tip :errs="errors" :name="'keyName_'+index"></error-tip>
                        </el-form-item>
                        <el-form-item label="是否通用">
                          <el-radio-group v-model="entityKey.isUniform">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                          </el-radio-group>
                          <error-tip :errs="errors" name="isUniform"></error-tip>
                        </el-form-item>
                        <el-form-item label="主键明细">
                          <el-button type="text" @click="addColumns(entityKeys,index)"><i class="el-icon-circle-plus">添加</i></el-button>
                          <el-table :data="entityKey.columns" fit highlight-current-row size="mini" v-if="entityKey.columns != null && entityKey.columns.length > 0">
                            <el-table-column key='columnName'
                                             show-overflow-tooltip
                                             label="名称"
                                             width="" align="center" prop="columnName">
                              <template slot-scope="scope">
                                <el-input v-model="scope.row.columnName"></el-input>
                              </template>
                            </el-table-column>
                            <el-table-column key='columnType'
                                             show-overflow-tooltip
                                             label="数据类型"
                                             width="" align="center" prop="columnType">
                              <template slot-scope="scope">
                                <el-select v-model="scope.row.columnType">
                                  <el-option
                                    v-for="item in dbTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </template>
                            </el-table-column>
                            <el-table-column  label="操作" width="128" align="center" >
                              <template slot-scope="scope">
                                <el-button type="text" @click="removeColumns(entityKeys,index,scope.$index)" size="mini"><i class="el-icon-close">删除</i></el-button>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
              </div>
              <div v-else-if="active == 'entityCategory_add' || active == 'entityCategory_edit'">
                <el-container>
                  <el-main class="el-main">
                    <el-row>
                      <el-col :span="14"><h3><i class="el-icon-menu"></i>主体分类编辑</h3></el-col>
                      <el-col :span="10" style="text-align: right">
                        <el-button type="text" @click="addPublicKeys"><i class="el-icon-circle-plus"></i>添加同主体</el-button>
                        <el-button type="text" @click="addCustomKeys"><i class="el-icon-circle-plus"></i>添加自定义</el-button>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="所属主体">{{resourceEntity.name}}</el-form-item>
                        <el-form-item label="主体分类名称">
                          <el-input
                            v-model="resourceEntityCategory.categoryName"
                            type="text" :rows="2"
                            :autosize="false"
                            name="name" data-vv-as="主体分类名称" v-validate="'required'">
                          </el-input>
                          <error-tip :errs="errors" name="categoryName"></error-tip>
                        </el-form-item>
                        <el-form-item label="主体分类描述">
                          <el-input
                            v-model="resourceEntityCategory.categoryDesc"
                            type="textarea" :rows="5">
                          </el-input>
                          <error-tip :errs="errors" name="desc"></error-tip>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
                <el-container v-for="(entityKey, index) in publicKeys" :key="entityKey.keyId">
                  <el-main class="el-main">
                    <el-row>
                      <el-col :span="14"><h3><i class="el-icon-setting"></i>同主体业务主键{{index+1}}</h3></el-col>
                      <el-col :span="10" style="text-align: right">
                        <el-button type="text" @click="removePublicKeys(index)"><i class="el-icon-close">删除</i></el-button>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="业务主键名称">{{entityKey.keyName}}</el-form-item>
                        <el-form-item label="是否通用">
                          <div v-if="entityKey.isUniform">是</div>
                          <div v-else>否</div>
                        </el-form-item>
                        <el-form-item label="主键明细">
                          <el-table :data="entityKey.columns" fit highlight-current-row size="mini" v-if="entityKey.columns != null && entityKey.columns.length > 0">
                            <el-table-column key='columnName'
                                             show-overflow-tooltip
                                             label="名称"
                                             width="" align="center" prop="columnName">
                              <template slot-scope="scope">{{scope.row.columnName}}</template>
                            </el-table-column>
                            <el-table-column key='columnType'
                                             show-overflow-tooltip
                                             label="数据类型"
                                             width="" align="center" prop="columnType">
                              <template slot-scope="scope">
                                {{ dbTypeOptions.find((n) => n.value == scope.row.columnType).label}}
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
                <el-container v-for="(entityKey, index) in customKeys" :key="entityKey.keyId">
                  <el-main class="el-main">
                    <el-row>
                      <el-col :span="14"><h3><i class="el-icon-setting"></i>自定义业务主键{{index+1}}</h3></el-col>
                      <el-col :span="10" style="text-align: right">
                        <el-button type="text" @click="removeCustomKeys(index)"><i class="el-icon-close">删除</i></el-button>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="业务主键名称">
                          <el-input
                            v-model="entityKey.keyName"
                            type="text" :rows="2"
                            :autosize="false"
                            :name="'keyName_'+index" data-vv-as="业务主键名称" v-validate="'required'">
                          </el-input>
                          <error-tip :errs="errors" :name="'keyName_'+index"></error-tip>
                        </el-form-item>
                        <el-form-item label="是否通用">
                          <el-radio-group v-model="entityKey.isUniform">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                          </el-radio-group>
                          <error-tip :errs="errors" name="isUniform"></error-tip>
                        </el-form-item>
                        <el-form-item label="主键明细">
                          <el-button type="text" @click="addColumns(customKeys,index)"><i class="el-icon-circle-plus">添加</i></el-button>
                          <el-table :data="entityKey.columns" fit highlight-current-row size="mini" v-if="entityKey.columns != null && entityKey.columns.length > 0">
                            <el-table-column key='columnName'
                                             show-overflow-tooltip
                                             label="名称"
                                             width="" align="center" prop="columnName">
                              <template slot-scope="scope">
                                <el-input v-model="scope.row.columnName"></el-input>
                              </template>
                            </el-table-column>
                            <el-table-column key='columnType'
                                             show-overflow-tooltip
                                             label="数据类型"
                                             width="" align="center" prop="columnType">
                              <template slot-scope="scope">
                                <el-select v-model="scope.row.columnType">
                                  <el-option
                                    v-for="item in dbTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </template>
                            </el-table-column>
                            <el-table-column  label="操作" width="128" align="center" >
                              <template slot-scope="scope">
                                <el-button type="text" icon="fa fa-trash-o" @click="removeColumns(customKeys,index,scope.$index)" size="mini"> 删除</el-button>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
              </div>
              <el-form-item>
                <el-button type="primary" @click="create">保 存</el-button>
              </el-form-item>
            </el-form>
            <ul id="log" class="log" style="display:none;"></ul>
          </section>
        </section>
      <el-dialog title="同主体业务主键" :visible.sync="columnDialogVisible" width="20%">
        <ul id="entityKeyTree" class="ztree"></ul>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="selectPublicKeys" size="small">选 择</el-button>
          <el-button @click="columnDialogVisible = false" size="small">取 消</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import validateBus from "@/views/bus/validate"
  import errorTip from "@/components/Validate/errorTip"
  import faSelect from "@/components/Font-awesome/faSelect"
  import {getList,addItem,editItem, removeItem,addItemCategory,editItemCategory,removeItemCategory } from "./api"
  import { getItem as getOptions } from "@/views/dev/option/api"
  import * as UUID from "uuid";

  export default {
    components: {errorTip, faSelect},
    data: function () {
      return {
        menu: {},
        columnDialogVisible:false,
        active:"",
        resourceEntity:{
          name:"",
          desc:"",
          categories:[]
        },
        entityKeys:[],
        deleteKeys:[],
        resourceEntityCategory:{
          categoryId:"",
          categoryName:"",
          categoryDesc:""
        },
        publicKeys:[],
        delPublicKeys:[],
        customKeys:[],
        delCustomKeys:[],
        dbTypeOptions: [{label:'', value:''}],
        treeObj: null,
        selTreeObj: null,
        log: null,
        autoExpandNode: null,
        className: "dark",
        selTreeSetting: {
          view:{
            selectedMulti: false,
            nameIsHTML: true,
            showIcon: false,
            showTitle: false
          },
          check: {
            enable: true,
            nocheckInherit: true
          },
          data: {
            simpleData: {
              enable: true
            }
          }
        },
        setting: {
          view: {
            addHoverDom: (treeId, treeNode) => {
              if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0 || treeNode.type == "category") return;
              let sObj = $("#" + treeNode.tId + "_span");
              let addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='添加主体' onfocus='this.blur();'></span>";
              sObj.after(addStr);
              let btn = $("#addBtn_" + treeNode.tId);
              if (btn) btn.bind("click", () => {
                if (treeNode.type == "root"){
                  this.addResourceEntity();
                }else if (treeNode.type == "subject"){
                  this.resourceEntity = treeNode.entity;
                  this.addResourceEntityCategory();
                }
                return false;
              });
            },
            removeHoverDom: (treeId, treeNode) => {
              $("#addBtn_" + treeNode.tId).unbind().remove();
              return false;
            },
            selectedMulti: false,
            nameIsHTML: true,
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
          this.errors.add(e.menu, e.msg, e.rule, e.scope);
        });
      });
      this.fetchData();
    },
    methods: {
      addKeys(){
        this.entityKeys.push({
          keyName:"",
          isUniform:true,
          columns:[]
        });
      },
      removeKeys(index){
        if(this.entityKeys[index].id != null && this.entityKeys[index].id != "")
          this.deleteKeys.push(this.entityKeys[index].id);
        this.entityKeys.splice(index, 1);
      },
      addCustomKeys(){
        this.customKeys.push({
          keyName:"",
          isUniform:true,
          columns:[]
        });
      },
      removeCustomKeys(index){
        if(this.customKeys[index].id != null && this.customKeys[index].id != "")
          this.delCustomKeys.push(this.customKeys[index].id);
        this.customKeys.splice(index, 1);
      },
      addPublicKeys(){
        this.columnDialogVisible = true;
        $(()=> {
          this.selTreeObj = $.fn.zTree.init($("#entityKeyTree"),  this.selTreeSetting, []);
          let zNodes = [
            {id: this.resourceEntity.id, pId: 0, name: `<i class='fa fa-bank'></i> ${this.resourceEntity.name}`,open: true, drag: false, drop: false}
          ];

          if(this.resourceEntity.keys != null && this.resourceEntity.keys.length > 0) {
            for (let row of this.resourceEntity.keys) {
              zNodes.push({
                id: row.id,
                pId: this.resourceEntity.id,
                name: `<i class='fa fa-book''></i> ${row.keyName}`,
                entity: row,
                type:"key",
                open: true,
                drag: false,
                drop: false
              });
            }
          }
          if(this.resourceEntity.categories != null && this.resourceEntity.categories.length > 0) {
            for (let cate of this.resourceEntity.categories) {
              zNodes.push({
                id: cate.categoryId,
                pId: this.resourceEntity.id,
                name: `<i class='fa fa-calendar'></i> ${cate.categoryName}`,
                entity: cate,
                type:"cate",
                open: true,
                drag: false,
                drop: false
              });

              if(cate.customKeys != null && cate.customKeys.length > 0) {
                for (let custRow of cate.customKeys) {
                  zNodes.push({
                    id: custRow.id,
                    pId: cate.categoryId,
                    name: `<i class='fa fa-book''></i> ${custRow.keyName}`,
                    entity: custRow,
                    type:"key",
                    open: true,
                    drag: false,
                    drop: false
                  });
                }
              }
            }
          }
          this.selTreeObj.addNodes(null, zNodes);
        });
      },
      selectPublicKeys(){
        this.columnDialogVisible = false;
        let nodes = this.selTreeObj.getCheckedNodes(true);
        if(nodes != null && nodes.length>0){
          for (let n of nodes) {
            if(n.type!= null && n.type == "key"){
              this.publicKeys.push({
                keyName:n.entity.keyName,
                isUniform:n.entity.isUniform,
                columns:n.entity.columns
              });
            }
          }
        }
      },
      removePublicKeys(index){
        if(this.publicKeys[index].id != null && this.publicKeys[index].id != "")
          this.delPublicKeys.push(this.publicKeys[index].id);
        this.publicKeys.splice(index, 1);
      },
      addColumns(entityKeys,index){
        entityKeys[index].columns.push({
          columnId:UUID.v1(),
          columnName:"",
          columnType:""
        });
      },
      removeColumns(entityKeys,index,rowIndex){
        entityKeys[index].columns.splice(rowIndex,1);
      },
      fetchData(){
        getOptions('5a6aef87828b2a326a4fe714').then(response => {
          this.dbTypeOptions = response.data.options;
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
            if(this.active == "resourceEntity_add"){
              addItem({
                resourceEntity:this.resourceEntity,
                entityKeys:this.entityKeys
              }).then(res => {
                this.$notify({
                  title: '成功',
                  message: '主体创建成功',
                  type: 'success',
                  duration: 2000
                });
                let parentNode = this.treeObj.getNodeByParam("id", 1, null);
                this.treeObj.addNodes(parentNode, {
                  id: res.data.id,
                  pId: 1,
                  name: `<i class='fa fa-calendar'></i> ${res.data.name}`,
                  entity: res.data,
                  type: "subject",
                  open: true,
                  drag: true,
                  drop: true
                });
                this.addResourceEntity();
              });
            }else if(this.active == "resourceEntity_edit"){
              editItem({
                resourceEntity:this.resourceEntity,
                entityKeys:this.entityKeys,
                deleteKeys:this.deleteKeys
              }).then(res => {
                this.$notify({
                  title: '成功',
                  message: '主体更新成功',
                  type: 'success',
                  duration: 2000
                });
                let node = this.treeObj.getNodeByParam("id", this.resourceEntity.id, null);
                node.name = `<i class='fa fa-calendar'></i> ${res.data.name}`;
                node.entity = res.data;
                this.treeObj.updateNode(node);
                this.editResourceEntity(res.data);
              });
            }else if(this.active == "entityCategory_add"){
              addItemCategory({
                resourceEntityId:this.resourceEntity.id,
                resourceEntityCategory:this.resourceEntityCategory,
                publicKeys:this.publicKeys,
                customKeys:this.customKeys
              }).then(res => {
                this.$notify({
                  title: '成功',
                  message: '主体分类创建成功',
                  type: 'success',
                  duration: 2000
                });
                let node = this.treeObj.getNodeByParam("id", this.resourceEntity.id, null);
                this.treeObj.addNodes(node, {
                  id: res.data.categoryId,
                  pId: this.resourceEntity.id,
                  name: `<i class='fa fa-book'></i> ${res.data.categoryName}`,
                  entity: res.data,
                  type: "category",
                  open: true,
                  drag: false,
                  drop: false
                });
                this.resourceEntity = node.entity;
                this.addResourceEntityCategory();
              });
            }else if(this.active == "entityCategory_edit"){
              editItemCategory({
                resourceEntityId:this.resourceEntity.id,
                resourceEntityCategory:this.resourceEntityCategory,
                publicKeys:this.publicKeys,
                customKeys:this.customKeys,
                delPublicKeys:this.delPublicKeys,
                delCustomKeys:this.delCustomKeys
              }).then(res => {
                this.$notify({
                  title: '成功',
                  message: '主体分类更新成功',
                  type: 'success',
                  duration: 2000
                });
                let node = this.treeObj.getNodeByParam("id", res.data.categoryId, null);
                node.name = `<i class='fa fa-book'></i> ${res.data.categoryName}`;
                node.entity = res.data;
                this.treeObj.updateNode(node);
                this.editResourceEntityCategory(res.data);
              });
            }
          }
        });
      },
      addResourceEntity(){
        this.errors.clear();
        this.active = "resourceEntity_add";
        this.resourceEntity = {
          name:"",
          desc:"",
          categories:[]
        };
        this.entityKeys = [];
        this.deleteKeys = [];
      },
      editResourceEntity(entity){
        this.errors.clear();
        this.active = "resourceEntity_edit";
        this.resourceEntity = entity;
        this.entityKeys = entity.keys;
        this.deleteKeys = [];
      },
      addResourceEntityCategory(){
        this.errors.clear();
        this.active = "entityCategory_add";
        this.resourceEntityCategory = {
          categoryId:"",
          categoryName:"",
          categoryDesc:""
        };
        this.publicKeys = [];
        this.delPublicKeys = [];
        this.customKeys = [];
        this.delCustomKeys = [];
      },
      editResourceEntityCategory(entity){
        this.errors.clear();
        this.active = "entityCategory_edit";
        this.resourceEntityCategory = entity;
        this.publicKeys = entity.publicKeys;
        this.delPublicKeys = [];
        this.customKeys = entity.customKeys;
        this.delCustomKeys = [];
      },
      freshArea: function () {
        this.treeObj = $.fn.zTree.init($("#resourceEntityTree"), this.setting, []);
        let zNodes = [
          {id: 1, pId: 0, name: "<i class='fa fa-bank'></i> 实体", type: "root", open: true, drag: false, drop: false}
        ];
        getList().then(response => {
          for (let row of response.data) {
            zNodes.push({
              id: row.id,
              pId: 1,
              name: `<i class='fa fa-calendar''></i> ${row.name}`,
              entity: row,
              type: "subject",
              open: true,
              drag: false,
              drop: false
            });

            if(row.categories != null && row.categories.length > 0){
              for (let cate of row.categories) {
                zNodes.push({
                  id: cate.categoryId,
                  pId: row.id,
                  name: `<i class='fa fa-book'></i> ${cate.categoryName}`,
                  entity: cate,
                  type: "category",
                  open: true,
                  drag: false,
                  drop: false
                });
              }
            }
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
        return false;
      },
      onExpand: function (event, treeId, treeNode) {
        if (treeNode === this.autoExpandNode) {
          this.className = this.className === "dark" ? "" : "dark";
        }
      },
      beforeRemove: function (treeId, treeNode) {
        if (treeNode.type == "subject"){
          this.$confirm('此操作将删除菜单 ' + treeNode.entity.name + ', 是否继续?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          }).then(() => {
              removeItem(treeNode.entity.id).then(response => {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                });
                this.treeObj.removeNode(treeNode);
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else if (treeNode.type == "category"){
          this.$confirm('此操作将删除菜单 ' + treeNode.entity.categoryName + ', 是否继续?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          }).then(() => {
            removeItemCategory(treeNode.pId,{categoryId:treeNode.entity.categoryId}).then(response => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              });
              this.treeObj.removeNode(treeNode);
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
        return false;
      },
      showRemoveBtn: function (treeId, treeNode) {
        return treeNode.id != 1;
      },
      onClick: function(event, treeId, treeNode, clickFlag) {
        this.errors.clear();
        if (treeNode.type == "root"){
          this.active = "";
        }else if (treeNode.type == "subject"){
          this.editResourceEntity(treeNode.entity);
        }else if (treeNode.type == "category"){
          this.resourceEntity = treeNode.getParentNode().entity;
          this.editResourceEntityCategory(treeNode.entity);
        }
      },
      expandAll: function() {
        this.treeObj.expandAll(true);
      },
      collapseAll: function() {
        this.treeObj.expandAll(false);
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
  .el-main {
    padding-left:0px;padding-top:0px;padding-bottom:0px;
  }
</style>
