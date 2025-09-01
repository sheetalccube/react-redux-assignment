import { useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import useProductImageStyle from "./ProductImageStyle";

type ProductImageProps = {
  src: string;
  alt: string;
  variant?: "list" | "cart" | "history";
};

const sizeMap = {
  list: { height: 140, width: "100%" },
  cart: { height: 50, width: 50 },
  history: { height: 40, width: 40 },
};

export default function ProductImage({
  src,
  alt,
  variant = "list",
}: ProductImageProps) {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);
  const styles = useProductImageStyle();
  const { height, width } = sizeMap[variant];

  return (
    <Box sx={{ ...styles.root, height, width }}>
      {loading && (
        <Box sx={styles.loader}>
          <CircularProgress size={20} />
        </Box>
      )}
      <img
        src={imgSrc}
        alt={alt}
        style={{
          ...styles.image,
          display: loading ? "none" : "block",
        }}
        onLoad={() => setLoading(false)}
        onError={() => setImgSrc("src/assets/nature.jpg")} // fallback image
      />
    </Box>
  );
}
