import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {getToken, removeToken} from '@/utils/auth' // 验权
import {exist as routerExist} from '@/views/sm/dataGroup/api' // 路由
import {getAll as getComponents} from '@/views/sm/component/api' // 页面组件
import {getTree as getRouters} from '@/views/sm/router/api' // 路由
import {getTree as getMenus, getPermissionMenus} from '@/views/sm/menu/api'

const _import = require('./router/_import_' + process.env.NODE_ENV)
const whiteList = ['/login', '/reg'] // 不重定向白名单

// 导入页面组件
function importComponent(componentObj, components) {
  const notFound = _import('NotFound')
  for (const item of components) {
    try {
      componentObj[item.name] = _import(item.file)
    } catch (e) {
      console.log(e.message)
      componentObj[item.name] = notFound
    }
  }
}

// 生成路由
function genRouters(routers, data) {
  data.forEach((item) => {
    const router = {
      path: item.path,
      component: componentObj[item.component],
      meta: item.meta,
      name: item.name,
      desc: item.desc,
      redirect: item.redirect
    }
    if (item.alias && item.alias !== '') {
      router['alias'] = item.alias
    }
    if (item.children && item.children.length > 0) {
      router.children = []
      genRouters(router.children, item.children)
    }
    routers.push(router)
  })
}

const componentObj = {}

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      var urls = await store.dispatch('GetUrls') // 获取api等URL配置
      if (!store.getters.account) { // 一般页面刷新后 store 里储存数据会没有，需要重新获取
        var info = await store.dispatch('GetUserInfo')
      }

      if (!store.getters.reset) {
        const routers = []
        getComponents().then(result => {
          importComponent(componentObj, result.data)

          if (!store.getters.menuGroup) {
            store.dispatch('SetGroup', 'default2.0')
          }
          const menuGroup = store.getters.menuGroup
          // 判断和菜单同名路由组是否存在
          routerExist('router', menuGroup).then(exist => {
            let routerGroup = menuGroup
            if (!exist.data) {
              routerGroup = 'default2.0'
            }
            // 菜单和路由默认组名相同
            getRouters(routerGroup).then(routerResult => {
           console.log(JSON.stringify(routerResult.data));
           // 定义组件
           routerResult.data.push( {
             "group": "default2.0",
             "sort": 0,
             "created": "2018-05-05T03:32:20.237Z",
             "updated": "2018-05-06T05:13:24.313Z",
             "organization": [],
             "meta": {
               "title": "可视化",
               "keepAlive": false
             },
             "path": "/",
             "component": "layout_Layout",
             "name": "",
             "parentId": "root",
             "desc": "",
             "creator": "admin",
             "editor": "admin",
             "_id": "5aed25c46355ee2b58339bc1",
             "children": [
               {
                 "group": "default2.0",
                 "sort": 0,
                 "created": "2018-05-05T03:32:20.404Z",
                 "updated": "2018-06-11T03:43:56.106Z",
                 "organization": [],
                 "meta": {
                   "title": "可视化",
                   "keepAlive": false
                 },
                 "path": "home",
                 "component": "index",
                 "name": "",
                 "parentId": "5aed25c46355ee2b58339bc1",
                 "desc": "",
              "creator": "admin",
                "editor": "admin",
                "_id": "5aed25c46355ee2b58339be8"
            }
          ]
          })
          genRouters(routers, routerResult.data)
          routers.forEach((item) => {
            router.options.routes.push(item)
          })
          router.addRoutes(routers)
                console.log("触发菜单生成事件");
           // 定义菜单
                let data=[
                  {
                    "target": "",
                    "router": [
                      "/myvisualization",
                      "screen",
                    "list"
                  ],
                  "hidden": false,
                "disabled": false,
                "dropdown": true,
                "type": "",
                "group": "default2.0",
                "sort": 0,
                "organization": [],
                "parentId": "root",
                "label": "可视化",
                "name": "",
                "redirect": "",
                "icon": "fa fa-home",
                "desc": "",
                "creator": "admin",
                    "editor": "zhanghao",
                    "_id": "5ae96cc2ef1596003010ad26"
                  },
                  {
                    "target": "",
                    "router": [
                      "/home"
                    ],
                    "hidden": false,
                    "disabled": false,
                    "dropdown": true,
                    "type": "",
                    "group": "default2.0",
                    "sort": 0,
                    "organization": [],
                    "parentId": "root",
                    "label": "数据接入",
                    "name": "",
                    "redirect": "",
                    "icon": "fa fa-home",
                    "desc": "",
                    "creator": "admin",
                    "editor": "zhanghao",
                    "_id": "5ae96cc2ef1596003010ad27"
                  },
                  {
                    "target": "",
                    "router": [
                      "/home"
                    ],
                    "hidden": false,
                    "disabled": false,
                    "dropdown": true,
                    "type": "",
                    "group": "default2.0",
                    "sort": 0,
                    "organization": [],
                    "parentId": "root",
                    "label": "设置",
                    "name": "",
                    "redirect": "",
                    "icon": "fa fa-home",
                    "desc": "",
                    "creator": "admin",
                    "editor": "zhanghao",
                    "_id": "5ae96cc2ef1596003010ad28"
                  }];
                store.dispatch('GenerateMenus',data).then(() => {
                  store.dispatch('SetReset', true).then(() => {
                    next({ path: to.path })
                  })
                })

            })
          })
        })
        store.dispatch('SetReset', true)
      } else {
        next()
}
}
} else {
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    next('/login')
    NProgress.done()
  }
}
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
