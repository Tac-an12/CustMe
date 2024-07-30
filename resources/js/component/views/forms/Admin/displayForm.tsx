import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaEdit, FaTrash, FaPaperPlane } from 'react-icons/fa';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import { usePostContext } from '../../../context/PostContext';
import { useRequest } from '../../../context/RequestContext';

interface Image {
  image_id: number;
  image_path: string;
}

const DisplayForm: React.FC = () => {
  const { posts, fetchPosts, currentPage, totalPages, user, deletePost } = usePostContext();
  const { handleRequest } = useRequest();
  const [page, setPage] = useState(currentPage);
  const navigate = useNavigate();

  const fetchPostsCallback = useCallback(async (page: number, limit: number) => {
    await fetchPosts(page, limit);
  }, [fetchPosts]);

  useEffect(() => {
    fetchPostsCallback(page, 4);
  }, [page, fetchPostsCallback]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages && pageNumber !== page) {
      setPage(pageNumber);
    }
  };

  const handleEdit = (postId: number, title: string, content: string, images: Image[]) => {
    navigate(`/posts/${postId}`, { state: { postId, title, content, images } });
  };

  const handleDelete = (postId: number) => {
    if (user) {
      deletePost(postId);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-gray-200 rounded-md">Top Sales</button>
              <button className="px-4 py-2 bg-gray-200 rounded-md">Latest</button>
              <div className="relative">
                <select className="px-4 py-2 bg-gray-200 rounded-md">
                  <option>Price: High to Low</option>
                  <option>Price: Low to High</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.post_id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                  {post.images.length > 0 ? (
                    <ImageCarousel images={post.images} />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                      <p className="text-gray-600">No Image Available</p>
                    </div>
                  )}
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <img
                          src={'https://via.placeholder.com/40'}
                          alt="Profile"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="text-sm font-semibold">{post.user?.username || 'Unknown'}</p>
                          <p className="text-xs text-gray-500">{post.user?.role?.rolename || 'N/A'}</p>
                        </div>
                      </div>
                      <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
                      <p className="text-gray-700 mb-2">{post.content}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span className="text-sm">(1k+)</span>
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Graphic Design</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">From ₱120</span>
                      {user && (
                        <div className="flex items-center">
                          {post.user_id !== user.id && (
                            <button
                              onClick={() => handleRequest(post.post_id, post.user_id)}
                              className="text-blue-500 hover:text-blue-600"
                            >
                              <FaPaperPlane size={20} />
                            </button>
                          )}
                          {post.user_id === user.id && (
                            <>
                              <button
                                onClick={() => handleEdit(post.post_id, post.title, post.content, post.images)}
                                className="text-green-500 hover:text-green-600"
                              >
                                <FaEdit size={20} />
                              </button>
                              <button
                                onClick={() => handleDelete(post.post_id)}
                                className="text-red-500 hover:text-red-600 ml-2"
                              >
                                <FaTrash size={20} />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mx-1 hover:bg-blue-600 disabled:bg-gray-300"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mx-1 hover:bg-blue-600 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageCarousel: React.FC<{ images: Image[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full h-48">
      <button
        onClick={prevImage}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-full focus:outline-none hover:bg-gray-800"
      >
        &#8249;
      </button>
      <img
        src={`http://127.0.0.1:8000/storage/${images[currentIndex].image_path}`}
        alt={`Post Image ${images[currentIndex].image_id}`}
        className="w-full h-full object-cover"
      />
      <button
        onClick={nextImage}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-full focus:outline-none hover:bg-gray-800"
      >
        &#8250;
      </button>
    </div>
  );
};

export default DisplayForm;
