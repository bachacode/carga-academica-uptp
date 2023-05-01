migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  clases.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  titulos.nombre as titulo,\n  contratos.horas_maximas as horas_maximas,\n  profesores.saberes,\n  saberes.materia,\n  clases.dia,\n  clases.horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor\nLEFT JOIN saberes on saberes.id = clases.id_saber\nLEFT JOIN titulos on titulos.id = profesores.titulo_id\nLEFT JOIN contratos on contratos.id = profesores.id_contrato\nGROUP BY profesores.id, clases.dia"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sb28vulh",
    "name": "horas_maximas",
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
    "query": "SELECT \n  clases.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  saberes.materia,\n  clases.dia,\n  clases.horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor\nLEFT JOIN saberes on saberes.id = clases.id_saber\nLEFT JOIN titulos on titulos.id = profesores.titulo_id\nGROUP BY profesores.id, clases.dia"
  }

  // remove
  collection.schema.removeField("sb28vulh")

  return dao.saveCollection(collection)
})
