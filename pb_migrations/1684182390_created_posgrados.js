migrate((db) => {
  const collection = new Collection({
    "id": "ujz7f207aubbp4q",
    "created": "2023-05-15 20:26:30.801Z",
    "updated": "2023-05-15 20:26:30.801Z",
    "name": "posgrados",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "85h1ogwg",
        "name": "grado",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ntb2sdw6",
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
  const collection = dao.findCollectionByNameOrId("ujz7f207aubbp4q");

  return dao.deleteCollection(collection);
})
