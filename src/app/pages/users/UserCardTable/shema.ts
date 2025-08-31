import { getResponseStaffDetailedDtoSchema } from "@/app/api/generated";
import { z } from "zod";

export type GetResponseStaffDetailedShemaOfTable = z.infer<
  typeof getResponseStaffDetailedDtoSchema.shape.acceptedCartridge.element
>;
