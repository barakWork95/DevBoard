import { useParams } from "react-router-dom";
import { useTaskById } from "../../core/hooks/useTask";
import { Box, Skeleton, Typography } from "@mui/material";

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const { data, isLoading, isError } = useTaskById(taskId!);

  if (isLoading)
    return (
      <Box>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Box>
    );
  if (isError) return <Typography>Try again later</Typography>;

  return (
    <div className="w-full h-full">
      <Typography variant="h4">{data?.data?.title}</Typography>
      <Typography variant="h6">{data?.data?.description}</Typography>
    </div>
  );
}
