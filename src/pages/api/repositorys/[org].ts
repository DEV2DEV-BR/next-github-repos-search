import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any[];
};

export default async function getRepositories(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { org } = req.query;

  const response = await fetch(`https://api.github.com/orgs/${org}/repos`);
  const data = await response.json();

  res.status(200).json({ data: data });
}
