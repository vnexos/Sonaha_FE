import { BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTc0MTA2MjIyNSwiZXhwIjoxNzQxNjY3MDI1fQ.VYf1-ntWJR5nBi_kzZyEPboRJZkSmt0CZzD7v8nprO3TQi6AGsf2x6DePvPT0-QLnuU0S63F_gh9Zm31Nvme0lUeluu4fzQOSQ_DtaR00SWiZd0ltxMajLj9F5M9zP5k3KudaCwsioE_hAcJ0zzRulIteMgqpT_iDYgp2Q9Mf2pNez_poBpmxnY9qS6MmYPbDVTQ97XcQofmwl1dhV4Ys4NLXWe9gCZjvshejwo_W35oPmCLnevMdudkX3z0bjTUy_a6wqTNmaWuqIs0aUpNihiCHUQXDAaXnwWvM4e0iy9W0-Y9u5d2HDlJlJVWgu_n1rtZQalZR--F3wnYgYkKVA`
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
