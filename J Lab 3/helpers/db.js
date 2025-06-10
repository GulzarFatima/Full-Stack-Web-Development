const { ObjectId } = require("mongodb");

async function editLink(db, filter, linkData) {
  return await db.collection("menu").updateOne(
    filter,
    {
      $set: {
        name: linkData.name,
        path: linkData.path,
        weight: parseInt(linkData.weight)
      }
    }
  );
}

module.exports = { editLink };
