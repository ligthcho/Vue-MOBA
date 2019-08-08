//分类路由
module.exports = app => {
    const express = require('express');
    const router = express.Router();
    //导入model
    const Category = require('../../models/Category');//这里一定要加;号
    //创建分类
    router.post('/categories',async (req,res)=>{
        const model = await Category.create(req.body);
        res.send(model)
    })
    //分类列表
    router.get('/categories',async (req,res)=>{
        const items = await Category.find().populate('parent').limit(10); //limit || 限制10条 populate || 查出关联分类 返回关联对象
        res.send(items)
    })
    //单分类详情
    router.get('/categories/:id',async (req,res)=>{    
        const model = await Category.findById(req.params.id);
        res.send(model)
    })
    //修改分类保存
    router.put('/categories/:id',async (req,res)=>{
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //删除分类
    router.delete('/categories/:id',async (req,res)=>{
        await Category.findByIdAndDelete(req.params.id,req.body)
        res.send({success:true})
    })
    app.use('/admin/api',router)
    
}