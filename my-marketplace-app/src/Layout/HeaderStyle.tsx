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
  };
}
