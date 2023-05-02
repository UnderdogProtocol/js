import { networkToUnderdogApiEndpoints, NetworkEnum } from "@underdog-protocol/types";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export interface UnderdogOptions {
  apiKey: string;
  network: NetworkEnum;
  bearer?: boolean;
}

const NextUnderdogApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  { bearer = true, apiKey, network }: UnderdogOptions
) => {
  const { underdog, ...query } = req.query;
  const apiUrl = networkToUnderdogApiEndpoints[network];

  const url = `${apiUrl}/${path.join(...(underdog as string[]))}?${new URLSearchParams(
    query as Record<string, string>
  ).toString()}`;

  const response = await axios({
    method: req.method,
    url,
    headers: { Authorization: bearer ? `Bearer ${apiKey}` : apiKey },
    data: req.body,
  });

  res.status(response.status).json(response.data);
};

export function NextUnderdog(options: UnderdogOptions) {
  return async (req: NextApiRequest, res: NextApiResponse) => NextUnderdogApiHandler(req, res, options);
}
