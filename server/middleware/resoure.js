module.exports = options => {
    return async (req, res, next) => { //中间件
        const modelName = require('inflection').classify(req.params.resoure)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}