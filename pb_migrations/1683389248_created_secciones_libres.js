migrate((db) => {
  const collection = new Collection({
    "id": "pdlk3hji2vij4qy",
    "created": "2023-05-06 16:07:28.496Z",
    "updated": "2023-05-06 16:07:28.496Z",
    "name": "secciones_libres",
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
      "query": "SELECT\nsecciones.id,\nsecciones.created\nFROM secciones\nLEFT JOIN clases ON secciones.id = clases.id_seccion\nWHERE clases.id IS NULL"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pdlk3hji2vij4qy");

  return dao.deleteCollection(collection);
})
