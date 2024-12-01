import React, { useEffect, useState } from 'react';
import { useCreateCategoryMutation } from '../api/categoryApi';
import { enqueueSnackbar } from 'notistack';

const CreateCategory = () => {
  const [createCategory, { isSuccess, isError, reset }] =
    useCreateCategoryMutation();
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
      reset();
    }
    if (isError) {
      console.log('error');
      enqueueSnackbar('Error occurred while adding category', {
        variant: 'error',
      });
      reset();
    }
  }, [isSuccess, isError, reset]);

  const isSubmitDisabled = title.trim() === '' || description.trim() === '';

  return (
    <div className="flex flex-col w-[400px] max-w-[90%] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Create a Category
      </h3>

      <label htmlFor="title" className="text-gray-700 text-sm font-medium mb-2">
        Category Title
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 border border-gray-300 rounded-md mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter category title"
      />

      <label
        htmlFor="description"
        className="text-gray-700 text-sm font-medium mb-2"
      >
        Category Description
      </label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-3 border border-gray-300 rounded-md mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter category description"
      />

      <button
        onClick={handleSubmit}
        className={`w-full p-3 text-white rounded-md ${
          isSubmitDisabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
    </div>
  );
};

export default CreateCategory;
