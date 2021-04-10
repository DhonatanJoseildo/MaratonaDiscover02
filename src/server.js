const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")
//usando templete engine(usado para programar dentro do html)
server.set('view engine', 'ejs')

//habilitar arquivos statics
server.use(express.static("public"))

// mudar a localização engine
server.set('views', path.join(__dirname, 'views'))

//  usar o req.body
server.use(express.urlencoded({extended: true}))
//routes
server.use(routes)
// lista abrindo uma porta no caso a 3000, e mostrando no terminal
server.listen(3000, () => console.log('rodando'))
