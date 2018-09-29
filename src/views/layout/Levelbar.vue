<template>
  <section>
    <el-row>
      <el-col :span="22">
        <tags-view></tags-view>
      </el-col>
      <el-col :span="2" style="text-align: right;">
        <el-breadcrumb class="app-levelbar" separator-class="el-icon-arrow-right" v-if="false">
          <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
            <router-link v-if='item.redirect || item.path' :to="item.redirect || item.path">{{item.title}}</router-link>
            <router-link v-else to="" class="no-redirect">{{item.title}}</router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="text" @click="back" size="mini" style="margin-top: 6px"> <li class="fa fa-mail-reply" /> 返回</el-button>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import TagsView from '@/views/layout/TagsView'
  export default {
    components: {
      TagsView
    },
    created() {
      this.getBreadcrumb()
    },
    data() {
      return {
        levelList: null
      }
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.map(x => {
          return {title: x.meta.title || x.path, path: x.path, redirect: x.redirect}
        })
        /*
        const first = matched[0]
        if (first && (first.name !== '首页' || first.path !== '')) {
          matched = [{ name: '首页', path: '/' }].concat(matched)
        }
        */
        //console.log(matched)
        //console.log(this.$route)
        this.levelList = matched
      },
      back() {
        this.$router.go(-1)
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-levelbar.el-breadcrumb {
    display: inline-block;
    font-size: 12px;
    line-height: 30px;
    margin-left: 0px;
    margin-top: 6px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
