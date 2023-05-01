migrate((db) => {
  const collection = new Collection({
    "id": "udweybrpmxizkxe",
    "created": "2023-04-22 14:56:52.535Z",
    "updated": "2023-04-22 14:56:52.535Z",
    "name": "secciones_libres",
    "type": "view",
    "system": false,
    "schema": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  secciones.id as id\nFROM secciones\nLEFT JOIN clases ON secciones.id = clases.id_seccion\nWHERE clases.id_seccion is NULL"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("udweybrpmxizkxe");

  return dao.deleteCollection(collection);
})
