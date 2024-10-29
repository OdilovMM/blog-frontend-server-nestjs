import { rootApi } from '../../rootApi';
import { CreatePostDto } from '../dtos/CreatePost.dto';

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
  }),
});

export const { useCreatePostMutation } = postApi;
