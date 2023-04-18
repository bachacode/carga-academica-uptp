migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gln5kuafz8qmjhf")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("9loypi5g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l0av5wx3",
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

  collection.listRule = null
  collection.viewRule = null

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

  // remove
  collection.schema.removeField("l0av5wx3")

  return dao.saveCollection(collection)
})
