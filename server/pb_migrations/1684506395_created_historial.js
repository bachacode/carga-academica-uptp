migrate((db) => {
  const collection = new Collection({
    "id": "srcv3lbmxyn2e0j",
    "created": "2023-05-19 14:26:35.288Z",
    "updated": "2023-05-19 14:26:35.288Z",
    "name": "historial",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xesht2ab",
        "name": "usuario_id",
        "type": "relation",
        "required": false,
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
        "id": "m9tfxye0",
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
        "id": "ytymkfd9",
        "name": "accion",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 40,
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
  const collection = dao.findCollectionByNameOrId("srcv3lbmxyn2e0j");

  return dao.deleteCollection(collection);
})
