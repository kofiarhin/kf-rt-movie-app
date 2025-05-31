import { useDispatch } from "react-redux";
import { removeUser } from "../redux/auth/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    localStorage.removeItem("user");
    dispatch(removeUser());
  };
  return { data: "use auth", logout: () => handleLogout() };
};

export default useAuth;
