// packages 
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// import Mongoose models
import Sticker from './models/sticker.js'; 
import StickerPack from './models/stickerPack.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// form data parsing (for POST forms)
app.use(express.urlencoded({ extended: true }));

// publc assests
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, "public")));

// view engine to render Pug templates
app.set("view engine", "pug");
app.set('views', join(__dirname, 'views'));


// ------------------------------------------------------------------
// ROUTES - STICKERS
// ------------------------------------------------------------------

// home page
app.get("/admin", async (req, res) => {
    const stickers = await Sticker.find();
    res.render("adminHome", { stickers });
  });  

// add sticker
app.get("/admin/stickers", async (req, res) => {
    const stickers = await Sticker.find();
    res.render('addSticker', { stickers });
});

// add sticker form submission
app.post("/admin/stickers", async (req, res) => {
    await Sticker.create(req.body);
    res.redirect("/admin/stickers");
});

// delete sticker
app.post("/admin/stickers/delete/:id", async (req, res) => {
    await Sticker.findByIdAndDelete(req.params.id);
    res.redirect("/admin/stickers");
});

// ------------------------------------------------------------------
// ADMIN ROUTES - STICKERPACKS
// ------------------------------------------------------------------

// add sticker pack page
app.get("/admin/stickerpacks/add", async (req, res) => {
    try {
        const stickers = await Sticker.find();
        const packs = await StickerPack.find().populate('stickers');
        res.render("addStickerPack", { stickers, packs });
    } catch (err) {
        console.error("Error loading sticker pack admin page:", err);
        res.status(500).send("Internal Server Error: " + err.message);
    }
});

// add sticker pack form submission
  app.post("/admin/stickerpacks", async (req, res) => {
    const { packName, stickers } = req.body;
    await StickerPack.create({
      title: packName,
      stickers: Array.isArray(stickers) ? stickers : [stickers],
    });
    res.redirect("/admin/stickerpacks/add");
  });  

// delete sticker pack
  app.post("/admin/stickerpacks/delete/:id", async (req, res) => {
    await StickerPack.findByIdAndDelete(req.params.id);
    res.redirect("/admin/stickerpacks/add");
  });


// ------------------------------------------------------------------
// API ROUTES
// ------------------------------------------------------------------

app.get("/admin/stickers/add", (req, res) => {
    res.redirect("/admin/stickers");
  });

  
app.get("/api/stickers", async (req, res) => {
    const stickers = await Sticker.find();
    res.json(stickers);
  });

  app.get("/api/stickerpacks", async (req, res) => {
    const packs = await StickerPack.find().populate('stickers');
    res.json(packs);
  });
  
  
// ------------------------------------------------------------------
// START SERVER
// ------------------------------------------------------------------
    app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
        

