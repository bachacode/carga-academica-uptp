migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jyjq1goyyopi2bd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h0skyldp",
    "name": "titulo_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "y7x8y8ed9uav78d",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w8qomffc",
    "name": "id_contrato",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "hueadjlvs1rgsqi",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jyjq1goyyopi2bd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h0skyldp",
    "name": "titulo_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "y7x8y8ed9uav78d",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w8qomffc",
    "name": "id_contrato",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "hueadjlvs1rgsqi",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
