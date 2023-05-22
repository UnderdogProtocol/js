import * as types from "@underdog-protocol/types";
import axios from "axios";

export interface UnderdogClient {
  burnNft(request: types.BurnNftRequest): Promise<types.BurnNftResponse>;
  createNft(request: types.CreateNftRequest): Promise<types.CreateNftResponse>;
  createProject(request: types.CreateProjectRequest): Promise<types.CreateProjectResponse>;
  getAllProjects(request: types.GetAllProjectsRequest): Promise<types.GetAllProjectsResponse>;
  getNftClaimLink(request: types.GetNftClaimLinkRequest): Promise<types.GetNftClaimLinkResponse>;
  getNft(request: types.GetNftRequest): Promise<types.GetNftResponse>;
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

  const createProject = async ({ body }: types.CreateProjectRequest): Promise<types.CreateProjectResponse> => {
    const response = await instance.post(baseProjectPath, body);
    return response.data;
  };

  const getAllProjects = async ({ query }: types.GetAllProjectsRequest): Promise<types.GetAllProjectsResponse> => {
    const response = await instance.get(baseProjectPath, { params: query });
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
    const response = await instance.get(`${projectPath(params)}/search`, { params: query });
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

  return {
    burnNft,
    createNft,
    createProject,
    getAllProjects,
    getNftClaimLink,
    getNft,
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
  }
}
