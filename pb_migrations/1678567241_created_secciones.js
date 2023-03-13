migrate((db) => {
  const collection = new Collection({
    "id": "mlqpqqs9d8bu74u",
    "created": "2023-03-11 20:40:41.644Z",
    "updated": "2023-03-11 20:40:41.644Z",
    "name": "secciones",
    "type": "base",
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
      },
      {
        "system": false,
        "id": "ikudmy5m",
        "name": "trayecto",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 20,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "iy16bnhj",
        "name": "estudiantes",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 999
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
  const collection = dao.findCollectionByNameOrId("mlqpqqs9d8bu74u");

  return dao.deleteCollection(collection);
})
