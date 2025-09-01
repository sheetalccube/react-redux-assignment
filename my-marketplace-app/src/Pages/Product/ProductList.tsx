import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Grid,
} from "@mui/material";
import { useContext, useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../Api/ProductApi";
import useProductListStyle from "./ProductListStyle";
import { UserContext } from "../../Context/UserContext";
import ProductImage from "./ProductImage";
import { useDispatch } from "react-redux";
import { addToCart } from "../Cart/CartSlice";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading } = useGetProductsQuery({ page, limit });
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const styles = useProductListStyle();
  const { userType } = useContext(UserContext);
  const dispatch = useDispatch();

  if (isLoading) return <p>Loading...</p>;

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <Box sx={styles.root}>
      <Typography variant="h4" gutterBottom sx={styles.title}>
        Product List
      </Typography>
      {userType === "admin" && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products/new")}
          sx={styles.addButton}
        >
          Add Product
        </Button>
      )}

      {/* Product Grid */}
      <Grid container spacing={3}>
        {data?.data?.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={styles.card}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ textAlign: "center" }}>
                  {/* <img
                    src={p.image ? p.image : "src/assets/nature.jpg"}
                    alt={p.name}
                    width="100%"
                    height={140}
                    style={styles.image}
                  /> */}
                  <ProductImage
                    src={p.image || "src/assets/nature.jpg"}
                    alt={p.name}
                    variant="list"
                  />
                </Box>

                <Typography variant="h6" mt={2}>
                  {p.name}
                </Typography>
                <Typography color="text.secondary">
                  Price: ₹{p.price}
                </Typography>
                <Typography sx={styles.description}>{p.description}</Typography>
                {userType === "admin" && (
                  <Stack direction="row" spacing={1} sx={styles.actions}>
                    <Button
                      onClick={() => navigate(`/products/${p.id}/edit`)}
                      variant="outlined"
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      variant="outlined"
                      size="small"
                      onClick={() => deleteProduct(p.id!)}
                    >
                      Delete
                    </Button>
                  </Stack>
                )}
                {userType !== "admin" && (
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          image: p.image,
                        })
                      )
                    }
                  >
                    Add to Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" spacing={2} sx={styles.pagination}>
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Typography align="center" variant="body1">
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
}
