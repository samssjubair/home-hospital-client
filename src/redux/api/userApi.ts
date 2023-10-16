import { IDepartment, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const DEPARTMENT_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyInfo: build.query({
      query: (arg: Record<string, any>) => ({
        url: DEPARTMENT_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDepartment, meta: IMeta) => {
        return {
          departments: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),

   
  }),
});

export const {
  useGetMyInfoQuery,
} = userApi;
