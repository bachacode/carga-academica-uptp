migrate((db) => {
  const collection = new Collection({
    "id": "6v4eu5zg3l41uci",
    "created": "2023-04-19 22:26:20.761Z",
    "updated": "2023-04-19 22:26:20.761Z",
    "name": "profesores_libres",
    "type": "view",
    "system": false,
    "schema": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT profesores.id as id\nFROM clases\nINNER JOIN profesores ON profesores.id = clases.id_profesor"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6v4eu5zg3l41uci");

  return dao.deleteCollection(collection);
})
