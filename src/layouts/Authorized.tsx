import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import { ApplicationBar } from "../components/UI/ApplicationBar";
import { ApplicationDrawer } from "../components/UI/ApplicationDrawer";
import { ApplicationFooter } from "../components/UI/ApplicationFooter";

export const Authorized = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ApplicationDrawer />
      <ApplicationBar />
      <ApplicationFooter />

      <Box component="main" sx={{ flexGrow: 1, my: 10, px: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
