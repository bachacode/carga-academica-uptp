migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o3f2l2exay2giuc")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  SUM(cargas.horas) as horas,\n  cargas.dia,\n  profesores.created\nFROM profesores\nRIGHT JOIN cargas ON profesores.id = cargas.profesor_id\nGROUP BY profesores.id, cargas.dia"
  }

  // remove
  collection.schema.removeField("u81rulp8")

  // remove
  collection.schema.removeField("ev1yp9fm")

  // remove
  collection.schema.removeField("hqwyls0o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yzcbaqcv",
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
    "id": "qddd96l7",
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
    "id": "jcfm3eqj",
    "name": "cedula",
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
    "id": "htmqvkqd",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "igleavwr",
    "name": "dia",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o3f2l2exay2giuc")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula\nFROM profesores\nRIGHT JOIN cargas ON profesores.id = cargas.profesor_id\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u81rulp8",
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
    "id": "ev1yp9fm",
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
    "id": "hqwyls0o",
    "name": "cedula",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("yzcbaqcv")

  // remove
  collection.schema.removeField("qddd96l7")

  // remove
  collection.schema.removeField("jcfm3eqj")

  // remove
  collection.schema.removeField("htmqvkqd")

  // remove
  collection.schema.removeField("igleavwr")

  return dao.saveCollection(collection)
})
