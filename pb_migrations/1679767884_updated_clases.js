migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hwbjq8sw",
    "name": "comienza",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "\\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))"
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jev20cdl",
    "name": "termina",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "\\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hwbjq8sw",
    "name": "comienza",
    "type": "text",
    "required": true,
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
    "id": "jev20cdl",
    "name": "termina",
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
