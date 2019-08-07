//分类 model
const mongoose = require('mongoose')

//定义字段
const schema = new mongoose.Schema({
    name:{type:String}
})

module.exports = mongoose.model('Category',schema)