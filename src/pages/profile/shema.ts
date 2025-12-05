import type { getResponseAcceptedCartridgeByUserDtoSchema } from "@api/gen";
import { z } from "zod";

export type GetResponseAcceptedCartridgeByUserDtoMySchema = z.infer<
  typeof getResponseAcceptedCartridgeByUserDtoSchema.shape.acceptedCartridge.element
>;
