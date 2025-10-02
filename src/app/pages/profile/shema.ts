import { getResponseAcceptedCartridgeByUserDtoSchema } from "@/app/api/generated";
import { z } from "zod";

export type GetResponseAcceptedCartridgeByUserDtoMySchema = z.infer<
  typeof getResponseAcceptedCartridgeByUserDtoSchema.shape.acceptedCartridge.element
>;
