import PlayList from "../models/playListModel.js";

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

    // console.log({ imdb_id });
    // return res.json({ message: "create playlist" });

    const checkUser = req.user._id.toString() === userId;

    if (!checkUser) {
      res.status(400);
      throw new Error("you are not allowed to add to playlist");
    }

    const exist = await PlayList.findOne({ userId, movieId });

    if (exist) {
      res.status(400);
      throw new Error("item already exist in playlist");
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

export { createPlayList, getPlayList };
