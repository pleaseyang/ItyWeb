export default {
  route: {
    dashboard: 'Dashboard',
    documentation: 'Documentation',
    guide: 'Guide',
    pagePermission: 'Page Permission',
    rolePermission: 'Role Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'Mixin',
    backToTop: 'Back To Top',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link',
    profile: 'Profile',
    notification: 'Notification',
    notificationSend: 'Send',
    system: 'System',
    'permission-role': 'RBAC',
    permission: {
      permissions: 'Permission list'
    },
    role: {
      roles: 'Role list'
    },
    admin: {
      admins: 'Managers'
    },
    activeLog: {
      activeLogs: 'Operation record'
    },
    exceptionError: {
      exceptionErrors: 'Abnormal record',
      logFiles: 'LOG'
    },
    user: {
      users: 'User list'
    },
    file: {
      files: 'File Manage'
    },
    nginx: {
      logs: 'NGINX Logs'
    },
    dict: 'Dictionary Manage',
    genTable: {
      genTables: 'Code Generation'
    },
    WebSocket: 'WebSocket',
    systemConfig: 'System Config'
  },
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Log Out',
    profile: 'Profile',
    theme: 'Theme',
    size: 'Global Size',
    setting: 'Layout Settings'
  },
  login: {
    title: 'Login Form',
    logIn: 'Login',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  example: {
    warning: 'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name (default file)'
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading PDF.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  common: {
    help: 'Help',
    capsLock: 'Caps locked',
    create: 'Create',
    update: 'Update',
    delete: 'Delete',
    submit: 'Submit',
    tips: 'Tips',
    download: 'Download',
    details: 'Details',
    confirmDelete: 'Confirm delete?',
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    emptyText: 'No data available',
    more: 'More',
    reset: 'Reset',
    refresh: 'Refresh',
    search: 'Search',
    copy: 'Copy',
    copySuccess: 'Copy succeeded',
    createTime: 'Create Date',
    startTime: 'Start Date',
    endTime: 'End Date',
    week: 'Last week',
    oneMonth: 'Last month',
    threeMonth: 'Last three months',
    createdAt: 'Create Date',
    updatedAt: 'Update Date',
    handle: 'Handle',
    batchHandle: 'Batch Handle',
    jsonTheme: {
      default: 'White',
      oneDark: 'Dark',
      vsCode: 'vs-code'
    },
    seeMore: 'See more',
    seeInfo: 'View details',
    moreScreening: 'More screening',
    collapseScreening: 'Collapse screening',
    loading: 'Loading',
    yes: 'Yes',
    no: 'No',
    alreadyUpload: 'Already upload',
    uploadTip: 'Only XLS / xlsx / CSV / PDF / word / txt / mp4 files can be uploaded',
    upload: 'Upload',
    uploadLogTip: 'Only images in png can be uploaded',
    change: 'Change'
  },
  system: {
    config: 'System Config',
    title: 'Title',
    logo: 'LOGO',
    dingTalkLogin: 'DingTalk Login',
    wechatLogin: 'WeChat Login',
    aliOssTitle: 'Ali OSS',
    wechatPayTitle: 'WeChat Pay',
    dingtalk: {
      open: 'DingTalk Login',
      need_permissions: 'Permissions to be opened',
      client_id: 'AppKey',
      client_secret: 'AppSecret',
      corp_id: 'corpId',
      redirect_uri: 'Callback URL',
      redirect_bind_uri: 'Bind Callback URL',
      bind: 'Bind DingTalk',
      unbind: 'UnBind DingTalk',
      name: 'DingTalk'
    },
    wechat: {
      open: 'WeChat Login',
      oplatform: '微信开放平台 (WeChat open platform)',
      oplatform_appid: 'Appid',
      oplatform_appsecret: 'Appsecret',
      oplatform_redirect_uri: 'Callback URL',
      offiaccount: '微信公众平台 (WeChat public platform)',
      offiaccount_appid: 'Appid',
      offiaccount_appsecret: 'Appsecret',
      offiaccount_redirect_uri: 'Callback URL',
      bind: 'Bind WeChat',
      unbind: 'UnBind WeChat',
      name: 'WeChat'
    },
    user: {
      bindingInfo: 'Binding information',
      detail: 'Details',
      bindingTime: 'Binding time',
      syncTime: 'Synchronization time'
    },
    aliOss: {
      need_permissions: 'Permissions to be opened',
      endpoint: 'Endpoint (Regional node)',
      access_key_id: 'AccessKeyId (Identify users)',
      access_key_secret: 'AccessKeySecret (Verify user\'s key)',
      bucket_name: 'BucketName (Storage space name)'
    },
    wechatPay: {
      setApiV3Key: 'What is the API v3 key? How to set?',
      helpApiV3Key: 'The system will not save your key in clear text. Please save it yourself.',
      setZip: 'What is the merchant API certificate? How to obtain merchant API certificate?',
      helpZip1: 'Please upload ZIP compressed package. (Download the compressed package according to the instructions)',
      helpZip2: 'Your key file system will not be saved in clear text. Please upload it safely. If you need to change it, please upload the compressed package again and fill in the APIv3 key again.',
      merchant_id: 'Merchant No',
      merchant_name: 'Merchant name',
      api_v3_key: 'APIv3 Key',
      zip: 'Merchant certificate compression package',
      randomKey: 'Random generation',
      check: {
        title: 'Certificate information',
        merchantId: 'Merchant No',
        merchantName: 'Merchant name',
        version: 'Certificate version',
        serialNumber: 'Certificate serial number',
        notAfter: 'Start of validity period',
        notBefore: 'End of validity',
        close: 'close'
      },
      test: {
        title: 'WeChat payment test',
        appid: 'APPID',
        notify_url: 'Callback Url',
        help1: 'WeChat payment common merchant and AppID account association management',
        help2: 'Generally, it is the request domain name of the background. If it is a local development environment, please build an intranet penetration.',
        help3: 'Note: Do not carry the last',
        help4: 'This payment is a test payment, with 1 cent actually paid. It will be returned after payment. Observe the back-end log',
        code: 'Please scan the code to pay'
      }
    }
  },
  permission: {
    keywords: 'Enter keywords to filter',
    sort: 'Sort',
    addSon: 'Create child permissions',
    name: 'Permission identification',
    title: 'Directory name',
    icon: 'Table of contents Icon',
    path: 'Directory path',
    component: 'Directory address',
    hidden: 'Directory display',
    nav: 'NavBar',
    btn: 'Button',
    startSortText: 'Directory sort',
    help: {
      example: 'example',
      exampleText: 'Create permissions',
      nav: 'The navigation bar will be displayed on the left navigation',
      proposal: 'Suggested rules',
      proposalText: 'The path of the sub-routing directory is kept constant with the directory address, forming a corresponding relationship with the authority identification',
      nameText: 'Used for background authority routing and foreground routing and i18n configuration',
      pathText: 'Front-end routing access path',
      componentText: 'File address corresponding to front-end routing',
      componentText1: 'Single-level nested routing use',
      componentText2: 'Multi-level nested routing use'
    }
  },
  role: {
    name: 'Role identification',
    syncPermissions: 'Permission setting'
  },
  activity: {
    log_name: 'Log name',
    description: 'description',
    subject: 'Subject',
    subject_id: 'Subject ID',
    subject_type: 'Subject type',
    causer: 'Causer',
    causer_id: 'Causer ID',
    causer_type: 'Causer type',
    properties: 'properties'
  },
  exception: {
    message: 'Error message',
    id: 'Error ID',
    solve: 'Repair value',
    solveSuccessText: 'Confirm repair',
    confirmSolveSuccessText: 'Confirm repair？',
    isSolve: 'Repair status',
    solveStatus: {
      all: 'All',
      no: 'Not fixed',
      yes: 'Fixed'
    },
    info: 'info'
  },
  admin: {
    id: 'User ID',
    name: 'User name',
    email: 'Email',
    password: 'Password',
    roles: 'Roles',
    syncRoles: 'Role setting',
    syncPermissions: 'Permission setting',
    emptyPasswordText: 'Leave blank and do not modify',
    status: 'Status',
    status1Text: 'Active',
    status0Text: 'Un active',
    navSetting: {
      refresh: 'Effective after refreshing the page',
      cache: 'Cancel page cache',
      affix: 'Fixed Tag',
      need: 'Need Tags-View'
    }
  },
  user: {
    name: 'User name',
    email: 'Email',
    password: 'Password',
    emptyPasswordText: 'Leave blank and do not modify'
  },
  file: {
    name: 'File name',
    size: 'File size',
    type: 'Type',
    lastModified: 'Update time',
    uploadFile: 'Upload Files',
    makeDirectory: 'New Directory',
    search: 'Please enter the file name prefix match',
    directoryName: 'Directory name',
    NSCTP: 'Preview is not supported in the current format',
    deleteFilesTipsText: 'This operation will permanently delete the file. Do you want to continue?',
    deleteDirectoryTipsText: 'This operation will permanently delete this folder and all files in the folder. Do you want to continue?',
    help: {
      title: 'Directory naming conventions',
      li1: 'Emoticons are not allowed. Please use UTF-8 characters that meet the requirements',
      li2: {
        text1: 'Used to split paths, quickly create subdirectories, but do not use',
        text2: 'Or',
        text3: 'At the beginning, there should be no continuity'
      },
      li3: {
        text1: 'Name not allowed',
        text2: 'Subdirectories'
      },
      li4: 'The total length is controlled between 1 and 60 characters'
    },
    uploadFileText: {
      currentDirectory: 'Current directory',
      specifyDirectory: 'Specify directory',
      rootDirectory: 'Root directory',
      uploadText1: 'Drag files here, Or ',
      uploadText2: 'Click upload',
      warnText: 'If there is a file with the same name, it will be overwritten by the newly uploaded file.',
      help: {
        title: 'File naming specification',
        li1: 'Use UTF-8 encoding',
        li2: 'Case sensitive',
        li3: 'The length must be between 1 and 1023 bytes',
        li4: {
          text1: 'Can\'t',
          text2: 'Or',
          text3: 'Beginning of character'
        }
      }
    }
  },
  notification: {
    form: 'Form',
    message: 'Message',
    is_read: 'Read or not',
    is_read0: 'Unread',
    is_read1: 'Read',
    send: 'Send',
    read: 'Mark read',
    allRead: 'All read',
    checkMessage: 'Please select message',
    all: 'All',
    sender: 'Sender'
  },
  nginx: {
    http: 'Http',
    httpCode: 'Code',
    ip: 'Ip',
    method: 'Method',
    uri: 'Request Uri',
    return: 'Response Uri',
    size: 'Size',
    browser: 'Browser',
    platform: 'Platform',
    is_warning: 'Warning',
    is_error: 'Error',
    is_mobile: 'Mobile',
    is_robot: 'Robot',
    all: 'All',
    yes: 'Yes',
    no: 'No'
  },
  dictType: {
    name: 'Dictionary name',
    type: 'Dictionary type',
    status: 'Status',
    status_1: 'Available',
    status_0: 'Disable',
    status_all: 'Whole',
    remark: 'Remark'
  },
  dictData: {
    title: 'Dict Data',
    sort: 'Sort',
    label: 'Label',
    value: 'Value',
    list_class: 'Table echo style',
    default: 'Default',
    default_1: 'Yes',
    default_0: 'No',
    default_all: 'Whole',
    status: 'Status',
    status_1: 'Available',
    status_0: 'Disable',
    status_all: 'Whole',
    remark: 'Remark'
  },
  genTable: {
    name: 'Name',
    comment: 'Comment',
    engine: 'Engine',
    charset: 'Charset',
    collation: 'Collation',
    created_at_start: 'Created At Start',
    created_at_end: 'Created At End',
    updated_at_start: 'Updated At Start',
    updated_at_end: 'Updated At End',
    select_table: 'Please select a table to generate',
    pid: 'Sub-headings',
    pid_placeholder: 'Leave blank to default to top-level category',
    confirm_message: 'Please confirm that the form information has been submitted',
    gen: 'Generate Code',
    table: {
      name: 'Name',
      comment: 'Comment',
      type: 'Type',
      _required: 'Required',
      _insert: 'Insert',
      _update: 'Update',
      _list: 'List',
      _select: 'Select',
      _query: 'Select Type',
      _show: 'Show Type',
      dict_type_id: 'Dict',
      _unique: 'Unique',
      _foreign: 'Foreign',
      _foreign_table: 'Foreign Table',
      _foreign_column: 'Foreign Column',
      _foreign_show_column: 'Foreign Column Show',
      select: 'Please Select'
    }
  },
  version: {
    error_handle: 'Click the Upgrade button or use CTRL+F5 to upgrade the client',
    error: 'The current client version does not match. Please upgrade the client.',
    update: 'Update'
  },
  error: {
    number: 'Error number',
    handle: 'We will fix this error as soon as possible. You can also copy the number to contact customer service/technical personnel'
  }
}
