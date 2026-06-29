import { useParams } from "react-router-dom";
import {
  useProjectById,
  useProjectMembers,
  useProjectTasks,
} from "../../core/hooks/useProjects";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import type { ProjectMember } from "@devboard/shared";
import { useState } from "react";
import InviteMembersModal from "./InviteMembersModal";
import KanbanBoard from "./KanbanBoard";
import { CreateTaskModal } from "./CreateTaskModal";
import { StatusColors } from "../../core/constants";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const {
    data: projectData,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useProjectById(id!);
  const {
    data: membersData,
    isLoading: isMembersLoading,
    isError: isMembersError,
  } = useProjectMembers(id!);
  const {
    data: tasksData,
    isLoading: isTasksLoading,
    isError: isTasksError,
  } = useProjectTasks(id!);

  const project = projectData?.data;

  if (isProjectLoading)
    return (
      <div className="flex flex-col gap-4 p-4">
        <Skeleton variant="rounded" height={100} />
        <Skeleton variant="rounded" height={400} />
      </div>
    );

  if (isProjectError)
    return (
      <div className="flex items-center justify-center h-full">
        <Typography color="error">
          Failed to load project. Try refreshing.
        </Typography>
      </div>
    );

  const ownerInitials =
    project?.owner?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() ?? "?";

  return (
    <div className="flex flex-col h-full gap-4">
      {/* HEADER */}
      <div
        className="flex items-center justify-between px-6 py-4 rounded-lg"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}
      >
        <div className="flex flex-col gap-2">
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            {project?.name}
          </Typography>
          <div className="flex items-center gap-2">
            <Chip
              label={project?.status}
              size="small"
              sx={{
                backgroundColor: `${StatusColors[project?.status ?? ""]}20`,
                color: StatusColors[project?.status ?? ""],
                fontWeight: 600,
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Owner + date */}
          <div className="flex flex-col gap-2 items-end">
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
              <Typography variant="body2" color="text.secondary">
                {project?.owner?.name ?? "Unknown"}
              </Typography>
            </div>
            <div className="flex items-center gap-1">
              <CalendarTodayIcon
                sx={{ fontSize: 14, color: "text.disabled" }}
              />
              <Typography variant="caption" color="text.disabled">
                Updated{" "}
                {new Date(project?.updatedAt ?? "").toLocaleDateString()}
              </Typography>
            </div>
          </div>

          {/* Add Task button */}
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex items-start gap-4 flex-1 min-h-0">
        {/* BOARD */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {isTasksLoading && <Skeleton variant="rounded" height={300} />}
          {isTasksError && (
            <Typography color="error">Failed to load tasks.</Typography>
          )}
          {!isTasksLoading && !isTasksError && (
            <KanbanBoard projectId={id!} tasks={tasksData?.data ?? []} />
          )}
        </div>

        {/* MEMBERS PANEL */}
        <div
          className="flex flex-col gap-2 rounded-lg p-4"
          style={{
            width: 240,
            minWidth: 240,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
          }}
        >
          <div className="flex items-center justify-between">
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Members ({membersData?.data?.length ?? 0})
            </Typography>
            <Tooltip title="Invite members">
              <IconButton size="small" onClick={() => setIsModalOpen(true)}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>

          {isMembersLoading && <Skeleton variant="rounded" height={100} />}
          {isMembersError && (
            <Typography variant="caption" color="error">
              Failed to load members.
            </Typography>
          )}
          {!isMembersLoading && !isMembersError && (
            <List dense disablePadding>
              {membersData?.data?.map((member: ProjectMember) => {
                const initials = member.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();
                return (
                  <ListItem key={member.id} disablePadding sx={{ py: 0.5 }}>
                    <ListItemAvatar sx={{ minWidth: 36 }}>
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          fontSize: 11,
                          bgcolor: "secondary.main",
                        }}
                      >
                        {initials}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {member.user.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.disabled">
                          {member.role.toLowerCase()}
                        </Typography>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          )}
        </div>
      </div>

      {isModalOpen && (
        <InviteMembersModal
          projectId={id as string}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isAddTaskModalOpen && (
        <CreateTaskModal
          projectId={id as string}
          onClose={() => setIsAddTaskModalOpen(false)}
        />
      )}
    </div>
  );
}
