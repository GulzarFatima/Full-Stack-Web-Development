import mongoose from "mongoose";

const stickerPackSchema = new mongoose.Schema({
    title: { type: String, required: true },
    stickers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sticker' }],
  });
  

export default mongoose.model("StickerPack", stickerPackSchema);
