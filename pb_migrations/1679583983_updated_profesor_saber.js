migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gukzkyv0xa1bsyh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fxasboow",
    "name": "id_profesor",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "2tmfch5yb8ffvil",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x43wtxik",
    "name": "id_saber",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "vqaqkrs7827e13h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gukzkyv0xa1bsyh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fxasboow",
    "name": "id_profesor",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "2tmfch5yb8ffvil",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x43wtxik",
    "name": "id_saber",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "vqaqkrs7827e13h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})