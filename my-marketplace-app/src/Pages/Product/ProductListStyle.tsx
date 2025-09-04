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
      width: 250,
      display: "flex",
      flexDirection: "column",
      minHeight: 200,
      height: "100%",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
    imageBox: {
      textAlign: "center",
    },
    productName: {
      mt: 2,
    },
    pagination: {
      mt: 4,
      justifyContent: "center",
    },
    description: {
      mt: 1,
      fontSize: "14px",
      display: "-webkit-box",
      WebkitLineClamp: 5,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    actions: {
      mt: 2,
    },
    addCartBtn: {
      mt: 2,
    },
  };
}
