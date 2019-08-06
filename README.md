# Vue-MOBA
NodeJs + VueJs (Express + ElementUI) 全栈开发王者荣耀手机端官网和管理后台

# 目录结构
1. admin  后台管理界面
2. server 服务端项目，提供接口及web服务
3. web

# 创建 
1. 创建admin和web || vue create admin vue create web
2. 在server项目下创建routes 

# 安装
1. 启动服务端 package "serve":"nodemon index.js" || npm i -g nodemon
2. 在admin文件夹下 
   安装 element-ui || npm i element-ui -S
   安装 路由 || vue add router 然后选n
   安装 axios ||npm i axios
3. 在server文件夹下
   安装npm i express@next mongoose cors   || mongoose 连接数据库 允许跨域请求

## 路由
1. admin项目
--创建和配置 新建分类页 CategoryEdit.vue

## 备注
1. height: 100vh ||代表屏幕高度
2. 表单 @submit.native.prevent native||原生表单提交,prevent||默认阻止冒泡
## 喵
https://www.bilibili.com/video/av51931842/?p=6