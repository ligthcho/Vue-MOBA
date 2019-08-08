//分类 model
const mongoose = require('mongoose')

//定义字段
const schema = new mongoose.Schema({
    name:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}
})

module.exports = mongoose.model('Category',schema)