/* conecão com o banco de dados
 1 - Variavel mongoCliente fica responsável por conectar com o banco de dados que se chama filmes - (colecao tb chama filmes)
*/
const mongoClient = require('mongodb').MongoClient
mongoClient
  .connect('mongodb://localhost')
  .then(conn => (global.conn = conn.db('filmes')))
  .catch(err => console.log(err))

// Configuração das funções CRUD - Parametros/regras/acordos que vão ser executadas.

// Selecionar registros transformando para array, pois estamos com arquivo .json
function findAll() {
  return global.conn.collection('filmes').find().toArray()
}

/* insert precisa receber um parametro, e foi criado/chamado como (filme)-insertOne filme
 */

function insert(filme) {
  return global.conn.collection('filmes').insertOne(filme)
}

/*
Buscar uma pessoa.
Teve de ser criado o objectId pois o campo _id no json nao e um (int) e sim (objectId)
convertido 
ao final do codigo foi necessario criar uma instancia de objeto chamado =ObjectID - 
findOne(new ObjectId(id) pois retornar somente UM registro especifico 
*/
const ObjectId = require('mongodb').ObjectId

function findOne(id) {
  return global.conn.collection('filmes').findOne(new ObjectId(id))
}

/*
Na alteracao de arquivo e necesssario o retorno de um ID e filme que e uma variavel que vai receber o conteudo json.
*/

function update(id, filme) {
  return global.conn
    .collection('filmes')
    .updateOne({ _id: new ObjectId(id) }, { $set: filme })
}

/*
Deletar um redistro -  recebe o id pois e o parametro que tenho de receber e novamente id e convertido por um ObjectId.
*/

function deleteOne(id) {
  return global.conn.collection('filmes').deleteOne({ _id: new ObjectId(id) })
}

module.exports = { findAll, insert, findOne, update, deleteOne }
