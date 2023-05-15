migrate((db) => {
  const collection = new Collection({
    "id": "ccprx5s71hyf6cb",
    "created": "2023-05-15 20:33:57.166Z",
    "updated": "2023-05-15 20:33:57.166Z",
    "name": "lineas_de_investigacion",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3ez3srzu",
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
        "id": "0qzz87lb",
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
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ccprx5s71hyf6cb");

  return dao.deleteCollection(collection);
})
