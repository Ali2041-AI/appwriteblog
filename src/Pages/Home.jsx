import { useEffect, useState } from "react";
import auth from "../appWrite/auth";
import { logInUser } from '../store/authSlice';
import { useDispatch, useSelector } from "react-redux";
import postService from "../appWrite/postService";
import PostCard from '../components/PostCard';
import { Link } from "react-router-dom";

function Home() {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const userLogInStatus = useSelector((state) => state.auth.logInStatus);

    useEffect(() => {
        auth.getLoginUser()
            .then((user) => {
                dispatch(logInUser(user));
            })
            .catch(error => {
                console.log(error);
            });
    }, [dispatch]);

    useEffect(() => {
        if (userLogInStatus) {
            setPosts([]);  // Clear existing posts to prevent showing stale data
            postService.getPosts()
                .then((allPosts) => {
                    setPosts(allPosts.documents);
                })
                .catch((error) => {
                    console.log(`Error fetching posts: `, error);
                });
        }
    }, [userLogInStatus]);

    return (
        <>
            {userLogInStatus ? (
                <div className="bg-gradient-to-br from-gray-50 min-h-screen to-gray-100 py-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Latest Posts</h1>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                        {posts?.map((post) => (
                            <div key={post.$id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
              <div className="max-w-lg mx-auto text-center my-20 sm:my-0">
              <p className="text-lg text-gray-700 mb-4">
                  You need to <Link to="/login" className="font-semibold text-blue-600 hover:underline">Log In</Link> to read posts.
              </p>
              <p className="text-gray-500">
                  Please log in to access the latest posts and insights.
              </p>
          </div>
            )}
        </>
    );
}

export default Home;
