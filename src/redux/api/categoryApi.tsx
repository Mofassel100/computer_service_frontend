import { IMeta, IUser } from "@/types/common";
import { baseApi } from "./baseApi";
import { taqTypes } from "../slice/taq-types";
const CATEGORY_URL = "/category";
export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCategoryWithFormData: build.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [taqTypes.category],
    }),

    categorys: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CATEGORY_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IUser[], meta: IMeta) => {
        return {
          categorys: response,
          meta,
        };
      },
      providesTags: [taqTypes.category],
    }),

    // get single department by id
    category: build.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
      providesTags: [taqTypes.category],
    }),

    // update single department by id
    updateCategory: build.mutation({
      query: (data) => ({
        url: `/profile/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [taqTypes.category],
    }),

    // delete single department by id
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [taqTypes.category],
    }),
  }),
});

export const {
  useAddCategoryWithFormDataMutation,
  useCategoryQuery,
  useCategorysQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
