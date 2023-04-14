migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.updateRule = "@request.auth.rol = 'Administrador' "
  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": false,
    "allowUsernameAuth": true,
    "exceptEmailDomains": null,
    "manageRule": "@request.auth.rol = 'Administrador' && @request.auth.id != @request.method",
    "minPasswordLength": 8,
    "onlyEmailDomains": null,
    "requireEmail": true
  }

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.updateRule = null
  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": false,
    "allowUsernameAuth": true,
    "exceptEmailDomains": null,
    "manageRule": "@request.auth.rol = 'Administrador' && @request.auth.id != @request.data.id",
    "minPasswordLength": 8,
    "onlyEmailDomains": null,
    "requireEmail": true
  }

  return dao.saveCollection(collection)
})
