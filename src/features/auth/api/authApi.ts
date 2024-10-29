import { rootApi } from "../../rootApi";
import { ISignInDto } from "../dtos/signin.dto";
import { ISignUpDto } from "../dtos/signup.dto";
import { UserDto } from "../dtos/user.dto";

interface IChangeRolesDto {
    id: string;
    roles: string[]
}



export const authApi = rootApi.injectEndpoints({
    endpoints: (builder)=> ({
        signUp: builder.mutation<UserDto, ISignUpDto>({
            query: (iSignUpDto: ISignUpDto)=> ({
                url: '/users/signup',
                method: 'POST',
                body: iSignUpDto,
            })
        }),
        signIn: builder.mutation<UserDto, ISignInDto>({
            query: (iSignInDto: ISignUpDto)=> ({
                url: '/users/signin',
                method: 'POST',
                body: iSignInDto,
            })
        }),
        signOut: builder.mutation<void, void>({
            query: ()=> ({
                url: '/users/logout',
                method: 'POST',
                body: {},
            })
        }),
        me: builder.query<UserDto, void>({
            query: ()=> `/users/me/profile`,
        }),
        getUsers: builder.query<UserDto[], void>({
            query: ()=> `users/all-users`,
            providesTags: ['Users'],
        }),
        changeRoles: builder.mutation<void, IChangeRolesDto>({
            query:(iChangeRolesDto: IChangeRolesDto)=> ({
                url: '/users/roles/update',
                method: 'PATCH',
                body: iChangeRolesDto,
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {useSignInMutation, useSignUpMutation, useSignOutMutation, useGetUsersQuery, useChangeRolesMutation} = authApi;