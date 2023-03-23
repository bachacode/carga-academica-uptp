migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // remove
  collection.schema.removeField("asmhquqj")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "asmhquqj",
    "name": "duracion",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("zbtghacc")

  return dao.saveCollection(collection)
})
