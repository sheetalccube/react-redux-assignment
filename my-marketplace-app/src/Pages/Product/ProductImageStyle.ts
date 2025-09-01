export default function useProductImageStyle() {
  return {
    root: {
      position: "relative",
      width: "100%",
    },
    loader: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      borderRadius: 8,
      display: "block",
    },
    hidden: {
      display: "none",
    },
  };
}
