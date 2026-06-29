import type { Project } from "@devboard/shared";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { StatusColors } from "../../core/constants";

export type ProjectsCardProps = {
  project: Project;
};

export default function ProjectsCard({ project }: ProjectsCardProps) {
  const navigate = useNavigate();

  const ownerInitials =
    project.owner?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "?";

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "grey.200",
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/projects/${project.id}`)}>
        <CardContent className="flex flex-col gap-3">
          {/* Status accent bar */}
          <div
            style={{
              height: 4,
              borderRadius: 2,
              backgroundColor: StatusColors[project.status] ?? "#6B778C",
              marginBottom: 4,
            }}
          />

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {project.name}
          </Typography>

          <Chip
            label={project.status}
            size="small"
            sx={{
              backgroundColor: `${StatusColors[project.status]}20`,
              color: StatusColors[project.status],
              fontWeight: 600,
              width: "fit-content",
            }}
          />

          {/* Footer — owner + date */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: 11,
                  bgcolor: "primary.main",
                }}
              >
                {ownerInitials}
              </Avatar>
              <Typography variant="caption" color="text.secondary">
                {project.owner?.name ?? "Unknown"}
              </Typography>
            </div>
            <Typography variant="caption" color="text.disabled">
              {new Date(project.updatedAt).toLocaleDateString()}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
