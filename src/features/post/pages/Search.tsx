import { useState } from 'react';
import Pagination from 'react-js-pagination';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useGetPostsQuery } from '../api/postApi';
import PostCard from '../components/PostCard';
import { useGetAuthorsQuery } from '../../auth/api/authApi';
import { useGetCategoriesQuery } from '../../category/api/categoryApi';
import { useGetTagsQuery } from '../../tag/api/tagApi';

const Search = () => {
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

  const { data: authors } = useGetAuthorsQuery();

  let title: string | null = null;
  if (searchParams.get('keyword')) {
    title = searchParams.get('keyword');
  }
  let author: string | null = null;
  if (searchParams.get('author')) {
    if (authors) {
      let i: number;
      for (i = 0; i < authors.length; i++) {
        if (authors[i]._id === searchParams.get('author')) {
          author = authors[i].name;
        }
      }
    }
  }

  const { data: categories } = useGetCategoriesQuery();
  let category: string | null = null;
  if (searchParams.get('category')) {
    if (categories) {
      let i: number;
      for (i = 0; i < categories.length; i++) {
        if (categories[i]._id === searchParams.get('category')) {
          category = categories[i].title;
        }
      }
    }
  }

  const { data: tags } = useGetTagsQuery();
  let tagList: string | null = null;
  if (searchParams.get('tags')) {
    if (tags) {
      tagList = searchParams.getAll('tags').map((tagId) => {
        const tag = tags.find((tag) => tag._id === tagId);
        return tag ? tag.title + ' ' : '';
      });
    }
  }

  const handlePage = (page: number) => {
    setCurrentPage(page);
    setSearchParams((params) => {
      params.set('page', page.toString());
      return params;
    });
  };

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (isError) {
    content = <div>Error Occurred</div>;
  }
  if (isSuccess) {
    content = (
      <>
        <div className="search-by">
          Search with - {title ? <span>Title : {title}</span> : ''}
          {author ? <span>Title : {author}</span> : ''}
          {category ? <span>Category : {category}</span> : ''}
          {tagList ? <span>Tags : {tagList}</span> : ''}
        </div>
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
        <div className="paginate">
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
        </div>
      </>
    );
  }

  return content || <></>;
};

export default Search;
