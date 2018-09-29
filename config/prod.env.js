module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  BASE_API: process.env.PORTAL_WEB_BASE_API || '"http://192.168.10.11:31680/api"',
  BASE_EGG_API: process.env.PORTAL_SERVER_BASE_EGG_API || '"http://192.168.10.11:31142/api"',
  BASE_WORKFLOW_API: process.env.PORTAL_SERVER_BASE_WORKFLOW_API || '"http://192.168.10.11:30664/api"'
}
