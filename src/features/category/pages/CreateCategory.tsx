import React, { useEffect, useState } from 'react';
import { useCreateCategoryMutation } from '../api/categoryApi';
import { enqueueSnackbar } from 'notistack';

const CreateCategory = () => {
  const [createCategory, { isSuccess }] = useCreateCategoryMutation();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = () => {
    const newCategory = {
      title,
      description,
    };
    createCategory(newCategory);
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Category Added', { variant: 'success' });
      setTitle('');
      setDescription('');
    } else {
      enqueueSnackbar('error', { variant: 'error' });
    }
  }, [isSuccess]);

  const isSubmitDisabled = title.trim() === '' || description.trim() === '';

  return (
    <>
      <h3>Create a category</h3>
      <label>Category Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>Category Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <br />
      <button
        onClick={handleSubmit}
        style={{ padding: '10px' }}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
    </>
  );
};

export default CreateCategory;
