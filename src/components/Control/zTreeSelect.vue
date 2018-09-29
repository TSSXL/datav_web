<template>
    <div>
      <el-input style="width: 240px;"
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
          selectedMulti: false,
          showIcon: this.showIconForTree
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          beforeClick: this.beforeClick,
          onClick: this.onClick
        }
      }
    };
  },
  methods: {
    freshArea: function () {
      //console.log(this.options)
      this.treeObj = $.fn.zTree.init($("#" + this.treeid), this.setting, this.options);

      if(this.value && this.value.length > 0)
      {
        var node = this.treeObj.getNodeByParam("name", this.value[0], null);

        if(node)
          this.treeObj.selectNode(node);
      }
    },
    showMenu: function() {
			//var cityObj = $("#citySel");
      //var cityOffset = $("#citySel").offset();
      this.showTree = true;
			//$("#menuContent").css({left:"0px", top: "32px"}).slideDown("fast");
			$("body").bind("mousedown", this.onBodyDown);
    },
    hideMenu: function() {
			//$("#menuContent").fadeOut("fast");
      $("body").unbind("mousedown", this.onBodyDown);
      this.showTree = false;
		},
    onBodyDown: function(event) {
			if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
				this.hideMenu();
			}
		},
    showIconForTree: function(treeId, treeNode) {
      return !treeNode.isParent;
    },
    beforeClick: function(treeId, treeNode) {
      if(this.onlyleaf)
      {
        var check = (treeNode && !treeNode.isParent);
        if (!check) this.$message({message: '请选择具体类型', type: 'warning'});
        return check;
      }
		},
    onClick: function (event, treeId, treeNode, clickFlag) {
      this.node = treeNode;
      this.value.splice(0, this.value.length)
      this.value.push(treeNode.name);
    },
  },
  computed:{
    treeValue: function(){
      if(this.value && this.value.length > 0)
        return this.value[0];
      return '';
    }
  },
  mounted() {
    this.freshArea();
  },
  watch:{
      options(val){
        this.options = val;
        this.freshArea();
      },
      value(val){
        this.value = val;
        this.freshArea();
      }
  }
};
</script>
<style scoped>

</style>
