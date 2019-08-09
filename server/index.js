const express = require("express")

const app = express()
//中间件 为了使用跨域和json
app.use(require('cors')())
app.use(express.json())
//托管静态文件 让所有文件可以通过 /uploads 来访问
app.use('/uploads',express.static(__dirname+'/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})