export const sysFields = [
  { name: 'name', label: '名称', type: 'String', sysField: true, rule: { required: true }},
  { name: 'label', label: '显示', type: 'String', sysField: true, rule: { required: false }},
  { name: 'desc', label: '描述', type: 'String', sysField: true, rule: { required: false }},
  { name: 'model', label: '模块', type: 'String', sysField: true, rule: { required: true }},
  { name: 'properties', label: '属性', type: 'Mixed', sysField: false, rule: { required: false }},
  { name: 'parentId', label: '父对象Id', type: 'String', sysField: true, rule: { required: false }},
  { name: 'group', label: '组', type: 'String', sysField: true, rule: { required: false }},
  { name: 'sort', label: '排序码', type: 'Number', sysField: true, rule: { required: false }},
  { name: 'creator', label: '创建者', type: 'String', sysField: true, rule: { required: false }},
  { name: 'created', label: '创建日期', type: 'Date', sysField: true, rule: { required: false, defaultValue: 'Date.now' }},
  { name: 'editor', label: '最后修改者', type: 'String', sysField: true, rule: { required: false }},
  { name: 'updated', label: '最后修改日期', type: 'Date', sysField: true, rule: { required: false, defaultValue: 'Date.now' }},
  { name: 'organization', label: '所属机构', type: 'Array', sysField: true, rule: { required: false }}
]
