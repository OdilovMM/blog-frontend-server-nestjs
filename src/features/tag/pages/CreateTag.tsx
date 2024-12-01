import React, { useEffect, useState } from 'react';
import { useCreateTagMutation } from '../api/tagApi';
import { enqueueSnackbar } from 'notistack';

const CreateTag = () => {
  const [title, setTitle] = useState<string>('');
  const [createTag, { isSuccess }] = useCreateTagMutation();

  const handleSubmit = () => {
    const newTag = { title };
    createTag(newTag);
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Tag Added', { variant: 'success' });
      setTitle('');
    }
  }, [isSuccess]);

  const isSubmitDisabled = title.trim() === '';

  return (
    <div className="flex flex-col w-[400px] max-w-[90%] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Create a Tag
      </h2>

      <label htmlFor="title" className="text-gray-700 text-sm font-medium mb-2">
        Tag Title
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 border border-gray-300 rounded-md mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter tag title"
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
        Add Tag
      </button>
    </div>
  );
};

export default CreateTag;
