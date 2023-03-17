migrate((db) => {
  const collection = new Collection({
    "id": "2tmfch5yb8ffvil",
    "created": "2023-03-17 21:34:20.166Z",
    "updated": "2023-03-17 21:34:20.166Z",
    "name": "profesores",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qtzmyzf1",
        "name": "nombre",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": 40,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "gfkeql7t",
        "name": "apellido",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kqvr8pzw",
        "name": "cedula",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ybnmu9dn",
        "name": "titulo",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "0w44hpm7",
        "name": "telefono",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "mwfvxxpu",
        "name": "correo",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2tmfch5yb8ffvil");

  return dao.deleteCollection(collection);
})
