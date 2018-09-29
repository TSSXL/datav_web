<template>
  <div class="page-component page-container">
    <el-scrollbar class='page-component__nav' tag="div">
      <h3><i class="fa fa-cogs"></i> 配置中心 {{menu}}</h3>
      <el-menu mode="vertical" :default-active="$route.path">
        <sidebar-item :menus="sideMenus"></sidebar-item>
      </el-menu>
    </el-scrollbar>
    <div class="page-component__content">
      <levelbar></levelbar>
      <keep-alive>
        <router-view v-if="keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
  import SidebarItem from '../layout/SidebarItem'
  import Levelbar from '../layout/Levelbar'

  export default {
    name: 'index',
    components: { SidebarItem, Levelbar },
    data() {
      return {
        menu: this.$route.params.menu,
        sideMenus: []
      }
    },
    computed: {
      keepAlive: function() {
        if (this.$route.meta && this.$route.meta.keepAlive) {
          return this.$route.meta && this.$route.meta.keepAlive
        }
        return false
      }
    },
    methods: {
      getSideMenus() {
        const menus = this.$store.state.menu.menus
        const children = menus.find(x => {
          return x.name === 'configuration'
        })
        if (children && children.children) this.sideMenus = children.children
      }
    },
    created() {
      this.getSideMenus()
    }
  }
</script>

<style scoped>
</style>
