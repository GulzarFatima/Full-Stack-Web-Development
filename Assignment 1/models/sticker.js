import mongoose from "mongoose";

const stickerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  imageUrl: String,
});

export default mongoose.model("Sticker", stickerSchema);
