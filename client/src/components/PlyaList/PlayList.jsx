import "./playList.styles.scss";
import Image from "../Image/Image";
import { formatMinutesToHours } from "../../config/lib";
import { Link } from "react-router-dom";
import useRemovePlayListMutation from "../../hooks/useRemovePlayListMutation";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/lib";

// play list
const PlayList = ({ data }) => {
  const { mutate } = useRemovePlayListMutation();
  const { user } = useSelector((state) => state.auth);

  const handleRemove = async (movieId, token, userId) => {
    const data = {
      movieId,
      token,
      userId,
    };

    mutate(data);
  };
  return (
    <div id="play-list">
      <div className="play-list-wrapper">
        {data.map((item) => {
          // console.log(item);
          return (
            <div className="play-list-item">
              <Link to={`/movies/${item.movieId}`}>
                {" "}
                <Image url={item.poster_path} />{" "}
              </Link>
              <div className="detail-wrapper">
                <Link to={`/movies/${item.movieId}`}>
                  <h2> {item.original_title} </h2>
                </Link>

                <Link to={`/movies/${item.movieId}`}>
                  <p> {item.overview.substring(0, 150)}... </p>
                </Link>

                <FaTimes
                  className="close"
                  onClick={() =>
                    handleRemove(item.movieId, user.token, user._id)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayList;
