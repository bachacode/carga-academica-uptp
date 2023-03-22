migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8e07gsw3pmgmh8p");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "8e07gsw3pmgmh8p",
    "created": "2023-03-22 21:47:24.083Z",
    "updated": "2023-03-22 21:47:24.083Z",
    "name": "hola",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qtzmyzf1",
        "name": "nombre",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": 40,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id, nombre FROM profesores WHERE id_saberes = 'FORC01'"
    }
  });

  return Dao(db).saveCollection(collection);
})
