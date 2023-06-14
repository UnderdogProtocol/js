import * as types from "@underdog-protocol/types";
import axios from "axios";

export interface UnderdogClient {
  burnNft(request: types.BurnNftRequest): Promise<types.BurnNftResponse>;
  createNft(request: types.CreateNftRequest): Promise<types.CreateNftResponse>;
  batchNft(request: types.BatchNftRequest): Promise<void>;
  createSft(request: types.CreateSftRequest): Promise<types.CreateSftResponse>;
  batchSft(request: types.BatchSftRequest): Promise<void>;
  createProject(request: types.CreateProjectRequest): Promise<types.CreateProjectResponse>;
  getCollection(request: types.GetCollectionRequest): Promise<types.GetCollectionResponse>;
  getAllProjects(request: types.GetAllProjectsRequest): Promise<types.GetAllProjectsResponse>;
  getNftClaimLink(request: types.GetNftClaimLinkRequest): Promise<types.GetNftClaimLinkResponse>;
  getNft(request: types.GetNftRequest): Promise<types.GetNftResponse>;
  getNftByMintAddress(request: types.GetNftByMintAddressRequest): Promise<types.GetNftByMintAddressResponse>;
  getNfts(request: types.GetNftsRequest): Promise<types.GetNftsResponse>;
  getProject(request: types.GetProjectRequest): Promise<types.GetProjectResponse>;
  getProjectStats(request: types.GetProjectStatsRequest): Promise<types.GetProjectStatsResponse>;
  getProjects(request: types.GetProjectsRequest): Promise<types.GetProjectsResponse>;
  partialUpdateNft(request: types.PartialUpdateNftRequest): Promise<types.PartialUpdateNftResponse>;
  partialUpdateProject(request: types.PartialUpdateProjectRequest): Promise<types.PartialUpdateProjectResponse>;
  revokeNft(request: types.RevokeNftRequest): Promise<types.RevokeNftResponse>;
  searchNfts(request: types.SearchNftsRequest): Promise<types.SearchNftsResponse>;
  updateNft(request: types.UpdateNftRequest): Promise<types.UpdateNftResponse>;
  updateProjectName(request: types.UpdateProjectNameRequest): Promise<types.UpdateProjectNameResponse>;
  updateProject(request: types.UpdateProjectRequest): Promise<types.UpdateProjectResponse>;
  updateProjectSymbol(request: types.UpdateProjectSymbolRequest): Promise<types.UpdateProjectSymbolResponse>;
  getTransactions(request: types.GetTransactionsRequest): Promise<types.GetTransactionsResponse>;
  getTransaction(request: types.GetTransactionRequest): Promise<types.GetTransactionResponse>;
  getRequests(request: types.GetRequestsRequest): Promise<types.GetRequestsResponse>;
  getRequest(request: types.GetRequestRequest): Promise<types.GetRequestResponse>;
  getOrgs(request: types.GetOrgsRequest): Promise<types.GetOrgsResponse>;
  getOrg(request: types.GetOrgRequest): Promise<types.GetOrgResponse>;
  updateOrg(request: types.UpdateOrgRequest): Promise<types.UpdateOrgResponse>;
  createMember(request: types.CreateMemberRequest): Promise<types.CreateMemberResponse>;
  getMembers(request: types.GetMembersRequest): Promise<types.GetMembersResponse>;
  createWebhook(request: types.CreateWebhookRequest): Promise<types.CreateWebhookResponse>;
  getWebhooks(request: types.GetWebhooksRequest): Promise<types.GetWebhooksResponse>;
  getWebhook(request: types.GetWebhookRequest): Promise<types.GetWebhookResponse>;
  deleteWebhook(request: types.DeleteWebhookRequest): Promise<void>;
  createKey(request: types.CreateKeyRequest): Promise<types.CreateKeyResponse>;
  getKeys(request: types.GetKeysRequest): Promise<types.GetKeysResponse>;
  updateKey(request: types.UpdateKeyRequest): Promise<types.UpdateKeyResponse>;
  deleteKey(request: types.DeleteKeyRequest): Promise<void>;
}

export type UnderdogClientConfig = {
  // mainnet or devnet api
  network?: types.NetworkEnum;
  // overrides base url determined by network
  baseUrl?: string;
  // if not provided, will assume you have /api/underdog/[...underdog] set up
  apiKey?: string;
  // will pass the api key without appending Bearer in the header
  bearer?: boolean;
  // only v2 is supported
  version?: "v2";
}

export function createUnderdogClient({ network, apiKey, bearer = true, version = "v2", baseUrl: defaultBaseUrl }: UnderdogClientConfig): UnderdogClient {
  const baseUrl = defaultBaseUrl || (
    apiKey ? network === types.NetworkEnum.Mainnet ? types.MAINNET_API_URL : types.DEVNET_API_URL : "/api/underdog"
  );

  const instance = axios.create({
    baseURL: baseUrl,
    headers: apiKey ? {
      'Authorization': bearer ? `Bearer ${apiKey}` : apiKey,
    } : undefined,
  });

  const baseProjectPath = `/${version}/projects`;
  const typeToProjectCode = (type: types.ProjectParams["type"]) => type.compressed ? "c" : type.transferable ? "t" : "n";
  const projectPath = ({ type, projectId }: types.ProjectParams) => `${baseProjectPath}/${typeToProjectCode(type)}/${projectId}`;
  const nftPath = ({ nftId, ...projectParams }: types.NftParams) => `${projectPath(projectParams)}/nfts/${nftId}`;
  const nonTransferableNftPath = ({ nftId, projectId }: Pick<types.NftParams, "nftId" | "projectId">) => `${projectPath({ type: { transferable: false, compressed: false }, projectId })}/nfts/${nftId}`;

  const burnNft = async ({ params }: types.BurnNftRequest): Promise<types.BurnNftResponse> => {
    const response = await instance.post(`${nonTransferableNftPath(params)}/burn`);
    return response.data;
  };

  const createNft = async ({ params, body }: types.CreateNftRequest): Promise<types.CreateNftResponse> => {
    const response = await instance.post(`${projectPath(params)}/nfts`, body);
    return response.data;
  };

  const batchNft = async ({ params, body }: types.BatchNftRequest): Promise<void> => {
    const response = await instance.post(`${projectPath(params)}/nfts/batch`, body);
    return response.data;
  };

  const createSft = async ({ params, body }: types.CreateSftRequest): Promise<types.CreateSftResponse> => {
    const response = await instance.post(`${projectPath(params)}/sfts`, body);
    return response.data;
  }

  const batchSft = async ({ params, body }: types.BatchSftRequest): Promise<void> => {
    const response = await instance.post(`${projectPath(params)}/sfts/batch`, body);
    return response.data;
  };

  const createProject = async ({ body }: types.CreateProjectRequest): Promise<types.CreateProjectResponse> => {
    const response = await instance.post(baseProjectPath, body);
    return response.data;
  };

  const getAllProjects = async ({ query }: types.GetAllProjectsRequest): Promise<types.GetAllProjectsResponse> => {
    const response = await instance.get(baseProjectPath, { params: query });
    return response.data;
  };

  const getCollection = async ({ params }: types.GetCollectionRequest): Promise<types.GetCollectionResponse> => {
    const response = await instance.get(`/${version}/collections/${params.mintAddress}`);
    return response.data;
  };

  const getNftClaimLink = async ({ params }: types.GetNftClaimLinkRequest): Promise<types.GetNftClaimLinkResponse> => {
    const response = await instance.get(`${nonTransferableNftPath(params)}/claim`);
    return response.data;
  };

  const getNft = async ({ params }: types.GetNftRequest): Promise<types.GetNftResponse> => {
    const response = await instance.get(nftPath(params));
    return response.data;
  };

  const getNftByMintAddress = async ({ params }: types.GetNftByMintAddressRequest): Promise<types.GetNftByMintAddressResponse> => {
    const response = await instance.get(`/${version}/nfts/${params.mintAddress}`);
    return response.data;
  };

  const getNfts = async ({ params, query }: types.GetNftsRequest): Promise<types.GetNftsResponse> => {
    const response = await instance.get(`${projectPath(params)}/nfts`, { params: query });
    return response.data;
  };

  const getProject = async ({ params, query }: types.GetProjectRequest): Promise<types.GetProjectResponse> => {
    const response = await instance.get(projectPath(params), { params: query });
    return response.data;
  };

  const getProjectStats = async ({ params }: types.GetProjectStatsRequest): Promise<types.GetProjectStatsResponse> => {
    const response = await instance.get(`${projectPath(params)}/stats`);
    return response.data;
  };

  const getProjects = async ({ params, query }: types.GetProjectsRequest): Promise<types.GetProjectsResponse> => {
    const response = await instance.get(`${baseProjectPath}/${typeToProjectCode(params.type)}`, { params: query });
    return response.data;
  };

  const partialUpdateNft = async ({ body, params }: types.PartialUpdateNftRequest): Promise<types.PartialUpdateNftResponse> => {
    const response = await instance.patch(nftPath(params), body);
    return response.data;
  };

  const partialUpdateProject = async ({ params, body }: types.PartialUpdateProjectRequest): Promise<types.PartialUpdateProjectResponse> => {
    const response = await instance.patch(projectPath(params), body);
    return response.data;
  };

  const revokeNft = async ({ params }: types.RevokeNftRequest): Promise<types.RevokeNftResponse> => {
    const response = await instance.post(`${nonTransferableNftPath(params)}/revoke`);
    return response.data;
  }

  const searchNfts = async ({ query, params }: types.SearchNftsRequest): Promise<types.SearchNftsResponse> => {
    const response = await instance.get(`${projectPath(params)}/nfts/search`, { params: query });
    return response.data;
  };

  const updateNft = async ({ params, body }: types.UpdateNftRequest): Promise<types.UpdateNftResponse> => {
    const response = await instance.put(nftPath(params), body);
    return response.data;
  };

  const updateProjectName = async ({ params, body }: types.UpdateProjectNameRequest): Promise<types.UpdateProjectNameResponse> => {
    const response = await instance.put(`${projectPath(params)}/name`, body);
    return response.data;
  };

  const updateProject = async ({ body, params }: types.UpdateProjectRequest): Promise<types.UpdateProjectResponse> => {
    const response = await instance.put(projectPath(params), body);
    return response.data;
  };

  const updateProjectSymbol = async ({ params, body }: types.UpdateProjectSymbolRequest): Promise<types.UpdateProjectSymbolResponse> => {
    const response = await instance.put(`${projectPath(params)}/symbol`, body);
    return response.data;
  };

  const getTransactions = async ({ query }: types.GetTransactionsRequest): Promise<types.GetTransactionsResponse> => {
    const response = await instance.get(`/${version}/transactions`, { params: query });
    return response.data;
  }

  const getTransaction = async ({ params }: types.GetTransactionRequest): Promise<types.GetTransactionResponse> => {
    const response = await instance.get(`/${version}/transactions/${params.transactionId}`);
    return response.data;
  }

  const getRequest = async ({ params }: types.GetRequestRequest): Promise<types.GetRequestResponse> => {
    const response = await instance.get(`/${version}/requests/${params.requestId}`);
    return response.data;
  }

  const getRequests = async ({ query }: types.GetRequestsRequest): Promise<types.GetRequestsResponse> => {
    const response = await instance.get(`/${version}/requests`, { params: query });
    return response.data;
  }

  const getOrgs = async ({ query }: types.GetOrgsRequest): Promise<types.GetOrgsResponse> => {
    const response = await instance.get(`/${version}/orgs`, { params: query });
    return response.data;
  }

  const getOrg = async ({ params }: types.GetOrgRequest): Promise<types.GetOrgResponse> => {
    const response = await instance.get(`/${version}/orgs/${params.orgId}`);
    return response.data;
  }

  const updateOrg = async ({ params, body }: types.UpdateOrgRequest): Promise<types.UpdateOrgResponse> => {
    const response = await instance.put(`/${version}/orgs/${params.orgId}`, body);
    return response.data;
  }

  const getMembers = async ({ params, query }: types.GetMembersRequest): Promise<types.GetMembersResponse> => {
    const response = await instance.get(`/${version}/orgs/${params.orgId}/members`, { params: query });
    return response.data;
  }

  const createMember = async ({ params, body }: types.CreateMemberRequest): Promise<types.CreateMemberResponse> => {
    const response = await instance.post(`/${version}/orgs/${params.orgId}/members`, body);
    return response.data;
  }

  const createWebhook = async ({ body }: types.CreateWebhookRequest): Promise<types.CreateWebhookResponse> => {
    const response = await instance.post(`/${version}/webhooks`, body);
    return response.data;
  }

  const getWebhooks = async ({ query }: types.GetWebhooksRequest): Promise<types.GetWebhooksResponse> => {
    const response = await instance.get(`/${version}/webhooks`, { params: query });
    return response.data;
  }

  const getWebhook = async ({ params }: types.GetWebhookRequest): Promise<types.GetWebhookResponse> => {
    const response = await instance.get(`/${version}/webhooks/${params.webhookId}`);
    return response.data;
  }

  const deleteWebhook = async ({ params }: types.DeleteWebhookRequest): Promise<void> => {
    await instance.delete(`/${version}/webhooks/${params.webhookId}`);
  }

  const createKey = async ({ params }: types.CreateKeyRequest): Promise<types.CreateKeyResponse> => {
    const response = await instance.post(`/${version}/orgs/${params.orgId}/keys`);
    return response.data;
  }

  const getKeys = async ({ query, params }: types.GetKeysRequest): Promise<types.GetKeysResponse> => {
    const response = await instance.get(`/${version}/orgs/${params.orgId}/keys`, { params: query });
    return response.data;
  }

  const updateKey = async ({ params, body }: types.UpdateKeyRequest): Promise<types.UpdateKeyResponse> => {
    const response = await instance.put(`/${version}/orgs/${params.orgId}/keys/${params.prefix}`, body);
    return response.data;
  }

  const deleteKey = async ({ params }: types.DeleteKeyRequest): Promise<void> => {
    await instance.delete(`/${version}/orgs/${params.orgId}/keys/${params.prefix}`);
  }

  return {
    burnNft,
    batchNft,
    batchSft,
    createNft,
    createSft,
    createProject,
    getAllProjects,
    getCollection,
    getNftClaimLink,
    getNft,
    getNftByMintAddress,
    getNfts,
    getProject,
    getProjectStats,
    getProjects,
    partialUpdateNft,
    partialUpdateProject,
    revokeNft,
    searchNfts,
    updateNft,
    updateProjectName,
    updateProject,
    updateProjectSymbol,
    getTransactions,
    getTransaction,
    getRequest,
    getRequests,
    getOrgs,
    getOrg,
    updateOrg,
    getMembers,
    createMember,
    createWebhook,
    getWebhooks,
    getWebhook,
    deleteWebhook,
    createKey,
    getKeys,
    updateKey,
    deleteKey,
  }
}
