import express from "express";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";

const __dirname = import.meta.dirname; 

// MongoDB client setup
const dbUrl = "mongodb://127.0.0.1:27017/";
const db = new MongoClient(dbUrl).db("jlab3db");

const app = express(); //express application
const port = process.env.PORT || "8888"; 

// set up Pug and static files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HOME & ABOUT PAGES
app.get("/", async (request, response) => {
  let linkList = await getLinks();
  response.render("index", { title: "Home", links: linkList });
});

// ADMIN MENU PAGES
app.get("/admin/menu", async (request, response) => {
  let linkList = await getLinks();
  response.render("menuList", { title: "Menu admin", links: linkList });
});

// ADD
app.get("/admin/menu/add", async (request, response) => {
  let linkList = await getLinks();
  response.render("menu-add", { title: "Add link", links: linkList });
});

// app.post
app.post("/admin/menu/add/submit", async (request, response) => {

  let newLink = {
    weight: parseInt(request.body.weight),
    name: request.body.name,
    path: request.body.path,
  };

  await addLink(newLink);
  response.redirect("/admin/menu");
});

// DELETE
app.get("/admin/menu/delete", async (request, response) => {
  await deleteLink(request.query.linkId);
  response.redirect("/admin/menu");
});

// EDIT
app.get("/admin/menu/edit", async (request, response) => {
  let linkList = await getLinks();
  let link = await db.collection("menuLinks").findOne({ _id: new ObjectId(request.query.linkId) });
  response.render("editMenuList", { 
    title: "Edit link", 
    links: linkList, 
    link: link 
  });
});

// route to handle form submission for editing a link
app.post("/admin/menu/edit/submit", async (request, response) => {
  
  let filter = { _id: new ObjectId(request.body.linkId) };
  //object with updated values
  let updatedData = {
    weight: parseInt(request.body.weight),
    name: request.body.name,
    path: request.body.path,
  };

  // call editLink function to update the link
  await editLink(filter, updatedData);

  response.redirect("/admin/menu");
});

async function editLink(filter, updatedData) {
  let updateAction = {
    $set: {
      weight: updatedData.weight,
      name: updatedData.name,
      path: updatedData.path,
    }
  };
  let result = await db.collection("menuLinks").updateOne(filter, updateAction);
  if (result.modifiedCount === 1) {
    console.log("Link updated successfully");
  }
}


// DATABASE FUNCTIONS

//get links from the database
async function getLinks() {
  let results = db.collection("menuLinks").find({}).sort({ weight: 1 });
  return await results.toArray();
}

// add link 
async function addLink(linkDoc) {
  let result = await db.collection("menuLinks").insertOne(linkDoc);
  if (result.insertedId) console.log("Link inserted successfully");
}

// delete link
async function deleteLink(id) {
  let deleteFilter = { _id: new ObjectId(id) };
  let result = await db.collection("menuLinks").deleteOne(deleteFilter);
  if (result.deletedCount === 1) console.log("Link deleted");
}

// listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
