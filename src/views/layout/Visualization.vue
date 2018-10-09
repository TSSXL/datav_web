<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}" style="margin: 0 auto; width: 1300px;">
    <div class="header-wrapper">
      <headerbar></headerbar>
    </div>
    <div class="main-wrapper">

            <app-main></app-main>

    </div>
  </div>
</template>

<script>
import { Headerbar, Navbar, Sidebar, AppMain } from '@/views/layout'

export default {
  name: 'visualization',
  components: {
    Headerbar,
    Navbar,
    Sidebar,
    AppMain
  },
  methods:{
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()  // 为了重新实例化vue-router对象 避免bug
      })
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },created() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;

        width: 100%;
        overflow-y: hidden;
        .header-wrapper {
            width: 100%;
            height: 40px;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1002;
            line-height: 40px;
            background: #54b1cf;
            color:#fff;
        }
        &.hideSidebar {
            .sidebar-wrapper {
                transform: translate(-140px, 0);
                .sidebar-container {
                    transform: translate(132px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }
            .main-wrapper {
                margin-left: 40px;
            }
        }
        .sidebar-wrapper {
            width: 180px;
            margin-top: 40px;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1010;
            overflow: hidden;
            transition: all .28s ease-out;
        }
        .sidebar-container {
            transition: all .28s ease-out;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: -17px;
            overflow-y: scroll;
            margin-bottom: -17px;
            margin-right: -17px;
        }
        .main-wrapper {
            padding: 0;
            margin-top: 0;
            height: 100%;
            min-height: auto;
        }
    }
</style>
