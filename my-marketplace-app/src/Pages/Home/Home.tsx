import { Outlet } from "react-router-dom";
import { Box, Typography, Container, Paper } from "@mui/material";
import useStyle from "./Homestyle";

function Home() {
  const style = useStyle();
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Container maxWidth="md" sx={style.container}>
      <Paper elevation={3} sx={style.paper}>
        <Typography variant="h4" gutterBottom sx={style.title}>
          Welcome to the Home Page
        </Typography>
        <Typography variant="body1" sx={style.description}>
          This is the main landing page of our React application. Use the
          navigation bar above to explore different sections like Todos, Users,
          Forms, and more.
          <br />
          {isLoggedIn
            ? "You are currently logged in. Enjoy browsing your content!"
            : "You are not logged in. Please log in to access protected pages."}
        </Typography>
      </Paper>

      <Box sx={style.outletBox}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default Home;
