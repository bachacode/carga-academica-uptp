migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6v4eu5zg3l41uci")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre\nFROM clases\nINNER JOIN profesores ON profesores.id = clases.id_profesor"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qtzmyzf1",
    "name": "nombre",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 40,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6v4eu5zg3l41uci")

  collection.options = {
    "query": "SELECT profesores.id as id\nFROM clases\nINNER JOIN profesores ON profesores.id = clases.id_profesor"
  }

  // remove
  collection.schema.removeField("qtzmyzf1")

  return dao.saveCollection(collection)
})
