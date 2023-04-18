migrate((db) => {
  const collection = new Collection({
    "id": "kwhjt8ekt53txo1",
    "created": "2023-04-18 16:48:45.572Z",
    "updated": "2023-04-18 16:48:45.572Z",
    "name": "carga",
    "type": "view",
    "system": false,
    "schema": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  profesores.id\nFROM profesores \nLEFT JOIN clases on profesores.id = clases.id"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1");

  return dao.deleteCollection(collection);
})
