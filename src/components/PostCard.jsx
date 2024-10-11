import { Link } from 'react-router-dom';
import postService from '../appWrite/postService';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="max-w-sm w-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <img
                    src={postService.getImagePreview(featuredImage)}
                    alt={title}
                    className="w-full h-40 object-cover" // Adjusted height for better image ratio
                />
                <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
