import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../category/api/categoryApi';

const CategoryList = () => {
  const { data: categories } = useGetCategoriesQuery();
  return (
    <>
      {categories?.length && (
        <div className="cloud category-cloud">
          {categories.map((category) => (
            <div className="list" key={category._id}>
              <Link to={`/search/?category=${category._id}`}>
                {category.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryList;
