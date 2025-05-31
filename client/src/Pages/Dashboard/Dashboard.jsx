import { useSelector } from "react-redux";
import "./dashboard.styles.scss";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div id="dashboard">
      <h1 className="heading">
        {" "}
        Welcome <span>{user?.name}</span>{" "}
      </h1>
    </div>
  );
};

export default Dashboard;
