migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p8gan5gbxzqpiwe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ewtfpyf7",
    "name": "nombre",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 80,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mffg50td",
    "name": "trayecto",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 4
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p8gan5gbxzqpiwe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ewtfpyf7",
    "name": "nombre",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 80,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mffg50td",
    "name": "trayecto",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
