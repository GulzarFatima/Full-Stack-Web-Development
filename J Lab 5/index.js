//import required modules
import express from "express";
import path from "path";
import "dotenv/config";

import trakt from "./components/trakt/api.js";

const __dirname = import.meta.dirname;

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/anticipated", async (request, response) => {
  try {
    let anticipated = await trakt.getMostAnticipatedShows();
    console.log("API response:", anticipated);

    response.render("anticipated", { shows: anticipated });
    
  } catch (error) {
    console.error("Error fetching anticipated shows:", error);
    response.status(500).send("Error fetching anticipated shows.");
  }
});


app.get("/show/:showId", async (request, response) => {
  try {
    let show = await trakt.getShowDetails(request.params.showId);
    console.log(show);
    response.render("showDetails", { show: show });
  } catch (error) {
    console.error("Error fetching show details:", error);
    response.status(500).send("Internal Server Error");
  }
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


