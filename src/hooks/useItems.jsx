import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, getProducts } from "api/firebase";

export default function useItems() {
  const queryClient = useQueryClient();
  const itemsQuery = useQuery(["items"], getProducts, { staleTime: 1000 * 60 });
  const addNewItem = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["items"]),
    }
  );
  return { itemsQuery, addNewItem };
}
