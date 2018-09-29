<template>
  <div>
    <el-container style="height: 360px; border: 1px solid #eee">
      <el-aside width="200px">
        <div>
          <el-button type="text" @click="addRootNode">添加根节点</el-button>
          <el-button type="text" @click="expandAll">展开</el-button>
          <el-button type="text" @click="collapseAll">收缩</el-button>
        </div>
        <ul id="optionTree" class="ztree"></ul>
        <ul id="log" class="log" style="display:none;"></ul>

      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <section v-if="node&&node.name">
          <el-button @click="saveNode" size="small" type="primary">保存</el-button>
          </section>
        </el-header>
        <el-main>
          <section v-if="node">
            <el-form :model="node" label-width="120px" size="mini">
              <el-form-item label="name(label)" >
                <el-input v-model="node.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="id(value)">
                <el-input v-model="node.id" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="isParent">
                <el-switch v-model="node.isParent"></el-switch>
              </el-form-item>
              <el-form-item label="open">
                <el-switch v-model="node.open"></el-switch>
              </el-form-item>
            </el-form>
          </section>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import validateBus from "@/views/bus/validate"

  import errorTip from "@/components/Validate/errorTip"
  import validateSetting from "@/components/Validate/validateSetting"

  export default {
    components: {
      errorTip,
      validateSetting
    },
    props: {
      options: { type: Array }
    },
    data: function () {
      return {
        node: {},
        nodes: this.options,
        log: null,
        autoExpandNode: null,
        className: "dark",
        newCount:100,
        setting: {
          view: {
            addHoverDom: this.addHoverDom,
            removeHoverDom: this.removeHoverDom,
            selectedMulti: false,
            showIcon: this.showIconForTree
          },
          edit: {
            drag: {
              autoExpandTrigger: true,
              prev: true,
              inner: false,
              next: true,
              isMove:true
            },
            enable: true,
            editNameSelectAll: true,
            showRemoveBtn: this.showRemoveBtn,
            showRenameBtn: this.showRenameBtn,
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
            beforeRename: this.beforeRename,
            onRemove: this.onRemove,
            onRename: this.onRename,
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
    },
    methods: {
      updateOptions(){
        function __eachNode(treeNode, data){
          let n = {id: treeNode.id, name : treeNode.name, isParent: treeNode.isParent, open: treeNode.open}
          if(treeNode.children && treeNode.children.length > 0)
          {
            n.children = [];
            for(let child of treeNode.children){
              __eachNode(child, n.children); //递归遍历
            }
          }
          data.push(n);
          return data;
        };
        var zTree = $.fn.zTree.getZTreeObj("optionTree");
        let allnodes = zTree.getNodes();

        this.nodes = [];
        for(let node of allnodes)
        {
           this.nodes = __eachNode(node, this.nodes); //递归遍历
        }
        this.options.splice(0, this.options.length)
        for(let node of this.nodes)
        {
          this.options.push(node);
        }
        //this.options = this.nodes;
        //console.log(this.nodes)
      } ,
      create() {
        this.errors.clear();
        validateBus.$emit("validate"); //校验子组件

        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            console.log("this.error.any() == true");
            return;
          }

          console.log("Correct them errors!");
        });
      },
      addRootNode(){
        var zTree = $.fn.zTree.getZTreeObj("optionTree");
        zTree.addNodes(null, {name:"新的根节点", isParent: true, open: true});
        this.updateOptions();
      },
      expandAll(){
        var zTree = $.fn.zTree.getZTreeObj("optionTree");
        zTree.expandAll(true);
      },
      collapseAll(){
        var zTree = $.fn.zTree.getZTreeObj("optionTree");
        zTree.expandAll(false);
      },
      cancel() {

      },
      freshArea: function () {
        this.treeObj = $.fn.zTree.init($("#optionTree"), this.setting, this.nodes);

      },
      addHoverDom: function(treeId, treeNode) {
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
          + "' title='add node' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_"+treeNode.tId);
        if (btn) btn.bind("click", ()=>{
          var zTree = $.fn.zTree.getZTreeObj("optionTree");
          zTree.addNodes(treeNode, {name:"新的选项"});
          this.updateOptions();
          return false;
        });
      },
      removeHoverDom: function(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
      },
      showIconForTree: function(treeId, treeNode) {
        return !treeNode.isParent;
      },
      beforeDrag: function (treeId, treeNodes) {
        for (var i=0,l=treeNodes.length; i<l; i++) {
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
        this.className = (this.className === "dark" ? "":"dark");
        this.showLog("[ "+this.getTime()+" onDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
        this.showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is "+ (isCopy==null? "cancel" : isCopy ? "copy" : "move"))
        this.updateOptions();
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
      beforeEditName: function(treeId, treeNode) {
        this.className = (this.className === "dark" ? "":"dark");
        this.showLog("[ "+this.getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
        var zTree = $.fn.zTree.getZTreeObj("optionTree");
        zTree.selectNode(treeNode);

        this.$confirm('确定修改节点吗?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
            zTree.editName(treeNode);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
        return false;
      },
      saveNode: function(){
        var zTree = $.fn.zTree.getZTreeObj("optionTree");
        zTree.updateNode(this.node);
        this.updateOptions();
      },
      beforeRemove: function (treeId, treeNode) {
        this.className = (this.className === "dark" ? "":"dark");
			  this.showLog("[ "+this.getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
			  var zTree = $.fn.zTree.getZTreeObj("optionTree");
        zTree.selectNode(treeNode);

        this.$confirm('确定删除节点吗?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
           zTree.removeNode(treeNode);
           this.updateOptions();
           this.node = {};
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        return false;
      },
      onRemove: function (e, treeId, treeNode) {
      },
      showRemoveBtn: function (treeId, treeNode) {
        return true;
      },
      showRenameBtn: function (treeId, treeNode) {
        return false;
      },
      onClick: function (event, treeId, treeNode, clickFlag) {
        this.node = treeNode;
        //console.log(this.node)
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
    font-weight:900;
  }
  .create-button-card i{
    font-size: 48px;
    color: #8c939d;
  }
</style>
