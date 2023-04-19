migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  clases.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  saberes.materia,\n  clases.dia,\n  clases.horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor\nLEFT JOIN saberes on saberes.id = clases.id_saber"
  }

  // remove
  collection.schema.removeField("2wlqsbgi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sqnq434f",
    "name": "materia",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 80,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  clases.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  clases.id_saber,\n  clases.dia,\n  clases.horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2wlqsbgi",
    "name": "id_saber",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "vqaqkrs7827e13h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("sqnq434f")

  return dao.saveCollection(collection)
})
