//物品 model
const mongoose = require('mongoose')

//定义字段
const schema = new mongoose.Schema({
    name:{type:String},
    icon:{type:String}
})

module.exports = mongoose.model('Item',schema)