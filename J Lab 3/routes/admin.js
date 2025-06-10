const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { editLink } = require("../helpers/db");


// GET: Show the edit form
router.get("/menu/edit/:id", async (req, res) => {
  const db = req.app.locals.db;
  try {
    const link = await db.collection("menu").findOne({ _id: new ObjectId(req.params.id) });
    res.render("editMenuLink", { link });
  } catch (err) {
    res.status(500).send("Error loading menu item.");
  }
});

// POST: Update the link
router.post("/menu/edit/:id", async (req, res) => {
  const db = req.app.locals.db;
  const filter = { _id: new ObjectId(req.params.id) };
  const linkData = {
    name: req.body.name,
    path: req.body.path,
    weight: req.body.weight
  };

  try {
    await editLink(db, filter, linkData);
    res.redirect("/admin/menu");
  } catch (err) {
    res.status(500).send("Error updating menu item.");
  }
});

// GET: List all menu links
router.get("/menu", async (req, res) => {
    const db = req.app.locals.db;
    try {
      const links = await db.collection("menu").find().toArray();
      res.render("menuList", { links });
    } catch (err) {
      res.status(500).send("Failed to load menu list.");
    }
  });


module.exports = router;
