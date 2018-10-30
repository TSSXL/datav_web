module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  BASE_API: process.env.PORTAL_WEB_BASE_API || '"http://10.33.10.206:30618/api"',
  BASE_EGG_API: process.env.PORTAL_SERVER_BASE_EGG_API || '"http://10.33.10.206:31954/api"',
  ATTACHMENT_PATH: process.env.PORTAL_ATTACHMENT_PATH || '"http://10.33.10.206:31122/"',
  SERVER_API: process.env.PORTAL_SERVER_API || '"http://10.33.10.206:31534/api"',
}
