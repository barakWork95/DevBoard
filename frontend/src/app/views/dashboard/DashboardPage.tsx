import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import TaskIcon from "@mui/icons-material/TaskAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import { useStats } from "../../core/hooks/useStats";
import { PriorityColors, StatusColors } from "../../core/constants";
import { useNavigate } from "react-router-dom";

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            bgcolor: `${color}18`,
            color,
            borderRadius: 2,
            p: 1.5,
            display: "flex",
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { data, isLoading } = useStats();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) return null;

  const totalDone = data.tasksByStatus["DONE"] ?? 0;
  const totalInProgress = data.tasksByStatus["IN_PROGRESS"] ?? 0;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Dashboard
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Total Projects"
            value={data.totalProjects}
            icon={<FolderIcon />}
            color="#0052CC"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Total Tasks"
            value={data.totalTasks}
            icon={<TaskIcon />}
            color="#6554C0"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="In Progress"
            value={totalInProgress}
            icon={<PendingIcon />}
            color="#FF8B00"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Done"
            value={totalDone}
            icon={<CheckCircleIcon />}
            color="#36B37E"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Projects */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Recent Projects
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {data.recentProjects.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No projects yet
                </Typography>
              ) : (
                data.recentProjects.map((project) => (
                  <Box
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}`)}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      cursor: "pointer",
                      borderRadius: 1,
                      px: 1,
                      "&:hover": { bgcolor: "grey.100" },
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {project.name}
                    </Typography>
                    <Chip
                      label={project.status}
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        bgcolor: "#E3F2FD",
                        color: "#0052CC",
                      }}
                    />
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Tasks */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Recent Tasks
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {data.recentTasks.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No tasks yet
                </Typography>
              ) : (
                data.recentTasks.map((task) => (
                  <Box
                    key={task.id}
                    onClick={() =>
                      navigate(`/projects/${task.project.id}/tasks/${task.id}`)
                    }
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      cursor: "pointer",
                      borderRadius: 1,
                      px: 1,
                      "&:hover": { bgcolor: "grey.100" },
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {task.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {task.project.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Chip
                        label={task.priority}
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          bgcolor: `${PriorityColors[task.priority]}22`,
                          color: PriorityColors[task.priority],
                        }}
                      />
                      <Chip
                        label={task.status}
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          bgcolor: `${StatusColors[task.status]}22`,
                          color: StatusColors[task.status],
                        }}
                      />
                    </Box>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
