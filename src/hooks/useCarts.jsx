import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCart, getCarts, removeItem } from "api/firebase";
import { useAuthApi } from "context/AuthContext";
export default function useCarts() {
  const { uid } = useAuthApi();

  const queryClient = useQueryClient();
  const cartsQuery = useQuery(["cartItems", uid || ""], () => getCarts(uid), {
    enabled: !!uid,
  });
  const addNewCartItem = useMutation((item) => addNewCart(item, uid), {
    onSuccess: () => queryClient.invalidateQueries(["cartItems", uid]),
  });
  const removeCartItem = useMutation(
    (itemId) => removeItem("cart", itemId, uid),
    {
      onSuccess: () => queryClient.invalidateQueries(["cartItems", uid]),
    }
  );
  return { cartsQuery, addNewCartItem, removeCartItem };
}
