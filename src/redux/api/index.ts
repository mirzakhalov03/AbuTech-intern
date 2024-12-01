import { fetchBaseQuery, createApi, retry } from "@reduxjs/toolkit/query/react";


const baseQuery = async (args: any, api: any, extraOptions: any) => {
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
        const token: string | null = localStorage.getItem("token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    });

    const response = await rawBaseQuery(args, api, extraOptions);
  
    if (response.error) {
      const { status } = response.error;
      if (status === 401 || status === 403) {
        alert("Error 401")
      }
    }
  
    return response;


}

const fetchBaseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });
  
  export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQueryWithRetry,
    tagTypes: ["CONTRACTS"],
    endpoints: () => ({}),
});


