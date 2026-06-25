import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useAddMembers } from "../../core/hooks/useProjects";
import { useState } from "react";
import Typography from "@mui/material/Typography";

export type InviteMembersModalProps = {
  projectId: string;
  onClose: () => void;
};

export default function InviteMembersModal({
  projectId,
  onClose,
}: InviteMembersModalProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const { mutate: addMembers, isPending } = useAddMembers(projectId);
  const handleClose = () => onClose();

  const handleChangeName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const emails = event.target.value.split(",");
    setEmails(emails);
  };
  const handleCreate = () => {
    addMembers(emails, { onSuccess: () => onClose() });
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
        <div className="flex items-end justify-between">
          <Typography sx={{ fontWeight: "bold" }} variant="h6">
            Enter emails
            <Typography variant="caption"> (separates with comma)</Typography>
          </Typography>
          <CloseIcon color="primary" onClick={handleClose} />
        </div>
        <div className="flex items-center justify-center">
          <TextareaAutosize
            minRows={5}
            placeholder="test@test.com, test_1@test_1.com"
            style={{ width: "100%" }}
            value={emails}
            onChange={handleChangeName}
          />
        </div>
        <Button onClick={handleCreate} variant="contained" disabled={isPending}>
          {isPending ? "Adding..." : "Add"}
        </Button>
      </Box>
    </Modal>
  );
}
