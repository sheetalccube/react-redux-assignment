import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../Api/ProductApi";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading } = useGetProductsQuery({ page, limit });
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom align="center">
        Product List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/products/new")}
        sx={{ mb: 2 }}
      >
        Add Product
      </Button>

      {data?.data?.map((p) => (
        <Card key={p.id} sx={{ mb: 2 }}>
          <CardContent>
            <img src={"src/assets/nature.jpg"} alt={p.name} width={100} />
            <Typography variant="h6">{p.name}</Typography>
            <Typography>Price: ₹{p.price}</Typography>
            <Button
              onClick={() => navigate(`/products/${p.id}/edit`)}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => deleteProduct(p.id!)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Custom Navigation */}
      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
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
