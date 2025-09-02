import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../Api/ProductApi";

export default function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: existingProduct } = useGetProductByIdQuery(Number(id), {
    skip: !id,
  });

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [form, setForm] = useState({
    name: "",
    price: 0,
    image: "",
  });

  useEffect(() => {
    if (existingProduct) setForm(existingProduct);
  }, [existingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () =>
        setForm((prev) => ({ ...prev, image: fileReader.result as string }));
      fileReader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (id) {
      await updateProduct({ id: Number(id), ...form });
    } else {
      await addProduct(form);
    }
    navigate("/products");
  };

  return (
    <Box p={2} maxWidth={400} mx="auto">
      <Typography variant="h4" gutterBottom align="center">
        {id ? "Edit Product" : "Add Product"}
      </Typography>

      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={handleChange}
      />

      <TextField
        label="Price"
        name="price"
        type="number"
        fullWidth
        margin="normal"
        value={form.price}
        onChange={handleChange}
      />

      <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
        Upload Image
        <input type="file" name="image" hidden onChange={handleChange} />
      </Button>

      {form.image && (
        <Box mt={2} textAlign="center">
          <img src={form.image} alt="preview" width={120} />
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        {id ? "Update" : "Create"}
      </Button>
    </Box>
  );
}
