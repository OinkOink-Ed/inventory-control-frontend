import {
  kabinetControllerCreate,
  PostCreateKabinetDto,
} from "@/app/api/generated";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/hooks/useApi";

export const useKabinetsFormApi = (id: number) => {
  const queryClient = useQueryClient();

  return useApiMutation(
    (data: PostCreateKabinetDto) => kabinetControllerCreate(data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["kabinets", id],
        });
        await queryClient.invalidateQueries({
          queryKey: ["warehousewithDivisionWithKabinets"],
        });
      },
    },
  );
};
