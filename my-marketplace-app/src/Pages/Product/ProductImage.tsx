import { useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import useProductImageStyle from "./ProductImageStyle";

type ProductImageProps = {
  src: string;
  alt: string;
  height?: number;
};

export default function ProductImage({
  src,
  alt,
  height = 140,
}: ProductImageProps) {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);
  const styles = useProductImageStyle();

  return (
    <Box sx={{ ...styles.root, height }}>
      {loading && (
        <Box sx={styles.loader}>
          <CircularProgress size={24} />
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
