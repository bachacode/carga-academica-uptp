migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.viewRule = "id = @request.auth.id || @request.auth.rol = 'Administrador'"
  collection.createRule = "@request.auth.rol = 'Administrador'"
  collection.updateRule = "id = @request.auth.id || @request.auth.rol = 'Administrador'"
  collection.deleteRule = "id = @request.auth.id || @request.auth.rol = 'Administrador'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
