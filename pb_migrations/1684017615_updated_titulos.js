migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y7x8y8ed9uav78d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rjwdvuxc",
    "name": "grado",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y7x8y8ed9uav78d")

  // remove
  collection.schema.removeField("rjwdvuxc")

  return dao.saveCollection(collection)
})
