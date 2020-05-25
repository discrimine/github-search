export interface ProjectsResponse {
  incomplete_results: boolean,
  items: Project[]
  total_count: number,
}

export interface Project {
  id: number,
  owner: Owner,
  bane: string,
  description: string,
  stargazers_count: number,
  html_url: string,
  language: string,
}

export interface Owner {
  avatar_url: string,
  login: string,
  url: string,
}