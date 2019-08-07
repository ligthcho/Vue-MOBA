//分类路由
module.exports = app => {
    const express = require('express')
    const router = express.Router()
    //导入model
    const Category = require('../../models/Category');//这里一定要加;号
    
    router.post('/categories',async (req,res)=>{
        const model = await Category.create(req.body);
        res.send(model)
    })
    app.use('/admin/api',router)
    
}