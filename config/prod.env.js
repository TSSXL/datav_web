module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  BASE_API: process.env.PORTAL_WEB_BASE_API || '"http://192.168.10.11:30812/api"',
  BASE_EGG_API: process.env.PORTAL_SERVER_BASE_EGG_API || '"http://192.168.10.11:31142/api"',
  ATTACHMENT_PATH: process.env.PORTAL_ATTACHMENT_PATH || '"http://192.168.10.11:32402/"',
  SERVER_API: process.env.PORTAL_SERVER_API || '"http://192.168.10.11:31680/api"',
  //HEADER_ICON控制头部显示的图标，值为hb时会显示宁波市生态环境大数据支撑平台而不是cityos图标
  HEADER_ICON:'"pt"'
}
