//数据库插件
module.exports = app =>{
    const mongoose = require("mongoose");
    var db = mongoose.connection;
    db.on('open', function(){console.log('connect success')});
    db.on('error', function(){console.log('connect error')}); 

    mongoose.connect('mongodb://127.0.0.1:27017/vue-moba',{
        useNewUrlParser:true
    })
    //把model的文件引用一遍 没其他特别效果
    require('require-all')(__dirname+'/../models')
}