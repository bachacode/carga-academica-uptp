migrate((db) => {
  const collection = new Collection({
    "id": "p8h5q5rlzaixqic",
    "created": "2023-05-05 20:29:57.263Z",
    "updated": "2023-05-05 20:29:57.263Z",
    "name": "secciones",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vaye9fy2",
        "name": "codigo",
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
        "id": "i41sqqhl",
        "name": "trayecto",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "g2bayguf",
        "name": "estudiantes",
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
  const collection = dao.findCollectionByNameOrId("p8h5q5rlzaixqic");

  return dao.deleteCollection(collection);
})
