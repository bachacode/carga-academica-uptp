migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.viewRule = "id = @request.auth.id || @request.auth.rol = 'Administrador'"
  collection.updateRule = "@request.auth.rol = 'Administrador'"
  collection.deleteRule = "@request.auth.rol = 'Administrador' && id != @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.viewRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
