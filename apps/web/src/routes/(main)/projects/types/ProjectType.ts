export type Project = {
    id: string;
    name: string;
    description: string;
    category: string | null;
    status: "active" | "completed" | "archived";
  };

export type StatusFilter = "all" | "active" | "completed";