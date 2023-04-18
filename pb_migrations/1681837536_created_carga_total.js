migrate((db) => {
  const collection = new Collection({
    "id": "gln5kuafz8qmjhf",
    "created": "2023-04-18 17:05:36.627Z",
    "updated": "2023-04-18 17:05:36.627Z",
    "name": "carga_total",
    "type": "view",
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
        "id": "bblpc6i0",
        "name": "saberes",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "vqaqkrs7827e13h",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "vtip6y0u",
        "name": "dia",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo"
          ]
        }
      },
      {
        "system": false,
        "id": "km1jzfni",
        "name": "horas",
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
    "options": {
      "query": "SELECT \n  clases.id_profesor as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  clases.dia,\n  clases.horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor\nGROUP BY clases.horas"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("gln5kuafz8qmjhf");

  return dao.deleteCollection(collection);
})
