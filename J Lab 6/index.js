import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import library from "./components/library/library.js";

import parks from "./components/parks/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = import.meta.dirname;
const port = process.env.PORT || "3000";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  //await cameras.loadCameras();
  let data = await library.loadLibraries();
  response.render("index", { title: "Libraries", library: data });
});
app.get("/park/:id", async (request, response) => {
  let pData = await parks.getParkById(request.params.id);
  response.render("park", { title: "Park", park: pData });
}); 

// load libraries
app.get("/libraries", async (request, response) => {
  let data = await library.loadLibraries();
  response.render("libraries", { title: "Libraries", libraries: data });
});

// get library by ID
app.get("/library/:id", async (request, response) => {
  let data = await library.getLibraryById(request.params.id);
  response.render("library", { title: "Library", library: data });
});

//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});