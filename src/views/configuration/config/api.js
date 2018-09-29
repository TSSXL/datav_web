import fetch from '@/views/configuration/fetch'
import store from '@/store'

export function getConfigs(listQuery, objQuery) {
  return fetch({
    url: '/api/config',
    method: 'get',
    params: listQuery
  })
}

export function getConfig(id) {
  return fetch({
    url: `/api/config/${id}`,
    method: 'get'
  })
}

export function getEnvironmentConfigs(id) {
  return fetch({
    url: `/api/config/${id}/environment`,
    method: 'get'
  })
}

export function getEnvironmentConfig(id) {
  return fetch({
    url: `/api/config/environment/${id}`,
    method: 'get'
  })
}

export function addEnvironmentConfigItem(environmentConfigItem, id) {
  return fetch({
    url: `/api/config/environment/${id}/item`,
    method: 'post',
    data: environmentConfigItem,
    params: {
      modifyUserId: 1,
      modifyUser: 'test'
    }
  })
}

export function updateEnvironmentConfigItem(environmentConfigItem, id) {
  return fetch({
    url: `/api/config/environment/${id}/item`,
    method: 'put',
    data: environmentConfigItem,
    params: {
      modifyUserId: 1,
      modifyUser: 'test'
    }
  })
}

export function deleteEnvironmentConfigItem(environmentConfigItem, id) {
  return fetch({
    url: `/api/config/environment/${id}/item`,
    method: 'delete',
    data: environmentConfigItem,
    params: {
      modifyUserId: 1,
      modifyUser: 'test'
    }
  })
}

export function publishEnvironmentConfig(id) {
  return fetch({
    url: `/api/config/environment/${id}/publish`,
    method: 'post',
    params: {
      publishUserId: 1,
      publishUser: 'test'
    }
  })
}

export function rollbackEnvironmentConfig(id, version) {
  return fetch({
    url: `/api/config/environment/${id}/rollback`,
    method: 'post',
    params: {
      version: version
    }
  })
}

export function addConfig(config) {
  return fetch({
    url: `/api/config`,
    method: 'post',
    data: config,
    params: {
      modifyUserId: 1,
      modifyUser: 'test'
    }
  })
}

export function addEnvironmentConfig(environmentConfig) {
  return fetch({
    url: '/api/config/environment',
    method: 'post',
    data: environmentConfig,
    params: {
      modifyUserId: 1,
      modifyUser: 'test'
    }
  })
}

export function copyEnvironmentConfig(environmentConfig, id) {
  return fetch({
    url: `/api/config/environment/${id}/copy`,
    method: 'post',
    data: environmentConfig,
    params: {
      modifyUserId: 1,
      modifyUser: 'test'
    }
  })
}

export function updateEnvironmentConfig(environmentConfig, id) {
  return fetch({
    url: `/api/config/environment/${id}`,
    method: 'put',
    data: environmentConfig,
    params: {
      modifyUserId: 1,
      modifyUser: 'test'
    }
  })
}

export function getFileContentApi() {
  return `${store.getters.urls.configuration}/api/file/content`
}

export function deleteConfig(configId) {
  return fetch({
    url: `/api/config/${configId}`,
    method: 'delete'
  })
}

export function deleteEnvironmentConfig(environmentConfigId) {
  return fetch({
    url: `/api/config/environment/${environmentConfigId}`,
    method: 'delete'
  })
}

export function getRuntimeConfig(configId, configTemplateId, environmentType,
  containerEnvironmentMode) {
  return fetch({
    url: '/api/runtimeconfig',
    method: 'get',
    params: {
      configId: configId,
      configTemplateId: configTemplateId,
      environmentType: environmentType,
      containerEnvironmentMode: containerEnvironmentMode
    }
  })
}

export function addRuntimeConfig(runtimeConfig) {
  return fetch({
    url: `/api/runtimeconfig`,
    method: 'post',
    data: runtimeConfig
  })
}

export function updateRuntimeConfig(runtimeConfig) {
  return fetch({
    url: `/api/runtimeconfig`,
    method: 'put',
    data: runtimeConfig
  })
}
