import express from "express";
import path from "path";

const __dirname = import.meta.dirname;

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render("index", { title: "Home" });
});

app.get('/index', (req, res) => {
    res.render("index", { title: "Home" });
});

app.get('/about', (req, res) => {
    res.render("about", { title: "About Us" });
    console.log("About page accessed");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});