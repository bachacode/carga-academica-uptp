migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j98cl1pbdso84pr")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  SUM(cargas.horas) as horas\nFROM cargas\nLEFT JOIN profesores ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nGROUP BY profesores.id, cargas.dia"
  }

  // remove
  collection.schema.removeField("ykncvmua")

  // remove
  collection.schema.removeField("zol06pxu")

  // remove
  collection.schema.removeField("i3ybhdc1")

  // remove
  collection.schema.removeField("kgk6dm67")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vjvaywwl",
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
    "id": "lj06jdkm",
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
    "id": "2iq0zarq",
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
    "id": "anqr28px",
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
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  SUM(cargas.horas) as horas\nFROM profesores\nLEFT JOIN cargas ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nGROUP BY profesores.id, cargas.dia"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ykncvmua",
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
    "id": "zol06pxu",
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
    "id": "i3ybhdc1",
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
    "id": "kgk6dm67",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("vjvaywwl")

  // remove
  collection.schema.removeField("lj06jdkm")

  // remove
  collection.schema.removeField("2iq0zarq")

  // remove
  collection.schema.removeField("anqr28px")

  return dao.saveCollection(collection)
})
