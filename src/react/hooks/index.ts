import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import * as types from "@underdog-protocol/types";

import { createUnderdogClient } from "../../lib";

const defaultUnderdogClient = createUnderdogClient({});

export const useCollection = (request: types.GetCollectionRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetCollectionResponse, AxiosError>(
    ["collection", request, underdogClient],
    () => underdogClient.getCollection(request),
    { retry: false }
  );

  return { collection: data, loading: isLoading, error, refetch };
}

export const useNft = (request: types.GetNftRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftResponse, AxiosError>(
    ["nft", request, underdogClient],
    () => underdogClient.getNft(request),
    { retry: false }
  );

  return { nft: data, loading: isLoading, error, refetch };
};

export const useNftByMintAddress = (request: types.GetNftByMintAddressRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftByMintAddressResponse, AxiosError>(
    ["nftByMintAddress", request, underdogClient],
    () => underdogClient.getNftByMintAddress(request),
    { retry: false }
  );

  return { nft: data, loading: isLoading, error, refetch };
}

export const useNfts = (request: types.GetNftsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftsResponse, AxiosError>(
    ["nfts", request, underdogClient],
    () => underdogClient.getNfts(request),
    { retry: false }
  );

  return { nfts: data, loading: isLoading, error, refetch };
};

export const useProject = (request: types.GetProjectRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetProjectResponse, AxiosError>(
    ["project", request, underdogClient],
    () => underdogClient.getProject(request),
    {
      retry: false,
      refetchInterval: (data) => (data?.status === "processing" || data?.status === "pending" ? 1000 : false),
    }
  );

  return { project: data, loading: isLoading, error, refetch };
};

export const useAllProjects = (request: types.GetAllProjectsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetAllProjectsResponse, AxiosError>(
    ["allProjects", request, underdogClient],
    () => underdogClient.getAllProjects(request),
    { retry: false }
  );

  return { allProjects: data, loading: isLoading, error, refetch };
};

export const useNftClaimLink = (request: types.GetNftClaimLinkRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftClaimLinkResponse, AxiosError>(
    ["nftClaimLink", request, underdogClient],
    () => underdogClient.getNftClaimLink(request),
    { retry: false }
  );

  return { nftClaimLink: data, loading: isLoading, error, refetch };
};

export const useProjectStats = (request: types.GetProjectStatsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetProjectStatsResponse, AxiosError>(
    ["projectStats", request, underdogClient],
    () => underdogClient.getProjectStats(request),
    { retry: false }
  );

  return { projectStats: data, loading: isLoading, error, refetch };
};

export const useProjects = (request: types.GetProjectsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetProjectsResponse, AxiosError>(
    ["projects", request, underdogClient],
    () => underdogClient.getProjects(request),
    { retry: false }
  );

  return { projects: data, loading: isLoading, error, refetch };
};

export const useSearchNfts = (request: types.SearchNftsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.SearchNftsResponse, AxiosError>(
    ["searchNfts", request, underdogClient],
    () => underdogClient.searchNfts(request),
    { retry: false }
  );

  return { nfts: data, loading: isLoading, error, refetch };
};

export const useTransaction = (
  request: types.GetTransactionRequest, 
  options?: { refetchInterval: UseQueryOptions<types.GetTransactionResponse | null, AxiosError>["refetchInterval"] },
  underdogClient = defaultUnderdogClient
) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetTransactionResponse | null, AxiosError>(
    ["transaction", request, underdogClient],
    () => request.params.transactionId ? underdogClient.getTransaction(request) : null,
    { retry: false, ...options }
  );

  return { transaction: data, loading: isLoading, error, refetch };
}

export const useTransactions = (request: types.GetTransactionsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetTransactionsResponse, AxiosError>(
    ["transactions", request, underdogClient],
    () => underdogClient.getTransactions(request),
    { retry: false }
  );

  return { transactions: data, loading: isLoading, error, refetch };
}

export const useRequest = (request: types.GetRequestRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetRequestResponse, AxiosError>(
    ["request", request, underdogClient],
    () => underdogClient.getRequest(request),
    { retry: false }
  );

  return { request: data, loading: isLoading, error, refetch };
};

export const useRequests = (request: types.GetRequestsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetRequestsResponse, AxiosError>(
    ["requests", request, underdogClient],
    () => underdogClient.getRequests(request),
    { retry: false }
  );

  return { requests: data, loading: isLoading, error, refetch };
}

export const useOrg = (request: types.GetOrgRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetOrgResponse, AxiosError>(
    ["org", request, underdogClient],
    () => underdogClient.getOrg(request),
    { retry: false }
  );

  return { org: data, loading: isLoading, error, refetch };
}

export const useOrgs = (request: types.GetOrgsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetOrgsResponse, AxiosError>(
    ["orgs", request, underdogClient],
    () => underdogClient.getOrgs(request),
    { retry: false }
  );

  return { orgs: data, loading: isLoading, error, refetch };
}

export const useMembers = (request: types.GetMembersRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetMembersResponse, AxiosError>(
    ["members", request, underdogClient],
    () => underdogClient.getMembers(request),
    { retry: false }
  );

  return { members: data, loading: isLoading, error, refetch };
}