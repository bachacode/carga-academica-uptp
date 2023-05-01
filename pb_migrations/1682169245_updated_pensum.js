migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9fze468edng6rci")

  // remove
  collection.schema.removeField("wefk4xvr")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9fze468edng6rci")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wefk4xvr",
    "name": "trayecto",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
