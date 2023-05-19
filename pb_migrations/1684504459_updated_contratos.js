migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hueadjlvs1rgsqi")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rrdrv6ce",
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
    "id": "fzoi1rzy",
    "name": "horas",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 99
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hueadjlvs1rgsqi")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rrdrv6ce",
    "name": "tipo",
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
    "id": "fzoi1rzy",
    "name": "horas_maximas",
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
