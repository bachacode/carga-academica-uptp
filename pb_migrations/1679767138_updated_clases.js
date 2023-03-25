migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // remove
  collection.schema.removeField("fbtmtx1j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vtip6y0u",
    "name": "dia",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado",
        "domingo"
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
    "id": "fbtmtx1j",
    "name": "dia",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("vtip6y0u")

  return dao.saveCollection(collection)
})
