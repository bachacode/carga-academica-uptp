migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j98cl1pbdso84pr")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  contratos.horas as contrato_horas,\n  contratos.nombre as contrato_nombre,\n  SUM(cargas.horas) as horas,\n  profesores.created\nFROM cargas\nRIGHT JOIN profesores ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN contratos ON profesores.contrato_id = contratos.id\nGROUP BY profesores.id"
  }

  // remove
  collection.schema.removeField("3ojsjjks")

  // remove
  collection.schema.removeField("xiwcxlzc")

  // remove
  collection.schema.removeField("4hhnbhgq")

  // remove
  collection.schema.removeField("fbeym1im")

  // remove
  collection.schema.removeField("cixdltgb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8ieavfpa",
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
    "id": "34vlobsg",
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
    "id": "odp510wv",
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
    "id": "szicbpgp",
    "name": "contrato_horas",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 99
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lcxae7b1",
    "name": "contrato_nombre",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 80,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xq2mrjql",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j98cl1pbdso84pr")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  contratos.horas as contrato_horas,\n  SUM(cargas.horas) as horas,\n  profesores.created\nFROM cargas\nRIGHT JOIN profesores ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN contratos ON profesores.contrato_id = contratos.id\nGROUP BY profesores.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3ojsjjks",
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
    "id": "xiwcxlzc",
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
    "id": "4hhnbhgq",
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
    "id": "fbeym1im",
    "name": "contrato_horas",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 99
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cixdltgb",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("8ieavfpa")

  // remove
  collection.schema.removeField("34vlobsg")

  // remove
  collection.schema.removeField("odp510wv")

  // remove
  collection.schema.removeField("szicbpgp")

  // remove
  collection.schema.removeField("lcxae7b1")

  // remove
  collection.schema.removeField("xq2mrjql")

  return dao.saveCollection(collection)
})
