import React, { useState } from 'react';
import { useChangeLikeMutation, useGetPostDetailsQuery } from '../api/postApi';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { selectCurrentUser } from '../../auth/slice/authSlice';
import { useAppSelector } from '../../../app/hooks';
import { BiCategory } from 'react-icons/bi';
import { BsTags } from 'react-icons/bs';
import {
  useGetCommentsQuery,
  useAddNewCommentMutation,
} from '../api/commentApi';
import Comments from '../components/Comments';
import { PuffLoader } from 'react-spinners';

const PostDetails = () => {
  const { user } = useAppSelector(selectCurrentUser);
  const [comment, setComment] = useState<string>('');
  const [changeLike] = useChangeLikeMutation();
  const [addNewComment] = useAddNewCommentMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const {
    data: post,
    isLoading,
    isError,
    isSuccess,
  } = useGetPostDetailsQuery(id);
  const { data: comments } = useGetCommentsQuery(id);

  const handleLike = () => {
    if (user) {
      changeLike({ postId: id, userId: user._id });
    } else {
      navigate('/auth', { state: { from: location }, replace: true });
    }
  };

  const addComment = () => {
    if (user) {
      const newComment = {
        postId: id,
        _id: Math.floor(Math.random() * 9999).toString(),
        commentBy: {
          _id: user._id.toString(),
          name: user.name,
          avatar: user.avatar,
        },
        commentText: comment,
        commentAt: new Date().toISOString(),
        replies: [],
      };
      addNewComment(newComment);
      setComment('');
    }
  };

  let content;
  if (isLoading)
    content = (
      <div className="flex mt-[220px] items-center justify-center">
        <PuffLoader />
      </div>
    );
  if (isError)
    content = (
      <div className="flex mt-[220px] items-center justify-center">
        Error Occurred in fetching data...
      </div>
    );
  if (isSuccess) {
    content = (
      <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg space-y-6">
        <div className="article-banner-main mb-6">
          <img
            src={post.images[0]}
            className="w-full rounded-lg"
            alt={post.title}
          />
        </div>
        <div className="article-content">
          <h1 className="article-title text-3xl font-semibold text-gray-800">
            {post.title}
          </h1>
          <div className="article-author flex items-center space-x-4 mt-4">
            <div className="article-author-avatar flex items-center space-x-2">
              <img
                src={post.author.avatar}
                className="avatar-big w-12 h-12 rounded-full border-2 border-gray-300"
                alt={post.author.name}
              />
              <h4 className="article-author-name text-lg font-medium">
                <Link
                  to={`/search/?author=${post.author._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {post.author.name}
                </Link>
              </h4>
            </div>
            <div
              className="article-like cursor-pointer flex items-center space-x-2"
              onClick={handleLike}
            >
              {user && post.likes.includes(user._id) ? (
                <AiFillLike className="text-blue-500" />
              ) : (
                <AiOutlineLike className="text-gray-600" />
              )}
              <span className="text-sm text-gray-600">{post.likes.length}</span>
            </div>
          </div>
          <div className="article-body mt-6">
            <div
              className="rendered-content text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
          <div className="article-meta flex items-center justify-between mt-6 text-sm text-gray-600">
            <span className="flex items-center space-x-1">
              <BiCategory className="icons text-gray-500" />
              <Link
                to={`/search/?category=${post.category._id}&page=1`}
                className="text-blue-600 hover:underline"
              >
                {post.category.title}
              </Link>
            </span>
            {post.tags.length > 0 && (
              <span className="flex items-center space-x-2">
                <BsTags className="icons text-gray-500" />
                {post.tags.map((tag, index) => (
                  <Link
                    key={tag._id}
                    to={`/search/?tags=${tag._id}&page=1`}
                    className={`text-blue-600 hover:underline ${
                      index < post.tags.length - 1 ? 'mr-2' : ''
                    }`}
                  >
                    {tag.title}
                  </Link>
                ))}
              </span>
            )}
          </div>
        </div>
        <div className="article-comment mt-6">
          <div className="comment-count text-gray-600 mb-4">
            {!comments?.length ? 'No Comments' : comments.length + ' comments'}
          </div>
          <div className="comment flex items-center space-x-4">
            {!user ? (
              <Link
                to="/auth"
                state={{ from: location }}
                replace
                className="text-blue-600 hover:underline"
              >
                Sign in to leave a comment
              </Link>
            ) : (
              <>
                <div className="comment-avatar">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="avatar w-10 h-10 rounded-full border-2 border-gray-300"
                  />
                </div>
                <div className="comment-new flex items-center space-x-4 w-full">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Write a comment..."
                  />
                  <button
                    onClick={addComment}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Add comment
                  </button>
                </div>
              </>
            )}
          </div>

          {comments && (
            <Comments comments={comments} user={user ? user : null} />
          )}
        </div>
      </div>
    );
  }
  return content || <></>;
};

export default PostDetails;
