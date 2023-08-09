migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwhcgdtgtqavh6k")

  collection.options = {
    "query": "SELECT\n  cargas.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  cargas.horas,\n  cargas.dia,\n  saberes.nombre as saber,\n  secciones.codigo as seccion\nFROM cargas\nLEFT JOIN profesores ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id"
  }

  // remove
  collection.schema.removeField("buelknis")

  // remove
  collection.schema.removeField("zitkmiwo")

  // remove
  collection.schema.removeField("wnygfb27")

  // remove
  collection.schema.removeField("zbawhxll")

  // remove
  collection.schema.removeField("ked9ubaq")

  // remove
  collection.schema.removeField("mjdbzbcz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "igec0udk",
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
    "id": "mo709n5b",
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
    "id": "o9uc9jzk",
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
    "id": "fteackyu",
    "name": "horas",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e0ku8ldh",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bgu1baqv",
    "name": "saber",
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
    "id": "ymut3zla",
    "name": "seccion",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwhcgdtgtqavh6k")

  collection.options = {
    "query": "SELECT\n  cargas.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  cargas.horas,\n  cargas.dia,\n  saberes.nombre as saber\nFROM cargas\nLEFT JOIN profesores ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "buelknis",
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
    "id": "zitkmiwo",
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
    "id": "wnygfb27",
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
    "id": "zbawhxll",
    "name": "horas",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ked9ubaq",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mjdbzbcz",
    "name": "saber",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 80,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("igec0udk")

  // remove
  collection.schema.removeField("mo709n5b")

  // remove
  collection.schema.removeField("o9uc9jzk")

  // remove
  collection.schema.removeField("fteackyu")

  // remove
  collection.schema.removeField("e0ku8ldh")

  // remove
  collection.schema.removeField("bgu1baqv")

  // remove
  collection.schema.removeField("ymut3zla")

  return dao.saveCollection(collection)
})
