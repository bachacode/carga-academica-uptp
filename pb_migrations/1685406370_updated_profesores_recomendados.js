migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o3f2l2exay2giuc")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  profesores.saberes,\n  contratos.horas as contrato_horas,\n  titulos.grado as titulo_grado,\n  posgrados.grado as posgrado_grado,\n  SUM(cargas.horas) as horas,\n  cargas.dia,\n  profesores.created\nFROM profesores\nLEFT JOIN cargas ON profesores.id = cargas.profesor_id\nLEFT JOIN contratos ON profesores.contrato_id = contratos.id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN posgrados ON profesores.posgrado_id = posgrados.id\nGROUP BY profesores.id, cargas.dia"
  }

  // remove
  collection.schema.removeField("4kalpdu7")

  // remove
  collection.schema.removeField("woene27p")

  // remove
  collection.schema.removeField("vnwsoa7n")

  // remove
  collection.schema.removeField("rtwounj3")

  // remove
  collection.schema.removeField("8uo54chq")

  // remove
  collection.schema.removeField("4i5mxc0a")

  // remove
  collection.schema.removeField("olgi8guh")

  // remove
  collection.schema.removeField("nxg2eqka")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zigamdrk",
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
    "id": "0lhijm8q",
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
    "id": "t5msuijq",
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
    "id": "sl89rp9a",
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
    "id": "tcwjto9n",
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
    "id": "oyhnicmr",
    "name": "titulo_grado",
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
    "id": "n4lqevwl",
    "name": "posgrado_grado",
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
    "id": "jw8usu71",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vlkcmqom",
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
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  profesores.saberes,\n  contratos.horas as contrato_horas,\n  titulos.grado as titulo_grado,\n  \n  SUM(cargas.horas) as horas,\n  cargas.dia,\n  profesores.created\nFROM profesores\nLEFT JOIN cargas ON profesores.id = cargas.profesor_id\nLEFT JOIN contratos ON profesores.contrato_id = contratos.id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN posgrados ON profesores.posgrado_id = posgrados.id\nGROUP BY profesores.id, cargas.dia"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4kalpdu7",
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
    "id": "woene27p",
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
    "id": "vnwsoa7n",
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
    "id": "rtwounj3",
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
    "id": "8uo54chq",
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
    "id": "4i5mxc0a",
    "name": "titulo_grado",
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
    "id": "olgi8guh",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nxg2eqka",
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
  collection.schema.removeField("zigamdrk")

  // remove
  collection.schema.removeField("0lhijm8q")

  // remove
  collection.schema.removeField("t5msuijq")

  // remove
  collection.schema.removeField("sl89rp9a")

  // remove
  collection.schema.removeField("tcwjto9n")

  // remove
  collection.schema.removeField("oyhnicmr")

  // remove
  collection.schema.removeField("n4lqevwl")

  // remove
  collection.schema.removeField("jw8usu71")

  // remove
  collection.schema.removeField("vlkcmqom")

  return dao.saveCollection(collection)
})
