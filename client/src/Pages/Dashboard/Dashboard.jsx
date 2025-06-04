import { useSelector } from "react-redux";
import "./dashboard.styles.scss";
import usePlayListQuery from "../../hooks/usePlayListQuery";
import Spinner from "../../components/Spinner/Spinner";
import PlayList from "../../components/PlyaList/PlayList";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = usePlayListQuery(user);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div id="dashboard">
      <h1 className="heading">
        {" "}
        Welcome <span>{user?.name}</span>{" "}
      </h1>

      <PlayList data={data} />
    </div>
  );
};

export default Dashboard;
