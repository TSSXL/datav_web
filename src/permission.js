import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {getToken,setToken, removeToken} from '@/utils/auth' // 验权

const _import = require('./router/_import_' + process.env.NODE_ENV)

// 导入页面组件
function importComponent(componentObj, components) {
  const notFound = _import('NotFound')
  for (const item of components) {
    try {
      componentObj[item.name] = _import(item.file)
    } catch (e) {
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
  if (!store.getters.reset) {
    const routers = []

    var components = [
      {
        "type": "input",
        "sort": 0,
        "organization": ["宁波市政府办公厅"],
        "desc": "",
        "page": "",
        "entity": "",
        "module": "",
        "file": "visualization/screen/preview1",
        "name": "visualization_screen_preview1",
        "_id": "5b8b89920c0dea0038794d77",
        "key": 14
      },  {
        "type": "input",
        "sort": 0,
        "organization": ["宁波市政府办公厅"],
        "desc": "",
        "page": "",
        "entity": "",
        "module": "",
        "file": "layout/PreviewLayout",
        "name": "layout_PreviewLayout",
        "_id": "5b20badb938ebd002e8e0d17",
        "key": 44
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "s",
        "page": "",
        "entity": "",
        "module": "",
        "file": "data/index",
        "name": "data_index",
        "_id": "5ae087da06516520d4ac2533",
        "key": 361
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "list",
        "entity": "api",
        "module": "data",
        "file": "data/api/list",
        "name": "data_api_list",
        "_id": "5ae97ebdef1596003010ad741",
        "key": 149
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "add",
        "entity": "api",
        "module": "data",
        "file": "data/api/add",
        "name": "data_api_add",
        "_id": "5ae97ebbef1596003010ad7322",
        "key": 150
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "edit",
        "entity": "api",
        "module": "data",
        "file": "data/api/edit",
        "name": "data_api_edit",
        "_id": "5ae97ebbef1596003010ad73234444",
        "key": 150
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "list",
        "entity": "db",
        "module": "data",
        "file": "data/db/list",
        "name": "data_db_list",
        "_id": "5ae97ebdef1596001233222010ad741",
        "key": 149
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "add",
        "entity": "db",
        "module": "data",
        "file": "data/db/add",
        "name": "data_db_add",
        "_id": "5ae97ebbef1596003010ad7123322",
        "key": 150
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "edit",
        "entity": "db",
        "module": "data",
        "file": "data/db/edit",
        "name": "data_db_edit",
        "_id": "5ae97ebbef1596003010ad732342124",
        "key": 150
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "index",
        "entity": "component",
        "module": "visualization",
        "file": "datav/index",
        "name": "datav_index",
        "_id": "5aeaa5eecd213a002ee888682",
        "key": 148
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "list",
        "entity": "component",
        "module": "visualization",
        "file": "datav/component/list",
        "name": "datav_component_list",
        "_id": "5ae97ebdef1596003010ad74",
        "key": 149
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "edit",
        "entity": "component",
        "module": "visualization",
        "file": "datav/component/edit",
        "name": "datav_component_edit",
        "_id": "5ae97ebbef1596003010ad73",
        "key": 150
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "add",
        "entity": "component",
        "module": "visualization",
        "file": "datav/component/add",
        "name": "datav_component_add",
        "_id": "5ae97ebaef1596003010ad72",
        "key": 151
      },  {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "list",
        "entity": "datamap",
        "module": "visualization",
        "file": "visualization/datamap/list",
        "name": "visualization_datamap_list",
        "_id": "5ae30018ce9cfe0ab013e711",
        "key": 258
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "editor": "admin",
        "creator": "admin",
        "desc": "",
        "page": "add",
        "entity": "datamap",
        "module": "visualization",
        "file": "visualization/datamap/add",
        "name": "visualization_datamap_add",
        "_id": "5ae30017ce9cfe0ab013e710",
        "key": 259
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "editor": "admin",
        "creator": "admin",
        "desc": "",
        "page": "edit",
        "entity": "datamap",
        "module": "visualization",
        "file": "visualization/datamap/edit",
        "name": "visualization_datamap_edit",
        "_id": "5ae30016ce9cfe0ab013e70f",
        "key": 260
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "editor": "admin",
        "creator": "admin",
        "desc": "",
        "page": "list",
        "entity": "myvisualization",
        "module": "visualization",
        "file": "visualization/myvisualization/list",
        "name": "visualization_myvisualization_list",
        "_id": "5ae2fec0ce9cfe0ab013e70c",
        "key": 261
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "",
        "entity": "",
        "module": "",
        "file": "visualization/index",
        "name": "visualization_index",
        "_id": "5ae2edefce9cfe0ab013e6fc",
        "key": 262
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "edit",
        "entity": "vistemplate",
        "module": "visualization",
        "file": "visualization/vistemplate/edit",
        "name": "visualization_vistemplate_edit",
        "_id": "5ae2ec43ce9cfe0ab013e6fa",
        "key": 263
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "add",
        "entity": "vistemplate",
        "module": "visualization",
        "file": "visualization/vistemplate/add",
        "name": "visualization_vistemplate_add",
        "_id": "5ae2ec42ce9cfe0ab013e6f9",
        "key": 264
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "list",
        "entity": "vistemplate",
        "module": "visualization",
        "file": "visualization/vistemplate/list",
        "name": "visualization_vistemplate_list",
        "_id": "5ae2ec42ce9cfe0ab013e6f8",
        "key": 265
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "setting",
        "entity": "vistemplate",
        "module": "visualization",
        "file": "visualization/vistemplate/setting",
        "name": "visualization_vistemplate_setting",
        "_id": "5ae2ec41ce9cfe0ab013e6f7",
        "key": 266
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "select",
        "entity": "vistemplate",
        "module": "visualization",
        "file": "visualization/vistemplate/select",
        "name": "visualization_vistemplate_select",
        "_id": "5ae2ec3fce9cfe0ab013e6f6",
        "key": 267
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "design",
        "entity": "screen",
        "module": "visualization",
        "file": "visualization/screen/design",
        "name": "visualization_screen_design",
        "_id": "5ae2ebf9ce9cfe0ab013e6f5",
        "key": 268
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "preview",
        "entity": "screen",
        "module": "visualization",
        "file": "visualization/screen/preview",
        "name": "visualization_screen_preview",
        "_id": "5ae2ebf8ce9cfe0ab013e6f4",
        "key": 269
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "list",
        "entity": "screen",
        "module": "visualization",
        "file": "visualization/screen/list",
        "name": "visualization_screen_list",
        "_id": "5ae2ebf8ce9cfe0ab013e6f3",
        "key": 270
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "add",
        "entity": "screen",
        "module": "visualization",
        "file": "visualization/screen/add",
        "name": "visualization_screen_add",
        "_id": "5ae2ebf6ce9cfe0ab013e6f2",
        "key": 271
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "edit",
        "entity": "screen",
        "module": "visualization",
        "file": "visualization/screen/edit",
        "name": "visualization_screen_edit",
        "_id": "5ae2ebf5ce9cfe0ab013e6f1",
        "key": 272
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "",
        "entity": "",
        "module": "",
        "file": "layout/Visualization",
        "name": "layout_Visualization",
        "_id": "5ae2eb5bce9cfe0ab013e6f0",
        "key": 273
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "uploads",
        "entity": "attachment",
        "module": "dev",
        "file": "dev/attachment/uploads",
        "name": "dev_attachment_uploads",
        "_id": "5ae2c36ece9cfe0ab013e683",
        "key": 318
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "uploadNew",
        "entity": "attachment",
        "module": "dev",
        "file": "dev/attachment/uploadNew",
        "name": "dev_attachment_uploadNew",
        "_id": "5ae2c36dce9cfe0ab013e682",
        "key": 319
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "list",
        "entity": "attachment",
        "module": "dev",
        "file": "dev/attachment/list",
        "name": "dev_attachment_list",
        "_id": "5ae2c36cce9cfe0ab013e681",
        "key": 320
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "url",
        "entity": "attachment",
        "module": "dev",
        "file": "dev/attachment/url",
        "name": "dev_attachment_url",
        "_id": "5ae2c36cce9cfe0ab013e680",
        "key": 321
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "view",
        "entity": "attachment",
        "module": "dev",
        "file": "dev/attachment/view",
        "name": "dev_attachment_view",
        "_id": "5ae2c36bce9cfe0ab013e67f",
        "key": 322
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "uploadVersion",
        "entity": "attachment",
        "module": "dev",
        "file": "dev/attachment/uploadVersion",
        "name": "dev_attachment_uploadVersion",
        "_id": "5ae2c36bce9cfe0ab013e67e",
        "key": 323
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "list",
        "entity": "option",
        "module": "dev",
        "file": "dev/option/list",
        "name": "dev_option_list",
        "_id": "5ae2c1e8ce9cfe0ab013e676",
        "key": 324
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "add",
        "entity": "option",
        "module": "dev",
        "file": "dev/option/add",
        "name": "dev_option_add",
        "_id": "5ae2c1e7ce9cfe0ab013e675",
        "key": 325
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "edit",
        "entity": "option",
        "module": "dev",
        "file": "dev/option/edit",
        "name": "dev_option_edit",
        "_id": "5ae2c1e6ce9cfe0ab013e674",
        "key": 326
      },{
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "",
        "entity": "",
        "module": "",
        "file": "layout/Layout",
        "name": "layout_Layout",
        "_id": "5ae12a75ccfeca22e03c1e49",
        "key": 357
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "s",
        "page": "",
        "entity": "",
        "module": "",
        "file": "dev/index",
        "name": "dev_index",
        "_id": "5ae087da06516520d4ac2533",
        "key": 361
      }, {
        "type": "input",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "",
        "entity": "",
        "module": "",
        "file": "sm/index",
        "name": "sm_index",
        "_id": "5ae087c406516520d4ac2532",
        "key": 362
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "list",
        "entity": "category",
        "module": "dev",
        "file": "dev/category/list",
        "name": "dev_category_list",
        "_id": "5ae0866f06516520d4ac2531",
        "key": 363
      }, {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "add",
        "entity": "category",
        "module": "dev",
        "file": "dev/category/add",
        "name": "dev_category_add",
        "_id": "5ae0866e06516520d4ac2530",
        "key": 364
      },
      {
        "type": "page",
        "sort": 0,
        "organization": [],
        "desc": "",
        "page": "edit",
        "entity": "category",
        "module": "dev",
        "file": "dev/category/edit",
        "name": "dev_category_edit",
        "_id": "5ae0866d06516520d4ac252f",
        "key": 365
      }]

    importComponent(componentObj, components)

    // 菜单和路由默认组名相同
    // 定义组件
    let routerData = [
      {
        "group": "default2.0",
        "sort": 0,
        "organization": [],
        "meta": { "title": "首页", "keepAlive": false },
        "path": "/",
        "redirect": "/visualization/myvisualization/list",
        "component": "layout_Layout",
        "name": "",
        "parentId": "root",
        "desc": "",
        "_id": "5aed25c46355ee2b58339bc1",
        "children": [{
          "group": "default2.0",
          "sort": 0,
          "organization": [],
          "meta": { "title": "首页", "keepAlive": false },
          "path": "home",
          "component": "index",
          "name": "",
          "parentId": "5aed25c46355ee2b58339bc1",
          "desc": "",
          "_id": "5aed25c46355ee2b58339be8"
        }]
      },
      {
        "group": "default2.0",
        "sort": 9,
        "organization": [],
        "redirect": "/visualization/myvisualization/list",
        "meta": { "keepAlive": false, "title": "可视化管理" },
        "path": "/visualization",
        "component": "layout_Visualization",
        "name": "",
        "parentId": "root",
        "desc": "",
        "creator": "admin",
        "editor": "admin",
        "_id": "5aed25c46355ee2b58339bc7",
        "children": [
          {
          "group": "default2.0",
          "sort": 0,
          "organization": [],
          "meta": { "title": "画布管理", "keepAlive": false },
          "path": "screen",
          "component": "visualization_index",
          "name": "",
          "parentId": "5aed25c46355ee2b58339bc7",
          "desc": "",
          "_id": "5aed25c46355ee2b58339be3",
          "children": [{
            "group": "default2.0",
            "sort": 1,
            "organization": [],
            "meta": { "title": "可视化设计", "keepAlive": false },
            "path": "design/:id",
            "component": "visualization_screen_design",
            "name": "",
            "parentId": "5aed25c46355ee2b58339be3",
            "desc": "",
            "_id": "5aed25c46355ee2b58339cd1"
          }, {
            "group": "default2.0",
            "sort": 2,
            "organization": [],
            "meta": { "title": "新建可视化", "keepAlive": false },
            "path": "add",
            "component": "visualization_screen_add",
            "name": "",
            "parentId": "5aed25c46355ee2b58339be3",
            "desc": "",
            "_id": "5aed25c46355ee2b58339cd2"
          }, {
            "group": "default2.0",
            "sort": 3,
            "created": "2018-05-05T03:32:20.927Z",
            "updated": "2018-06-11T06:26:20.025Z",
            "organization": [],
            "meta": { "title": "编辑可视化", "keepAlive": false },
            "path": "edit/:id",
            "component": "visualization_screen_edit",
            "name": "",
            "parentId": "5aed25c46355ee2b58339be3",
            "desc": "",
            "_id": "5aed25c46355ee2b58339cd3"
          }, {
            "group": "default2.0",
            "sort": 4,
            "created": "2018-05-05T03:32:20.927Z",
            "updated": "2018-06-11T06:26:26.329Z",
            "organization": [],
            "meta": { "title": "可视化列表", "keepAlive": false },
            "path": "list",
            "component": "visualization_screen_list",
            "name": "",
            "parentId": "5aed25c46355ee2b58339be3",
            "desc": "",
            "_id": "5aed25c46355ee2b58339cd4"
          }]
        },
          {
          "group": "default2.0",
          "sort": 1,
          "organization": [],
          "meta": { "title": "可视化模板管理", "keepAlive": false },
          "path": "vistemplate",
          "component": "visualization_index",
          "name": "",
          "parentId": "5aed25c46355ee2b58339bc7",
          "desc": "",
          "creator": "admin",
          "editor": "admin",
          "_id": "5aed25c46355ee2b58339be4",
          "children": [{
            "group": "default2.0",
            "sort": 0,
            "organization": [],
            "meta": { "title": "选择模板", "keepAlive": false },
            "path": "select",
            "component": "visualization_vistemplate_select",
            "name": "",
            "parentId": "5aed25c46355ee2b58339be4",
            "desc": "",
            "_id": "5aed25c46355ee2b58339c7f"
          }, {
            "group": "default2.0",
            "sort": 1,
            "organization": [],
            "meta": { "title": "模板设置", "keepAlive": false },
            "path": "setting",
            "component": "visualization_vistemplate_setting",
            "name": "",
            "parentId": "5aed25c46355ee2b58339be4",
            "desc": "",
            "_id": "5aed25c46355ee2b58339c80"
          }, {
            "group": "default2.0",
            "sort": 2,
            "organization": [],
            "meta": { "title": "模板列表", "keepAlive": false },
            "path": "list",
            "component": "visualization_vistemplate_list",
            "name": "",
            "parentId": "5aed25c46355ee2b58339be4",
            "desc": "",
            "_id": "5aed25c46355ee2b58339c81"
          }, {
            "group": "default2.0",
            "sort": 3,
            "organization": [],
            "meta": { "title": "新建模板", "keepAlive": false },
            "path": "add",
            "component": "visualization_vistemplate_add",
            "name": "",
            "parentId": "5aed25c46355ee2b58339be4",
            "desc": "",
            "_id": "5aed25c46355ee2b58339c82"
          }, {
            "group": "default2.0",
            "sort": 4,
            "organization": [],
            "meta": { "title": "编辑模板", "keepAlive": false },
            "path": "edit",
            "component": "visualization_vistemplate_edit",
            "name": "",
            "parentId": "5aed25c46355ee2b58339be4",
            "desc": "",
            "_id": "5aed25c46355ee2b58339c83"
          }]
        },
          {
          "group": "default2.0",
          "sort": 6,
          "organization": ["宁波市政府办公厅"],
          "meta": { "keepAlive": false, "title": "" },
          "desc": "",
          "alias": "",
          "redirect": "",
          "parentId": "5aed25c46355ee2b58339bc7",
          "name": "",
          "component": "visualization_index",
          "path": "myvisualization",
          "_id": "5baf1dc06cb0ab2c548f7f89",
          "children": [{
            "group": "default2.0",
            "sort": 0,
            "organization": ["宁波市政府办公厅"],
            "editor": "admin",
            "creator": "admin",
            "meta": { "title": "", "keepAlive": false },
            "desc": "",
            "alias": "",
            "redirect": "",
            "parentId": "5baf1dc06cb0ab2c548f7f89",
            "name": "",
            "component": "visualization_myvisualization_list",
            "path": "list",
            "_id": "5baf1dd16cb0ab2c548f7f8a"
          }]
        }]
      },
      {
        "group": "default2.0",
        "sort": 10,
        "organization": ["宁波市政府办公厅"],
        "editor": "admin",
        "creator": "admin",
        "meta": { "title": "", "keepAlive": false },
        "desc": "",
        "alias": "",
        "redirect": "",
        "parentId": "root",
        "name": "",
        "component": "layout_PreviewLayout",
        "path": "/fullscreen",
        "_id": "5b20bb23938ebd002e8e0d18",
        "children": [
          {
          "group": "default2.0",
          "sort": 0,
          "organization": [],
          "meta": { "title": "可视化预览", "keepAlive": false },
          "path": "preview/:id",
          "component": "visualization_screen_preview",
          "name": "",
          "parentId": "5b20bb23938ebd002e8e0d18",
          "desc": "",
          "_id": "5aed25c46355ee2b58339cd0"
        }, {
          "group": "default2.0",
          "sort": 1,
          "created": "2018-09-02T06:57:29.612Z",
          "updated": "2018-09-02T07:01:29.203Z",
          "organization": ["宁波市政府办公厅"],
          "editor": "admin",
          "creator": "admin",
          "meta": { "title": "", "keepAlive": false },
          "desc": "",
          "alias": "",
          "redirect": "",
          "parentId": "5b20bb23938ebd002e8e0d18",
          "name": "",
          "component": "visualization_screen_preview1",
          "path": "preview1/:id",
          "_id": "5b8b89d90c0dea0038794d78"
        }]
      },
      {
        "group": "default2.0",
        "sort": 11,
        "organization": [],
        "redirect": "/datav/component/list",
        "path": "/dev",
        "component": "layout_Layout",
        "name": "",
        "desc": "",
        "parentId": "root",
        "meta": { "menu": "开发中心", "keepAlive": false, "title": "开发中心" },
        "_id": "5aed25c46355ee2b58339bc8",
        "children":[]
      },
      {
        "group": "default2.0",
        "sort": 16,
        "organization": [],
        "redirect": "/data/api/list",
        "path": "/data",
        "component": "layout_Layout",
        "name": "",
        "parentId": "root",
        "desc": "",
        "meta": { "title": "数据接入", "keepAlive": false },
        "creator": "admin",
        "editor": "admin",
        "_id": "5aed25c46355ee2b58339b3c",
        "children": [
          {
            "group": "default2.0",
            "sort": 0,
            "organization": [],
            "path": "api",
            "component": "data_index",
            "name": "",
            "parentId": "5aed25c46355ee2b58339bcc",
            "desc": "",
            "meta": { "title": "Api接入", "keepAlive": false },
            "_id": "5aed25c46355ee2b58339be7",
            "children": [
              {
              "group": "default2.0",
              "sort": 0,
              "organization": [],
              "path": "add",
              "component": "data_api_add",
              "name": "",
              "parentId": "5aed25c46355ee2b58339be7",
              "desc": "",
              "meta": { "title": "新建Api", "keepAlive": false },
              "_id": "5aed25c46355ee2b58339c44"
            }, {
              "group": "default2.0",
              "sort": 1,
              "organization": [],
              "path": "list",
              "component": "data_api_list",
              "name": "",
              "parentId": "5aed25c46355ee2b58339be7",
              "desc": "",
              "meta": { "title": "Api列表", "keepAlive": true },
              "_id": "5aed25c46355ee2b58339c45"
            }, {
              "group": "default2.0",
              "sort": 2,
              "organization": [],
              "path": "edit/:id",
              "component": "data_api_edit",
              "name": "",
              "parentId": "5aed25c46355ee2b58339be7",
              "desc": "",
              "meta": { "title": "编辑Api", "keepAlive": false },
              "_id": "5aed25c46355ee2b58339c46"
            }]
          },
          {
            "group": "default2.0",
            "sort": 0,
            "organization": [],
            "path": "db",
            "component": "data_index",
            "name": "",
            "parentId": "5aed25c46355ee2b58339bcc",
            "desc": "",
            "meta": { "title": "数据库接入", "keepAlive": false },
            "_id": "5aed25c46355ee2b58339be7",
            "children": [
              {
                "group": "default2.0",
                "sort": 0,
                "organization": [],
                "path": "add",
                "component": "data_db_add",
                "name": "",
                "parentId": "5aed25c46355ee2b58339be7",
                "desc": "",
                "meta": { "title": "新建数据库", "keepAlive": false },
                "_id": "5aed25c46355ee2b58339c44"
              }, {
                "group": "default2.0",
                "sort": 1,
                "organization": [],
                "path": "list",
                "component": "data_db_list",
                "name": "",
                "parentId": "5aed25c46355ee2b58339be7",
                "desc": "",
                "meta": { "title": "数据库列表", "keepAlive": true },
                "_id": "5aed25c46355ee2b58339c45"
              }, {
                "group": "default2.0",
                "sort": 2,
                "organization": [],
                "path": "edit/:id",
                "component": "data_db_edit",
                "name": "",
                "parentId": "5aed25c46355ee2b58339be7",
                "desc": "",
                "meta": { "title": "编辑数据库", "keepAlive": false },
                "_id": "5aed25c46355ee2b58339c46"
              }]
          }
        ]
      },
      {
        "group": "default2.0",
        "sort": 16,
        "organization": [],
        "path": "/datav",
        "component": "layout_Layout",
        "name": "",
        "parentId": "root",
        "desc": "",
        "meta": { "title": "可视化", "keepAlive": false },
        "_id": "5aed25c46355ee2b58339bcc",
        "children": [
          {
          "group": "default2.0",
          "sort": 0,
          "organization": [],
          "path": "component",
          "component": "dev_index",
          "name": "",
          "parentId": "5aed25c46355ee2b58339bcc",
          "desc": "",
          "meta": { "title": "组件管理", "keepAlive": false },
          "creator": "admin",
          "editor": "admin",
          "_id": "5aed25c46355ee2b58339be7",
          "children": [{
            "group": "default2.0",
            "sort": 0,
            "organization": [],
            "path": "add",
            "component": "datav_component_add",
            "name": "",
            "parentId": "5aed25c46355ee2b58339be7",
            "desc": "",
            "meta": { "title": "新建组件", "keepAlive": false },
            "creator": "admin",
            "editor": "admin",
            "_id": "5aed25c46355ee2b58339c44"
          }, {
            "group": "default2.0",
            "sort": 1,
            "organization": [],
            "path": "list",
            "component": "datav_component_list",
            "name": "",
            "parentId": "5aed25c46355ee2b58339be7",
            "desc": "",
            "meta": { "title": "组件列表", "keepAlive": true },
            "creator": "admin",
            "editor": "admin",
            "_id": "5aed25c46355ee2b58339c45"
          }, {
            "group": "default2.0",
            "sort": 2,
            "organization": [],
            "path": "edit/:id",
            "component": "datav_component_edit",
            "name": "",
            "parentId": "5aed25c46355ee2b58339be7",
            "desc": "",
            "meta": { "title": "编辑组件", "keepAlive": false },
            "creator": "admin",
            "editor": "admin",
            "_id": "5aed25c46355ee2b58339c46"
          }]
        },{
          "group": "default2.0",
          "sort": 0,
          "organization": [],
          "path": "category",
          "component": "dev_index",
          "name": "",
          "parentId": "5aed25c46355ee2b58339bcc",
          "desc": "",
          "meta": { "title": "目录管理", "keepAlive": false },
          "creator": "admin",
          "editor": "admin",
          "_id": "5aed25c46355ee2b58339be7",
          "children": [{
            "group": "default2.0",
            "sort": 0,
            "organization": [],
            "path": "add",
            "component": "dev_category_add",
            "name": "",
            "meta": { "title": "新建目录", "keepAlive": false }
          }, {
            "group": "default2.0",
            "sort": 1,
            "organization": [],
            "path": "list",
            "component": "dev_category_list",
            "name": "",
            "desc": "",
            "meta": { "title": "目录列表", "keepAlive": true }
          }, {
            "group": "default2.0",
            "sort": 2,
            "organization": [],
            "path": "edit/:id",
            "component": "dev_category_edit",
            "name": "",
            "desc": "",
            "meta": { "title": "编辑目录", "keepAlive": false }
          }]
        },{
          "group": "default2.0",
          "sort": 0,
          "organization": [],
          "path": "attachment",
          "component": "dev_index",
          "name": "",
          "parentId": "5aed25c46355ee2b58339bcc",
          "desc": "",
          "meta": { "title": "文档管理", "keepAlive": false },
          "creator": "admin",
          "editor": "admin",
          "_id": "5aed25c46355ee2b58339be7",
          "children": [{
            "group": "default2.0",
            "sort": 2,
            "organization": [],
            "path": "list",
            "component": "dev_attachment_list",
            "name": "",
            "desc": "",
            "meta": { "title": "文档列表", "keepAlive": false }
          }, {
            "group": "default2.0",
            "sort": 2,
            "organization": [],
            "path": "uploadNew",
            "component": "dev_attachment_uploadNew",
            "name": "",
            "desc": "",
            "meta": { "title": "上传文件", "keepAlive": false }
          }, {
            "group": "default2.0",
            "sort": 2,
            "organization": [],
            "path": "uploads",
            "component": "dev_attachment_uploads",
            "name": "",
            "desc": "",
            "meta": { "title": "批量上传", "keepAlive": false }
          }, {
            "group": "default2.0",
            "sort": 2,
            "organization": [],
            "path": "url",
            "component": "dev_attachment_url",
            "name": "",
            "desc": "",
            "meta": { "title": "上传URL图片", "keepAlive": false }
          }, {
            "group": "default2.0",
            "sort": 2,
            "organization": [],
            "path": "view/:id",
            "component": "dev_attachment_view",
            "name": "",
            "desc": "",
            "meta": { "title": "查看文档", "keepAlive": false }
          }]
        }]
      }]
    genRouters(routers, routerData)
    routers.forEach((item) => {
      router.options.routes.push(item)
    })
    router.addRoutes(routers)
    // 定义菜单
    let data = [
      {
        "target": "",
        "router": [
          "/visualization"
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
      },
      {
        "target": "",
        "router": [
          "/data"
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
        "name": "data",
        "redirect": "",
        "icon": "fa fa-home",
        "desc": "",
        "_id": "5ae96cc2ef1596003010ad21",
        "children": [{
            "target": "",
            "router": ["/data", "api", "list"],
            "hidden": false,
            "disabled": false,
            "dropdown": true,
            "type": "",
            "group": "default2.0",
            "sort": 0,
            "organization": [],
            "desc": "",
            "icon": "fa fa-sitemap",
            "redirect": "",
            "name": "",
            "label": "Api接入",
            "parentId": "5ae96cc2ef1596003010ad21",
            "_id": "5aea90a6cd213a002ee888662"
        },{
          "target": "",
          "router": ["/data", "db", "list"],
          "hidden": false,
          "disabled": false,
          "dropdown": true,
          "type": "",
          "group": "default2.0",
          "sort": 0,
          "organization": [],
          "desc": "",
          "icon": "fa fa-sitemap",
          "redirect": "",
          "name": "",
          "label": "数据库接入",
          "parentId": "5ae96cc2ef1596003010ad21",
          "_id": "5aea90a6cd213a002ee8886622"

        }]
      }, {
        "target": "",
        "router": ["/dev"],
        "hidden": false,
        "disabled": false,
        "dropdown": true,
        "type": "",
        "group": "default2.0",
        "sort": 10,
        "organization": [],
        "parentId": "root",
        "label": "设置",
        "name": "dev",
        "icon": "fa fa-sitemap",
        "desc": "",
        "_id": "5ae96cc2ef1596003010ad2f",
        "children": [{
          "target": "",
          "router": ["/datav", "component", "list"],
          "hidden": false,
          "disabled": false,
          "dropdown": true,
          "type": "",
          "group": "default2.0",
          "sort": 0,
          "organization": [],
          "desc": "",
          "icon": "fa fa-sitemap",
          "redirect": "",
          "name": "",
          "label": "组件管理",
          "parentId": "5aea7617cd213a002ee88842",
          "_id": "5aea90a6cd213a002ee88866"

        }, {
          "target": "",
          "router": [],
          "hidden": false,
          "disabled": false,
          "dropdown": true,
          "type": "",
          "group": "default2.0",
          "sort": 0,
          "organization": [],
          "desc": "",
          "icon": "fa fa-sitemap",
          "redirect": "",
          "name": "",
          "label": "文档管理",
          "parentId": "5ae96cc2ef1596003010ad2f",
          "_id": "5aea8254cd213a002ee8885a",
          "children": [
            {
              "target": "",
              "router": [
                "/datav",
                "category",
                "list"
              ],
              "hidden": false,
              "disabled": false,
              "dropdown": true,
              "type": "",
              "group": "default2.0",
              "sort": 0,
              "organization": [],
              "parentId": "5aea8254cd213a002ee8885a",
              "label": "文档目录",
              "name": "",
              "redirect": "",
              "icon": "fa fa-sitemap",
              "desc": "",
              "_id": "5ae96cc2ef1596003010ad50"
            },
            {
              "target": "",
              "router": [
                "/datav",
                "attachment",
                "list"
              ],
              "hidden": false,
              "disabled": false,
              "dropdown": true,
              "type": "",
              "group": "default2.0",
              "sort": 1,
              "organization": [],
              "parentId": "5aea8254cd213a002ee8885a",
              "label": "文档库",
              "name": "",
              "redirect": "",
              "icon": "fa fa-sitemap",
              "desc": "",
              "_id": "5ae96cc2ef1596003010ad51"
            }
          ]
        }]
      }];
    store.dispatch('GenerateMenus', data).then(() => {
      store.dispatch('SetReset', true).then(() => {
        next({ path: to.path })
      })
    });

    store.dispatch('SetReset', true)
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
