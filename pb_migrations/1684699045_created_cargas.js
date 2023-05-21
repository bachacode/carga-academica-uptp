migrate((db) => {
  const collection = new Collection({
    "id": "ldne88wmcixodpf",
    "created": "2023-05-21 19:57:25.557Z",
    "updated": "2023-05-21 19:57:25.557Z",
    "name": "cargas",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "djdpzl31",
        "name": "seccion_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "p8h5q5rlzaixqic",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "u8zonivq",
        "name": "profesor_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "jyjq1goyyopi2bd",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "wefogrhy",
        "name": "saber_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "p8gan5gbxzqpiwe",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "myoliuzr",
        "name": "horas",
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
        "id": "obdaprfb",
        "name": "dia",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes"
          ]
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
  const collection = dao.findCollectionByNameOrId("ldne88wmcixodpf");

  return dao.deleteCollection(collection);
})
