import { useTheme } from "@mui/material/styles";

export default function useStyle() {
  const theme = useTheme();

  return {
    formBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "0 auto",
      width: "100%",
      padding: theme.spacing(2),
    },
    button: {
      display: "block",
      margin: "10px auto 0 auto",
      width: "180px",
    },
    listContainer: {
      display: "flex",
      justifyContent: "center", // center horizontally
      marginTop: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2),
      },
    },
    listPaper: {
      width: "80%", // keep it narrower for center alignment
      maxWidth: "600px",
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
    },
    listItem: (index: number) => ({
      backgroundColor:
        index % 2 === 0
          ? theme.palette.action.hover
          : theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
      "&:hover": {
        backgroundColor: theme.palette.action.selected,
      },
    }),
    listItemTextPrimary: {
      color: theme.palette.text.primary,
    },
    listItemTextSecondary: {
      color: theme.palette.text.secondary,
    },
    title: {
      color: theme.palette.primary.main,
      fontSize: "2rem",
      fontWeight: 600,
      textAlign: "center",
      Margin: theme.spacing(2, 0),
      Padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem",
        margin: theme.spacing(1, 0),
        padding: theme.spacing(0.5),
      },
    },
    emptyText: {
      color: theme.palette.text.secondary,
      marginTop: theme.spacing(2),
      textAlign: "center",
    },
  };
}
