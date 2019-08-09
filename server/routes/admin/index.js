//分类路由
module.exports = app => {
    const express = require('express');
    const router = express.Router({
        mergeParams:true//合并url参数 为了能让路由访问到
    });
    //导入model
    // const Category = require('../../models/Category');//这里一定要加;号
    //创建分类
    router.post('/',async (req,res)=>{
       // const items = await Category.create(req.body); 
        const items = await req.Model.create(req.body); 
        res.send(items)
    })
    //分类列表
    router.get('/',async (req,res)=>{
        const queryOptions = {}
        if(req.Model.modelName ==='Category'){//动态外键
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10); //limit || 限制10条 populate || 查出关联分类 返回关联对象
        res.send(items)
    })
    //单分类详情
    router.get('/:id',async (req,res)=>{    
        const model = await req.Model.findById(req.params.id);
        res.send(model)
    })
    //修改分类保存
    router.put('/:id',async (req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //删除分类
    router.delete('/:id',async (req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({success:true})
    })
    //:resoure 动态参数
    app.use('/admin/api/rest/:resoure',
    async (req,res,next)=>{//中间件
        const modelName = require('inflection').classify(req.params.resoure)
        req.Model = require(`../../models/${modelName}`)
        next()
    }
    ,router)
    
    //上传文件路由设置
    const multer = require('multer') //中间件
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{//upload.single || 接收单个文件
        const file = req.file  //中间件搞来的file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}