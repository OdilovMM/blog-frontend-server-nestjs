import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1',
        credentials: 'include',
    }),
    tagTypes: ['Auth', 'Categories', 'Tags', 'Users', 'Posts', 'AllPosts'],
    endpoints: (builder)=> ({}),
});