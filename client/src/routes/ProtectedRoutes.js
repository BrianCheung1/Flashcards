import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { checkUser } from "../api/api";

const useAuth = () => {
  let user = { loggedIn: localStorage.getItem("session_id") };
};

const ProtectedRoutes = () => {
  let navigate = useNavigate();
  //const isAuth = useAuth();
  let user = { loggedIn: localStorage.getItem("session_id") };
  if (!user.loggedIn) {
    return <Navigate replace to={"/login"} />;
  } else if (user.loggedIn.length < 12) {
    return <Navigate replace to={"/login"} />;
  }
  checkUser(user.loggedIn).then((res) => {
    if (res.data == false) {
      navigate("/login");
    }
  });

  return <Outlet />;
};

export default ProtectedRoutes;
