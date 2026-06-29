import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { TaskLabels, TaskPriorities } from "../../core/constants";
import { useUpdateTask } from "../../core/hooks/useTask";
import type { Task, UpdateTask } from "@devboard/shared";

type MemberOption = { userId: string; name: string };

type Props = {
  task: Task;
  members: MemberOption[];
  onClose: () => void;
};

export default function EditTaskModal({ task, members, onClose }: Props) {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description ?? "",
    priority: task.priority as string,
    labels: task.labels as string[],
    assigneeId: task.assigneeId ?? "",
  });

  const { mutate, isPending } = useUpdateTask(task.id);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | string[]>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload: UpdateTask = {
      title: form.title || undefined,
      description: form.description || undefined,
      priority: form.priority as UpdateTask["priority"],
      labels: form.labels as UpdateTask["labels"],
      assigneeId: form.assigneeId || undefined,
    };
    mutate(payload, { onSuccess: onClose });
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>Edit Task</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={form.priority}
              label="Priority"
              onChange={handleChange}
            >
              {TaskPriorities.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Labels</InputLabel>
            <Select
              multiple
              name="labels"
              value={form.labels}
              label="Labels"
              onChange={handleChange}
            >
              {TaskLabels.map((l) => (
                <MenuItem key={l} value={l}>
                  {l}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Assignee</InputLabel>
            <Select
              name="assigneeId"
              value={form.assigneeId}
              label="Assignee"
              onChange={handleChange}
            >
              <MenuItem value="">Unassigned</MenuItem>
              {members.map((m) => (
                <MenuItem key={m.userId} value={m.userId}>
                  {m.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
