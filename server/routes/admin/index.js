//分类路由
module.exports = app => {
    const express = require('express');
    const router = express.Router({
        mergeParams: true //合并url参数 为了能让路由访问到
    });
    //登录校验中间件
    const authMiddleware = require('../../middleware/auth');

    //资源中间件
    const resoureMiddleware = require('../../middleware/resoure');

    const AdminUser = require('../../models/AdminUser');
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');

    //导入model
    // const Category = require('../../models/Category');//这里一定要加;号
    //创建分类
    router.post('/', async (req, res) => {
        // const items = await Category.create(req.body); 
        const items = await req.Model.create(req.body);
        res.send(items)
    })
    //分类列表
    router.get('/', authMiddleware(), async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') { //动态外键
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10); //limit || 限制10条 populate || 查出关联分类 返回关联对象
        res.send(items)
    })
    //单分类详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id);
        res.send(model)
    })
    //修改分类保存
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除分类
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })



    //:resoure 动态参数
    app.use('/admin/api/rest/:resoure', authMiddleware(), resoureMiddleware(), router)

    //上传文件路由设置
    const multer = require('multer') //中间件
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => { //upload.single || 接收单个文件
        const file = req.file //中间件搞来的file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    //登录
    app.post("/admin/api/login", async (req, res) => {
        const {
            username,
            password
        } = req.body
        //1.根据用户名找用户

        const user = await AdminUser.findOne({
            username
        }).select('+password') //添加查询被隐藏的字段
        assert(user, 422, '用户不存在')
        ////用assert替代了
        // if(!user){
        //     return res.status(422).send({
        //         message:'用户不存在'
        //     })
        // }

        //2.校验密码
        const isValid = require('bcrypt').compareSync(password,user.username);
        assert(isValid, 422, '密码错误')
        // if (!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        //返回token

        //取出全局变量
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))
        res.send({
            token
        })

    })
    //错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}