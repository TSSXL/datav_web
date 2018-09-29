<template>
  <div class="page-component page-container">
    <el-scrollbar class='page-component__nav' tag="div">
      <h3><i :class="module.icon"></i> {{ module.label }}</h3>
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
        sideMenus: [],
        module: {},
        breadcrumb: []
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
    watch: {
      '$route'(to, from) {
        this.getSideMenus()
      }
    },
    methods: {
      getSideMenus() {
        const menus = this.$store.state.menu.menus
        const children = menus.find(x => {
          return x.name === 'sm'
        })
        if (children) {
          this.module.icon = children.icon
          this.module.label = children.label
          if (children.children) this.sideMenus = children.children
        }
      }
    },
    created() {
      this.getSideMenus()
    }
  }
</script>

<style scoped>
</style>
