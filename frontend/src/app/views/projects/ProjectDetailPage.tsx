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
import Checkbox from "@mui/material/Checkbox";
import PersonIcon from "@mui/icons-material/Person";
import type { ProjectMember, Task } from "@devboard/shared";

export default function ProjectDetailPage() {
  const { id } = useParams();
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

      <div className="flex items-start gap-5 h-full w-full border rounded-sm p-3">
        {/* TASKS */}
        <div className="flex-1 border-r">
          {isTasksLoading ? (
            renderTasksLoadingState()
          ) : isTasksError ? (
            renderTasksErrorState()
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <Checkbox />
                <Typography variant="h6">Tasks:</Typography>
              </div>
              <List dense={true}>
                {tasksData?.data?.map((task: Task) => (
                  <ListItem key={task.id || task.title}>
                    <Checkbox />
                    <ListItemText
                      primary={task.title}
                      secondary={task.description}
                    />
                  </ListItem>
                ))}
              </List>
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
              <Typography variant="h6">Members:</Typography>
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
    </div>
  );
}
