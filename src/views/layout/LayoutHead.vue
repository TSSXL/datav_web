<template>
    <div class="app-wrapper">
        <div class="header-wrapper">
            <headerbar></headerbar>
        </div>
        <div class="main-wrapper">
            <el-scrollbar class='page-component__scroll' tag="div">
                <app-main></app-main>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
    import { Headerbar, AppMain} from '@/views/layout'

    export default {
        name: 'layouthead',
        components: {
            Headerbar,
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
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
    @include clearfix;
        position: relative;
        height: 100%;
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
        .main-wrapper {
            padding: 0;
            margin-top: 0;
            height: 100%;
            min-height: auto;
        }
        .page-component__scroll {
            height: calc(100% - 40px);
            margin-top: 40px;
        }
    }
</style>
