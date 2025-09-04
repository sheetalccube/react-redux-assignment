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
      height: 350,
      width: 250,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      overflow: "hidden",
    },
    cardContent: {
      flexGrow: 1,
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
      whiteSpace: "normal",
      wordBreak: "break-word",
      overflowWrap: "break-word",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "14px", // 👈 add this
    },
    actions: {
      mt: 2,
    },
    addCartBtn: {
      mt: 2,
    },
  };
}
