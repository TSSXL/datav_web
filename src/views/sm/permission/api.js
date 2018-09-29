import fetch from '@/utils/fetchEgg'
const entityName = 'permission'

export function getMenuPermission(role, group) {
  return fetch({
    url: `/${entityName}/menus/${role}/${group}`,
    method: 'Get'
  })
}

export function addMenuPermission(role, group, menus) {
  return fetch({
    url: `/${entityName}/menus/${role}/${group}`,
    method: 'post',
    data: menus
  })
}
