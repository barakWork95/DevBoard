import { useProjects } from "../../core/hooks/useProjects";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import FolderOffIcon from "@mui/icons-material/FolderOff";
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
    <div className="flex flex-col gap-6 p-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "text.primary" }}
        >
          My Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Create Project
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rounded" height={160} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Error */}
      {isError && (
        <Typography color="error">
          An error occurred. Try refreshing the page.
        </Typography>
      )}

      {/* Empty state */}
      {!isLoading && !isError && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-24">
          <FolderOffIcon sx={{ fontSize: 64, color: "text.disabled" }} />
          <Typography variant="h6" color="text.secondary">
            No projects yet
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Create your first project to get started
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            Create Project
          </Button>
        </div>
      )}

      {/* Projects grid */}
      {!isLoading && !isError && projects.length > 0 && (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectsCard project={project} />
            </Grid>
          ))}
        </Grid>
      )}

      {isModalOpen && <CreateProjectModal onClose={handleCloseModal} />}
    </div>
  );
}
