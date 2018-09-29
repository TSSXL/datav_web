export const groups = [
  {
    label: '输入控件', name: 'input', icon: 'fa fa-code', controls: [
      {
        icon: 'fa fa-file-code-o',
        label: '单行文本',
        name: 'input',
        value: null,
        dataField: null,
        type: ['string', 'number'],
        validate: { required: false },
        placeholder: '请输入内容',
        maxlength: null,
        readonly: false,
        disabled: false
      },
      {
        icon: 'fa fa-file-text-o',
        label: '多行文本',
        name: 'textarea',
        value: null,
        dataField: null,
        type: ['string', 'number'],
        validate: { required: false },
        placeholder: '请输入内容',
        rows: 3,
        autosize: false,
        maxlength: null,
        readonly: false,
        disabled: false
      },
      {
        icon: 'fa fa-align-center',
        label: '富文本框',
        name: 'tinymce',
        value: null,
        dataField: null,
        type: ['string', 'number'],
        validate: { required: false },
        placeholder: '请输入内容',
        height: 200,
        readonly: false,
        disabled: false
      },
      {icon: 'fa fa-lock', label: '密码', name: 'password', value: '', dataField: null, type: ['string'], validate: { required: false }, readonly: false, disabled: false},
      {icon: 'fa fa-mobile', label: '手机', name: 'mobile', value: '', dataField: null, type: ['string'], validate: { required: false }, readonly: false, disabled: false},
      {icon: 'fa fa-envelope-o', label: '邮箱', name: 'email', value: '', dataField: null, type: ['string'], validate: { required: false }, readonly: false, disabled: false},
      {icon: 'fa fa-ellipsis-h', label: 'IP', name: 'ip', value: '', dataField: null, type: ['string'], validate: { required: false }, readonly: false, disabled: false},
      {
        icon: 'fa fa-toggle-off',
        label: '开关',
        name: 'switch',
        value: false,
        dataField: null,
        type: ['boolean', 'string', 'number'],
        validate: { required: false },
        disabled: false
      },
      {icon: 'fa fa-calculator', label: '数字', name: 'inputNumber', value: 0, dataField: null, type: ['number'], validate: { required: false }, disabled: false},
      {icon: 'fa fa-sliders', label: '滑块', name: 'slider', value: 0, dataField: null, type: ['number'], validate: { required: false }, disabled: false},
      {icon: 'fa fa-tags', label: '标签', name: 'tagsInput', value: [], dataField: null, type: ['array'], validate: { required: false }}
    ]
  }, {
    label: '显示控件', name: 'display', icon: 'fa fa-font', controls: [
      {icon: 'fa fa-file-o', label: '文本', name: 'text', value: '文本的内容', dataField: null, type: ['string', 'number'], validate: { required: false }, color: '#666666'},
      {icon: 'fa fa-tags', label: '标签', name: 'tags', value: '', dataField: null, type: ['string'], validate: { required: false }},
      {icon: 'fa fa-battery-half', label: '进度条', name: 'progress', value: 70, dataField: null, type: ['number'], validate: { required: false }, color: '', status: '', progressType: 'line', strokeWidth: 6},
      {icon: 'fa fa-space-shuttle', label: '步骤条', name: 'steps', value: 1, dataField: null, type: ['number'], validate: { required: false }, processStatus: 'process', finishStatus: 'finish', direction: 'horizontal'},
      {icon: 'fa fa-image', label: '图片', name: 'image', value: '', dataField: null, type: ['string'], validate: { required: false }},
      {icon: 'fa fa-file-picture-o', label: '图片轮播', name: 'carousel', value: [], dataField: null, type: ['array'], validate: { required: false }, arrow: 'always', carouselType: 'card'}
    ]
  }, {
    label: '选择控件', name: 'select', icon: 'fa fa-bars', controls: [
      {
        icon: 'fa fa-dot-circle-o',
        label: '单选框',
        name: 'radio',
        value: '',
        dataField: null,
        type: ['boolean', 'string', 'number'],
        validate: { required: false },
        disabled: false
      },
      {
        icon: 'fa fa-circle',
        label: '单选按钮',
        name: 'radioButton',
        value: '',
        dataField: null,
        type: ['boolean', 'string', 'number'],
        validate: { required: false },
        disabled: false
      },
      {icon: 'fa fa-check-square', label: '多选框', name: 'checkbox', value: [], dataField: null, type: ['array'], validate: { required: false }, disabled: false},
      {icon: 'fa fa-square', label: '多选按钮', name: 'checkboxButton', value: [], dataField: null, type: ['array'], validate: { required: false }, disabled: false},
      {icon: 'fa fa-list-alt', label: '下拉框', name: 'select', value: '', dataField: null, type: ['string'], validate: { required: false }, disabled: false},
      {icon: 'fa fa-columns', label: '穿梭框', name: 'transfer', value: [], dataField: null, type: ['array'], validate: { required: false }},
      {icon: 'fa fa-list-ul', label: '级联选择器', name: 'cascader', value: [], dataField: null, type: ['array'], validate: { required: false }, disabled: false},
      {icon: 'fa fa-star', label: '评分', name: 'rate', value: 0, dataField: null, disabled: false},
      {icon: 'fa fa-map-marker', label: '位置', name: 'map', value: { lng: 0, lat: 0 }, type: ['object'], dataField: null, disabled: false}
    ]
  }, {
    label: '时间日期', name: 'date', icon: 'fa fa-calendar', controls: [
      {icon: 'fa fa-clock-o', label: '固定时间点', name: 'timeSelect', value: '', dataField: null, type: ['string'], validate: { required: false }, placeholder: '选择时间', readonly: false, disabled: false, start: '09:00', step: '00:30', end: '18:00', editable: true},
      {icon: 'fa fa-clock-o', label: '任意时间点', name: 'timePicker', value: '', dataField: null, type: ['string'], validate: { required: false }, placeholder: '选择时间', readonly: false, disabled: false, selectableRange: '18:30:00 - 20:30:00', format: '', editable: true},
      {icon: 'fa fa-clock-o', label: '固定时间范围', name: 'timeSelectRange', value: {startTime: '', endTime: ''}, dataField: null, type: ['object'], validate: { required: false }, readonly: false, disabled: false, editable: true,
        startOption: {start: '09:00', step: '00:30', end: '18:00', placeholder: '起始时间'}, endOption: {start: '09:00', step: '00:30', end: '18:00', placeholder: '结束时间'}},
      {icon: 'fa fa-clock-o', label: '任意时间范围', name: 'timePickerRange', value: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)], dataField: null, type: ['array'], validate: { required: false }, readonly: false, disabled: false},
      {icon: 'fa fa-calendar-o', label: '选择日期', name: 'datePicker', value: '', dataField: null, type: ['string'], validate: { required: false }, placeholder: '选择日期', dateType: 'day', format: '', readonly: false, disabled: false},
      {icon: 'fa fa-calendar-o', label: '多个日期', name: 'datesPicker', value: [], dataField: null, type: ['array'], validate: { required: false }, placeholder: '选择一个或多个日期', readonly: false, disabled: false},
      {icon: 'fa fa-calendar-o', label: '选择日期范围', name: 'datePickerRange', value: '', dataField: null, type: ['string'], validate: { required: false }, placeholder: '选择日期', readonly: false, disabled: false},
      {icon: 'fa fa-calendar', label: '日期时间选择', name: 'dateTimePicker', value: '', dataField: null, type: ['string'], validate: { required: false }, placeholder: '选择日期时间', readonly: false, disabled: false},
      {icon: 'fa fa-calendar', label: '日期时间范围', name: 'dateTimePickerRange', value: '', dataField: null, type: ['string'], validate: { required: false }, placeholder: '选择日期时间', readonly: false, disabled: false}
    ]
  }, {
    label: '数据和导航', name: 'data', icon: 'fa fa-database', controls: [
      {icon: 'fa fa-table', label: '表格', name: 'table', value: [], dataField: null, type: ['array'],
        cols: [{ name: 'name', label: '名称', parent: null, width: '240' }, { name: 'desc', label: '描述', parent: null }]},
      {icon: 'fa fa-arrows-h', label: '分页', name: 'pagination', value: [], dataField: null, type: ['array']},
      {icon: 'fa fa-list-ol', label: '列表', name: 'list'},
      {icon: 'fa fa-sitemap', label: '树', name: 'tree'}
    ]
  }, {
    label: '图表控件', name: 'chart', icon: 'fa fa-area-chart', controls: [
      {icon: 'fa fa-area-chart', label: '区域折线图', name: 'areaChart'},
      {icon: 'fa fa-bar-chart', label: '柱状图', name: 'barChart'},
      {icon: 'fa fa-line-chart', label: '折线图', name: 'lineChart'},
      {icon: 'fa fa-pie-chart', label: '饼图', name: 'pieChart'}
    ]
  }, {
    label: '综合构件', name: 'component', icon: 'fa fa-cubes', controls: [
      {icon: 'fa fa-user-plus', label: '用户注册', name: 'register'},
      {icon: 'fa fa-upload', label: '文件上传', name: 'upload'},
      {icon: 'fa fa-comments-o', label: '评论', name: 'comments'}
    ]
  }
]
