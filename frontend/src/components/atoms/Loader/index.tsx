import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
