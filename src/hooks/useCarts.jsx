import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCart, getCarts } from "api/firebase";
import { useAuthApi } from "context/AuthContext";
export default function useCarts() {
  const { uid } = useAuthApi();
  console.log("uid", uid);
  const queryClient = useQueryClient();
  const cartsQuery = useQuery(["cartItems"], () => getCarts(uid), {
    enabled: !!uid,
  });
  const addNewCartItem = useMutation((item) => addNewCart(item, uid), {
    onSuccess: () => queryClient.invalidateQueries(["cartItems"]),
  });
  return { cartsQuery, addNewCartItem };
}
