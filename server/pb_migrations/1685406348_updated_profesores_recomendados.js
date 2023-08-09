migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o3f2l2exay2giuc")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  profesores.saberes,\n  contratos.horas as contrato_horas,\n  titulos.grado as titulo_grado,\n  \n  SUM(cargas.horas) as horas,\n  cargas.dia,\n  profesores.created\nFROM profesores\nLEFT JOIN cargas ON profesores.id = cargas.profesor_id\nLEFT JOIN contratos ON profesores.contrato_id = contratos.id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN posgrados ON profesores.posgrado_id = posgrados.id\nGROUP BY profesores.id, cargas.dia"
  }

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o3f2l2exay2giuc")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  profesores.saberes,\n  SUM(cargas.horas) as horas,\n  cargas.dia,\n  profesores.created\nFROM profesores\nLEFT JOIN cargas ON profesores.id = cargas.profesor_id\nGROUP BY profesores.id, cargas.dia"
  }

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

  return dao.saveCollection(collection)
})
