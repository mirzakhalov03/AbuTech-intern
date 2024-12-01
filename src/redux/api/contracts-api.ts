import { api } from "./index";

const contractsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getContracts: build.query<any, any>({
      query: () => ({
        url: "contracts/all",
      }),
      providesTags: ["CONTRACTS"],
    }),
    addContracts: build.mutation<any, any>({
      query: (contractData) => ({
        url: "contracts/create",
        method: "POST",
        body: contractData, 
      }),
    }),
    getCourses: build.query<any, any>({
      query: () => ({
        url: "/courses",
      }),
    }),
    addFile: build.mutation<any, any>({
        query: (fileAtt) => ({
            url: "upload/contract/attachment",
            method: "POST",
            body: fileAtt
        })
    }),
    getContractById: build.query<any, any>({
      query: (id) => ({
        url: `contracts/${id}`,
      }),
    })
  }),
});

export const { useGetContractsQuery, useAddContractsMutation, useGetCoursesQuery, useAddFileMutation , useGetContractByIdQuery} = contractsApi;
