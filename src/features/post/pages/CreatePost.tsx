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
      enqueueSnackbar('Post created', { variant: 'success' });
      setTitle('');
      setContent('');
      setExcerpt('');
      setCategory('');
      setImages([]);
      setTags([]);
    }
  }, [isSuccess]);

  return (
    <>
      <h3>Create new post</h3>
      <label htmlFor="" className="lbl">
        Title
      </label>
      <input
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <label htmlFor="" className="lbl">
        Content
      </label>
      <div>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
      </div>
      <label htmlFor="" className="lbl">
        Excerpt
      </label>
      <textarea
        style={{ maxWidth: '100%', overflow: 'scroll' }}
        rows={3}
        maxLength={350}
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      />

      <label className="lbl">Feature Image</label>
      <input
        type="text"
        value={image || ''}
        onChange={(e) => setImage(e.target.value)}
      />
      <div style={{ margin: '5px 0', width: '100%' }}>
        <button onClick={addImage}>Add Image</button>
        <button onClick={resetImage}>Reset</button>
      </div>
      <div>
        {images.length > 0
          ? images.map((i) => <img src={i} alt={i} width={80} />)
          : 'No Image selected'}
      </div>

      <label className="lbl">Category</label>
      <div style={{ marginTop: '5px' }}>
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

      <label className="lbl"> Tags:</label>
      <div style={{ marginTop: '5px' }}>
        {tagList &&
          tagList.map((tag) => (
            <span key={tag._id} className="sp-bor">
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
      <br />
      <br />
      <br />
      <button onClick={handleSubmit} disabled={isLoading ? true : false}>
        Create Post
      </button>
    </>
  );
};

export default CreatePost;
