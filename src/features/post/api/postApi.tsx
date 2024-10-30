import { rootApi } from '../../rootApi';
import { CreatePostDto } from '../dtos/CreatePost.dto';
import { PostTableDto } from '../dtos/post-table.dto';

interface IApprove {
  approve: boolean;
  ids: string[];
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
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsByAdminQuery,
  usePostApprovalMutation,
} = postApi;
