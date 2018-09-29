<!-- 枚举类组件 -->
<script>
  export default {
    data() {
      return {
          //告警等级
        "MonitorAlertLevel":{0:"正常",
                             1:"预警",
                             2:"告警"},
        //监控数据来源类型
        "MonitorDataSource":{"API":"API"},
        //监控日志处理方式
        "MonitorHandingMethod":{"EXPIRE_BY_TIME":"自然失效",
                                "AUTO_HANDLE":"自动失效",
                                "MANUALLY_OPERATE":"手工失效"},
        //监控信息发送方式
        "MonitorIndicatorStatus":{"IN_USED":"启动",
                                  "PAUSE":"暂停",
                                  "DESTORIED":"毁弃"},
        //监控指标类型
        "MonitorIndicatorType":{"TECHNOLOGY_INDICATOR":"技术指标",
                                "BUSINESS_INDICATOR":"业务指标"},
        //监控对象类型
        "MonitorObjectType":{"FLOW_NODE":"任务步骤",
                             "COLLECT_TASK":"采集流程",
                             "SUBSCRIBE_TASK":"订阅流程",
                             "ENTITY_IT":"数据源-IT设备",
                             "ENTITY_IOT":"数据源-IOT设备",
                             "ENTITY_DB":"数据源-数据库",
                             "ENTITY_MIDDLEWARE":"数据源-中间件",
                             "ENTITY_API":"数据源-API",
                             "ENTITY_MQ":"数据源-MQ",
                             "ENTITY_FILE":"数据源-文件"},
        //含子类设备
        "haveSubObjectType":{"ENTITY_IT":"it",
                             "ENTITY_IOT":"product",
                             "ENTITY_DB":"database",
                             "ENTITY_MIDDLEWARE":"middleware"
        },
        //监控异常恢复方式
        "MonitorRecoveryType":{"API":"API"},
        //监控信息发送方式
        "MonitorSenderType":{"MOBILE_MESSAGE":"短信",
                             "EMAIL":"邮箱"},
        //是否有效
        "validType":{true:"有效",
          false:"无效"},

        //连接方式
        "joinType":{
          "left":"左连接",
          "inner":"内连接",
          "outer":"外连接"
        },
        //是否
        "isOrNo":{
            true:"是",
          false:"否"
        },

        //元数据类型
        "metadataType":{
          "main":"主数据",
          "relation":"关系数据",
          "trade":"交易数据",
          "code":"代码数据",
          "other":"其它"
        },
        //元素
        srcList:[
          {"icon":"fa fa-file-o", "type": "0", "name": "纯文本"},
          {"icon":"fa fa-file-code-o","type": "1","name": "单行文本"},
          {"icon":"fa fa-file-text-o", "type": "2", "name": "多行文本"},
          {"icon":"fa fa-lock", "type": "3", "name": "密码"},
          {"icon":"fa fa-calculator", "type": "4", "name": "数字"},
          {"icon":"fa fa-toggle-on", "type": "5", "name": "滑动输入条"},
          {"icon":"fa fa-dot-circle-o", "type": "6", "name": "单选框"},
          {"icon":"fa fa-list-alt", "type": "7", "name": "下拉框"},
          {"icon":"fa fa-list-ol", "type": "8", "name": "条式单选"},
          {"icon":"fa fa-sitemap", "type": "9", "name": "树形选择框"},
          {"icon":"fa fa-list-ul", "type": "10", "name": "二级级联"},
          {"icon":"fa fa-list", "type": "11", "name": "三级级联"},
          {"icon":"fa fa-file-image-o", "type": "12", "name": "图片"},
          {"icon":"fa fa-upload", "type": "13", "name": "上传"},
          {"icon":"fa fa-map-marker", "type": "14", "name": "地图"}
        ],

        "srcObject":{
            "0":{"type": "0", "name": "纯文本", "required": 1, "val_text": "", "describe": "", "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "1":{"type": "1","name": "单行文本", "required": 1,"val": "", "describe": "", "length":100, "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "2":{"type": "2", "name": "多行文本", "required": 1, "val": "", "describe": "", "length":100, "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "3":{"type": "3", "name": "密码", "required": 1, "val": "", "describe": "", "length":100, "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "4":{"type": "4", "name": "数字", "required": 1, "val_number": 0, "describe": "", "unit":"", "length":10, "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "5":{"type": "5", "name": "滑动输入条", "required": 1, "val_number_range": 200, "describe": "", "unit":"", "sliderOption":{"floor": 100, "ceil": 450}, "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "6":{"type": "6", "name": "单选框", "required": 1, "val_radio": {}, "describe": "", "elementOptionList": [], "dictionaryId": "", "dictionaryName": "", "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "7":{"type": "7", "name": "下拉框", "required": 1, "val_radio":{}, "describe": "", "elementOptionList": [], "dictionaryId": "", "dictionaryName": "", "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "8":{"type": "8", "name": "条式单选", "required": 1, "val_radio":{}, "describe": "", "elementOptionList": [], "dictionaryId": "", "dictionaryName": "", "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "9":{"type": "9", "name": "树形选择框", "required": 1, "val_tree":{"id":""}, "describe": "", "elementTreeData": [], "dictionaryId": "", "dictionaryName": "", "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "10":{"type": "10", "name": "二级级联", "required": 1, "val_cascade_1":{"children":[]}, "val_cascade_2":{"children":[]}, "describe": "", "elementTreeData": [], "dictionaryId": "", "dictionaryName": "", "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "11":{"type": "11", "name": "三级级联", "required": 1, "val_cascade_1":{"children":[]}, "val_cascade_2":{"children":[]}, "val_cascade_3":{"children":[]}, "describe": "", "elementTreeData": [], "dictionaryId": "", "dictionaryName": "", "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "12":{"type": "12", "name": "图片", "required": 1,
                  "val_icon":{
                                uploads: [],
                                images: [],
                                fontIcon: { className : "fa fa-hdd-o" },
                                type: "fontIcon"
                              },
              "describe": "", "elementTreeData": [], "dictionaryId": "", "dictionaryName": "", "displayCheckField":"", "displayCheckValue":"","filedName":""},
            "13":{"type": "13", "name": "上传", "required": 1,
            "uploadInfo":{
                      category:"sdk",
                      dialogVisible:false,
                      file:{},
                      list:[]
                  },
            "describe": "", "elementTreeData": [], "dictionaryId": "", "dictionaryName": "", "displayCheckField":"", "displayCheckValue":"","filedName":""},
          "14":{"type": "14", "name": "地图", "required": 1,
            "location":{lng: 0, lat:0},
            "describe": "", "elementTreeData": [], "dictionaryId": "", "dictionaryName": "", "displayCheckField":"", "displayCheckValue":"","filedName":""},
        },
        //Iot设备固定字段名
        iotColltaskFiledName:[
            "name","icon","publishPolicy",
          "apikey","timeperiod","firmware","sdk",
          "tag","attributes","desc","refDataSource","refApp",
          "taskType","category","subCategory","state","location",
          "topicName","api","transScript","collectType","categoryPath",
          "sn"
        ]















      };
    }

  }

</script>
