export default {
  route: {
    dashboard: '首页',
    documentation: '文档',
    guide: '引导页',
    rolePermission: '角色权限',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON 编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragSelect: '拖拽 Select',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    nested: '路由嵌套',
    menu1: '菜单1',
    'menu1-1': '菜单 1-1',
    'menu1-2': '菜单 1-2',
    'menu1-2-1': '菜单 1-2-1',
    'menu1-2-2': '菜单 1-2-2',
    'menu1-3': '菜单 1-3',
    menu2: '菜单 2',
    Table: 'Table',
    dynamicTable: '动态 Table',
    dragTable: '拖拽 Table',
    inlineEditTable: 'Table 内编辑',
    complexTable: '综合 Table',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    articleList: '文章列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: '导出 Excel',
    selectExcel: '导出 已选择项',
    mergeHeader: '导出 多级表头',
    uploadExcel: '上传 Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化',
    externalLink: '外链',
    profile: '个人中心',
    notification: '消息通知',
    notificationSend: '发送',
    system: '系统',
    'permission-role': '权限管理',
    permission: {
      permissions: '权限列表'
    },
    role: {
      roles: '角色列表'
    },
    admin: {
      admins: '管理员列表'
    },
    activeLog: {
      activeLogs: '操作记录'
    },
    exceptionError: {
      exceptionErrors: '异常记录',
      logFiles: 'LOG日志'
    },
    user: {
      users: '用户列表'
    },
    file: {
      files: '文件管理'
    },
    nginx: {
      logs: 'NGINX日志'
    },
    dict: '字典管理'
  },
  navbar: {
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小',
    setting: '布局设置'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  example: {
    warning: '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  common: {
    help: '帮助',
    capsLock: '大写已锁定',
    create: '创建',
    update: '编辑',
    delete: '删除',
    submit: '提交',
    tips: '提示',
    download: '下载',
    details: '详情',
    confirmDelete: '确认删除？',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    emptyText: '暂无数据',
    more: '更多',
    reset: '重置',
    refresh: '刷新',
    search: '查询',
    copy: '复制',
    copySuccess: '复制成功',
    createTime: '创建时间',
    startTime: '开始时间',
    endTime: '结束时间',
    week: '最近一周',
    oneMonth: '最近一个月',
    threeMonth: '最近三个月',
    createdAt: '创建时间',
    updatedAt: '更新时间',
    handle: '操作',
    batchHandle: '批量操作',
    jsonTheme: {
      default: '白色',
      oneDark: '黑色',
      vsCode: 'vs-code'
    },
    seeMore: '查看更多',
    seeInfo: '查看详情',
    moreScreening: '更多筛选',
    collapseScreening: '收起筛选',
    loading: '加载中',
    yes: '是',
    no: '否',
    alreadyUpload: '文件已上传',
    uploadTip: '只能上传 xls/xlsx/csv/pdf/word/txt/mp4 文件'
  },
  permission: {
    keywords: '输入关键字进行过滤',
    sort: '排序',
    addSon: '创建子权限',
    name: '权限标识',
    title: '目录名称',
    icon: '目录图标',
    path: '目录路径',
    component: '目录地址',
    hidden: '目录显示',
    nav: '导航栏',
    btn: '按钮',
    startSortText: '开启目录排序',
    help: {
      example: '例',
      exampleText: '创建权限',
      nav: '导航栏会显示在左侧导航',
      proposal: '建议规则',
      proposalText: '子路由目录路径与目录地址保持一直，与权限标识形成对应关系',
      nameText: '用于后台权限路由与前台路由和i18n配置',
      pathText: '前台路由访问路径',
      componentText: '前台路由对应文件地址',
      componentText1: '单层级嵌套路由使用',
      componentText2: '多层级嵌套路由使用'
    }
  },
  role: {
    name: '角色标识',
    syncPermissions: '权限设置'
  },
  activity: {
    log_name: '日志名称',
    description: '描述',
    subject: '影响',
    subject_id: '影响ID',
    subject_type: '影响类型',
    causer: '操作者',
    causer_id: '操作者ID',
    causer_type: '操作者类型',
    properties: '属性'
  },
  exception: {
    message: '错误信息',
    id: '错误ID',
    solve: '修复值',
    solveSuccessText: '确认修复',
    confirmSolveSuccessText: '确认修复？',
    isSolve: '修复状态',
    solveStatus: {
      all: '所有',
      no: '未修复',
      yes: '已修复'
    },
    info: '错误详情'
  },
  admin: {
    id: '用户ID',
    name: '用户名',
    email: '邮箱',
    password: '密码',
    roles: '角色',
    syncRoles: '角色设置',
    syncPermissions: '权限设置',
    emptyPasswordText: '留空不修改',
    status: '状态',
    status1Text: '正常',
    status0Text: '禁止',
    navSetting: {
      refresh: '刷新页面后生效',
      cache: '取消缓存',
      affix: '固定 Tag',
      need: '需开启 Tags-View'
    }
  },
  user: {
    name: '用户名',
    email: '邮箱',
    password: '密码',
    emptyPasswordText: '留空不修改'
  },
  file: {
    name: '文件名',
    size: '文件大小',
    type: '类型',
    lastModified: '更新时间',
    uploadFile: '上传文件',
    makeDirectory: '新建目录',
    search: '请输入文件名前缀匹配',
    directoryName: '目录名',
    NSCTP: '当前格式不支持预览',
    deleteFilesTipsText: '此操作将永久删除该文件, 是否继续?',
    deleteDirectoryTipsText: '此操作将永久删除该文件夹以及文件夹内的所有文件, 是否继续?',
    help: {
      title: '目录命名规范',
      li1: '不允许使用表情符，请使用符合要求的 UTF-8 字符',
      li2: {
        text1: '用于分割路径，可快速创建子目录，但不要以',
        text2: '或',
        text3: '开头，不要出现连续的'
      },
      li3: {
        text1: '不允许出现名为',
        text2: '的子目录'
      },
      li4: '总长度控制在 1~60 个字符'
    },
    uploadFileText: {
      currentDirectory: '当前目录',
      specifyDirectory: '指定目录',
      rootDirectory: '根目录',
      uploadText1: '将文件拖到此处，或',
      uploadText2: '点击上传',
      warnText: '若存在同名文件，将被新上传的文件覆盖。',
      help: {
        title: '文件命名规范',
        li1: '使用 UTF-8 编码',
        li2: '区分大小写',
        li3: '长度必须在 1~1023 字节之间',
        li4: {
          text1: '不能以',
          text2: '或',
          text3: '字符开头'
        }
      }
    }
  },
  notification: {
    form: '来源',
    message: '消息',
    is_read: '是否已读',
    is_read0: '未读',
    is_read1: '已读',
    send: '发送',
    read: '标记已读',
    allRead: '全部已读',
    checkMessage: '请选择消息',
    all: '全部',
    sender: '发送人'
  },
  nginx: {
    http: '协议',
    httpCode: '状态码',
    ip: 'ip',
    method: '请求方式',
    uri: '请求地址',
    return: '返回地址',
    size: '返回大小',
    browser: '浏览器',
    platform: '操作系统',
    is_warning: '警告访问',
    is_error: '错误访问',
    is_mobile: '手机访问',
    is_robot: '机器访问',
    all: '所有',
    yes: '是',
    no: '否'
  },
  dictType: {
    name: '字典名称',
    type: '字典类型',
    status: '状态',
    status_1: '可用',
    status_0: '禁用',
    status_all: '全部',
    remark: '备注'
  },
  dictData: {
    title: '字典数据',
    sort: '排序',
    label: '字典标签',
    value: '字典键值',
    list_class: '表格回显样式',
    default: '是否默认',
    default_1: '是',
    default_0: '否',
    default_all: '全部',
    status: '状态',
    status_1: '可用',
    status_0: '禁用',
    status_all: '全部',
    remark: '备注'
  }
}
