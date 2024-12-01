import { BsSearch } from 'react-icons/bs';
import { Modal } from './Modal';
import { useState } from 'react';
import { useGetAuthorsQuery } from '../../auth/api/authApi';
import { useGetCategoriesQuery } from '../../category/api/categoryApi';
import { useGetTagsQuery } from '../../tag/api/tagApi';
import { useNavigate } from 'react-router-dom';

const SearchDialogue = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const searchParams = new URLSearchParams();
  const [title, setTitle] = useState<string>(searchParams.get('title') || '');
  const [author, setAuthor] = useState<string>(
    searchParams.get('author') || '0'
  );
  const [category, setCategory] = useState<string>(
    searchParams.get('category') || '0'
  );
  const [tags, setTags] = useState<string[]>([]);
  const { data: authors } = useGetAuthorsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: tagsList } = useGetTagsQuery();
  const navigate = useNavigate();

  const handleTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updateList = [...tags];
    if (e.target.checked) {
      updateList = [...tags, e.target.value];
    } else {
      updateList.splice(tags.indexOf(e.target.value), 1);
    }
    setTags(updateList);
  };

  const handleSearch = () => {
    if (title !== '') {
      searchParams.set('keyword', title);
    }
    if (author !== '0') {
      searchParams.set('author', author);
    }
    if (category !== '0') {
      searchParams.set('category', category);
    }
    tags?.forEach((tag) => {
      searchParams.append('tags', tag);
    });
    setOpenModal(false);
    navigate(`/search/?${serializeSearchParams(searchParams)}&page=1`);
  };

  const serializeSearchParams = (params: URLSearchParams) => {
    const entries = Array.from(params.entries());
    return entries
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');
  };

  return (
    <>
      <BsSearch
        className="search-button text-white cursor-pointer"
        size={24}
        onClick={() => setOpenModal(true)}
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="dialog bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <div className="dialog-header flex items-center justify-between mb-4">
            <span className="text-xl font-semibold text-gray-800 dark:text-white">
              Search options
            </span>
            <button
              className="text-gray-500 dark:text-gray-300"
              onClick={() => setOpenModal(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="dialog-body space-y-4">
            {/* Search by Title */}
            <div className="dialog-option">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Search in titles
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            {/* Search by Author */}
            <div className="dialog-option">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Search by author
              </label>
              <select
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                onChange={(e) => setAuthor(e.target.value)}
              >
                <option value="0">Select Author</option>
                {authors &&
                  authors.map((author) => (
                    <option value={author._id} key={author._id}>
                      {author.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* Search by Category */}
            <div className="dialog-option">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Search by category
              </label>
              <div className="mt-2 space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="0"
                    name="category"
                    value="0"
                    checked={category === '0'}
                    onChange={(e) => setCategory(e.target.value)}
                    className="text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    All categories
                  </span>
                </label>
                {categories &&
                  categories.map((cat) => (
                    <label key={cat._id} className="inline-flex items-center">
                      <input
                        type="radio"
                        id={cat._id}
                        value={cat._id}
                        name="category"
                        checked={category === cat._id}
                        onChange={(e) => setCategory(e.target.value)}
                        className="text-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {cat.title}
                      </span>
                    </label>
                  ))}
              </div>
            </div>
            {/* Search by Tags */}
            <div className="dialog-option">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Search by tags
              </label>
              <div className="mt-2 space-y-2">
                {tagsList &&
                  tagsList.map((tag) => (
                    <label key={tag._id} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        id={tag._id}
                        value={tag._id}
                        onChange={handleTag}
                        className="text-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {tag.title}
                      </span>
                    </label>
                  ))}
              </div>
            </div>
          </div>
          <div className="dialog-footer flex justify-between items-center mt-6">
            <button
              onClick={() => setOpenModal(false)}
              className="px-6 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSearch}
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Search
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SearchDialogue;
