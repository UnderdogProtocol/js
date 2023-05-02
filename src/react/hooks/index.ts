import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

import { GetAllProjectsRequest, GetAllProjectsResponse, GetNftClaimLinkRequest, GetNftClaimLinkResponse, GetNftRequest, GetNftResponse, GetNftsRequest, GetNftsResponse, GetProjectRequest, GetProjectResponse, GetProjectStatsRequest, GetProjectStatsResponse, GetProjectsRequest, GetProjectsResponse, SearchNftsRequest, SearchNftsResponse } from "@underdog-protocol/types";

import { createUnderdogClient } from "../../lib";

const underdogClient = createUnderdogClient({});

export const useNft = (request: GetNftRequest) => {
  const { data, refetch, isLoading, error } = useQuery<GetNftResponse, AxiosError>(
    ["nft", request],
    () => underdogClient.getNft(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { nft: data, loading: isLoading, error, refetch };
};

export const useNfts = (request: GetNftsRequest) => {
  const { data, refetch, isLoading, error } = useQuery<GetNftsResponse, AxiosError>(
    ["nfts", request],
    () => underdogClient.getNfts(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { nfts: data, loading: isLoading, error, refetch };
};

export const useProject = (request: GetProjectRequest) => {
  const { data, refetch, isLoading, error } = useQuery<GetProjectResponse, AxiosError>(
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

export const useAllProjects = (request: GetAllProjectsRequest) => {
  const { data, refetch, isLoading, error } = useQuery<GetAllProjectsResponse, AxiosError>(
    ["allProjects", request],
    () => underdogClient.getAllProjects(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { allProjects: data, loading: isLoading, error, refetch };
};

export const useNftClaimLink = (request: GetNftClaimLinkRequest) => {
  const { data, refetch, isLoading, error } = useQuery<GetNftClaimLinkResponse, AxiosError>(
    ["nftClaimLink", request],
    () => underdogClient.getNftClaimLink(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { nftClaimLink: data, loading: isLoading, error, refetch };
};

export const useProjectStats = (request: GetProjectStatsRequest) => {
  const { data, refetch, isLoading, error } = useQuery<GetProjectStatsResponse, AxiosError>(
    ["projectStats", request],
    () => underdogClient.getProjectStats(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { projectStats: data, loading: isLoading, error, refetch };
};

export const useProjects = (request: GetProjectsRequest) => {
  const { data, refetch, isLoading, error } = useQuery<GetProjectsResponse, AxiosError>(
    ["projects", request],
    () => underdogClient.getProjects(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { projects: data, loading: isLoading, error, refetch };
};

export const useSearchNfts = (request: SearchNftsRequest) => {
  const { data, refetch, isLoading, error } = useQuery<SearchNftsResponse, AxiosError>(
    ["searchNfts", request],
    () => underdogClient.searchNfts(request),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [request, refetch]);

  return { nfts: data, loading: isLoading, error, refetch };
};