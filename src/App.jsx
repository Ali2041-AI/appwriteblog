import { useState, useEffect } from "react";
import "./App.css";
import { logInUser, logOutUser } from './store/authSlice';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import auth from "./appWrite/auth";
import { useDispatch } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.getLoginUser()
      .then((userData) => {
        if (userData) {
          dispatch(logInUser(userData));
        } else {
          dispatch(logOutUser());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow flex justify-center items-center mt-16">
        <ScrollToTop />
        <Outlet />
    </main>
    <Footer />
</div>
  ) : null;
}

export default App;
