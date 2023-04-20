migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6v4eu5zg3l41uci")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  clases.id_profesor,\n  profesores.nombre\nFROM profesores\nINNER JOIN clases ON profesores.id = clases.id_profesor"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qvrouctd",
    "name": "id_profesor",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "2tmfch5yb8ffvil",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6v4eu5zg3l41uci")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre\nFROM profesores\nINNER JOIN clases ON profesores.id = clases.id_profesor"
  }

  // remove
  collection.schema.removeField("qvrouctd")

  return dao.saveCollection(collection)
})
