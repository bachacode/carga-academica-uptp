migrate((db) => {
  const collection = new Collection({
    "id": "o3f2l2exay2giuc",
    "created": "2023-05-29 23:49:04.822Z",
    "updated": "2023-05-29 23:49:04.822Z",
    "name": "profesores_recomendados",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "u81rulp8",
        "name": "nombre",
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
        "id": "ev1yp9fm",
        "name": "apellido",
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
        "id": "hqwyls0o",
        "name": "cedula",
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
    "options": {
      "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula\nFROM profesores\nRIGHT JOIN cargas ON profesores.id = cargas.profesor_id\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("o3f2l2exay2giuc");

  return dao.deleteCollection(collection);
})
