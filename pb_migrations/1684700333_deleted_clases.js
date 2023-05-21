migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rojlawcd65x4tb5");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "rojlawcd65x4tb5",
    "created": "2023-05-05 20:49:04.036Z",
    "updated": "2023-05-05 20:49:04.036Z",
    "name": "clases",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xvxvlnva",
        "name": "id_seccion",
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
        "id": "q0y2fbfb",
        "name": "id_profesor",
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
        "id": "87p3outf",
        "name": "id_saber",
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
        "id": "oza3gwln",
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
      },
      {
        "system": false,
        "id": "dw7nqrgk",
        "name": "horas",
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
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
