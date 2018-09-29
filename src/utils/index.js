/**
 * Created by jiachenpan on 16/11/18.
 */
import {Message} from 'element-ui';

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function message(res) {
  var resmsg = res.msg ? res.msg : ''
  if (res.success) {
    Message({
      type: 'success',
      message: `操作成功! ${resmsg}`
    })
  } else {
    resmsg = res.error ? res.error : resmsg
    Message({
      type: 'error',
      message: `操作失败！${resmsg}`
    })
  }

  //转换日期格式

}

export function  formatDate (value,fmt){
  let date=new Date(value);
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}

export function paging() {
  var val = {
    currentPage: 1,
    pageSize: 10,
    sort: '_id',
    order: -1
  }
  return val
}

/*
等于操作时 无operator属性或为空
$or　　　　或关系
$nor　　　 或关系取反
$gt　　　　大于
$gte　　　 大于等于
$lt　　　　小于
$lte　　　 小于等于
$ne　　　　不等于
$in　　　　在多个值范围内
$nin　　　 不在多个值范围内
$all　　　 匹配数组中多个值
$regex　　 正则，用于模糊查询
$size　　　匹配数组大小
$maxDistance　范围查询，距离（基于LBS）
$mod　　　　取模运算
$near　　　 邻域查询，查询附近的位置（基于LBS）
$exists　　 字段是否存在
$elemMatch　匹配内数组内的元素
$within　　　范围查询（基于LBS）
$box　　　　 范围查询，矩形范围（基于LBS）
$center　　　范围醒询，圆形范围（基于LBS）
$centerSphere　范围查询，球形范围（基于LBS）
$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素
 */
export function queries() {
  return [{ name: 'name', value: '', operator: '$regex' }]
}

export function setSort(paging, obj) {
  if (obj && obj.prop) {
    paging.sort = obj.prop
    paging.order = obj.order == "ascending" ? 1 : -1
  } else {
    paging.sort = '_id'
    paging.order = -1
  }
}


var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //


export function getNowYear(){
  return nowYear;
}

//获得某月的天数
export function getMonthDays(myMonth){
  var monthStartDate = new Date(nowYear, myMonth, 1);
  var monthEndDate = new Date(nowYear, myMonth + 1, 1);
  var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
  return days;
}

//获得本周的开端日期
export function getWeekStartDate() {
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek+1);
  return weekStartDate;
}

//获得本周的停止日期
export function getWeekEndDate() {
  let endD=nowDay + (6 - nowDayOfWeek)+1;
  let endM=nowMonth+1;
  let nDate=nowYear+"-"+endM+"-"+endD+" 23:59:59:999";
  var weekEndDate = new Date(nDate);
  return weekEndDate;
}

//获得本月的开端日期
export function getMonthStartDate(){
  var monthStartDate = new Date(nowYear, nowMonth, 1);
  return monthStartDate;
}

//获得本月的停止日期
export function getMonthEndDate(){
  let endD=getMonthDays(nowMonth);
  let endM=nowMonth+1;
  let nDate=nowYear+"-"+endM+"-"+endD+" 23:59:59:999";
  var monthEndDate = new Date(nDate);
  return monthEndDate;
}

export function getYearStartDate(){
  var yearStartDate=new Date(nowYear,"01","01");
  return yearStartDate;
}

export function getYearEndDate(){
  let nDate=nowYear+"-12-31 23:59:59:999";
  var yearEndDate=new Date(nDate);
  return yearEndDate;
}

//给应用详情主控台用的获取目录参数
export function getCategoryParam(type){
  let arr=[];
  if("week"==type){
    arr.push(formatDate(now,'yyyy-MM-dd'))
    for(let i=1;i<7;i++){
      let weekDates = getAppointedDate(i);
      arr.unshift(formatDate(weekDates,'yyyy-MM-dd'));
    }

  }else if("month"==type){
    arr.push(formatDate(now,'yyyy-MM-dd'))
    for(let i=1;i<30;i++){
      var monthDate = getAppointedDate(i);
      arr.unshift(formatDate(monthDate,'yyyy-MM-dd'));
    }
  }else if("year"==type){
    let categoryArr=["01","02","03","04","05","06","07","08","09","10","11","12"];
    for(let i=nowMonth;i<12;i++){
      arr.push((nowYear-1)+"-"+categoryArr[i]);
    }
    for(let i=0;i<nowMonth+1;i++){
      arr.push(nowYear+"-"+categoryArr[i]);
    }
  }
  return arr;
}

//获取指定日期
//入参为天数，例如，2天前就是2
export function getAppointedDate(days){
  let numDay = now.getTime();
  let appointNum=numDay-days * 1000 * 60 * 60 * 24;
  let apponitDate=new Date(appointNum);
  return apponitDate;
}
