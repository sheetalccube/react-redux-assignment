import {useEffect} from "react";
import {TextField, Button, Box, Typography} from "@mui/material";
import {useParams, useNavigate} from "react-router-dom";
import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/Services/ProductApi";
import useStyle from "@/Pages/Product/ProductFormStyle";
import {useFormik} from "formik";
import * as Yup from "yup";

type ProductFormState = {
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

export default function ProductForm() {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const style = useStyle();

  const {data: existingProduct} = useGetProductByIdQuery(Number(id), {
    skip: !id,
  });

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const formik = useFormik<ProductFormState>({
    initialValues: {
      name: "",
      price: 0,
      image: "",
      category: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      category: Yup.string().required("Category is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      if (id) {
        await updateProduct({id: Number(id), ...values});
      } else {
        await addProduct(values);
      }
      navigate("/products");
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (existingProduct) {
      formik.setValues(existingProduct);
    }
  }, [existingProduct]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={style.container}>
      <Typography variant="h4" gutterBottom align="center">
        {id ? "Edit Product" : "Add Product"}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />

        <TextField
          label="Category"
          name="category"
          fullWidth
          margin="normal"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
        />

        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />

        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={style.uploadButton}
        >
          Upload Image
          <input type="file" name="image" hidden onChange={handleImageChange} />
        </Button>

        {formik.values.image && (
          <Box sx={style.imagePreview}>
            <img src={formik.values.image} alt="preview" style={style.image} />
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={style.submitButton}
          disabled={!formik.isValid || !formik.dirty}
        >
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
}
