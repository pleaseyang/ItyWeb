# e-icon-picker 图标选择组件
简洁大方，专为`element-ui`（已经脱离element-ui独立可用）和`font-awesome`（可选）图标库开发的图标选择组件，希望大家喜欢！

![示例图片](https://oscimg.oschina.net/oscnet/up-bf411d272ce969c1d5be9dc1ea12a8969ea.JPEG "示例图片")

![示例图片](https://oscimg.oschina.net/oscnet/up-c4ac227f3356ee405358e951450cdeffed5.png "示例图片")

喜欢的欢迎star [项目地址](https://gitee.com/cnovel/e-icon-picker)

## Demo

[在线测试](http://demo.icon.cnovel.club)

[在线API](http://doc.icon.cnovel.club)

## 安装

>~~因为项目使用了element-ui的组件进行二次开发，所以在使用此组件前请安装element-ui组件库。~~
>~~安装方式请参考element-ui官网的相关文档。~~[element-ui官网](https://element.eleme.cn/#/zh-CN/component/installation)。
>
>已经脱离element-ui，不需要再安装element-ui了。

**npm 安装**

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```bash
npm install e-icon-picker
```

## 快速使用

```
import iconPicker from 'e-icon-picker';
import "e-icon-picker/dist/symbol.js"; //基本彩色图标库
import 'e-icon-picker/dist/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css'; //element-ui 图标库

Vue.use(iconPicker);
```

详细文档
- [使用文档](http://doc.icon.cnovel.club)

## 使用

```html
 <e-icon-picker v-model="icon"/>
```

##  捐赠支持

开源项目不易，若此项目能得到你的青睐，可以捐赠支持作者持续开发与维护。喜欢的欢迎star [项目地址](https://gitee.com/cnovel/e-icon-picker)。

 ![收款码](https://oscimg.oschina.net/oscnet/up-e2344cd770f7f7386637d0dbbfb5d48472c.JPEG)

**另：**

本人还有一个开源项目，在项目中的菜单管理使用了该图标组件，喜欢的可以去看看，帮忙点个star,非常感谢！
项目地址： [novel](https://gitee.com/cnovel/Novel-api)

**演示图**

| ![用户登录](https://oscimg.oschina.net/oscnet/up-4fc9e90ab9a427415b2a231d647bb6682b4.png "用户登录") | ![系统首页](https://oscimg.oschina.net/oscnet/up-f5f91451165f3d0dcfdcab9482ab867c09f.png "系统首页") |
| ------------ | ------------ |
| ![用户管理](https://oscimg.oschina.net/oscnet/up-3914e348f499598c26aba4b7c92ad5ce8bb.png "用户管理") | ![用户编辑](https://oscimg.oschina.net/oscnet/up-f24997c68d622dc9b2d079ef24da9919d17.png "用户编辑") |
| ![角色管理](https://oscimg.oschina.net/oscnet/up-a0604715ea922b9cc06cc7ebf5e9d874159.png "角色管理") | ![角色编辑](https://oscimg.oschina.net/oscnet/up-8f24ea94aec59ff494d205254ec9f04ad2c.png "角色编辑") |
| ![菜单管理](https://oscimg.oschina.net/oscnet/up-fb682a64f33692c7fe95befcc83b484f02f.png "菜单管理") | ![菜单编辑](https://oscimg.oschina.net/oscnet/up-ce248e9ea710d4b39969400a5c485cf19a2.png "菜单编辑") |
| ![岗位管理](https://oscimg.oschina.net/oscnet/up-d962e260fdcd43929ff5e8664a00b9ebf2e.png "岗位管理") | ![岗位编辑](https://oscimg.oschina.net/oscnet/up-deac57b7fae4d300bf64267fe9d4408f1d1.png "岗位编辑") |
| ![部门管理](https://oscimg.oschina.net/oscnet/up-a87d3c402fc59b075d11749860043af78f4.png "部门管理") | ![部门编辑](https://oscimg.oschina.net/oscnet/up-c9663b06835ac73f523409c14d65f8d1b85.png "部门编辑") |
| ![操作日志](https://oscimg.oschina.net/oscnet/up-51c244b113d1fe11e51c5e8db36c27baf83.png "操作日志") | ![日志详情](https://oscimg.oschina.net/oscnet/up-12952a8957a15b8e7fb0d9cebe219c6e093.png "日志详情") |
| ![登录日志](https://oscimg.oschina.net/oscnet/up-04f46761918f952cf8df0dc56b09672e69e.png "登录日志") | ![服务监控](https://oscimg.oschina.net/oscnet/up-257213ddf2fcbf090f15a2f3573eff2b566.png "服务监控") |
| ![在线用户](https://oscimg.oschina.net/oscnet/up-0b0ab18325a221e68057be0baabea481602.png "在线用户") | ![数据监控](https://oscimg.oschina.net/oscnet/up-762373c8e139d6512c4f0c64269a5d55c19.png "数据监控") |
| ![个人信息](https://oscimg.oschina.net/oscnet/up-172e7b0f0140f82b11f4929e8af9b33aac5.png "个人信息") | ![编辑头像](https://oscimg.oschina.net/oscnet/up-4583a5fb165131316c90e4793089755f896.png "编辑头像") |
