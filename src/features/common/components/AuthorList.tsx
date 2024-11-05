import { Link } from 'react-router-dom';
import { useGetAuthorsQuery } from '../../auth/api/authApi';

const AuthorList = () => {
  const { data: authors } = useGetAuthorsQuery();
  return (
    <>
      {authors?.length && (
        <div className="cloud">
          {authors.map((author) => (
            <div className="list" key={author._id}>
              <img src={author.avatar} alt={author.name} className="avatar" />
              <Link to={`/search/?author=${author._id}`}>{author.name}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AuthorList;
