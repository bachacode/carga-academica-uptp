migrate((db) => {
  const collection = new Collection({
    "id": "y7x8y8ed9uav78d",
    "created": "2023-05-05 20:26:12.859Z",
    "updated": "2023-05-05 20:26:12.859Z",
    "name": "titulo",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "efv5jzch",
        "name": "nombre",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("y7x8y8ed9uav78d");

  return dao.deleteCollection(collection);
})
