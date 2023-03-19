migrate((db) => {
  const collection = new Collection({
    "id": "5bojhe15ze2ece0",
    "created": "2023-03-19 02:21:31.159Z",
    "updated": "2023-03-19 02:21:31.159Z",
    "name": "saberes_id",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uds8rjx1",
        "name": "codigo",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 40,
          "pattern": ""
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id, codigo FROM saberes;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("5bojhe15ze2ece0");

  return dao.deleteCollection(collection);
})
