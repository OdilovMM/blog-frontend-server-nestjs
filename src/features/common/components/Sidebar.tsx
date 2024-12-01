import { BsPencil, BsTags } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import AuthorList from './AuthorList';
import CategoryList from './CategoryList';
import TagList from './TagList';

const Sidebar = () => {
  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-800 text-white w-full min-h-full">
      <div className="aside-content">
        <h5 className="aside-header text-xl font-semibold flex items-center gap-3 text-gray-200">
          <BsPencil className="icons text-gray-400" />
          Author List
        </h5>
        <div className="aside-body mt-4">
          <AuthorList />
        </div>
      </div>

      <div className="aside-content">
        <h5 className="aside-header text-xl font-semibold flex items-center gap-3 text-gray-200">
          <BsTags className="icons text-gray-400" />
          Tags List
        </h5>
        <div className="aside-body mt-4">
          <TagList />
        </div>
      </div>

      <div className="aside-content">
        <h5 className="aside-header text-xl font-semibold flex items-center gap-3 text-gray-200">
          <BiCategory className="icons text-gray-400" />
          Category List
        </h5>
        <div className="aside-body mt-4">
          <CategoryList />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
