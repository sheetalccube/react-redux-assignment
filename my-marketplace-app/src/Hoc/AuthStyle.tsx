import type { CSSProperties } from "react";

export default function useAuthStyle() {
  return {
    container: {
      marginTop: "2rem",
      textAlign: "center" as CSSProperties["textAlign"],
    },
    heading: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    message: {
      fontSize: "1rem",
      color: "#666",
    },
  };
}
