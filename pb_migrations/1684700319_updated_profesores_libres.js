migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n8utcgt35dfjwdm")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  profesores.created\nFROM profesores\nLEFT JOIN cargas ON profesores.id = cargas.profesor_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nWHERE cargas.profesor_id is NULL\n"
  }

  // remove
  collection.schema.removeField("mcuegly8")

  // remove
  collection.schema.removeField("fzkpnowu")

  // remove
  collection.schema.removeField("xlv9wa00")

  // remove
  collection.schema.removeField("bxjbpkhg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "clet8wba",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fx5ewtng",
    "name": "apellido",
    "type": "text",
    "required": false,
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
    "id": "5fn1xnap",
    "name": "titulo",
    "type": "text",
    "required": false,
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
    "id": "y2kaijuv",
    "name": "saberes",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "p8gan5gbxzqpiwe",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n8utcgt35dfjwdm")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  profesores.created\nFROM profesores\nLEFT JOIN clases ON profesores.id = clases.id_profesor\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nWHERE clases.id_profesor is NULL\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mcuegly8",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fzkpnowu",
    "name": "apellido",
    "type": "text",
    "required": false,
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
    "id": "xlv9wa00",
    "name": "titulo",
    "type": "text",
    "required": false,
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
    "id": "bxjbpkhg",
    "name": "saberes",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "p8gan5gbxzqpiwe",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("clet8wba")

  // remove
  collection.schema.removeField("fx5ewtng")

  // remove
  collection.schema.removeField("5fn1xnap")

  // remove
  collection.schema.removeField("y2kaijuv")

  return dao.saveCollection(collection)
})
