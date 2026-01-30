import { useApiMutation } from "@/shared/api";
import {
  cartridgeModelControllerCreate,
  type PostCreateCartridgeModelDto,
} from "@api/gen";

export const useCartridgeModelFormApi = () => {
  return useApiMutation((data: PostCreateCartridgeModelDto) =>
    cartridgeModelControllerCreate(data),
  );
};
