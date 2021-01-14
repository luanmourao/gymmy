const express = require('express');
const server = express();

const { pageLanding, pageTreinar, pageDarAula, saveClasses, renderModal } = require('./pages')

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})

server
.use(express.urlencoded({ extended: true })) // config req.body
.use(express.static('public'))

// app routes
.get("/", pageLanding)
.get("/treinar", pageTreinar)
.get("/dar-aula", pageDarAula)
.post("/modal", renderModal)
.get("/save-classes", saveClasses)

.listen(5500)

