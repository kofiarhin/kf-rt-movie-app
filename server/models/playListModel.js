import mongoose from "mongoose";

const playListSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
    },
    poster_path: {
      type: String,
    },
    backdrop_path: {
      type: String,
    },
    overview: {
      type: String,
    },
    runtime: {
      type: Number,
    },
    imdb_id: {
      type: String,
    },
    original_title: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("PlayList", playListSchema);
