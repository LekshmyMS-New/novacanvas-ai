import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Create", path: "/create" },
    { label: "Gallery", path: "/gallery" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        color: "#222",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(90deg,#7B61FF,#FF6584)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          NovaCanvas
        </Typography>

        <Box>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                mx: 1.5,
                fontWeight: 600,
                borderBottom:
                  location.pathname === item.path
                    ? "2px solid #7B61FF"
                    : "2px solid transparent",
                transition: "all 0.3s",
                "&:hover": {
                  borderBottom: "2px solid #FF6584",
                  background: "transparent",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
