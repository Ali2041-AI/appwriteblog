import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({Children,authenticaion=true}){

  const navigate=useNavigate();
  const authStatus=useSelector((state)=>(state.auth.logInStatus));
  const [loader,setLoader]=useState(true);



  useEffect(()=>{
     
    if(authenticaion && authStatus !== authenticaion){
        navigate('/login');

    }
    else if(!authenticaion && authStatus!==authenticaion){
        navigate('/')
    }

   setLoader(false);
  },[navigate,authStatus,authenticaion])

   

   return loader?<p>Loading....</p> :<>{Children}</>








}

export default Protected;