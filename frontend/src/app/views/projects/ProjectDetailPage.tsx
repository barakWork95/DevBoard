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
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import type { ProjectMember } from "@devboard/shared";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import InviteMembersModal from "./InviteMembersModal";
import KanbanBoard from "./KanbanBoard";
import { Button } from "@mui/material";
import { CreateTaskModal } from "./CreateTaskModal";

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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenAddTask = () => setIsAddTaskModalOpen(true);
  const handleCloseAddTask = () => setIsAddTaskModalOpen(false);

  const renderMembersLoadingState = () => {
    return <div>{/* members skeleton */}</div>;
  };

  const renderTasksLoadingState = () => {
    return <div>{/* tasks skeleton */}</div>;
  };

  const renderMembersErrorState = () => {
    return <div>{/* members error */}</div>;
  };

  const renderTasksErrorState = () => {
    return <div>{/* tasks error */}</div>;
  };

  if (isProjectLoading) return <div>{/* full page skeleton */}</div>;
  if (isProjectError) return <div>{/* full page error */}</div>;

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between p-2">
        <div>
          <Typography variant="h4">{projectData?.data.name}</Typography>
          <p>
            <strong>Status: </strong>
            {projectData?.data.status.toLowerCase()}
          </p>
        </div>
        <div>
          <p>
            <strong>Owner: </strong>
            {projectData?.data.owner.name}
          </p>
          <p>
            <strong>Last update: </strong>
            {new Date(projectData?.data.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-5 h-full w-full rounded-sm p-3">
        {/* TASKS */}
        <div className="flex-1 border-r">
          {isTasksLoading ? (
            renderTasksLoadingState()
          ) : isTasksError ? (
            renderTasksErrorState()
          ) : (
            <div className="flex flex-col gap-2">
              <Button
                className="w-fit"
                variant="contained"
                onClick={handleOpenAddTask}
              >
                Add Task
              </Button>
              <KanbanBoard tasks={tasksData?.data} />
            </div>
          )}
        </div>

        {/* MEMBERS */}
        <div>
          {isMembersLoading ? (
            renderMembersLoadingState()
          ) : isMembersError ? (
            renderMembersErrorState()
          ) : (
            <div>
              <div className="flex items-center justify-start gap-2">
                <Tooltip title="Add members">
                  <IconButton
                    aria-label="add-members"
                    size="medium"
                    onClick={handleOpenModal}
                  >
                    <AddIcon color="action" fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Typography variant="h6">Members:</Typography>
              </div>
              <List dense={true}>
                {membersData?.data?.map((member: ProjectMember) => (
                  <ListItem key={member.id || member.user.name}>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.user.name}
                      secondary={member.role.toLowerCase()}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <InviteMembersModal
          projectId={id as string}
          onClose={handleCloseModal}
        />
      )}

      {isAddTaskModalOpen && (
        <CreateTaskModal
          projectId={id as string}
          onClose={handleCloseAddTask}
        />
      )}
    </div>
  );
}
