<template>
  <div>
    <el-menu mode="vertical" :collapse="false">
      <template v-for="item in menus">
        <a v-if="!item.hidden && (!item.dropdown || !item.children || item.children.length == 0 )"
                     :key="item._id" :href="to(item)" :target="item.target">
          <el-menu-item :index="item.path">
            <i :class="item.icon" style="margin-right:10px;"></i> {{item.label}}
          </el-menu-item>
        </a>
        <el-submenu :index="item.label" :key="item.id"
                    v-if="!item.hidden && (item.dropdown && item.children && item.children.length>0 )">
          <template slot="title">
            <i :class="item.icon" style="margin-right:10px;"></i> {{item.label}}
          </template>
          <template v-for="child in item.children" v-if='!child.hidden'>
            <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :menus='[child]'
                          style="margin-left: 16px;"></sidebar-item>
            <a v-else class="menu-indent" :href="to(child)" :target="child.target">
              <el-menu-item :index="child.path">
                {{child.label}}
              </el-menu-item>
            </a>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import { SidebarItem } from '@/views/layout'

  export default {
    components: { SidebarItem },
    name: 'SidebarItem',
    props: {
      menus: {
        type: Array
      }
    },
    methods: {
      to(item) {
        if (item.redirect && item.redirect !== '') {
          return item.redirect
        } else {
          return `#${item.path}`
        }
      }
    },
    created() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .svg-icon {
    margin-right: 10px;
  }

  .hideSidebar .menu-indent {
    display: block;
    text-indent: 10px;
  }
</style>

