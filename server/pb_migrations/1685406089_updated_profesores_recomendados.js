migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o3f2l2exay2giuc")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  profesores.saberes,\n  SUM(cargas.horas) as horas,\n  cargas.dia,\n  profesores.created\nFROM profesores\nLEFT JOIN cargas ON profesores.id = cargas.profesor_id\nGROUP BY profesores.id, cargas.dia"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rbathqov",
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
    "id": "cadajhff",
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
    "id": "8ilxbhi8",
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
    "id": "1xwfoqgp",
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
    "id": "n1eye7xp",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zwda15h9",
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
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  profesores.saberes,\n  SUM(cargas.horas) as horas,\n  cargas.dia,\n  profesores.created\nFROM profesores\nRIGHT JOIN cargas ON profesores.id = cargas.profesor_id\nGROUP BY profesores.id, cargas.dia"
  }

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

  // remove
  collection.schema.removeField("rbathqov")

  // remove
  collection.schema.removeField("cadajhff")

  // remove
  collection.schema.removeField("8ilxbhi8")

  // remove
  collection.schema.removeField("1xwfoqgp")

  // remove
  collection.schema.removeField("n1eye7xp")

  // remove
  collection.schema.removeField("zwda15h9")

  return dao.saveCollection(collection)
})
