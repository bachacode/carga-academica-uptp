migrate((db) => {
  const collection = new Collection({
    "id": "j98cl1pbdso84pr",
    "created": "2023-05-21 20:16:24.595Z",
    "updated": "2023-05-21 20:16:24.595Z",
    "name": "carga_total",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ykncvmua",
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
        "id": "zol06pxu",
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
        "id": "i3ybhdc1",
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
        "id": "kgk6dm67",
        "name": "horas",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  profesores.id as id,\n  profesores.nombre,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  SUM(cargas.horas) as horas\nFROM profesores\nLEFT JOIN cargas ON profesores.id = cargas.profesor_id\nLEFT JOIN secciones ON secciones.id = cargas.seccion_id\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nGROUP BY profesores.id, cargas.dia"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("j98cl1pbdso84pr");

  return dao.deleteCollection(collection);
})
