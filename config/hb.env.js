module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  BASE_API: process.env.PORTAL_WEB_BASE_API || '"http://10.33.10.206:31534/api"',
  BASE_EGG_API: process.env.PORTAL_SERVER_BASE_EGG_API || '"http://10.33.10.206:31954/api"',
  BASE_WORKFLOW_API: process.env.PORTAL_SERVER_BASE_WORKFLOW_API || '"http://10.33.10.206:32726/api"'
}
