migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("imaly7ojcb0lpzp");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "imaly7ojcb0lpzp",
    "created": "2023-03-19 02:22:15.943Z",
    "updated": "2023-03-19 02:53:24.581Z",
    "name": "secciones_id",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mq857q9n",
        "name": "codigo",
        "type": "text",
        "required": false,
        "unique": true,
        "options": {
          "min": null,
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
      "query": "SELECT id, codigo FROM secciones"
    }
  });

  return Dao(db).saveCollection(collection);
})
