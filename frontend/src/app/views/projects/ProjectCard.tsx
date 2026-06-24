import type { Project } from "@devboard/shared";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export type ProjectsCardProps = {
  project: Project;
};

export default function ProjectsCard({ project }: ProjectsCardProps) {
  const navigate = useNavigate();
  return (
    <Card sx={{ border: 1, borderColor: "black", minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6">{project.name}</Typography>
        <Typography variant="caption">{project.status}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          Enter
        </Button>
      </CardActions>
    </Card>
  );
}
