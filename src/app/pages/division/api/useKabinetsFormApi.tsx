import {
  kabinetControllerCreate,
  PostCreateKabinetDto,
} from "@/app/api/generated";
import { useApiMutation } from "@/hooks/useApi";

export const useKabinetsFormApi = () => {
  return useApiMutation((data: PostCreateKabinetDto) =>
    kabinetControllerCreate(data),
  );
};
