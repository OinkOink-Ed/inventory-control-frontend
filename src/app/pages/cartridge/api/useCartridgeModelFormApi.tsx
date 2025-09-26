import { cartridgeModelControllerCreate } from "@/app/api/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCartridgeModelFormApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartridgeModelControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["modelsCartridgesDetailed"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["modelsCartridges"],
      });
    },
  });
};
