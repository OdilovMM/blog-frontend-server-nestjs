import { rootApi } from "../../rootApi";
import { CommentDto } from "../dtos/comment.dto";

export const commentApi = rootApi.injectEndpoints({
    endpoints: (builder)=> ({
        getComments: builder.query<CommentDto[], string>({
            query:(id: string)=> `/comments/${id}`,
            providesTags: ['Comments']
        })
    })
})

export const {
    useGetCommentsQuery
  } = commentApi;