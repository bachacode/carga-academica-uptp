migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gln5kuafz8qmjhf")

  collection.options = {
    "query": "SELECT \n  clases.id_profesor as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  SUM(clases.horas) as horas_totales\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor"
  }

  // remove
  collection.schema.removeField("vtip6y0u")

  // remove
  collection.schema.removeField("km1jzfni")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9loypi5g",
    "name": "horas_totales",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gln5kuafz8qmjhf")

  collection.options = {
    "query": "SELECT \n  clases.id_profesor as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  clases.dia,\n  clases.horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor\nGROUP BY clases.horas"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vtip6y0u",
    "name": "dia",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "km1jzfni",
    "name": "horas",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("9loypi5g")

  return dao.saveCollection(collection)
})
