migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2tmfch5yb8ffvil")

  // remove
  collection.schema.removeField("ybnmu9dn")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2tmfch5yb8ffvil")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ybnmu9dn",
    "name": "titulo",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
