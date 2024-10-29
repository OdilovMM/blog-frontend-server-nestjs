import { rootApi } from "../../rootApi";
import { TagDto } from "../dtos/Tag.dto";

interface ICreateTag {
    title: string;
}

export const tagApi = rootApi.injectEndpoints({
    endpoints: (builder)=>({
        createTag: builder.mutation<void, ICreateTag>({
            query: (newTag)=> ({
                url: `/tags/create-tag`,
                method: 'POST',
                body: newTag
            }),
            invalidatesTags: ['Tags']
        }),
        getTags: builder.query<TagDto[], void>({
            query: ()=> `tags`,
            providesTags: ['Tags']
        })
          
    })
})

export const {useCreateTagMutation, useGetTagsQuery} = tagApi;