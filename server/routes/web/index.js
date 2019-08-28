module.exports = app => { //给手机端接口路由   
    const router = require('express').Router()


    // const Article = require('../../models/Article')
    //引用地址太麻烦 直接引用mongoose
    const mongoose = require('mongoose')

    const Category = mongoose.model('Category')
    //const Aritcle = mongoose.model('Aritcle')


    //访问页面来录入数据（正式开发不能这样录入哦）
    //获取新闻分类
    router.get('/news/init', async (req, res) => {
        //lean  || 不带mongoose对象，拿到比较干净的数据
        const cats = await Category.find().lean()
        const newsTitles = ["最强战队争霸赛参赛指南，如何让战队提升排名入围淘汰赛", "审判系统信誉经验恢复速率调整公告", "王者荣耀公布“无限开放计划”：探索游戏边界，共享荣耀", "暑期粉丝节狂欢，快手直播邀你一起来上分！", "《王者荣耀》对话岭南优秀非遗文化 跨界融合南狮发力新文创", "8月27日全服不停机更新公告", "审判系统信誉经验恢复速率调整公告", "8月28日体验服停机更新公告", "8月28日体验服不停机更新公告", "8月27日体验服停机更新公告", "乘风破浪闯峡谷 SNK永久英雄免费拿", "峡谷最强战队争霸赛今日开启，全新赛制抢先体验！", "最强战队争霸赛参赛指南，如何让战队提升排名入围淘汰赛", "新版本峡谷狂欢活动周开启", "【微信游戏专属】微信游戏6周年活动已开启"]
        const newsList = newsTitles.map(title => {
            //slice(0) || 创建一个新数组，保护原数据
            //sort ||排序
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories:randomCats.slice(0,2),
                title: title
            }
        })
        res.send(newsList)

    })

    app.use('/web/api', router)
}