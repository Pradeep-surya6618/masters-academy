"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const pages = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about" },
  { name: "Mentors", path: "/mentors" },
  { name: "Scores", path: "/scores", color: "secondary.main" },
  { name: "Courses", path: "/courses" },
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Wave animation variants
  const sidebarVariants = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(0px at calc(100% - 40px) 40px)",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backgroundColor: "white",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "95%",
          maxWidth: "1400px",
          borderRadius: "16px",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo Section */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link href="/" style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src="/Logos/Masters-Logo.svg"
                  alt="The Masters Academy"
                  width={180}
                  height={50}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Link>
            </Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 4,
              }}
            >
              {pages.map((page) => {
                const isActive = pathname === page.path;
                return (
                  <Button
                    key={page.name}
                    component={Link}
                    href={page.path}
                    sx={{
                      my: 2,
                      color: isActive
                        ? "primary.main"
                        : page.color || "text.primary",
                      display: "block",
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: isActive ? 700 : 500,
                      position: "relative",
                      "&:hover": {
                        color: "primary.main",
                        backgroundColor: "transparent",
                      },
                      "&::after": isActive
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: 5,
                            left: 0,
                            width: "100%",
                            height: "2px",
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: "2px",
                          }
                        : {},
                    }}
                  >
                    {page.name}
                  </Button>
                );
              })}
            </Box>

            {/* Login Button (Desktop) */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  px: 4,
                  py: 1,
                  fontSize: "1rem",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Login Now
              </Button>
            </Box>

            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <Toolbar sx={{ mb: 4 }} />

      {/* Mobile Drawer with Wave Animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "white",
              zIndex: 1200,
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 3, height: "100%" }}>
              {/* Header: Logo and Close Icon */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Image
                  src="/Logos/Masters-Logo.svg"
                  alt="The Masters Academy"
                  width={150}
                  height={50}
                  style={{ objectFit: "contain" }}
                />
                <IconButton onClick={handleDrawerToggle} size="large">
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Menu Items */}
              <List>
                {pages.map((page) => {
                  const isActive = pathname === page.path;
                  return (
                    <ListItem key={page.name} disablePadding sx={{ mb: 2 }}>
                      <ListItemButton
                        component={Link}
                        href={page.path}
                        onClick={handleDrawerToggle}
                        sx={{
                          textAlign: "center",
                          justifyContent: "center",
                          borderRadius: "12px",
                          backgroundColor: isActive
                            ? "rgba(24, 113, 99, 0.08)"
                            : "transparent",
                        }}
                      >
                        <ListItemText
                          primary={page.name}
                          primaryTypographyProps={{
                            variant: "h5",
                            color: isActive
                              ? "primary.main"
                              : page.color || "text.primary",
                            fontWeight: isActive ? 700 : 500,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
                <ListItem
                  disablePadding
                  sx={{ mt: 4, justifyContent: "center" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                      py: 1.5,
                      fontSize: "1.1rem",
                      color: "white",
                      maxWidth: "300px",
                    }}
                  >
                    Login Now
                  </Button>
                </ListItem>
              </List>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
