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
    <>
      <h2>Create a tag for your post</h2>

      <label htmlFor="">Tag Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <button
        onClick={handleSubmit}
        style={{ padding: '10px' }}
        disabled={isSubmitDisabled}
      >
        Add
      </button>
    </>
  );
};

export default CreateTag;
