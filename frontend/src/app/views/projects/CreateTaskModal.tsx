import { useState } from "react";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useCreateTask } from "../../core/hooks/useTask";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import { TaskStatuses, TaskPriorities, TaskLabels } from "../../core/constants";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

export type CreateTaskModalProps = {
  projectId: string;
  onClose: () => void;
};

export const CreateTaskModal = ({
  projectId,
  onClose,
}: CreateTaskModalProps) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    assigneeId: string;
    parentId: string;
    labels: string[];
    status: string;
    priority: string;
    projectId: string;
  }>({
    title: "",
    description: "",
    assigneeId: "",
    parentId: "",
    labels: [],
    status: "",
    priority: "",
    projectId,
  });
  const { mutate: createTask, isPending } = useCreateTask(projectId);
  const handleClose = () => onClose();
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | string[]>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    const payload = {
      ...formData,
      assigneeId: formData.assigneeId || undefined,
      parentId: formData.parentId || undefined,
    };
    // @ts-expect-error labels type mismatch
    createTask(payload, {
      onSuccess: () => onClose(),
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "50px",
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={style}>
        <FormGroup onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              value={formData.title}
              onChange={handleChange}
            />

            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                {TaskStatuses.map((status) => (
                  <MenuItem value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={formData.priority}
                label="Priority"
                onChange={handleChange}
              >
                {TaskPriorities.map((priority) => (
                  <MenuItem value={priority}>{priority}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel>Labels</InputLabel>
              <Select
                multiple
                name="labels"
                value={formData.labels as unknown as string}
                label="Labels"
                onChange={handleChange}
              >
                {TaskLabels.map((label) => (
                  <MenuItem value={label}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
            >
              {isPending ? "Creating.." : "Create"}
            </Button>
          </Stack>
        </FormGroup>
      </Box>
    </Modal>
  );
};
