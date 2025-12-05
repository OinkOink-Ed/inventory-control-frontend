import { useApiMutation } from "@/shared/api/hooks/useApi";
import {
  cartridgeModelControllerCreate,
  type PostCreateCartridgeModelDto,
} from "@api/gen";

export const useCartridgeModelFormApi = () => {
  return useApiMutation((data: PostCreateCartridgeModelDto) =>
    cartridgeModelControllerCreate(data)
  );
};
