import {  IMeta, IUser } from "@/types/common";
import { baseApi } from "./baseApi";
import { taqTypes } from "../slice/taq-types";
const USR_URL = "/users/user";
export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addUserWithFormData: build.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [taqTypes.user],
    }),

    users: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: USR_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IUser[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [taqTypes.user],
    }),

    // get single department by id
    user: build.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
      providesTags: [taqTypes.user],
    }),

    // update single department by id
    updateUser: build.mutation({
      query: (data) => ({
        url: `/profile/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [taqTypes.user],
    }),

    // delete single department by id
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [taqTypes.user],
    }),
  }),
});

export const {
 
 useAddUserWithFormDataMutation,
 useDeleteUserMutation,
 useUpdateUserMutation,
 useUserQuery,
 useUsersQuery
} = userApi;
