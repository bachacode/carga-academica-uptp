migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  clases.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  clases.dia,\n  clases.horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor"
  }

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  clases.id_profesor as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  clases.dia,\n  clases.horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor"
  }

  return dao.saveCollection(collection)
})
