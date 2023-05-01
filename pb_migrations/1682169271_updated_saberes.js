migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vqaqkrs7827e13h")

  // remove
  collection.schema.removeField("uds8rjx1")

  // remove
  collection.schema.removeField("3jjexo8k")

  // remove
  collection.schema.removeField("ulsm8vxv")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vqaqkrs7827e13h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uds8rjx1",
    "name": "codigo",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": 1,
      "max": 40,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3jjexo8k",
    "name": "periodo",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 3
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ulsm8vxv",
    "name": "creditos",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 99
    }
  }))

  return dao.saveCollection(collection)
})
