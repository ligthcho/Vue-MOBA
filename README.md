# Vue-MOBA
NodeJs + VueJs (Express + ElementUI) 全栈开发王者荣耀手机端官网和管理后台
#开始
1.分别在admin 和 server 下 运行 npm run serve 

# 目录结构
1. admin  后台管理界面
2. server 服务端项目，提供接口及web服务
3. web

# 创建 
1. 创建admin和web || vue create admin vue create web
2. 在server项目下创建routes、plugins、models文件夹 

# 安装
1. 启动服务端 package "serve":"nodemon index.js" || npm i -g nodemon
2. 在admin文件夹下 
   安装 element-ui || npm i element-ui -S
   安装 路由 || vue add router 然后选n
   安装 axios ||npm i axios
   
3. 在server文件夹下
   安装 mongoose 连接数据库 允许跨域请求 || npm i express@next mongoose cors
   安装 字符转换 例如:小写转大写 || npm i inflection
   安装 处理上传文件 || npm i multer
   安装 散列 || npm i bcrypt
   安装 登录验证校验 || npm i jsonwebtoken
   安装 异常处理 || npm i http-assert

4. 在web文件夹下
   安装 sass || npm i -D sass sass-loader 
   安装 router || vue add router
## 路由
1. admin项目
--创建和配置 
新建分类页 CategoryEdit.vue
列表分类页 CategoryList.vue
新建物品页 ItemEdit.vue
列表物品页 ItemList.vue
新建英雄页 HeroEdit.vue
列表英雄页 HeroList.vue
新建文章页 ArticleEdit.vue
列表文章页 ArticleList.vue
新建广告位页 AdEdit.vue
列表广告位页 AdList.vue
登录页 Login.vue
## 备注
1. height: 100vh ||代表屏幕高度
2. 表单 @submit.native.prevent native||原生表单提交,prevent||默认阻止冒泡
3. const Category = require('../../models/Category');  后面要加; 否则报错
4. 在路由中添加props:true,这样就可以容易获取路由的参数 更容易解耦 
5. mongoose.SchemaTypes.ObjectId || 表示数据库标识id , ref ||表示关联表
6. ./是当前目录../是父级目录 /是根目录
7. __dirname || 当前文件路径
8. upload.single('file') || 接收单个文件上传
9. localStorage || 关掉浏览器再打开还有 ， sessionStorage || 关掉浏览器再打开就没了
10. xxxx is not function
## 喵
https://www.bilibili.com/video/av51931842/?p=6