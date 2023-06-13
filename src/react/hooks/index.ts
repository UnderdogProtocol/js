import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import * as types from "@underdog-protocol/types";

import { createUnderdogClient } from "../../lib";

const defaultUnderdogClient = createUnderdogClient({});

export const useCollection = (request: types.GetCollectionRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetCollectionResponse, AxiosError>(
    ["collection", request],
    () => underdogClient.getCollection(request),
    { retry: false }
  );

  return { collection: data, loading: isLoading, error, refetch };
}

export const useNft = (request: types.GetNftRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftResponse, AxiosError>(
    ["nft", request],
    () => underdogClient.getNft(request),
    { retry: false }
  );

  return { nft: data, loading: isLoading, error, refetch };
};

export const useNfts = (request: types.GetNftsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftsResponse, AxiosError>(
    ["nfts", request],
    () => underdogClient.getNfts(request),
    { retry: false }
  );

  return { nfts: data, loading: isLoading, error, refetch };
};

export const useProject = (request: types.GetProjectRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetProjectResponse, AxiosError>(
    ["project", request],
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
    ["allProjects", request],
    () => underdogClient.getAllProjects(request),
    { retry: false }
  );

  return { allProjects: data, loading: isLoading, error, refetch };
};

export const useNftClaimLink = (request: types.GetNftClaimLinkRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftClaimLinkResponse, AxiosError>(
    ["nftClaimLink", request],
    () => underdogClient.getNftClaimLink(request),
    { retry: false }
  );

  return { nftClaimLink: data, loading: isLoading, error, refetch };
};

export const useProjectStats = (request: types.GetProjectStatsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetProjectStatsResponse, AxiosError>(
    ["projectStats", request],
    () => underdogClient.getProjectStats(request),
    { retry: false }
  );

  return { projectStats: data, loading: isLoading, error, refetch };
};

export const useProjects = (request: types.GetProjectsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetProjectsResponse, AxiosError>(
    ["projects", request],
    () => underdogClient.getProjects(request),
    { retry: false }
  );

  return { projects: data, loading: isLoading, error, refetch };
};

export const useSearchNfts = (request: types.SearchNftsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.SearchNftsResponse, AxiosError>(
    ["searchNfts", request],
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
    ["transaction", JSON.stringify(request)],
    () => request.params.transactionId ? underdogClient.getTransaction(request) : null,
    { retry: false, ...options }
  );

  return { transaction: data, loading: isLoading, error, refetch };
}