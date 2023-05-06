migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n8utcgt35dfjwdm")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  clases.id_profesor\nFROM profesores\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN saberes ON profesores.saberes = profesores\nLEFT JOIN clases ON profesores.id = clases.id_profesor\nWHERE clases.id_profesor = NULL\n"
  }

  // remove
  collection.schema.removeField("hk18m5zj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ububzb9s",
    "name": "id_profesor",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jyjq1goyyopi2bd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n8utcgt35dfjwdm")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  clases.id_profesor\nFROM profesores\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN saberes ON profesores.saberes = profesores\nLEFT JOIN clases ON profesores.id = clases.id_profesor\n\nGROUP BY profesores.id\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hk18m5zj",
    "name": "id_profesor",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jyjq1goyyopi2bd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("ububzb9s")

  return dao.saveCollection(collection)
})
