migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hueadjlvs1rgsqi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fzoi1rzy",
    "name": "horas_maximas",
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
  const collection = dao.findCollectionByNameOrId("hueadjlvs1rgsqi")

  // remove
  collection.schema.removeField("fzoi1rzy")

  return dao.saveCollection(collection)
})
