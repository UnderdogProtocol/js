import { QueryObserverOptions, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

import * as types from "@underdog-protocol/types";

import { createUnderdogClient } from "../../lib";

const underdogClient = createUnderdogClient({});

type Options = Omit<UseQueryOptions, 'queryKey' | 'queryFn' | 'initialData'> & { initialData?: () => undefined } 

export const useNft = (request: types.GetNftRequest) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftResponse, AxiosError>(
    ["nft", request],
    () => underdogClient.getNft(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { nft: data, loading: isLoading, error, refetch };
};

export const useNfts = (request: types.GetNftsRequest) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftsResponse, AxiosError>(
    ["nfts", request],
    () => underdogClient.getNfts(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { nfts: data, loading: isLoading, error, refetch };
};

export const useProject = (request: types.GetProjectRequest) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetProjectResponse, AxiosError>(
    ["project", request],
    () => underdogClient.getProject(request),
    {
      retry: false,
      refetchInterval: (data) => (data?.status === "processing" ? 1000 : false),
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch, request]);

  return { project: data, loading: isLoading, error, refetch };
};

export const useAllProjects = (request: types.GetAllProjectsRequest) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetAllProjectsResponse, AxiosError>(
    ["allProjects", request],
    () => underdogClient.getAllProjects(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { allProjects: data, loading: isLoading, error, refetch };
};

export const useNftClaimLink = (request: types.GetNftClaimLinkRequest) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftClaimLinkResponse, AxiosError>(
    ["nftClaimLink", request],
    () => underdogClient.getNftClaimLink(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { nftClaimLink: data, loading: isLoading, error, refetch };
};

export const useProjectStats = (request: types.GetProjectStatsRequest) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetProjectStatsResponse, AxiosError>(
    ["projectStats", request],
    () => underdogClient.getProjectStats(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { projectStats: data, loading: isLoading, error, refetch };
};

export const useProjects = (request: types.GetProjectsRequest) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetProjectsResponse, AxiosError>(
    ["projects", request],
    () => underdogClient.getProjects(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { projects: data, loading: isLoading, error, refetch };
};

export const useSearchNfts = (request: types.SearchNftsRequest) => {
  const { data, refetch, isLoading, error } = useQuery<types.SearchNftsResponse, AxiosError>(
    ["searchNfts", request],
    () => underdogClient.searchNfts(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { nfts: data, loading: isLoading, error, refetch };
};

export const useTransaction = (
  request: types.GetTransactionRequest, 
  options?: { refetchInterval: UseQueryOptions<types.GetTransactionResponse, AxiosError>["refetchInterval"] }
) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetTransactionResponse, AxiosError>(
    ["transaction", request],
    () => underdogClient.getTransaction(request),
    { retry: false, ...options }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { transaction: data, loading: isLoading, error, refetch };
}