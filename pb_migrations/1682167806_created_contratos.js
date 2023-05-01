migrate((db) => {
  const collection = new Collection({
    "id": "h48fyupao6f6o73",
    "created": "2023-04-22 12:50:06.593Z",
    "updated": "2023-04-22 12:50:06.593Z",
    "name": "contratos",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zutkjlwv",
        "name": "tipo",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "sb28vulh",
        "name": "horas_maximas",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("h48fyupao6f6o73");

  return dao.deleteCollection(collection);
})
