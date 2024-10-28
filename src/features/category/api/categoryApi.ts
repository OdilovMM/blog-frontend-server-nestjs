import { rootApi } from "../../rootApi";

interface ICreateCategoryDto {
    title: string;
    description: string;
}

export const categoryApi = rootApi.injectEndpoints({
    endpoints: (builder)=> ({
        createCategory: builder.mutation<void, ICreateCategoryDto>({
            query: (newCategory)=> ({
                url: `/categories/create-category`,
                method: 'POST',
                body: newCategory
            }),
            invalidatesTags: ['Categories'],
        }),
    }),
})

export const {useCreateCategoryMutation} = categoryApi;