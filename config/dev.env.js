module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: process.env.PORTAL_WEB_BASE_API || '"http://localhost:8080/api"',
  BASE_EGG_API: process.env.PORTAL_SERVER_BASE_EGG_API || '"http://127.0.0.1:7003/api"',
  ATTACHMENT_PATH: process.env.PORTAL_ATTACHMENT_PATH || '"http://192.168.10.11:32402/"',
  SERVER_API: process.env.PORTAL_SERVER_API || '"http://192.168.10.11:31680/api"',
}
