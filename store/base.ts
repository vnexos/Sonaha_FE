import { BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mn0sImlhdCI6MTc0MDkyODA5NywiZXhwIjoxNzQxNTMyODk3fQ.Nxfc8oxKu11AD58hkYTxvn5LM6KWud1EaxDiruX80qdbcI5ijGK2IqwpuRwBXTATD_hyoFDqgN6axtDB5Y6OzOqoLxWiEZXNstXRPugTG4Gvi7ewLR8_3SJ9RH-woqHkG9Y8V5Ojouadjp2g4QFgOi9EsPWiuqrVsSs06tLp5jJg72-YgcsFYCoIo1IhYnK7VjG_4zkFuqHUcgEBtuoECAkx3hRuG_fun11d7mInPndkdc5ORUtGWmm0yurLyaB6xdaIgDoTG4AhHgXdKFZR41nhZUhuZw7DLDypIwNKrHV0JJtHIFqOp29cwMnX77svMjl1kOBov4BdaN3FFt6tVA`
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
});
