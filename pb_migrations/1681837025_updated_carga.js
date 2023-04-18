migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  clases.id_profesor as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  clases.dia,\n  clases.horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor\nGROUP BY clases.id_profesor"
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  clases.id_profesor as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor\nGROUP BY clases.id_profesor"
  }

  // remove
  collection.schema.removeField("vtip6y0u")

  // remove
  collection.schema.removeField("km1jzfni")

  return dao.saveCollection(collection)
})
