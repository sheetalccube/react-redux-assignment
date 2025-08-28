export default function useHeaderStyle() {
  return {
    toolbar: {
      gap: 3,
    },
    navLink: (isActive: boolean) => ({
      color: "inherit",
      textDecoration: "none",
      fontWeight: isActive ? 700 : 500,
      borderBottom: isActive ? "2px solid yellow" : "none",
      paddingBottom: "2px",
    }),
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
