export default function useProductListStyle() {
  return {
    root: {
      p: 2,
    },
    title: {
      textAlign: "center",
      mb: 2,
    },
    addButton: {
      mb: 3,
    },
    card: {
      height: "100%",
    },
    image: {
      objectFit: "cover" as const,
      borderRadius: 8,
    },
    actions: {
      mt: 2,
    },
    pagination: {
      mt: 4,
      justifyContent: "center",
    },
  };
}
