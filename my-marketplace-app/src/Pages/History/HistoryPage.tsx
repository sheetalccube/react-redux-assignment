import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import type { RootState } from "@/Store/Store";
import ProductImage from "@/Pages/Product/ProductImage";
import useHistoryPageStyle from "./HistoryPageStyle";

export default function HistoryPage() {
  const orders = useSelector((state: RootState) => state.order.history);
  const styles = useHistoryPageStyle();

  if (orders.length === 0) {
    return (
      <Box sx={styles.emptyBox}>
        <Typography variant="h5">No orders yet !!!!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.root}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <Stack spacing={2}>
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent>
              <Typography variant="h6">Order #{order.id}</Typography>
              <Typography variant="body2" color="text.secondary">
                {order.date}
              </Typography>
              <Divider sx={styles.divider} />

              {order.items.map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={styles.itemStack}
                >
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    variant="history"
                  />
                  <Box sx={styles.itemInfo}>
                    <Typography>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{item.price} × {item.quantity} = ₹
                      {item.price * item.quantity}
                    </Typography>
                  </Box>
                </Stack>
              ))}

              <Divider sx={styles.divider} />
              <Typography variant="h6">Total: ₹{order.total}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
