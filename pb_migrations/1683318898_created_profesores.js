migrate((db) => {
  const collection = new Collection({
    "id": "jyjq1goyyopi2bd",
    "created": "2023-05-05 20:34:58.860Z",
    "updated": "2023-05-05 20:34:58.860Z",
    "name": "profesores",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3bn5rrtn",
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
        "id": "nf6f3jgz",
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
        "id": "nyeveaxc",
        "name": "cedula",
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
        "id": "h0skyldp",
        "name": "titulo_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "y7x8y8ed9uav78d",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "oznz6i6q",
        "name": "tipo_contrato",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "fqqsrh1i",
        "name": "telefono",
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
        "id": "q2vyuptj",
        "name": "correo",
        "type": "email",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
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
  const collection = dao.findCollectionByNameOrId("jyjq1goyyopi2bd");

  return dao.deleteCollection(collection);
})
