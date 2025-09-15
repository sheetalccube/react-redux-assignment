export default function useHeaderStyle() {
  return {
    toolbar: {gap: 3},
    mobileMenuButton: {display: {xs: "flex", md: "none"}},
    desktopNav: {display: {xs: "none", md: "flex"}, gap: 3},
    navLink: (isActive: boolean) => ({
      color: "inherit",
      textDecoration: "none",
      fontWeight: isActive ? 700 : 500,
      borderBottom: isActive ? "2px solid yellow" : "none",
      paddingBottom: "2px",
    }),
    mobileDrawer: {display: {xs: "block", md: "none"}},
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
    drawerButton: {justifyContent: "flex-start", color: "inherit"},

    authLogoutButton: {display: {xs: "none", md: "inline-flex"}},
    authBox: {display: {xs: "none", md: "flex"}, gap: 1},
  };
}
