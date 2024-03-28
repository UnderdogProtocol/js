import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMemo } from "react";
import { z } from "zod";

import * as types from "@underdog-protocol/types";

import { createUnderdogClient } from "../../lib";

const defaultUnderdogClient = createUnderdogClient({});

export const useUnderdogClient = () => {
  const underdogClient = useMemo(() => createUnderdogClient({}), []);
  return underdogClient;
};

export const useCollections = (
  request: types.GetCollectionsRequest,
  underdogClient = defaultUnderdogClient
) => {
  return useQuery<types.GetCollectionsResponse, AxiosError>(
    ["collections", request, underdogClient.network],
    () => underdogClient.getCollections(request),
    { enabled: !!request.query.ownerAddress }
  );
};

export const useCollection = (
  request: types.GetCollectionRequest,
  underdogClient = defaultUnderdogClient
) => {
  return useQuery<types.GetCollectionResponse, AxiosError>(
    ["collection", request, underdogClient.network],
    () => underdogClient.getCollection(request),
    { enabled: !!request.params.mintAddress }
  );
};

export const useNft = (request: types.GetNftRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftResponse, AxiosError>(
    ["nft", request, underdogClient.network],
    () => underdogClient.getNft(request),
    { retry: false }
  );

  return { nft: data, loading: isLoading, error, refetch };
};

export const useNftByMintAddress = (
  request: types.GetNftByMintAddressRequest,
  underdogClient = defaultUnderdogClient
) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftByMintAddressResponse, AxiosError>(
    ["nftByMintAddress", request, underdogClient.network],
    () => underdogClient.getNftByMintAddress(request),
    { retry: false }
  );

  return { nft: data, loading: isLoading, error, refetch };
};

export const useNfts = (request: types.GetNftsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetNftsResponse, AxiosError>(
    ["nfts", request, underdogClient.network],
    () => underdogClient.getNfts(request),
    { retry: false }
  );

  return { nfts: data, loading: isLoading, error, refetch };
};

export const useProject = (request: types.GetProjectRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetProjectResponse, AxiosError>(
    ["project", request, underdogClient.network],
    () => underdogClient.getProject(request),
    {
      retry: false,
      refetchInterval: (data) => (data?.status === "processing" || data?.status === "pending" ? 1000 : false),
    }
  );

  return { project: data, loading: isLoading, error, refetch };
};

export const useProjectStats = (
  request: types.GetProjectStatsRequest,
  underdogClient = defaultUnderdogClient
) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetProjectStatsResponse, AxiosError>(
    ["projectStats", request, underdogClient.network],
    () => underdogClient.getProjectStats(request),
    { retry: false }
  );

  return { projectStats: data, loading: isLoading, error, refetch };
};

export const useProjects = (request: types.GetProjectsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetProjectsResponse, AxiosError>(
    ["projects", request, underdogClient.network],
    () => underdogClient.getProjects(request),
    { retry: false }
  );

  return { projects: data, loading: isLoading, error, refetch };
};

export const useSearchProjects = (
  request: types.SearchProjectsRequest,
  underdogClient = defaultUnderdogClient
) => {
  const { data, refetch, isLoading, error } = useQuery<types.SearchNftsResponse, AxiosError>(
    ["searchNfts", request, underdogClient.network],
    () => underdogClient.searchProjects(request),
    { retry: false }
  );

  return { nfts: data, loading: isLoading, error, refetch };
};

export const useSearchNfts = (request: types.SearchNftsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.SearchNftsResponse, AxiosError>(
    ["searchNfts", request, underdogClient.network],
    () => underdogClient.searchNfts(request),
    { retry: false }
  );

  return { nfts: data, loading: isLoading, error, refetch };
};

export const useTransaction = (
  request: types.GetTransactionRequest,
  options?: {
    refetchInterval: UseQueryOptions<types.GetTransactionResponse | null, AxiosError>["refetchInterval"];
  },
  underdogClient = defaultUnderdogClient
) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetTransactionResponse | null, AxiosError>(
    ["transaction", request, underdogClient.network],
    () => (request.params.transactionId ? underdogClient.getTransaction(request) : null),
    { retry: false, ...options }
  );

  return { transaction: data, loading: isLoading, error, refetch };
};

export const useTransactions = (
  request: types.GetTransactionsRequest,
  underdogClient = defaultUnderdogClient
) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetTransactionsResponse, AxiosError>(
    ["transactions", request, underdogClient.network],
    () => underdogClient.getTransactions(request),
    { retry: false }
  );

  return { transactions: data, loading: isLoading, error, refetch };
};

export const useRequest = (request: types.GetRequestRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetRequestResponse, AxiosError>(
    ["request", request, underdogClient.network],
    () => underdogClient.getRequest(request),
    { retry: false }
  );

  return { request: data, loading: isLoading, error, refetch };
};

export const useRequests = (request: types.GetRequestsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetRequestsResponse, AxiosError>(
    ["requests", request, underdogClient.network],
    () => underdogClient.getRequests(request),
    { retry: false }
  );

  return { requests: data, loading: isLoading, error, refetch };
};

export const useOrg = (request: types.GetOrgRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetOrgResponse, AxiosError>(
    ["org", request, underdogClient.network],
    () => underdogClient.getOrg(request),
    { retry: false }
  );

  return { org: data, loading: isLoading, error, refetch };
};

export const useOrgs = (request: types.GetOrgsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetOrgsResponse, AxiosError>(
    ["orgs", request, underdogClient.network],
    () => underdogClient.getOrgs(request),
    { retry: false }
  );

  return { orgs: data, loading: isLoading, error, refetch };
};

export const useMembers = (request: types.GetMembersRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetMembersResponse, AxiosError>(
    ["members", request, underdogClient.network],
    () => underdogClient.getMembers(request),
    { retry: false }
  );

  return { members: data, loading: isLoading, error, refetch };
};

export const useWebhooks = (request: types.GetWebhooksRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetWebhooksResponse, AxiosError>(
    ["webhooks", request, underdogClient.network],
    () => underdogClient.getWebhooks(request),
    { retry: false }
  );

  return { webhooks: data, loading: isLoading, error, refetch };
};

export const useWebhook = (request: types.GetWebhookRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetWebhookResponse, AxiosError>(
    ["webhook", request, underdogClient.network],
    () => underdogClient.getWebhook(request),
    { retry: false }
  );

  return { webhook: data, loading: isLoading, error, refetch };
};

export const useKeys = (request: types.GetKeysRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetKeysResponse, AxiosError>(
    ["keys", request, underdogClient.network],
    () => underdogClient.getKeys(request),
    { retry: false }
  );

  return { keys: data, loading: isLoading, error, refetch };
};

export const useMe = (underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetMeResponse, AxiosError>(
    ["me", underdogClient.network],
    () => underdogClient.getMe(),
    {
      retry: false,
    }
  );

  return { me: data, loading: isLoading, error, refetch };
};

export const useDomains = (request: types.GetDomainsRequest, underdogClient = defaultUnderdogClient) => {
  const { data, refetch, isLoading, error } = useQuery<types.GetDomainsResponse, AxiosError>(
    ["domains", request, underdogClient.network],
    () => underdogClient.getDomains(request),
    {
      retry: false,
    }
  );

  return { domains: data, loading: isLoading, error, refetch };
};

export const useDomain = (request: types.GetDomainRequest, underdogClient = defaultUnderdogClient) => {
  return useQuery<types.GetDomainResponse, AxiosError>(
    ["domains", request, underdogClient.network],
    () => underdogClient.getDomain(request),
    {
      retry: false,
    }
  );
};

export const useSnapshots = (request: types.GetSnapshotsRequest, underdogClient = defaultUnderdogClient) => {
  return useQuery<types.GetSnapshotsResponse, AxiosError>(
    ["snapshots", request, underdogClient.network],
    () => underdogClient.getSnapshots(request),
    {
      retry: false,
    }
  );
};

export const useSnapshot = (request: types.GetSnapshotRequest, underdogClient = defaultUnderdogClient) => {
  return useQuery<types.GetSnapshotResponse, AxiosError>(
    ["snapshot", request, underdogClient.network],
    () => underdogClient.getSnapshot(request),
    {
      retry: false,
      enabled: z.string().uuid().safeParse(request.params.snapshotId).success,
      refetchInterval: (data) => (data?.url ? false : 2000),
    }
  );
};

export const useTrees = (request: types.GetTreesRequest, underdogClient = defaultUnderdogClient) => {
  return useQuery<types.GetTreesResponse, AxiosError>(
    ["trees", request, underdogClient.network],
    () => underdogClient.getTrees(request),
    { retry: false }
  );
};
