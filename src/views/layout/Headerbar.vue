<template>
  <div class="header">
    <img :src="logoPng" width="106" height="32" alt="" class="logoPng" v-if="showIcon=='pt'"/>
    <template v-if="showIcon=='hb'">
      <div style="display: inline-block;text-align: center;font-size: 12px">
        <p style="height: 15px;margin: 0px">宁波市生态环境大数据</p>
        <p style="margin: 0px">支撑平台</p>
      </div>
    </template>
    <div class="topMenu">
      <a class='inlineBlock' v-for="item in menus" v-if="!item.hidden" :key="item._id" :href="to(item)" :target="item.target">{{item.label}}</a>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <span style="color: #ffffff; font-size: 12px;margin-bottom: 12px;">{{this.$store.getters.name}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/home/index">
          <el-dropdown-item>
            我的主页
          </el-dropdown-item>
        </router-link>
        <router-link class='inlineBlock' to="/sm/user/info">
          <el-dropdown-item>
            个人信息
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import logoPng from '@/assets/logo32X96.png'

  export default {
    data() {
      return {
        logoPng: logoPng,
        showIcon:"pt"
      }
    },
    computed: {
      ...mapGetters([
        'avatar', 'menus', 'name', 'account', 'roles', 'jobs'
      ])
    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()  // 为了重新实例化vue-router对象 避免bug
        })
      },
      to(item) {
        if (item.redirect && item.redirect !== '') {
          return item.redirect
        } else {
          return `#${item.path}`
        }
      }
    },
    created() {
      if(process.env.HEADER_ICON!=""){
        this.showIcon=process.env.HEADER_ICON;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/stylus" scoped>
  .header {
    height: 32px;
    line-height: 32px;
    border-radius: 0px !important;
    .logoPng {
      margin-left: 12px;
      margin-top: 4px;
    }
    .topMenu {
      margin-left: 48px;
      margin-top: 6px;
      height: 32px;
      display: inline-block;
      position: absolute;
      a {
        transition: .3s;
        margin-left: 24px;
      }
    }
    .avatar-container {
      height: 32px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 8px;
        position: relative;
        .user-avatar {
          width: 24px;
          height: 24px;
          border-radius: 12px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 8px;
          font-size: 12px;
        }
      }
    }
  }
  @media screen and (max-width:1200px){
    .topMenu a{
      font-size: 12px;
    }
    .header .avatar-wrapper span{
      display: none;
    }
  }
  a.router-link-active {
    border-bottom: 4px solid #FFFFFF;
    padding: 5px;
  }
</style>

