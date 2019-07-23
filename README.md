# vue-element-demo

> A Vue.js project
> 参考[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin),将其部分功能抽离出来。

## 介绍

随手写的，原本就是想放点自己感兴趣和没有尝试过的东西。

## 功能

- 自定义eslint检查，增加commit eslint校验钩子
- 放了点常用的工具函数（包括math，object等）
- 基于el-table封装，实现分页组件等的分离
- 自动注册组件某些目录下的特定vue组件为全局组件
- 尝试css module用法
- layout排版，header与menu功能
- 动态菜单权限（前台或后台提供路由），页面与指令权限
- 使用easy-mock 来代替后台请求
- 继续学习，添加中。。。

## 开发

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```


## 其它

```bash
# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```


