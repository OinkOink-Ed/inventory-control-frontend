import {
  kabinetControllerCreate,
  PostCreateKabinetDto,
} from "@/app/api/generated";
import { useApiMutation } from "@/shared/api/hooks/useApi";

export const useKabinetsFormApi = () => {
  return useApiMutation((data: PostCreateKabinetDto) =>
    kabinetControllerCreate(data),
  );
};
