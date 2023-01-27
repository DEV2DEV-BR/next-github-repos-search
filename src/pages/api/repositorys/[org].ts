import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any[];
};

export default async function getRepositories(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { org } = req.query;

  const response = await fetch(`https://api.github.com/orgs/${org}/repos`, {
    headers: {
      Authorization: "Bearer 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",
    },
  });
  const data = await response.json();

  res.status(200).json({ data: data });
}
