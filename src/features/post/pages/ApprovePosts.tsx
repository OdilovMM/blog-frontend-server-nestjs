import React, { useEffect, useState } from 'react';
import {
  useGetPostsByAdminQuery,
  usePostApprovalMutation,
} from '../api/postApi';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const ApprovePosts = () => {
  const { data: posts } = useGetPostsByAdminQuery();
  const [ids, setIds] = useState<string[]>([]);

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updateList = [...ids];
    if (e.target.checked) {
      updateList = [...ids, e.target.value];
    } else {
      updateList.splice(ids.indexOf(e.target.value), 1);
    }
    setIds(updateList);
  };

  const [postApproval, { isSuccess, isLoading }] = usePostApprovalMutation();

  const handleApprove = (approve: boolean) => {
    const approval = { approve: approve, ids };
    if (ids.length) {
      postApproval(approval);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Post published', { variant: 'success' });
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col min-h-[400px] px-6 py-4">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
        List of Posts
      </h3>
      <div className="space-y-4">
        {posts &&
          posts.map((post) => (
            <div
              className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg border border-gray-300"
              key={post._id}
              style={{
                backgroundColor: post.approved ? 'white' : '#f1f1f1',
                color: post.approved ? 'black' : 'gray',
              }}
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  value={post._id}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleId(e)
                  }
                  className="form-checkbox text-blue-600"
                />
                <img
                  src={post.images[0]}
                  alt={post.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex flex-col space-y-2">
                  <div className="font-semibold text-lg text-gray-800">
                    <Link to={`posts/${post._id}`}>{post.title}</Link>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <div>
                      <span className="block">Written By</span>
                      <Link to={`/search/?author=${post.author._id}&page=1`}>
                        {post.author.name}
                      </Link>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>At </span>
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="text-xs font-medium text-gray-600">
                {post.approved ? (
                  <span className="text-green-500">Published</span>
                ) : (
                  <span className="text-red-500">Unpublished</span>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          className={`py-2 px-4 rounded-md text-white ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={() => handleApprove(true)}
          disabled={isLoading || !ids.length}
        >
          {isLoading ? 'Loading...' : 'Publish'}
        </button>
        <button
          className={`py-2 px-4 rounded-md text-white ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-600 hover:bg-gray-700'
          }`}
          onClick={() => handleApprove(false)}
          disabled={isLoading || !ids.length}
        >
          {isLoading ? 'Loading...' : 'Unpublish'}
        </button>
      </div>
    </div>
  );
};

export default ApprovePosts;
