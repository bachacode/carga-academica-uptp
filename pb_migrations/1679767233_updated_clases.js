migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // remove
  collection.schema.removeField("zbtghacc")

  // add
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

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zbtghacc",
    "name": "duracion",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "45m",
        "1h 20m",
        "2h"
      ]
    }
  }))

  // remove
  collection.schema.removeField("hwbjq8sw")

  // remove
  collection.schema.removeField("jev20cdl")

  return dao.saveCollection(collection)
})
