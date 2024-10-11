import { useDispatch } from "react-redux";
import { logOutUser } from '../store/authSlice';
import auth from "../appWrite/auth";
import { useNavigate } from "react-router-dom";

function LogoutBtn({closeNav}) {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const logoutHandler = () => {
    auth.logOut()
      .then(() => {
        dispatch(logOutUser());
      })
      .catch((error) => {
        console.log(error);
      });
      closeNav();
      navigate('/');
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 text-white bg-red-600 rounded-lg transition-all duration-300 hover:bg-red-500 active:scale-95 focus:outline-none focus:ring focus:ring-red-300"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
