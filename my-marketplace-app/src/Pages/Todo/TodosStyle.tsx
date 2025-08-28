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
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1),
      },
    },
    button: {
      display: "block",
      margin: "10px auto 0 auto",
      width: "180px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    listContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(0, 1),
      },
    },
    listPaper: {
      width: "80%",
      maxWidth: "600px",
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        padding: theme.spacing(1.5),
      },
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
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    }),
    listItemTextPrimary: {
      color: theme.palette.text.primary,
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.9rem",
      },
    },
    listItemTextSecondary: {
      color: theme.palette.text.secondary,
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8rem",
      },
    },
    title: {
      color: theme.palette.primary.main,
      fontSize: "2rem",
      fontWeight: 600,
      textAlign: "center",
      margin: theme.spacing(2, 0),
      padding: theme.spacing(1),
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
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.9rem",
      },
    },
    textField: {
      width: "300px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  };
}
