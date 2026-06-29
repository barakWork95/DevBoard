import { useParams, useNavigate } from "react-router-dom";
import { useTaskById } from "../../core/hooks/useTask";
import {
  Box,
  Skeleton,
  Typography,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { StatusColors, PriorityColors } from "../../core/constants";

export default function TaskDetailsPage() {
  const { taskId, id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useTaskById(taskId!);
  const task = data?.data;

  if (isLoading)
    return (
      <Box className="flex flex-col gap-4 p-6">
        <Skeleton variant="rounded" height={40} width={300} />
        <Skeleton variant="rounded" height={24} width={200} />
        <Skeleton variant="rounded" height={120} />
        <Skeleton variant="rounded" height={24} width={150} />
      </Box>
    );

  if (isError)
    return (
      <Box className="flex items-center justify-center h-full">
        <Typography color="error">
          Failed to load task. Try refreshing.
        </Typography>
      </Box>
    );

  const statusColor = StatusColors[task?.status ?? ""] ?? "#6B778C";
  const priorityColor = PriorityColors[task?.priority ?? ""] ?? "#6B778C";

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Back button */}
      <div className="flex items-center gap-2">
        <Tooltip title="Back to board">
          <IconButton size="small" onClick={() => navigate(`/projects/${id}`)}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Typography variant="body2" color="text.secondary">
          Back to board
        </Typography>
      </div>

      {/* Main content */}
      <div className="flex gap-6 flex-1">
        {/* Left — title + description */}
        <div
          className="flex flex-col gap-4 flex-1 rounded-lg p-6"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            {task?.title}
          </Typography>

          <div className="flex items-center gap-2">
            <Chip
              label={task?.status}
              size="small"
              sx={{
                backgroundColor: `${statusColor}20`,
                color: statusColor,
                fontWeight: 600,
              }}
            />
            <Chip
              label={task?.priority}
              size="small"
              sx={{
                backgroundColor: `${priorityColor}20`,
                color: priorityColor,
                fontWeight: 600,
              }}
            />
          </div>

          <Divider />

          <div className="flex flex-col gap-2">
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: "text.secondary" }}
            >
              Description
            </Typography>
            <Typography
              variant="body2"
              color={task?.description ? "text.primary" : "text.disabled"}
            >
              {task?.description ?? "No description provided."}
            </Typography>
          </div>

          {/* Labels */}
          {task?.labels && task.labels.length > 0 && (
            <div className="flex flex-col gap-2">
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                Labels
              </Typography>
              <div className="flex flex-wrap gap-1">
                {task.labels.map((label: string) => (
                  <Chip
                    key={label}
                    label={label}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1, fontSize: 11 }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — metadata */}
        <div
          className="flex flex-col gap-4 rounded-lg p-6"
          style={{
            width: 240,
            minWidth: 240,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Details
          </Typography>

          <Divider />

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Typography variant="caption" color="text.disabled">
                Assignee
              </Typography>
              {task?.assigneeId ? (
                <div className="flex items-center gap-2">
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      fontSize: 11,
                      bgcolor: "secondary.main",
                    }}
                  >
                    ?
                  </Avatar>
                  <Typography variant="body2">{task.assigneeId}</Typography>
                </div>
              ) : (
                <Typography variant="body2" color="text.disabled">
                  Unassigned
                </Typography>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="caption" color="text.disabled">
                Created
              </Typography>
              <div className="flex items-center gap-1">
                <CalendarTodayIcon
                  sx={{ fontSize: 13, color: "text.disabled" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {new Date(task?.createdAt ?? "").toLocaleDateString()}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="caption" color="text.disabled">
                Last updated
              </Typography>
              <div className="flex items-center gap-1">
                <CalendarTodayIcon
                  sx={{ fontSize: 13, color: "text.disabled" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {new Date(task?.updatedAt ?? "").toLocaleDateString()}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
