const PlayList = require("../models/playListModel");

const createPlayList = async (req, res, next) => {
  try {
    const {
      userId,
      movieId,
      poster_path,
      backdrop_path,
      overview,
      original_title,
      runtime,
      imdb_id,
      ...rest
    } = req.body;

    const checkUser = req.user._id.toString() === userId;
    if (!checkUser) {
      res.status(400);
      throw new Error("you are not allowed to add to playlist");
    }

    const exist = await PlayList.findOne({ userId, movieId });
    if (exist) {
      res.status(400);
      throw new Error("item already exists in playlist");
    }

    const newPlayList = await PlayList.create({
      userId,
      movieId,
      poster_path,
      backdrop_path,
      overview,
      original_title,
      runtime,
      imdb_id,
    });

    return res.json(newPlayList);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const getPlayList = async (req, res, next) => {
  try {
    const user = req.user;
    const playLists = await PlayList.find({ userId: user._id }).sort({
      createdAt: -1,
    });
    return res.json(playLists);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const deletePlayList = async (req, res, next) => {
  const { movieId, userId } = req.body;
  try {
    const exist = await PlayList.findOne({ userId, movieId });
    if (!exist) {
      res.status(404);
      throw new Error("playlist item not found");
    }

    const deletedItem = await PlayList.findOneAndDelete({ userId, movieId });
    if (!deletedItem) {
      res.status(400);
      throw new Error("there was a problem deleting item from playlist");
    }

    return res.json(deletedItem);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPlayList,
  getPlayList,
  deletePlayList,
};
