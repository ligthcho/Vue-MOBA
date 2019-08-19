//管理员 model
const mongoose = require('mongoose')

//定义字段
const schema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        select: false, //查询时过滤字段
        set(val) {
            return require('bcrypt').hashSync(val, 10);
        }
    }
})

module.exports = mongoose.model('AdminUser', schema)