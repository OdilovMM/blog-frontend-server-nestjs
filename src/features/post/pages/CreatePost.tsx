import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useGetCategoriesQuery } from '../../category/api/categoryApi';
import { useGetTagsQuery } from '../../tag/api/tagApi';
import { useCreatePostMutation } from '../api/postApi';
import { enqueueSnackbar } from 'notistack';

const CreatePost = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [excerpt, setExcerpt] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);

  const addImage = () => {
    if (image) {
      setImages((prevImages) => [...prevImages, image]);
      setImage('');
    }
  };

  const resetImage = () => {
    setImages([]);
    setImage('');
  };

  const { data: categories } = useGetCategoriesQuery();
  const { data: tagList } = useGetTagsQuery();
  const [category, setCategory] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updateList = [...tags];
    if (e.target.checked) {
      updateList = [...tags, e.target.value];
    } else {
      updateList.splice(tags.indexOf(e.target.value), 1);
    }
    setTags(updateList);
  };

  const [createPost, { isSuccess, isLoading }] = useCreatePostMutation();

  const handleSubmit = () => {
    const newPost = {
      title,
      content,
      excerpt,
      images,
      category,
      tags,
    };
    createPost(newPost);
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Post created successfully', { variant: 'success' });
      setTitle('');
      setContent('');
      setExcerpt('');
      setCategory('');
      setImages([]);
      setTags([]);
    }
  }, [isSuccess]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Create New Post</h3>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter post title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Content
        </label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="w-full border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Excerpt
        </label>
        <ReactQuill
          theme="snow"
          value={excerpt}
          onChange={setExcerpt}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['clean'],
            ],
          }}
          formats={['bold', 'italic', 'underline', 'list', 'bullet']}
          className="w-full border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Feature Image
        </label>
        <input
          type="text"
          value={image || ''}
          placeholder="Paste image URL"
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4 mt-2">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={addImage}
          >
            Add Image
          </button>
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded-md"
            onClick={resetImage}
          >
            Reset Images
          </button>
        </div>
        <div className="mt-4">
          {images.length > 0 ? (
            <div className="flex gap-4">
              {images.map((i, idx) => (
                <img
                  key={idx}
                  src={i}
                  alt={`image-${idx}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ))}
            </div>
          ) : (
            'No images selected'
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Category
        </label>
        <div className="grid grid-cols-2 gap-4">
          {categories &&
            categories.map((cat) => (
              <div key={cat._id} className="flex items-center">
                <input
                  type="radio"
                  id={cat._id}
                  value={cat._id}
                  name="category"
                  checked={category === cat._id}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCategory(e.target.value)
                  }
                  className="mr-2"
                />
                <label htmlFor={cat._id} className="text-sm text-gray-700">
                  {cat.title}
                </label>
              </div>
            ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Tags
        </label>
        <div className="grid grid-cols-3 gap-4">
          {tagList &&
            tagList.map((tag) => (
              <div key={tag._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={tag._id}
                  name={tag._id}
                  value={tag._id}
                  onChange={handleTag}
                  className="mr-2"
                />
                <label htmlFor={tag._id} className="text-sm text-gray-700">
                  {tag.title}
                </label>
              </div>
            ))}
        </div>
      </div>

      <button
        className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Creating Post...' : 'Create Post'}
      </button>
    </div>
  );
};

export default CreatePost;
