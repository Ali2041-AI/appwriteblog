import { useNavigate } from "react-router-dom";
import { logInUser } from "../store/authSlice";
import Button from './Button';
import Input from './Input';
import { useDispatch } from "react-redux";
import { useState } from "react";
import auth from '../appWrite/auth';
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useForm } from "react-hook-form";
function Signup(){
    const navigate=useNavigate();
    const {register,handleSubmit}=useForm();
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();

    const create=(data)=>{
      setLoading(true)
        console.log(data);
        setError("");
        auth.createAccount(data)
        .then((user)=>{
          auth.login({email:data.email , password:data.password})
          .then((res)=>{
            dispatch(logInUser(res));
            setLoading(false);
            navigate('/')
          })
          .catch((error)=>{
            setError(error.message);
          })
        })
        .catch((error)=>{
            setError(error.message);
        })

    }


    return (
        <>
        {
          loading && error===""? <div className="flex justify-center py-24 items-center"><MoonLoader color="#744CEC" /></div>
          : <div className="flex w-full  items-center justify-center">
          <div
            className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
          >
            <div className="mb-2 w-full flex justify-center">
             
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">
              Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(create)}>
              <div className="space-y-5">
                <Input
                  label="Full Name: "
                  type="text"
                  placeholder="Enter your name..."
                  {...register("name", {
                    required: true,
                  })}
                />
                <Input
                  label="Email: "
                  type="email"
                  placeholder="Enter your email..."
                  {...register("email", {
                    required: true,
                  })}
                />
                <Input
                  label="Password: "
                  type="password"
                  placeholder="Enter your Password..."
                  {...register("password", {
                    required: true,
                  })}
                />
  
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        </div>

        }
         
        </>
      );



    


}

export default Signup;