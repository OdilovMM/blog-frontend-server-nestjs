import { ReplyDto } from '../dtos/reply.dto';
import { UserDto } from '../../auth/dtos/user.dto';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAddNewCommentMutation } from '../api/commentApi';

interface RepliesProps {
  replies: ReplyDto[];
  user: UserDto | null;
  commentId: string;
}

const Replies = ({ replies, user, commentId }: RepliesProps) => {
  const [addNewReply] = useAddNewCommentMutation();
  const location = useLocation();
  const [replyText, setReplyText] = useState<string>('');
  const { id = '' } = useParams();

  const handleReply = () => {
    if (user && replyText !== '') {
      const newReply = {
        postId: id,
        commentId: commentId,
        _id: Math.floor(Math.random() * 9999).toString(),
        replyBy: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
        },
        replyText: replyText,
        replyAt: new Date().toISOString(),
      };
      addNewReply(newReply);
      setReplyText('');
    }
  };
  return (
    <>
      <details>
        <summary>
          reply
          {!replies.length
            ? ''
            : replies.length === 1
            ? ' - ' + replies.length + ' reply'
            : ' - ' + replies.length + ' replies'}
        </summary>
        {user ? (
          <div className="comment newcomment">
            <div className="comment-avatar">
              <img src={user.avatar} alt={user._id} className="avatar" />
            </div>
            <div className="comment-new">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button onClick={handleReply}>Reply</button>
            </div>
          </div>
        ) : (
          <Link to="/auth" state={{ from: location }}>
            To Reply sign in
          </Link>
        )}
        <div className="replies">
          {replies.map((reply) => (
            <div className="comment">
              <div className="comment-avatar">
                <img
                  src={reply.replyBy.avatar}
                  alt={reply.replyBy.name}
                  className="avatar"
                />
              </div>
              <div className="comment-body">
                <div className="comment-head">
                  <span className="commentby">{reply.replyBy.name}</span>
                  <span className="commentAt">
                    {new Date(reply.replyAt).toLocaleString()}
                  </span>
                </div>
                <div className="comment-text">{reply.replyText}</div>
              </div>
            </div>
          ))}
        </div>
      </details>
    </>
  );
};

export default Replies;
