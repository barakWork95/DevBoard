import { useProjects } from "../../core/hooks/useProjects";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import type { Project } from "@devboard/shared";
import ProjectsCard from "./ProjectCard";
import { useState } from "react";
import { CreateProjectModal } from "./CreateProjectModal";

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError } = useProjects();
  const projects: Project[] = data?.data ?? [];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <h1>My Projects:</h1>
        <Button variant="contained" onClick={handleOpenModal}>
          Create Project
        </Button>
      </div>

      {isLoading ? (
        <div className="flex">
          <Skeleton variant="rounded" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </div>
      ) : projects.length === 0 ? (
        <div>There is no project yet.</div>
      ) : (
        <Grid className="h-full" container spacing={2}>
          {projects.map((project) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectsCard project={project} />
            </Grid>
          ))}
        </Grid>
      )}

      {isError && <div>An error occurred. Try to refresh the page.</div>}

      {isModalOpen && <CreateProjectModal onClose={handleCloseModal} />}
    </div>
  );
}
