var express = require('express')
var router = express.Router()

// GET Home page
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll()
    res.render('index', { title: 'Lista de filmes', docs })
  } catch (err) {
    next(err)
  }
})

// configurando a rota do tipo novo registro - GET clic no botao NOVO
router.get('/new', (req, res, next) => {
  res.render('new', {
    title: 'Novo Cadastro',
    doc: {
      titulo: '',
      sinopse: '',
      duracao: '',
      dataLancamento: '',
      imagem: '',
      categoria: ''
    },
    action: '/new'
  })
})

// configurando a rota para salvar o novo registro  Post - capturar
router.post('/new', async (req, res, next) => {
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse
  const duracao = parseInt(req.body.duracao)
  const dataLancamento = req.body.dataLancamento
  const imagem = req.body.imagem
  const categoria = req.body.titulo

  try {
    const result = await global.db.insert({
      titulo,
      sinopse,
      duracao,
      dataLancamento,
      imagem,
      categoria
    })
    console.log(result)
    res.redirect('/')
  } catch (err) {
    next(err)
  }
})

// rota de acesso a edicao do registro
router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    const doc = await global.db.findOne(id)
    res.render('new', {
      title: 'Edição do Filme',
      doc,
      action: '/edit/' + doc._id
    })
  } catch (err) {
    next(err)
  }
})

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse
  const duracao = parseInt(req.body.duracao)
  const dataLancamento = req.body.dataLancamento
  const imagem = req.body.imagem
  const categoria = req.body.titulo

  try {
    const result = await global.db.update(id, {
      titulo,
      sinopse,
      duracao,
      dataLancamento,
      imagem,
      categoria
    })
    res.redirect('/')
  } catch (err) {
    next(err)
  }
})

// Rota delete

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id

  try {
    const result = await global.db.deleteOne(id)
    console.log(result)
    res.redirect('/')
  } catch (err) {
    next(err)
  }
})

/*
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
*/
module.exports = router

/* 
(index) - e o arquivo que esta dentro views
Rota da raiz chamar: findAll (Configurar mais coisa no index)
Rota do edit chamar: findOne (Configurar mais coisa no index)
Rota do novo chamar:  
GET home page.
async - chama de uma funcao assincrona que vai ter uma (req, res, next) como resposta (Vai existir uma process)
await -   (Cria a promessa - roda o event loop)
global.db.findAll - recebe as informacoes e docs (Recebe o retorno em array)
index tem que possuir interacao com o docs (conteudo de retorno do findALL) dentro do index consigo chamar os dados dentros de docs...etc
 */
