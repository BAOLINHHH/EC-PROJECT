import { apiSlice } from "./apiSlice";
const CARTS_URL = "http://localhost:4000/api/cart";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: `${CARTS_URL}`,
      }),
      keepUnusedDataFor: 5, // Giữ dữ liệu trong 5 giây trước khi xóa khỏi cache
    }),
    addToCart: builder.mutation({
      query: (cartItem) => ({
        url: `${CARTS_URL}`,
        method: "POST",
        body: { ...cartItem },
      }),
    }),
    updateCart: builder.mutation({
      query: (cartItem) => ({
        url: `${CARTS_URL}/${cartItem.id}`,
        method: "PUT",
        body: { ...cartItem },
      }),
    }),
    removeFromCart: builder.mutation({
      query: (cartItemId) => ({
        url: `${CARTS_URL}/${cartItemId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = cartApiSlice;
