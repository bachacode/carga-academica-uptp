migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p8gan5gbxzqpiwe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nmje1hbi",
    "name": "horas",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 99
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p8gan5gbxzqpiwe")

  // remove
  collection.schema.removeField("nmje1hbi")

  return dao.saveCollection(collection)
})
