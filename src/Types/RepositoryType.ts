export type RepositoryType = {
  id: number;
  name: string;
  language: string;
  visibility: "private" | "public";
  stargazers_count: number;
  html_url: string;
  default_branch: string;
};
