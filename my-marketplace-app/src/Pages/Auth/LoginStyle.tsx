export default function useLoginStyle() {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "90vh",
    },
    errorAlert: {
      mb: 2,
    },
    inputField: {
      mb: 2,
    },
    submitButton: {
      py: 1.2,
    },
  };
}
