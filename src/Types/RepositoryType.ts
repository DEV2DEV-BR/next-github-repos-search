export type RepositoryType = {
  id: number;
  name: string;
  language: string;
  visibility: "private" | "public";
  stargazers_count: number;
};
