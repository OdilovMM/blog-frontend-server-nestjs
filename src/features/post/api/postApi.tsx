import { rootApi } from '../../rootApi';
import { CreatePostDto } from '../dtos/CreatePost.dto';
import { PostTableDto } from '../dtos/post-table.dto';
import { PostInfoDto } from '../dtos/postInfo.dto';

interface IApprove {
  approve: boolean;
  ids: string[];
}

interface ISearchParams {
  searchParams: string;
}

export const postApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<void, CreatePostDto>({
      query: (newPost: CreatePostDto) => ({
        url: `/posts`,
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Posts'],
    }),
    getPostsByAdmin: builder.query<PostTableDto[], void>({
      query: () => `/posts/get/all`,
      providesTags: ['AllPosts'],
    }),
    postApproval: builder.mutation<void, IApprove>({
      query: (approve: IApprove) => ({
        url: '/posts/approve',
        method: 'PATCH',
        body: approve,
      }),
      invalidatesTags: ['AllPosts'],
    }),
    getPosts: builder.query<PostInfoDto, ISearchParams>({
      query: ({ searchParams }) => `/posts/?${searchParams}`,
      providesTags: ['Posts'],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsByAdminQuery,
  usePostApprovalMutation,
  useGetPostsQuery,
} = postApi;
