// servidor
const express = require('express');
const server = express();

const { pageLanding, pageTreinar, pageDarAula, saveClasses } = require('./pages')

// configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})

// início e configuração do servidor
server
// configuração para receber dados do req.body
.use(express.urlencoded({ extended: true }))
// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static('public'))
// rotas da aplicação
.get("/", pageLanding)
.get("/treinar", pageTreinar)
.get("/dar-aula", pageDarAula)
.post("/save-classes", saveClasses)
// start do servidor
.listen(5500)

