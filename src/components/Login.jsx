import { useNavigate } from "react-router-dom";
import { logInUser } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useState } from "react";
import auth from "../appWrite/auth";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = (data) => {
    setLoading(true);
    setError("");
    auth
      .login(data)
      .then((user) => {
        dispatch(logInUser(user));
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      {loading && error === "" ? (
          <div className="flex justify-center py-24 items-center"><MoonLoader color="#744CEC" /></div>
        
      ) : (
        <div className="flex items-center w-full justify-center py-[90px] bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-gray-600">
              Don't have an account?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-blue-600  text-primary hover:underline"
              >
                Sign Up
              </Link>
            </p>
            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className="mt-6 space-y-6">
              <Input
                label="Email:"
                placeholder="Enter Your Email..."
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password:"
                placeholder="Enter Your Password..."
                type="password"
                {...register("password", { required: true })}
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
