import {useState} from "react";
import {CircularProgress, Box} from "@mui/material";
import useStyle from "@/Pages/Product/ProductImageStyle";

type ProductImageProps = {
  src: string;
  alt: string;
  variant?: "list" | "cart" | "history";
};

const sizeMap = {
  list: {height: 140, width: "100%"},
  cart: {height: 50, width: 50},
  history: {height: 40, width: 40},
};

export default function ProductImage({
  src,
  alt,
  variant = "list",
}: ProductImageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [imgSrc, setImgSrc] = useState<string>(src);
  const styles = useStyle();
  const {height, width} = sizeMap[variant];

  return (
    <Box sx={{...styles.root, height, width}}>
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
          ...(loading ? styles.hidden : styles.visible),
        }}
        onLoad={() => setLoading(false)}
        onError={() => setImgSrc("src/assets/nature.jpg")}
      />
    </Box>
  );
}
