import { useState } from "react";
import { useLogin } from "../../core/hooks/useAuth";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  const { mutate, isPending, isError } = useLogin();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ email: formData.email, password: formData.password });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: "100%", maxWidth: 420, p: 4, borderRadius: 2 }}
      >
        <Typography
          variant="h5"
          color="primary"
          sx={{ fontWeight: 700, textAlign: "center", mb: 0.5 }}
        >
          DevBoard
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mb: 3 }}
        >
          Sign in to your account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          {isError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              Invalid email or password
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isPending}
            sx={{ mt: 2, py: 1.2 }}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", mt: 3 }}
          color="text.secondary"
        >
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#0052CC", fontWeight: 600 }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
