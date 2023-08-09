migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j98cl1pbdso84pr")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  contratos.horas as contrato_horas,\n  contratos.nombre as contrato_nombre,\n  contratos.horas as horas_dadas,\n  SUM(cargas.horas) as horas,\n  profesores.created\nFROM cargas\nRIGHT JOIN profesores ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN contratos ON profesores.contrato_id = contratos.id\nGROUP BY profesores.id"
  }

  // remove
  collection.schema.removeField("pc5nhpzn")

  // remove
  collection.schema.removeField("dnlpckqm")

  // remove
  collection.schema.removeField("edeoiyw9")

  // remove
  collection.schema.removeField("xpr4dowv")

  // remove
  collection.schema.removeField("hl5x30ll")

  // remove
  collection.schema.removeField("qvjspqxb")

  // remove
  collection.schema.removeField("dyrvck1k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "idctntnw",
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
    "id": "lvqyb4xa",
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
    "id": "3fjzthg0",
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
    "id": "t2ui9l98",
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
    "id": "lhaybsf9",
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
    "id": "y7lmk47t",
    "name": "horas_dadas",
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
    "id": "mcnli7vw",
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
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  contratos.horas as contrato_horas,\n  contratos.nombre as contrato_nombre,\n  contratos.horas as horasDadas,\n  SUM(cargas.horas) as horas,\n  profesores.created\nFROM cargas\nRIGHT JOIN profesores ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN contratos ON profesores.contrato_id = contratos.id\nGROUP BY profesores.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pc5nhpzn",
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
    "id": "dnlpckqm",
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
    "id": "edeoiyw9",
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
    "id": "xpr4dowv",
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
    "id": "hl5x30ll",
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
    "id": "qvjspqxb",
    "name": "horasDadas",
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
    "id": "dyrvck1k",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("idctntnw")

  // remove
  collection.schema.removeField("lvqyb4xa")

  // remove
  collection.schema.removeField("3fjzthg0")

  // remove
  collection.schema.removeField("t2ui9l98")

  // remove
  collection.schema.removeField("lhaybsf9")

  // remove
  collection.schema.removeField("y7lmk47t")

  // remove
  collection.schema.removeField("mcnli7vw")

  return dao.saveCollection(collection)
})
