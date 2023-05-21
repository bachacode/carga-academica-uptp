migrate((db) => {
  const collection = new Collection({
    "id": "wwhcgdtgtqavh6k",
    "created": "2023-05-21 20:07:11.990Z",
    "updated": "2023-05-21 20:07:11.990Z",
    "name": "carga_profesores",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "s6d2ujit",
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
        "id": "1yhlvk5j",
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
        "id": "sjxboqa2",
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
        "id": "tipvngek",
        "name": "titulo",
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
        "id": "shiidrkm",
        "name": "saberes",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "p8gan5gbxzqpiwe",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "wccebhky",
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
        "id": "yqpi5mkz",
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
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  cargas.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.cedula,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  profesores.telefono,\n  profesores.correo\nFROM cargas\nLEFT JOIN profesores ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("wwhcgdtgtqavh6k");

  return dao.deleteCollection(collection);
})
