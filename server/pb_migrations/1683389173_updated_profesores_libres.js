migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n8utcgt35dfjwdm")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  profesores.created\nFROM profesores\nLEFT JOIN clases ON profesores.id = clases.id_profesor\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nWHERE clases.id_profesor is NULL\n"
  }

  // remove
  collection.schema.removeField("ububzb9s")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n8utcgt35dfjwdm")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  clases.id_profesor\nFROM profesores\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN saberes ON profesores.saberes = profesores\nLEFT JOIN clases ON profesores.id = clases.id_profesor\nWHERE clases.id_profesor = NULL\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ububzb9s",
    "name": "id_profesor",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jyjq1goyyopi2bd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("mcuegly8")

  // remove
  collection.schema.removeField("fzkpnowu")

  // remove
  collection.schema.removeField("xlv9wa00")

  // remove
  collection.schema.removeField("bxjbpkhg")

  return dao.saveCollection(collection)
})
