<template>
    <div>
      <el-input style="width: 480px;"
        placeholder="请选择"
        suffix-icon="el-icon-setting"
        v-model="treeValue"
        @click.native="showMenu"
        readonly>
      </el-input>

      <div id="menuContent" class="menuContent" v-show="showTree"
        style="position: absolute; z-index:2000; background-color:#f0f0f0; border:1px solid #CCCCCC; left:0px; top: 42px">
        <ul :id="treeid" class="ztree"></ul>
      </div>
      <ul id="log" class="log" style="display:none;"></ul>
    </div>
</template>
<script>
export default {
  props: {
    options: { type: Array },
    onlyleaf: {type: Boolean},
    value: {type: Array},
    treeid: {type: String}
  },
  data() {
    return {
      log: null,
      node:{},
      showTree: false,
      autoExpandNode: null,
      className: "dark",
      newCount:100,
      setting: {
        view: {
          selectedMulti: true,
          nameIsHTML: true,
          showIcon: false,
          showTitle: false
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
          beforeCheck:this.beforeCheck,
          onCheck: this.onCheck
        }
      }
    };
  },
  methods: {
    freshArea: function () {
      let zNodes = [];
      if(this.options !=null && this.options.length > 0){
        for(let i = 0;i < this.options.length; i++ )
          zNodes.push({
            id: this.options[i].id,
            pId: 0,
            name: `<i class='fa fa-sitemap'></i> ${this.options[i].name}`,
            organize:{
              id: this.options[i].id,
              name:this.options[i].name
            },open: true, drag: false, drop: false,
            children:this.options[i].children
          });
      };
      this.treeObj = $.fn.zTree.init($("#" + this.treeid), this.setting, zNodes);
      if(this.value && this.value.length > 0)
      {
        for(let org of this.value){
          let node = this.treeObj.getNodeByParam("id", org.id, null);
          this.treeObj.checkNode(node, true, true);
        }
      }
    },
    showMenu: function() {
      this.showTree = true;
			$("body").bind("mousedown", this.onBodyDown);
    },
    hideMenu: function() {
      $("body").unbind("mousedown", this.onBodyDown);
      this.showTree = false;
		},
    onBodyDown: function(event) {
			if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
				this.hideMenu();
			}
		},
    beforeCheck: function(treeId, treeNode) {
      return true;
    },
    onCheck: function(event, treeId, treeNode) {
      if(treeNode.checked)
        this.value.push({
          id:treeNode.organize.id,
          name:treeNode.organize.name
        });
      else{
        let index = this.value.findIndex((val, index, arr) => {
          return val.id = treeNode.organize.id;
        });
        this.value.splice(index,1);
      }

    },
  },
  computed:{
    treeValue: function(){
      let orgNames = [];
      if(this.value && this.value.length > 0)
        for(let org of this.value)
          orgNames.push(org.name);
      return orgNames.join(",");
    }
  },
  mounted() {
    this.freshArea();
  },
  watch:{
      options(val){
        this.options = val;
        this.freshArea();
      }
  }
};
</script>
<style scoped>
  @import "../../../plugins/ztree/zTreeStyle.css";
</style>
