import { useNavigate, useParams } from "react-router-dom";
import postService from "../appWrite/postService";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import ScrollToTop from "./ScrollToTop";

function Post() {
    const { slug } = useParams();
    const [post, setPost] = useState("");
    const [isAuthor, setIsAuthor] = useState(false);
    const [loading,setLoading]=useState(true);
    const userDataID = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            console.log(`Fetching post with slug: ${slug}`); // Log post fetching
            postService.getPost(`${slug}`)
                .then((res) => {
                    setPost(res);
                setLoading(false);

                    console.log("Post fetched successfully:"); // Log success
                })
                .catch((error) => {
                    console.error("Error fetching post:", error.message); // Log errors
                });
        }
    }, [slug]);

    useEffect(() => {
        if (post && userDataID?.$id === post.userID) {
            setIsAuthor(true);
            console.log("User is the author of this post."); // Log author status
        } else {
            setIsAuthor(false);
            console.log("User is NOT the author of this post."); // Log non-author status
        }
    }, [slug, post, userDataID]);

    async function deletePost() {
        try {
            console.log(`Deleting post with slug: ${slug}`);
            await postService.deletePost(slug);
            await postService.deleteFile(post?.featuredImage);
            console.log("Post and image deleted successfully."); // Log deletion success
            navigate("/");
        } catch (error) {
            console.error("Error deleting post or image:", error.message); // Log deletion error
        }
    }

    return (

        <>
        <ScrollToTop />
        {loading
        ? <div className="py-32">
            <ClipLoader color="#7522BB" />
        </div>
        : 

        
        <div className="max-w-3xl overflow-hidden mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
         {post && (
    <div className="mb-6">
        <img
            src={postService.getImagePreview(post.featuredImage)}
            alt={post.title}
            className="w-full  max-h-[600px] md:max-h-[400px] object-contain rounded-lg shadow-md"
        />
    </div>
)}

            {post && (
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {post.title}
                </h1>
            )}
            {post && (
                <div className="text-gray-700 leading-relaxed mb-6">
                    {parse(post.content)}
                </div>
            )}
            {/* Buttons for Edit and Delete */}
            {isAuthor && (
                <div className="flex justify-between space-x-2">
                    <button
                        onClick={() => navigate(`/edit-post/${post.$id}`)}
                        className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={deletePost}
                        className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
         }
        

        </>

    );
}

export default Post;
