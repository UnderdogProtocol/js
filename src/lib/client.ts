import { BurnNftRequest, BurnNftResponse, CreateNftRequest, CreateNftResponse, CreateProjectRequest, CreateProjectResponse, DEVNET_API_URL, GetAllProjectsRequest, GetAllProjectsResponse, GetNftClaimLinkRequest, GetNftClaimLinkResponse, GetNftRequest, GetNftResponse, GetNftsRequest, GetNftsResponse, GetProjectRequest, GetProjectResponse, GetProjectStatsRequest, GetProjectStatsResponse, GetProjectsRequest, GetProjectsResponse, MAINNET_API_URL, NetworkEnum, NftParams, PartialUpdateNftRequest, PartialUpdateNftResponse, PartialUpdateProjectRequest, PartialUpdateProjectResponse, ProjectParams, RevokeNftRequest, RevokeNftResponse, SearchNftsRequest, SearchNftsResponse, UpdateNftRequest, UpdateNftResponse, UpdateProjectNameRequest, UpdateProjectNameResponse, UpdateProjectRequest, UpdateProjectResponse, UpdateProjectSymbolRequest, UpdateProjectSymbolResponse, nftParamsSchema } from "@underdog-protocol/types";
import axios from "axios";

export interface UnderdogClient {
  burnNft(request: BurnNftRequest): Promise<BurnNftResponse>;
  createNft(request: CreateNftRequest): Promise<CreateNftResponse>;
  createProject(request: CreateProjectRequest): Promise<CreateProjectResponse>;
  getAllProjects(request: GetAllProjectsRequest): Promise<GetAllProjectsResponse>;
  getNftClaimLink(request: GetNftClaimLinkRequest): Promise<GetNftClaimLinkResponse>;
  getNft(request: GetNftRequest): Promise<GetNftResponse>;
  getNfts(request: GetNftsRequest): Promise<GetNftsResponse>;
  getProject(request: GetProjectRequest): Promise<GetProjectResponse>;
  getProjectStats(request: GetProjectStatsRequest): Promise<GetProjectStatsResponse>;
  getProjects(request: GetProjectsRequest): Promise<GetProjectsResponse>;
  partialUpdateNft(request: PartialUpdateNftRequest): Promise<PartialUpdateNftResponse>;
  partialUpdateProject(request: PartialUpdateProjectRequest): Promise<PartialUpdateProjectResponse>;
  revokeNft(request: RevokeNftRequest): Promise<RevokeNftResponse>;
  searchNfts(request: SearchNftsRequest): Promise<SearchNftsResponse>;
  updateNft(request: UpdateNftRequest): Promise<UpdateNftResponse>;
  updateProjectName(request: UpdateProjectNameRequest): Promise<UpdateProjectNameResponse>;
  updateProject(request: UpdateProjectRequest): Promise<UpdateProjectResponse>;
  updateProjectSymbol(request: UpdateProjectSymbolRequest): Promise<UpdateProjectSymbolResponse>;
}

export type UnderdogClientConfig = {
  // mainnet or devnet api
  network?: NetworkEnum;
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
  const baseUrl = defaultBaseUrl ||
    apiKey ? network === NetworkEnum.Mainnet ? MAINNET_API_URL : DEVNET_API_URL : "/api/underdog";

  const instance = axios.create({
    baseURL: baseUrl,
    headers: apiKey ? {
      'Authorization': bearer ? `Bearer ${apiKey}` : apiKey,
    } : undefined,
  });

  const baseProjectPath = `/${version}/projects`;
  const typeToProjectCode = (type: ProjectParams["type"]) => type.compressed ? "c" : type.transferable ? "t" : "n";
  const projectPath = ({ type, projectId }: ProjectParams) => `${baseProjectPath}/${typeToProjectCode(type)}/${projectId}`;
  const nftPath = ({ nftId, ...projectParams }: NftParams) => `${projectPath(projectParams)}/nfts/${nftId}`;
  const nonTransferableNftPath = ({ nftId, projectId }: Pick<NftParams, "nftId" | "projectId">) => `${projectPath({ type: { transferable: false, compressed: false }, projectId })}/nfts/${nftId}`;

  const burnNft = async ({ params }: BurnNftRequest): Promise<BurnNftResponse> => {
    const response = await instance.post(`${nonTransferableNftPath(params)}/burn`);
    return response.data;
  };

  const createNft = async ({ params, body }: CreateNftRequest): Promise<CreateNftResponse> => {
    const response = await instance.post(`${projectPath(params)}/nfts`, body);
    return response.data;
  };

  const createProject = async ({ body }: CreateProjectRequest): Promise<CreateProjectResponse> => {
    const response = await instance.post(baseProjectPath, body);
    return response.data;
  };

  const getAllProjects = async ({ query }: GetAllProjectsRequest): Promise<GetAllProjectsResponse> => {
    const response = await instance.get(baseProjectPath, { params: query });
    return response.data;
  };

  const getNftClaimLink = async ({ params }: GetNftClaimLinkRequest): Promise<GetNftClaimLinkResponse> => {
    const response = await instance.get(`${nonTransferableNftPath(params)}/claim`);
    return response.data;
  };

  const getNft = async ({ params }: GetNftRequest): Promise<GetNftResponse> => {
    const response = await instance.get(nftPath(params));
    return response.data;
  };

  const getNfts = async ({ params, query }: GetNftsRequest): Promise<GetNftsResponse> => {
    const response = await instance.get(`${projectPath(params)}/nfts`, { params: query });
    return response.data;
  };

  const getProject = async ({ params, query }: GetProjectRequest): Promise<GetProjectResponse> => {
    const response = await instance.get(projectPath(params), { params: query });
    return response.data;
  };

  const getProjectStats = async ({ params }: GetProjectStatsRequest): Promise<GetProjectStatsResponse> => {
    const response = await instance.get(`${projectPath(params)}/stats`);
    return response.data;
  };

  const getProjects = async ({ params, query }: GetProjectsRequest): Promise<GetProjectsResponse> => {
    const response = await instance.get(`${baseProjectPath}/${typeToProjectCode(params.type)}`, { params: query });
    return response.data;
  };

  const partialUpdateNft = async ({ body, params }: PartialUpdateNftRequest): Promise<PartialUpdateNftResponse> => {
    const response = await instance.patch(nftPath(params), body);
    return response.data;
  };

  const partialUpdateProject = async ({ params, body }: PartialUpdateProjectRequest): Promise<PartialUpdateProjectResponse> => {
    const response = await instance.patch(projectPath(params), body);
    return response.data;
  };

  const revokeNft = async ({ params }: RevokeNftRequest): Promise<RevokeNftResponse> => {
    const response = await instance.post(`${nonTransferableNftPath(params)}/revoke`);
    return response.data;
  }

  const searchNfts = async ({ query, params }: SearchNftsRequest): Promise<SearchNftsResponse> => {
    const response = await instance.get(`${projectPath(params)}/search`, { params: query });
    return response.data;
  };

  const updateNft = async ({ params, body }: UpdateNftRequest): Promise<UpdateNftResponse> => {
    const response = await instance.put(nftPath(params), body);
    return response.data;
  };

  const updateProjectName = async ({ params, body }: UpdateProjectNameRequest): Promise<UpdateProjectNameResponse> => {
    const response = await instance.put(`${projectPath(params)}/name`, body);
    return response.data;
  };

  const updateProject = async ({ body, params }: UpdateProjectRequest): Promise<UpdateProjectResponse> => {
    const response = await instance.put(projectPath(params), body);
    return response.data;
  };

  const updateProjectSymbol = async ({ params, body }: UpdateProjectSymbolRequest): Promise<UpdateProjectSymbolResponse> => {
    const response = await instance.put(`${projectPath(params)}/symbol`, body);
    return response.data;
  };

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
  }
}
