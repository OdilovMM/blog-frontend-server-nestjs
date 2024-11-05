import { Link } from 'react-router-dom';
import { useGetTagsQuery } from '../../tag/api/tagApi';

const TagList = () => {
  const { data: tags } = useGetTagsQuery();
  return (
    <>
      {tags?.length && (
        <div className="cloud tag-cloud">
          {tags.map((tag) => (
            <div className="list" key={tag._id}>
              <Link to={`/search/?tags=${tag._id}`}>{tag.title}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TagList;
