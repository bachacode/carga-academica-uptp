migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j98cl1pbdso84pr")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  contratos.horas as contrato_horas,\n  SUM(cargas.horas) as horas,\n  profesores.created\nFROM cargas\nLEFT JOIN profesores ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN contratos ON profesores.contrato_id = contratos.id\nGROUP BY profesores.id"
  }

  // remove
  collection.schema.removeField("zgmjzqug")

  // remove
  collection.schema.removeField("7ppvdevf")

  // remove
  collection.schema.removeField("s7zzjir4")

  // remove
  collection.schema.removeField("nxcaxfdz")

  // remove
  collection.schema.removeField("wz09yt6b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "npiddaku",
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
    "id": "b844dzky",
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
    "id": "nbfbiexm",
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
    "id": "ntofgska",
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
    "id": "o60shfvc",
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
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  contratos.horas as contrato_horas,\n  SUM(cargas.horas) as horas\nFROM cargas\nLEFT JOIN profesores ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN contratos ON profesores.contrato_id = contratos.id\nGROUP BY profesores.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zgmjzqug",
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
    "id": "7ppvdevf",
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
    "id": "s7zzjir4",
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
    "id": "nxcaxfdz",
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
    "id": "wz09yt6b",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("npiddaku")

  // remove
  collection.schema.removeField("b844dzky")

  // remove
  collection.schema.removeField("nbfbiexm")

  // remove
  collection.schema.removeField("ntofgska")

  // remove
  collection.schema.removeField("o60shfvc")

  return dao.saveCollection(collection)
})
