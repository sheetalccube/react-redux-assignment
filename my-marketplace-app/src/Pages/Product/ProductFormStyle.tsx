export default function useProductFormStyle() {
  return {
    container: {
      p: 2,
      maxWidth: 400,
      mx: "auto",
    },
    imagePreview: {
      mt: 2,
      textAlign: "center" as const,
    },
    image: {
      width: 120,
    },
    uploadButton: {
      mt: 2,
    },
    submitButton: {
      mt: 3,
    },
  };
}
