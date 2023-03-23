migrate((db) => {
  const collection = new Collection({
    "id": "gukzkyv0xa1bsyh",
    "created": "2023-03-23 14:38:31.795Z",
    "updated": "2023-03-23 14:38:31.795Z",
    "name": "profesor_saber",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fxasboow",
        "name": "id_profesor",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "2tmfch5yb8ffvil",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "x43wtxik",
        "name": "id_saber",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "vqaqkrs7827e13h",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("gukzkyv0xa1bsyh");

  return dao.deleteCollection(collection);
})
