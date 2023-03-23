migrate((db) => {
  const collection = new Collection({
    "id": "dzrn5x1xuqd2gzp",
    "created": "2023-03-23 14:54:28.179Z",
    "updated": "2023-03-23 14:54:28.179Z",
    "name": "pensum",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uds8rjx1",
        "name": "codmateria",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 40,
          "pattern": ""
        }
      },
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
        "name": "creditos",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 3
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id, codigo as codmateria, materia, trayecto, periodos creditos from saberes"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dzrn5x1xuqd2gzp");

  return dao.deleteCollection(collection);
})
