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
      <BsSearch className="search-button" onClick={() => setOpenModal(true)} />
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <div className="dialog">
          <div className="dialog-header">
            <span>Search options</span>
          </div>
          <div className="dialog-body">
            <div className="dialog-option">
              <span>Search in titles</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="dialog-option">
              <span>Search by author:</span>
              <div className="dialog-option-value">
                <select
                  name=""
                  id="authors"
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
            </div>
            <div className="dialog-option">
              <span>Search by category</span>
              <div className="dialog-option-value">
                <span className="sp-bor">
                  <input
                    type="radio"
                    id="0"
                    name="0"
                    value="0"
                    checked={category === 0}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label htmlFor="0">All categories</label>
                </span>
                {categories &&
                  categories.map((cat) => (
                    <span key={cat._id} className="sp-bor">
                      <input
                        type="radio"
                        id={cat._id}
                        value={cat._id}
                        name={cat.title}
                        checked={category === cat._id}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setCategory(e.target.value)
                        }
                      />
                      <label htmlFor={cat._id}>{cat.title}</label>
                    </span>
                  ))}
              </div>
            </div>
            <div className="dialog-option">
              <span>Search by tags</span>
              <div className="dialog-option value">
                {tagsList &&
                  tagsList.map((tag) => (
                    <span className="sp-bor" key={tag._id}>
                      <input
                        type="checkbox"
                        id={tag._id}
                        name={tag._id}
                        value={tag._id}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleTag(e)
                        }
                      />
                      <label htmlFor={tag._id}>{tag.title}</label>
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className="dialog-footer">
            <button onClick={() => setOpenModal(false)}>Cancel</button>
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SearchDialogue;
