import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postService  from "../appWrite/postService";
import PostForm from "./PostForm";

function EditPost(){

    
 const {slug}=useParams();
 const [post,setPost]=useState(null);


 useEffect(()=>{

    postService.getPost(slug)
    .then((res)=>{
        if(res){
            setPost(res)
            console.log(res);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
 },[slug])
 

return(
    <>
      {post && <PostForm post={post} /> }
    </>
)

}


export default EditPost;