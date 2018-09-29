<template>
  <div class="app-container">
    <div class="side-wrapper">
      <div class="side-nav">
        <ul id="fieldTree" class="ztree"></ul>
      </div>
    </div>
    <div class="main-content">      
      <section class="content"> 
        <el-collapse v-model="activeNames">
        <el-collapse-item title="预览" name="preview">
        <template slot="title">
          <h3><i class="el-icon-view"></i> 预览</h3>
        </template>
        <div style="background-color: #e7ecf0; padding: 20px;">
          <el-row>         
            <el-col :span="18">
              <div class="filter-container">
                  <span v-for="item in filterFields" :key="item.id">
                      <el-input style="width: 200px;" class="filter-item" :placeholder="item.label"  size="small">
                      </el-input>
                  </span>
                  <el-button v-if="filterFields.length>0" class="filter-item" type="primary" icon="search" size="small">搜索</el-button>           
              </div>  
            </el-col>
            <el-col :span="6" style="text-align: right;" class="filter-container">
                <el-button v-if="showAddButton" type="primary" icon="plus" style="margin-right: 10px;" size="small">添加</el-button> 
            </el-col>
          </el-row>
          
          <el-table :data="exampleData" border fit highlight-current-row size="mini">
            <el-table-column v-if="showIndexCol" align="center" type="index" label="序号" width="84">            
            </el-table-column>
            <el-table-column :key='col.name' v-for='(col,index) in checkedFields' 
              :label="col.label" :sortable="col.sortable"
              :show-overflow-tooltip="col.show_overflow_tooltip"
              :width="col.setWidth ? col.width : ''" align="center" :prop="col.name">
              <template slot-scope="scope">             
              </template>
            </el-table-column>
            <el-table-column v-if="showActionCol"  label="操作" width="128" align="center" >
              <template slot-scope="scope"> 
                <el-button type="text" icon="fa fa-edit" size="mini"> 修改</el-button>
                <el-button type="text" icon="fa fa-trash-o" size="mini"> 删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-container">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" v-if="showPagination">
            </el-pagination>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="设置" name="setting">
        <template slot="title">
          <h3><i class="el-icon-setting"></i> 设置</h3>    
        </template>
          
        <div  style="padding-bottom:20px; text-align: right;">
          序号列 <el-switch  size="mini" v-model="showIndexCol"></el-switch>
          操作列 <el-switch  size="mini" v-model="showActionCol"></el-switch>
          添加按钮 <el-switch  size="mini" v-model="showAddButton"></el-switch>
          分页栏 <el-switch  size="mini" v-model="showPagination"></el-switch>
        </div>
         
        <el-table :data="checkedFields" style="width: 100%" size="mini">
          <el-table-column prop="name" label="名称" width="120">
             <template slot-scope="scope"> 
                {{scope.row.name}}
             </template>
          </el-table-column>
          <el-table-column prop="label" label="显示" width="120">
             <template slot-scope="scope"> 
               <el-input v-model="scope.row.label" size="mini"></el-input>
             </template>
          </el-table-column>
          <el-table-column prop="sortable" label="排序" width="60">
            <template slot-scope="scope"> 
                <el-switch v-model="scope.row.sortable" size="mini">
                </el-switch>
             </template>
          </el-table-column>
          <el-table-column prop="filter" label="筛选" width="60">
            <template slot-scope="scope"> 
                <el-switch v-model="scope.row.filter" size="mini">
                </el-switch>
             </template>
          </el-table-column>
          <el-table-column prop="filter" label="过长时隐藏" width="100">
            <template slot-scope="scope"> 
                <el-switch v-model="scope.row.show_overflow_tooltip" size="mini">
                </el-switch>
             </template>
          </el-table-column>
          <el-table-column prop="width" label="宽度">
              <template slot-scope="scope"> 
                 <el-checkbox v-model="scope.row.setWidth"></el-checkbox>
                 <el-input-number v-if="scope.row.setWidth" v-model="scope.row.width" :step="12"  size="mini"></el-input-number>
              </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>           
        
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

  export default {
    components: {
      errorTip,    
      validateSetting
    },
    data: function () {
      return {
        id: this.$route.params.id,
        activeNames: ["preview", "setting"],
        page: { attributes:{ addButton: true, fields: []} },
        showIndexCol: true,
        showActionCol: true,
        showAddButton: true,
        showPagination: true,
        entity: {},
        entityId: "",
        fields: [],
        checkedFields: [],
        exampleData: [{id: "_id"}], 
        log: null,
        autoExpandNode: null,
        className: "dark",
        setting: {
          view: {            
            selectedMulti: true
          },
          check: {
            enable: true
          },
          edit: {
            
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            onCheck: this.onCheck
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
          //选中项设置
          if(this.page.attributes !== undefined)
          {
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
        this.page.attributes["indexCol"] = this.showIndexCol;
        this.page.attributes["actionCol"] = this.showActionCol;
        this.page.attributes["addButton"] = this.showAddButton;
        this.page.attributes["pagination"] = this.showPagination;
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
      /*
      getCheckedNodes(){        
        var treeObj = $.fn.zTree.getZTreeObj("fieldTree");
        var checkedNodes = treeObj.getCheckedNodes(true);
        for(let field of this.fields){
          if(field.checked) //如果字段是已被选中的
          {
            if(checkedNodes.find(function(x) {return x.id == field.id;}) === undefined){ //查询不到择返回undefined
                field.checked = false; //设置为未选中
            }
          }
          else{ //如果字段是未被选中的          
            if(checkedNodes.find(function(x) {return x.id == field.id;}) != undefined){ //查询不到择返回undefined
                field.checked = true; //设置为选中
            }
          }          
        }  
      },
      */
      onCheck: function(e, treeId, treeNode) {    
        //console.log(treeNode)    
        if(treeNode.check_Child_State < 0) { //只获取叶子节点          
          let field = this.fields.find(function(x) {return x.id == treeNode.id;})
          field.checked = treeNode.checked
        }
        else{ //包含子节点
          for(let node of treeNode.children){
            let field = this.fields.find(function(x) {return x.id == node.id;})
            field.checked = node.checked
          }
        }
        this.checkedFields = [];
        for(let node of this.fields) {
          if(node.checked)
          {
             this.checkedFields.push(node)
          }
        }
      }, 
      freshArea: function () {
        let treeObj = $.fn.zTree.init($("#fieldTree"), this.setting, []);
        let zNodes = [
          {id: 1, pId: 0, name: "基本字段", open: true, iconSkin:"category", drag: false, drop: false},
          {id: 2, pId: 0, name: "扩展字段", open: true, iconSkin:"category", drag: false, dropInner: false, drop: false},
          {id: 3, pId: 0, name: "系统字段", open: true, iconSkin:"category", drag: false, dropInner: false, drop: false}
        ];
        
        getList(this.entityId).then(response => { 
          let basicFields = [];
          let extendFields = [];
          let systemFields = [];

          for (let row of response.data) {
            let node=null,iconSkin="field",field={};
            field["id"] = row.id; field["name"] = row.name; field["label"] = row.label; field["category"] = row.category;
            field["filter"] = false; field["sortable"] = false; field["width"] = 120; field["setWidth"] = true; field["checked"] = false;
            field["type"] = row.type; field["control"]=row.control;  field["show_overflow_tooltip"]=true;

            if (row.category == "basicField") {
              if(row.type == 'relation')
                iconSkin = "table"
              node = {id: row.id, pId: 1, name: row.label, field: row, open: true,iconSkin: iconSkin, drag: true, drop: true}; 
              if(basicFields.length == 0) //第一项
              {
                field["width"] = 0;
                field["setWidth"] = false;
                field["filter"] = true;
                field["sortable"] = true;
              }
              basicFields.push(field);
            } else if (row.category == "extendField") {
              node = {id: row.id, pId: 2, name: row.label, field: row, open: true, iconSkin: iconSkin,drag: false, drop: false};
              extendFields.push(field);
            } else if (row.category == "systemField") {
              iconSkin = "sysfield"
              if (row.name == "id")
                iconSkin = "id"
              if (row.name == "createDate" || row.name == "modifyDate")
                iconSkin = "date"
              node = {id: row.id, pId: 3, name: row.label, field: row, open: true, iconSkin: iconSkin,drag: false, drop: false};
              systemFields.push(field);
            }
            node.checked = this.checkedFields.find(function(x){return x.id === row.id}) != undefined 
            field.checked = node.checked;    
            zNodes.push(node);
          }
          treeObj.addNodes(null, zNodes);

          for (let field of basicFields) {
              this.fields.push(field)
          }
          for (let field of extendFields) {
              this.fields.push(field)
          }
          for (let field of systemFields) {
              this.fields.push(field)
          }
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
        //this.field = treeNode.field;
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
      //this.freshArea();
    },
    computed: {
      filterFields: function () {
        let list = [];
        for(let item of this.checkedFields)
        {
          if(item.filter)
            list.push(item)
        }
        return list;
      },
      /*
      checkedNodes: function () {
        let list = [];
        for(let item of this.fields)
        {
          if(item.checked)
            list.push(item)
        }
        console.log(list)
        return list;
      }
      */
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
    padding: 20px;
    padding-top: 0px;
    margin-left: 220px;
  }
</style>
