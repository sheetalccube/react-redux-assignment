import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/Services/ProductApi";
import useProductListStyle from "@/Pages/Product/ProductListStyle";
import ProductImage from "@/Pages/Product/ProductImage";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/Services/CartSlice";
import type { RootState } from "@/Store/Store";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetProductsQuery({ page, limit });
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const styles = useProductListStyle();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );

  if (isLoading) return <p>Loading...</p>;

  const totalPages = Math.ceil((data?.total || 0) / limit);
  const handleDeleteClick = (id: number) => {
    setProductIdToDelete(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (productIdToDelete !== null) {
      deleteProduct(productIdToDelete);
    }
    setOpenDialog(false);
    setProductIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setProductIdToDelete(null);
  };

  return (
    <Box sx={styles.root}>
      <Typography variant="h4" gutterBottom sx={styles.title}>
        Product List
      </Typography>
      {isAuthenticated && user?.isAdmin && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products/new")}
          sx={styles.addButton}
        >
          Add Product
        </Button>
      )}
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {data?.data?.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={styles.card}>
              <CardContent sx={styles.cardContent}>
                <Box sx={styles.imageBox}>
                  <ProductImage
                    src={p.image || "src/assets/nature.jpg"}
                    alt={p.name}
                    variant="list"
                  />
                </Box>
                <Typography variant="h6" sx={styles.productName}>
                  {p.name}
                </Typography>
                <Typography color="text.secondary">
                  Price: ₹{p.price}
                </Typography>
                <Typography sx={styles.description}>{p.description}</Typography>
                {isAuthenticated && user?.isAdmin && (
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
                      onClick={() => handleDeleteClick(p.id!)}
                    >
                      Delete
                    </Button>
                  </Stack>
                )}
                {!user?.isAdmin && (
                  <Button
                    variant="contained"
                    size="small"
                    sx={styles.addCartBtn}
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate("/login");
                        return;
                      }
                      dispatch(
                        addToCart({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          image: p.image,
                        })
                      );
                    }}
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

      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
