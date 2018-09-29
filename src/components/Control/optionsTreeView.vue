<template>
    <div>
      <ul :id="treeid" class="ztree"></ul>      
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
      autoExpandNode: null,        
      className: "dark",
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
      this.treeObj = $.fn.zTree.init($("#" + this.treeid), this.setting, this.options);       
      if(this.value && this.value.length > 0)
      {
        var node = this.treeObj.getNodeByParam("name", this.value[0].name, null);
        if(node)
          this.treeObj.selectNode(node);   
      }
    },
    showIconForTree: function(treeId, treeNode) {
      return !treeNode.isParent;
    }
  },
  computed:{
    treeValue: function(){
      if(this.value && this.value.length > 0)
        return this.value[0].name;
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
  @import "../../../plugins/ztree/zTreeStyle.css";
</style>