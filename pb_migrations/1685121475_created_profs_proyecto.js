migrate((db) => {
  const collection = new Collection({
    "id": "1k7my763l0wxxx5",
    "created": "2023-05-26 17:17:54.958Z",
    "updated": "2023-05-26 17:17:54.958Z",
    "name": "profs_proyecto",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2dnjvf5l",
        "name": "cantidad",
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
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  profesores.id as id,\n  COUNT(saberes.nombre) as cantidad\nFROM cargas\nLEFT JOIN profesores ON cargas.profesor_id = profesores.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nWHERE saberes.nombre LIKE 'Proyecto%' OR saberes.nombre LIKE 'proyecto%'\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1k7my763l0wxxx5");

  return dao.deleteCollection(collection);
})
