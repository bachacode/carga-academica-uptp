migrate((db) => {
  const collection = new Collection({
    "id": "6svmhfvnxrz8ak0",
    "created": "2023-03-22 20:39:47.696Z",
    "updated": "2023-03-22 20:39:47.696Z",
    "name": "clases",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ygqmpkt1",
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
        "id": "yumkvqkc",
        "name": "id_seccion",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "mlqpqqs9d8bu74u",
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
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0");

  return dao.deleteCollection(collection);
})
