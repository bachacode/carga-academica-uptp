migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o3f2l2exay2giuc")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  profesores.saberes,\n  SUM(cargas.horas) as horas,\n  cargas.dia,\n  profesores.created\nFROM profesores\nRIGHT JOIN cargas ON profesores.id = cargas.profesor_id\nGROUP BY profesores.id, cargas.dia"
  }

  // remove
  collection.schema.removeField("7xunskoo")

  // remove
  collection.schema.removeField("wrtvljf2")

  // remove
  collection.schema.removeField("y0kcoijp")

  // remove
  collection.schema.removeField("tiwd03ql")

  // remove
  collection.schema.removeField("wxeeoblq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tubwpzys",
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
    "id": "1gcvlh8h",
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
    "id": "ky7rbnqv",
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
    "id": "zypukzcd",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w3rdgvul",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8pcolgwl",
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
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  SUM(cargas.horas) as horas,\n  cargas.dia,\n  profesores.created\nFROM profesores\nRIGHT JOIN cargas ON profesores.id = cargas.profesor_id\nGROUP BY profesores.id, cargas.dia"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7xunskoo",
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
    "id": "wrtvljf2",
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
    "id": "y0kcoijp",
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
    "id": "tiwd03ql",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wxeeoblq",
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

  // remove
  collection.schema.removeField("tubwpzys")

  // remove
  collection.schema.removeField("1gcvlh8h")

  // remove
  collection.schema.removeField("ky7rbnqv")

  // remove
  collection.schema.removeField("zypukzcd")

  // remove
  collection.schema.removeField("w3rdgvul")

  // remove
  collection.schema.removeField("8pcolgwl")

  return dao.saveCollection(collection)
})
