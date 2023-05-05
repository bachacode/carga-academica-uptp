migrate((db) => {
  const collection = new Collection({
    "id": "hueadjlvs1rgsqi",
    "created": "2023-05-05 20:49:27.510Z",
    "updated": "2023-05-05 20:49:27.510Z",
    "name": "contratos",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rrdrv6ce",
        "name": "tipo",
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
  const collection = dao.findCollectionByNameOrId("hueadjlvs1rgsqi");

  return dao.deleteCollection(collection);
})
