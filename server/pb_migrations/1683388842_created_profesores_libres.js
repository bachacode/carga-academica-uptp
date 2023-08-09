migrate((db) => {
  const collection = new Collection({
    "id": "n8utcgt35dfjwdm",
    "created": "2023-05-06 16:00:42.503Z",
    "updated": "2023-05-06 16:00:42.503Z",
    "name": "profesores_libres",
    "type": "view",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  profesores.id as id\nFROM profesores\nLEFT JOIN titulos ON profesores.titulo_id = titulos.id\nLEFT JOIN saberes ON profesores.saberes = profesores\nLEFT JOIN clases ON profesores.id = clases.id_profesor\nWHERE clases.id_profesor = NULL\nGROUP BY profesores.id\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("n8utcgt35dfjwdm");

  return dao.deleteCollection(collection);
})
