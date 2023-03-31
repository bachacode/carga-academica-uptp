migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("gukzkyv0xa1bsyh");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "gukzkyv0xa1bsyh",
    "created": "2023-03-23 14:38:31.795Z",
    "updated": "2023-03-23 15:06:23.594Z",
    "name": "profesor_saber",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fxasboow",
        "name": "id_profesor",
        "type": "relation",
        "required": false,
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
        "required": false,
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
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
