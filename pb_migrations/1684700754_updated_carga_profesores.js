migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwhcgdtgtqavh6k")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  profesores.telefono,\n  profesores.correo,\n  cargas.horas\nFROM cargas\nLEFT JOIN profesores ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id"
  }

  // remove
  collection.schema.removeField("9ikalzbt")

  // remove
  collection.schema.removeField("1n8bo5gx")

  // remove
  collection.schema.removeField("qsywokyq")

  // remove
  collection.schema.removeField("vq4eeqnu")

  // remove
  collection.schema.removeField("javwqvpd")

  // remove
  collection.schema.removeField("bzsm63xu")

  // remove
  collection.schema.removeField("jpkshyst")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zbn0odcf",
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
    "id": "52bfenxa",
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
    "id": "0ehjtd7g",
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
    "id": "5dxm6mqz",
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
    "id": "tb0k5ivs",
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
    "id": "so0wt42u",
    "name": "telefono",
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
    "id": "emzfkg89",
    "name": "correo",
    "type": "email",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z2bfh0du",
    "name": "horas",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwhcgdtgtqavh6k")

  collection.options = {
    "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  profesores.telefono,\n  profesores.correo\nFROM cargas\nLEFT JOIN profesores ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9ikalzbt",
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
    "id": "1n8bo5gx",
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
    "id": "qsywokyq",
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
    "id": "vq4eeqnu",
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
    "id": "javwqvpd",
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
    "id": "bzsm63xu",
    "name": "telefono",
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
    "id": "jpkshyst",
    "name": "correo",
    "type": "email",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // remove
  collection.schema.removeField("zbn0odcf")

  // remove
  collection.schema.removeField("52bfenxa")

  // remove
  collection.schema.removeField("0ehjtd7g")

  // remove
  collection.schema.removeField("5dxm6mqz")

  // remove
  collection.schema.removeField("tb0k5ivs")

  // remove
  collection.schema.removeField("so0wt42u")

  // remove
  collection.schema.removeField("emzfkg89")

  // remove
  collection.schema.removeField("z2bfh0du")

  return dao.saveCollection(collection)
})
