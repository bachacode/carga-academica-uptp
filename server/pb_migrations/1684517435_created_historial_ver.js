migrate((db) => {
  const collection = new Collection({
    "id": "ixh7mcaq6dwzjqi",
    "created": "2023-05-19 17:30:35.389Z",
    "updated": "2023-05-19 17:30:35.389Z",
    "name": "historial_ver",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "468zqglf",
        "name": "username",
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
        "id": "flu4bvtp",
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
        "id": "q2cf9hyf",
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
        "id": "paqllbu5",
        "name": "tabla",
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
        "id": "rcrsnfyx",
        "name": "accion",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 40,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  usuarios.id as id,\n  usuarios.username as username,\n  usuarios.nombre as nombre,\n  usuarios.apellido as apellido,\n  historial.tabla as tabla,\n  historial.accion as accion,\n  historial.created as created\nFROM historial\nLEFT JOIN usuarios ON historial.usuario_id = usuarios.id\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ixh7mcaq6dwzjqi");

  return dao.deleteCollection(collection);
})
