import {
  cartridgeModelControllerCreate,
  PostCreateCartridgeModelDto,
} from "@/app/api/generated";
import { useApiMutation } from "@/shared/api/hooks/useApi";

export const useCartridgeModelFormApi = () => {
  return useApiMutation((data: PostCreateCartridgeModelDto) =>
    cartridgeModelControllerCreate(data),
  );
};
