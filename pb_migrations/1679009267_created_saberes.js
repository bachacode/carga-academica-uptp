migrate((db) => {
  const collection = new Collection({
    "id": "vqaqkrs7827e13h",
    "created": "2023-03-16 23:27:47.780Z",
    "updated": "2023-03-16 23:27:47.780Z",
    "name": "saberes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sqnq434f",
        "name": "materia",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 40,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "pxwwrzuv",
        "name": "trayecto",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 4
        }
      },
      {
        "system": false,
        "id": "3jjexo8k",
        "name": "periodos",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 3
        }
      },
      {
        "system": false,
        "id": "ulsm8vxv",
        "name": "creditos",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 99
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
  const collection = dao.findCollectionByNameOrId("vqaqkrs7827e13h");

  return dao.deleteCollection(collection);
})
