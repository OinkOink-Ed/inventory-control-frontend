import {
  cartridgeModelControllerCreate,
  PostCreateCartridgeModelDto,
} from "@/app/api/generated";
import { useApiMutation } from "@/hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";

export const useCartridgeModelFormApi = () => {
  const queryClient = useQueryClient();
  return useApiMutation(
    (data: PostCreateCartridgeModelDto) => cartridgeModelControllerCreate(data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["modelsCartridgesDetailed"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["modelsCartridges"],
        });
      },
    },
  );
};
