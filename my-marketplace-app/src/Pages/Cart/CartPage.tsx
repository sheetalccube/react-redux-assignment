import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/Store/Store";
import { clearCart, removeFromCart } from "./CartSlice";
import { addOrder } from "../Order/OrderSlice";
import { useNavigate } from "react-router-dom";
import ProductImage from "../Product/ProductImage";

export default function CartPage() {
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const handleCheckout = () => {
    setTimeout(() => {
      const order = {
        id: Date.now().toString(),
        items: cartItems,
        total: totalPrice,
        date: new Date().toLocaleString(),
      };

      dispatch(addOrder(order));
      dispatch(clearCart());
      alert(" Payment Successful! Order placed.");
      navigate("/history");
    }, 1000);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <Box p={3}>
        <Typography variant="h5">Your cart is empty 🛒</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      <Stack spacing={2}>
        {cartItems.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <ProductImage src={item.image} alt={item.name} variant="cart" />
                <Box flexGrow={1}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography color="text.secondary">
                    ₹{item.price} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box mt={3}>
        <Typography variant="h6">Total: ₹{totalPrice}</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
