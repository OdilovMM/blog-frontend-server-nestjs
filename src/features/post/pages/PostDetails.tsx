import React, { useState } from 'react';
import { useGetPostDetailsQuery } from '../api/postApi';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { selectCurrentUser } from '../../auth/slice/authSlice';
import { useAppSelector } from '../../../app/hooks';
import { BiCategory } from 'react-icons/bi';
import { BsTags } from 'react-icons/bs';
import { useGetCommentsQuery } from '../api/commentApi';
import Comments from '../components/Comments';

const PostDetails = () => {
  const { user } = useAppSelector(selectCurrentUser);
  const [comment, setComment] = useState<string>('');

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

  const handleLike = () => {};
  const addComment = () => {};

  let content;
  if (isLoading) content = <>Loading</>;
  if (isError) content = <>Error ocurred</>;
  if (isSuccess) {
    content = (
      <article className="article-details">
        <div className="article-banner-main">
          <img src={post.images[0]} width="100%" alt={post.title} />
        </div>
        <div className="article-content">
          <h1 className="article-title">{post.title}</h1>
          <div className="article-author">
            <div className="article-author-avatar">
              <img
                src={post.author.avatar}
                className="avatar-big"
                alt={post.author.name}
              />
              <h4 className="article-author-name">
                <Link to={`/search/?author=${post.author._id}`}>
                  {post.author.name}
                </Link>
              </h4>
            </div>
            <div className="article-like" onClick={handleLike}>
              {user && post.likes.includes(user._id) ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )}
              {post.likes.length}
            </div>
          </div>
          <div className="article-body">
            <div
              className="rendered-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
          <div className="article-meta">
            <span>
              <BiCategory className="icons" /> &nbsp;
              <Link to={`/search/?category=${post.category._id}&page=1`}>
                {post.category.title}
              </Link>
            </span>
            {post.tags.length > 0 && (
              <span>
                <BsTags className="icons" /> &nbsp;
                {post.tags.map((tag, index) => (
                  <Link
                    to={`/search/?tags=${tag._id}}&page=1`}
                    key={tag._id}
                    className={
                      post.tags.length - 1 === index ? 'bord bordlast' : 'bord'
                    }
                  >
                    {tag.title}
                  </Link>
                ))}
              </span>
            )}
          </div>
        </div>
        <div className="article-comment">
          <div className="comment-count">
            {!comments?.length ? 'No Comments' : comments.length + 'comments'}
          </div>
          <div className="comment">
            {!user ? (
              <Link to="/auth" state={{ from: location }} replace>
                To Comment or Reply Sign in
              </Link>
            ) : (
              <>
                <div className="comment-avatar">
                  <img src={user.avatar} alt={user.name} className="avatar" />
                </div>
                <div className="comment-new">
                  <input
                    type="text"
                    name=""
                    id=""
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button onClick={addComment}>Add comment</button>
                </div>
              </>
            )}
          </div>

          {comments && (
            <Comments comments={comments} user={user ? user : null} />
          )}
        </div>
      </article>
    );
  }
  return content || <></>;
};

export default PostDetails;
