module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"zwy"',
  BASE_API: process.env.PORTAL_WEB_BASE_API || '"http://10.19.182.13:32256/api"',
  BASE_EGG_API: process.env.PORTAL_SERVER_BASE_EGG_API || '"http://10.19.182.13:32025/api"',
  BASE_WORKFLOW_API: process.env.PORTAL_SERVER_BASE_WORKFLOW_API || '"http://10.19.182.13:31507/api"'
}
