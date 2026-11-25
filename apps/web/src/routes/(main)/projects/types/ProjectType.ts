export type Project = {
  id: string;
  name: string;
  description: string;
  category: string | null;
  status: "active" | "completed" | "archived";
};

export type StatusFilter = "all" | "active" | "completed";
export type CreateProjectInput = Pick<Project, "name" | "description" | "category">;
export type UpdateProjectInput = {
  id: Project["id"]
} & Partial<Omit<Project, "id">>;
export type DeleteProjectInput = Project["id"];