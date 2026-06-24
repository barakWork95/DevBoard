import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateProject } from "../../core/hooks/useProjects";
import { useState } from "react";

export type CreateProjectModalProps = {
  onClose: () => void;
};

export const CreateProjectModal = ({ onClose }: CreateProjectModalProps) => {
  const [projectName, setProjectName] = useState("");
  const { mutate: createProject, isPending } = useCreateProject();
  const handleClose = () => onClose();
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };
  const handleCreate = () => {
    createProject(projectName, {
      onSuccess: () => onClose(),
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={style}>
        <div className="flex items-end justify-end">
          <CloseIcon color="primary" onClick={handleClose} />
        </div>
        <div className="flex items-center justify-between">
          <TextField
            id="standard-basic"
            label="Enter Name"
            variant="standard"
            value={projectName}
            onChange={handleChangeName}
          />
          <Button onClick={handleCreate} disabled={isPending || !projectName}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
