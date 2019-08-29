//文章 model
const mongoose = require('mongoose')

//定义字段
const schema = new mongoose.Schema({
    title: {
        type: String
    },
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    body: {
        type: String
    }
}, {
    timestamps: true //时间戳 生成model时会自动多带两个字段一个是createdAt,一个是UpdatedAt
})

module.exports = mongoose.model('Article', schema)