import mongoose from "mongoose";

const playListSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("PlayList", playListSchema);
