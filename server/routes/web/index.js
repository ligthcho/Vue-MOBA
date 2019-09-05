module.exports = app => { //给手机端接口路由   
    const router = require('express').Router()


    // const Article = require('../../models/Article')
    //引用地址太麻烦 直接引用mongoose
    const mongoose = require('mongoose')

    const Category = mongoose.model('Category')
    const Article = mongoose.model('Article')


    //访问页面来录入数据（正式开发不能这样录入哦）
    //初始化新闻分类
    router.get('/news/init', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        //lean  || 不带mongoose对象，拿到比较干净的数据
        //只找新闻分类下的子分类
        const cats = await Category.find().where({
            parent: parent
        }).lean()
        const newsTitles = ["最强战队争霸赛参赛指南，如何让战队提升排名入围淘汰赛", "审判系统信誉经验恢复速率调整公告", "王者荣耀公布“无限开放计划”：探索游戏边界，共享荣耀", "暑期粉丝节狂欢，快手直播邀你一起来上分！", "《王者荣耀》对话岭南优秀非遗文化 跨界融合南狮发力新文创", "8月27日全服不停机更新公告", "审判系统信誉经验恢复速率调整公告", "8月28日体验服停机更新公告", "8月28日体验服不停机更新公告", "8月27日体验服停机更新公告", "乘风破浪闯峡谷 SNK永久英雄免费拿", "峡谷最强战队争霸赛今日开启，全新赛制抢先体验！", "最强战队争霸赛参赛指南，如何让战队提升排名入围淘汰赛", "新版本峡谷狂欢活动周开启", "【微信游戏专属】微信游戏6周年活动已开启"]
        const newsList = newsTitles.map(title => {
            //slice(0) || 创建一个新数组，保护原数据
            //sort ||排序
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2), //挑两个
                title: title
            }
        })
        //往数据库插入数据   (先清空再插入)
        await Article.deleteMany({})
        await Article.insertMany(newsList)
        res.send(newsList)
    })
    //获取新闻列表
    router.get('/news/list', async (req, res) => {
        // const parent = await Category.findOne({
        //     name:"新闻分类"
        // }).populate({
        //     path:'children'
        // })
        const parent = await Category.findOne({
            name: "新闻分类"
        })
        //aggregate || 聚合查询 
        //match || 条件查询 类似where
        //lookup || 外键关联查询
        //addFields || 字段过滤
        //1.查出新闻分类的子分类
        //2.查出各各子分类下文章集合
        //3.过滤文章集合只有其中5条  
        const cats = await Category.aggregate([{
                $match: {
                    parent: parent._id
                }
            },
            {
                $lookup: { //表名这里没有在 mongoose.model() 设置第三个参数，这里默认用表名复数
                    from: 'articles',
                    localField: "_id",
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    newsList: {
                        $slice: ['$newsList', 5]
                    }
                }
            }
        ])
        //插入“热门”分类
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: {
                    $in: subCats
                }
            }).populate('categories').limit(5).lean()
        })
        //‘热门’分类处理
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = cat.name === '热门' ?
                    news.categories[0].name : cat.name
                return news
            })
            return cat
        })

        res.send(cats)
    })
    //初始化英雄数据
    // $$('.hero-nav >li').map((li, i) => {
    //     return {
    //         name: li.innerText,
    //         heroes: $$('li', $$('.hero-list')[i]).map(el => {
    //             return {
    //                 name: $$('h3', el)[0].innerHTML,
    //                 avatar: $$('img', el)[0].src
    //             }
    //         })
    //     }
    // })

    app.use('/web/api', router)
}