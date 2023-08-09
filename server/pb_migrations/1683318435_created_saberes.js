migrate((db) => {
  const collection = new Collection({
    "id": "p8gan5gbxzqpiwe",
    "created": "2023-05-05 20:27:15.449Z",
    "updated": "2023-05-05 20:27:15.449Z",
    "name": "saberes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ewtfpyf7",
        "name": "nom_materia",
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
        "id": "mffg50td",
        "name": "trayecto",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("p8gan5gbxzqpiwe");

  return dao.deleteCollection(collection);
})
