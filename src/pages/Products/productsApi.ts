/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseApi } from "../../redux/api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (searchString) => ({
        url: "/product?" + searchString,
        method: "GET",
      }),
      providesTags: ["product"],
    }), 
    addProduct: builder.mutation({
      query: (data) => {
        const {_id, ...restData} = data;
        return {
          url: "/product/create-product",
          method: "POST",
          body: restData,
        };
      },
      invalidatesTags: ["product"],
    }),
    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/order/create-order",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["order","product"],
    }),
    salesOrder: builder.query({
      query: ({period, date}) => {
        let url = `/order/daily?${date?"startDate="+ date : ""}`;
        if(period === 'daily'){
            url = `/order/daily?${date?"startDate="+ date : ""}`;
        }else if (period === 'weekly') {
            url = `/order/weekly?${date?"startDate="+ date : ""}`;
        }else if (period === 'monthly') {
            url = `/order/monthly?${date?"startDate="+ date : ""}`;
        }else if(period === 'yearly'){
            url = `/order/yearly?${date?"startDate="+ date : ""}`;
        }

        return {
          url ,
          method: "GET",
        };
      },
      providesTags: ["order","product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/product/${data._id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),

    deleteProducts: builder.mutation({
      query: (ids: string[]) => ({
        url: "/product/delete-products",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["product"],
    }),
  }),
});


export const { useGetAllProductsQuery, useDeleteProductsMutation, useAddProductMutation, useUpdateProductMutation, useCreateOrderMutation, useSalesOrderQuery } = productsApi;