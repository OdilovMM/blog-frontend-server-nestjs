import React, { useState } from 'react';
import { useGetPostsQuery } from '../api/postApi';
import { useLocation, useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Pagination from 'react-js-pagination';

const Post = () => {
  const location = useLocation();
  const getUrlSearchParam = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: postInfo,
    isError,
    isSuccess,
    isLoading,
  } = useGetPostsQuery(
    {
      searchParams: getUrlSearchParam.toString(),
    },
    { refetchOnMountOrArgChange: true }
  );

  const handlePage = (page: number) => {
    setCurrentPage(page);
    setSearchParams((params) => {
      params.set('page', page.toString());
      return params;
    });
  };

  let content;
  if (isLoading) {
    content = <div className="loader-text">Loading...</div>;
  }
  if (isError) {
    content = <div>Error Occurred</div>;
  }
  if (isSuccess) {
    content = (
      <>
        <div className="container-posts">
          {postInfo.posts &&
            postInfo?.posts?.map((post, index) => {
              return (
                <PostCard
                  postInfo={postInfo}
                  post={post}
                  index={index}
                  key={post._id}
                />
              );
            })}
          {/* pagination */}
        </div>
        <div className="paginate">
          {postInfo?.posts.length > 2 && (
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={postInfo.limit}
              totalItemsCount={postInfo.filteredPostCount}
              onChange={(page: number) => handlePage(page)}
              nextPageText=">"
              prevPageText="<"
              firstPageText="<<"
              lastPageText=">>"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive active"
              activeLinkClass="pageLInkActive disabled"
              itemClassNext="symbol"
              itemClassLast="symbol"
              itemClassFirst="symbol"
              itemClassPrev="symbol"
            />
          )}
        </div>
      </>
    );
  }

  return content || <></>;
};

export default Post;
