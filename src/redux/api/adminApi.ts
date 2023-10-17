import { IAdmin, IMeta } from "@/types/common";
import { baseApi } from "./baseApi";
import { taqTypes } from "../slice/taq-types";
const ADMIN_URL = "/users/admin";
export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdminWithFormData: build.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [taqTypes.admin],
    }),

    admins: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ADMIN_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAdmin[], meta: IMeta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [taqTypes.admin],
    }),

    // get single department by id
    admin: build.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
      providesTags: [taqTypes.admin],
    }),

    // update single department by id
    updateAdmin: build.mutation({
      query: (data) => ({
        url: `/profile/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [taqTypes.admin],
    }),

    // delete single department by id
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [taqTypes.admin],
    }),
  }),
});

export const {
  useAddAdminWithFormDataMutation,
  useAdminsQuery,
  useAdminQuery,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
} = adminApi;
