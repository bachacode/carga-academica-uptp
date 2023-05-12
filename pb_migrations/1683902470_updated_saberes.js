migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p8gan5gbxzqpiwe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "onzx43ab",
    "name": "codigo",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 40,
      "pattern": ""
    }
  }))

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
      "max": 40,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p8gan5gbxzqpiwe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "onzx43ab",
    "name": "codigo",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

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
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
