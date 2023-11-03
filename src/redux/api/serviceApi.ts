import { IMeta, IService } from "@/types/common";
import { baseApi } from "./baseApi";
import { taqTypes } from "../slice/taq-types";
const Service_URL = "/service";
export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addServiceWithFormData: build.mutation({
      query: (data) => ({
        url: "/service",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [taqTypes.service],
    }),
    allServiceGetDB: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${Service_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          allServiceDB: response,
          meta,
        };
      },
      providesTags: [taqTypes.service],
    }),

    services: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${Service_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [taqTypes.service],
    }),
    AdminServices: build.query({
      query: (id) => {
        return {
          url: `${Service_URL}/admin/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: any, meta: IMeta) => {
        return {
          adminServices: response,
          meta,
        };
      },
      providesTags: [taqTypes.service],
    }),

    // get single department by id
    service: build.query({
      query: (id) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
      providesTags: [taqTypes.service],
    }),
    allService: build.query({
      query: (id) => {
        return {
          url: `${Service_URL}/all/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          allservice: response,
          meta,
        };
      },
      providesTags: [taqTypes.service],
    }),

    // update single department by id
    updateService: build.mutation({
      query: (data) => ({
        url: `/service/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [taqTypes.service],
    }),

    // delete single department by id
    deleteService: build.mutation({
      query: (id) => ({
        url: `/service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [taqTypes.service],
    }),
  }),
});

export const {
  useAddServiceWithFormDataMutation,
  useDeleteServiceMutation,
  useServiceQuery,
  useServicesQuery,
  useUpdateServiceMutation,
  useAdminServicesQuery,
  useAllServiceQuery,
  useAllServiceGetDBQuery,
} = serviceApi;
