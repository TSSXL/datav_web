<template>
  <div class="app-container list">
    <h3 >个人信息</h3>
    <el-table :data="list" fit highlight-current-row :show-header="false" size="mini">
      <el-table-column label="Label" width="180">
        <template slot-scope="scope">
          {{scope.row.label}}
        </template>
      </el-table-column>
      <el-table-column label="Value">
        <template slot-scope="scope">
          {{scope.row.value}}
        </template>
      </el-table-column>
    </el-table>
    <h3 >选择菜单</h3>
    <el-radio-group v-model="currentGroup" @change="chengeMenu" size="mini">
      <el-radio-button v-for="group in menuGroups" :key="group._id" :label="group.value">{{group.label}}</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
  import { getGroupList } from '@/views/sm/dataGroup/api'
  import { getTree as getMenus } from '@/views/sm/menu/api'
  export default {
    data() {
      return {
        list: [],
        menuGroups: [],
        currentGroup: this.$store.getters.menuGroup || 'default2.0'
      }
    },
    created() {

    },
    activated() {
      this.fetchData()
      this.fetchMenuGroups()
    },
    methods: {
      fetchData() {
        this.list = []
        this.list.push({ label: 'Name', value: this.$store.getters.name })
        this.list.push({ label: 'Account', value: this.$store.getters.account })
        this.list.push({ label: 'Jobs', value: this.$store.getters.jobs })
        this.list.push({ label: 'Roles', value: this.$store.getters.roles })
      },
      fetchMenuGroups() {
        getGroupList({}, [], 'menu').then(res => {
          this.menuGroups = res.data.list
        })
      },
      chengeMenu(group) {
        getMenus(group).then(res => {
          this.$store.dispatch('GenerateMenus', res.data).then((res) => {
            this.$store.dispatch('SetGroup', group).then((res) => {
              this.$parent.getSideMenus()
            })
          })
        })
      }
    }
  }
</script>
