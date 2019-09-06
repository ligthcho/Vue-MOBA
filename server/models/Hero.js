//英雄 model
const mongoose = require('mongoose')

//定义字段
const schema = new mongoose.Schema({
    name:{type:String},
    avatar:{type:String},//头像
    title:{type:String},//称号
    categories:[{
        type:mongoose.SchemaTypes.ObjectId,ref:'Category'
    }],//实现一个英雄关联多个分类
    scores:{
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    skills:[{//技能
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String}
    }],
    items1:[{//装备 顺风出装
        type:mongoose.SchemaTypes.ObjectId,ref:'Item'
    }],
    items2:[{//装备 逆风出装
        type:mongoose.SchemaTypes.ObjectId,ref:'Item'
    }],
    usageTips:{type:String},//铭文推荐
    battleTips:{type:String},//使用技巧
    teamTips:{type:String},//对抗技巧
    partners:[{//英雄关系
        hero:{
            type:mongoose.SchemaTypes.ObjectId,ref:'Hero'
        },
        description:{type:String} //描述
    }]
})

module.exports = mongoose.model('Hero',schema,'heroes')