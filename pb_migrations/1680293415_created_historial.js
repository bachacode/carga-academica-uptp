migrate((db) => {
  const collection = new Collection({
    "id": "lu5jpbuh867xf51",
    "created": "2023-03-31 20:10:15.524Z",
    "updated": "2023-03-31 20:10:15.524Z",
    "name": "historial",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kafhnhwp",
        "name": "tabla",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": 40,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fpds4sjf",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "vc261az8",
        "name": "accion",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": 100,
          "pattern": ""
        }
      }
    ],
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
  const collection = dao.findCollectionByNameOrId("lu5jpbuh867xf51");

  return dao.deleteCollection(collection);
})
