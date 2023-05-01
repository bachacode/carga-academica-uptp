migrate((db) => {
  const collection = new Collection({
    "id": "9fze468edng6rci",
    "created": "2023-04-22 12:48:34.856Z",
    "updated": "2023-04-22 12:48:34.856Z",
    "name": "pensum",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8hckdkaa",
        "name": "codigo",
        "type": "text",
        "required": false,
        "unique": true,
        "options": {
          "min": 1,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wefk4xvr",
        "name": "trayecto",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": null
        }
      },
      {
        "system": false,
        "id": "puurkfmk",
        "name": "periodo",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": null
        }
      },
      {
        "system": false,
        "id": "0jkayvt2",
        "name": "creditos",
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
  const collection = dao.findCollectionByNameOrId("9fze468edng6rci");

  return dao.deleteCollection(collection);
})
