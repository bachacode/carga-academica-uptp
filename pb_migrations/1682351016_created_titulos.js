migrate((db) => {
  const collection = new Collection({
    "id": "1tdw18qve9y9uc7",
    "created": "2023-04-24 15:43:36.232Z",
    "updated": "2023-04-24 15:43:36.232Z",
    "name": "titulos",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qey3best",
        "name": "nombre",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1tdw18qve9y9uc7");

  return dao.deleteCollection(collection);
})
