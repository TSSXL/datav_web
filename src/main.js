import Vue from 'vue'
import ElementUI from 'element-ui'
import '../theme/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import zh from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
import 'font-awesome/css/font-awesome.css'
import VueClipboard from 'vue-clipboard2'

Validator.addLocale(zh)

// 引入vue-amap
import AMap from 'vue-amap';

Vue.use(ElementUI, { locale });
Vue.use(AMap);
Vue.use(VueClipboard)
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: '2dc244265a016be4b42184b6f37f9823',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
    'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
    'AMap.CircleEditor','AMap.Geolocation','AMap.Geocoder'] });

const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fieldsBag',
  delay: 0,
  locale: 'zh_CN',
  dictionary: null,
  strict: true,
  enableAutoClasses: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  }
}

const isMobile = {
  messages: {
    en:(field, args) => field + '必须是11位手机号码',
  },
  validate: (value, args) => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
}
Validator.extend('mobile', isMobile)

Vue.use(VeeValidate, config)

// 引入一些外部插件
import $ from 'jquery'
import '../plugins/ztree/jquery.ztree.core.js'
import '../plugins/ztree/jquery.ztree.excheck.js'
import '../plugins/ztree/jquery.ztree.exedit.js'
import '../plugins/ztree/zTreeStyle.css'
import '../plugins/vue-treeselect/vue-treeselect.min.css'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
