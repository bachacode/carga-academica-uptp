migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n8utcgt35dfjwdm")

  collection.options = {
    "query": "SELECT\n  profesores.id as id\nFROM profesores\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN saberes ON profesores.saberes = profesores\nLEFT JOIN clases ON profesores.id = clases.id_profesor\n\nGROUP BY profesores.id\n"
  }

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n8utcgt35dfjwdm")

  collection.options = {
    "query": "SELECT\n  profesores.id as id\nFROM profesores\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN saberes ON profesores.saberes = profesores\nLEFT JOIN clases ON profesores.id = clases.id_profesor\nWHERE clases.id_profesor = NULL\nGROUP BY profesores.id\n"
  }

  return dao.saveCollection(collection)
})
