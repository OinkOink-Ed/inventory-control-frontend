import { useApiMutation } from "@/shared/api/hooks/useApi";
import { kabinetControllerCreate, type PostCreateKabinetDto } from "@api/gen";

export const useKabinetsFormApi = () => {
  return useApiMutation((data: PostCreateKabinetDto) =>
    kabinetControllerCreate(data)
  );
};
