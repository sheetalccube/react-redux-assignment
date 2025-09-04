export default function useHeaderStyle() {
  return {
    toolbar: {
      gap: 3,
    },
    flexGrow: {
      flexGrow: 1,
    },
    mobileMenuIcon: {
      display: { xs: "flex", md: "none" },
    },
    desktopNav: {
      display: { xs: "none", md: "flex" },
      gap: 3,
    },
    navLink: (isActive: boolean) => ({
      color: "inherit",
      textDecoration: "none",
      fontWeight: isActive ? 700 : 500,
      borderBottom: isActive ? "2px solid yellow" : "none",
      paddingBottom: "2px",
    }),
    themeToggleBtn: {
      mr: 2,
      display: { xs: "none", md: "inline-flex" },
    },
    userIconBtn: {
      mr: 2,
    },
    logoutBtn: {
      display: { xs: "none", md: "inline-flex" },
    },
    authBox: {
      display: { xs: "none", md: "flex" },
      gap: 1,
    },
    mobileDrawer: {
      display: { xs: "block", md: "none" },
    },
    drawerBox: {
      width: 250,
      display: "flex",
      flexDirection: "column",
      padding: "10px",
    },
    drawerLink: (isActive: boolean) => ({
      textDecoration: "none",
      fontWeight: isActive ? 700 : 500,
    }),
    drawerButton: {
      justifyContent: "flex-start",
      color: "inherit",
    },
  };
}
