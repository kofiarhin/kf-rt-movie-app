import { useSelector } from "react-redux";
import usePlayListQuery from "../../hooks/usePlayListQuery";
import Spinner from "../../components/Spinner/Spinner";
import PlayList from "../../components/PlyaList/PlayList";
import "./play_list_page.styles.scss";

const PlayListPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = usePlayListQuery(user);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div id="playlist">
      <h2 className="heading"> Your play list</h2>

      <PlayList data={data} />
    </div>
  );
};

export default PlayListPage;
