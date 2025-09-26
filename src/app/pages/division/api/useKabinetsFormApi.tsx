import { kabinetControllerCreate } from "@/app/api/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useKabinetsFormApi = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: kabinetControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["kabinets", id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["warehousewithDivisionWithKabinets"],
      });
    },
  });
};
