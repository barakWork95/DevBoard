import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useTaskById,
  useUpdateTaskStatusOnDetail,
  useDeleteTask,
} from "../../core/hooks/useTask";
import { useProjectMembers } from "../../core/hooks/useProjects";
import {
  Box,
  Skeleton,
  Typography,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  StatusColors,
  PriorityColors,
  TaskStatuses,
} from "../../core/constants";
import EditTaskModal from "./EditTaskModal";
import type { ProjectMember } from "@devboard/shared";

type MemberWithUserId = ProjectMember & { userId: string };

export default function TaskDetailsPage() {
  const { taskId, id } = useParams();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);

  const { data, isLoading, isError } = useTaskById(taskId!);
  const task = data?.data;

  const { data: membersData } = useProjectMembers(id!);

  const updateStatus = useUpdateTaskStatusOnDetail(taskId!, id!);
  const deleteTask = useDeleteTask();

  const members: { userId: string; name: string }[] = (
    (membersData?.data ?? []) as MemberWithUserId[]
  ).map((m) => ({ userId: m.userId, name: m.user.name }));

  const assigneeName = members.find((m) => m.userId === task?.assigneeId)?.name;

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

  const handleDelete = () => {
    deleteTask.mutate(
      { taskId: taskId!, projectId: id! },
      { onSuccess: () => navigate(`/projects/${id}`) },
    );
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Back button + actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tooltip title="Back to board">
            <IconButton
              size="small"
              onClick={() => navigate(`/projects/${id}`)}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary">
            Back to board
          </Typography>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon fontSize="small" />}
            onClick={() => setEditOpen(true)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineOutlinedIcon fontSize="small" />}
            disabled={deleteTask.isPending}
            onClick={handleDelete}
          >
            {deleteTask.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
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
            {/* Inline status select */}
            <FormControl size="small">
              <Select
                value={task?.status ?? ""}
                onChange={(e) => updateStatus.mutate(e.target.value)}
                disabled={updateStatus.isPending}
                sx={{
                  color: statusColor,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: `${statusColor}60`,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: statusColor,
                  },
                  "& .MuiSelect-select": {
                    py: "4px",
                    px: "10px",
                    backgroundColor: `${statusColor}20`,
                    borderRadius: "16px",
                  },
                }}
              >
                {TaskStatuses.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
                    {(assigneeName ?? "?")[0].toUpperCase()}
                  </Avatar>
                  <Typography variant="body2">
                    {assigneeName ?? task.assigneeId}
                  </Typography>
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

      {editOpen && task && (
        <EditTaskModal
          task={task}
          members={members}
          onClose={() => setEditOpen(false)}
        />
      )}
    </div>
  );
}
