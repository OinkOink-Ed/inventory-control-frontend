import { postCreateStaffDtoSchema } from "@/app/api/generated";
import { z } from "zod";

export const createStaffDtoSchemaZOD = postCreateStaffDtoSchema.extend({
  name: z.string().min(4, { message: "Требуется не менее 4 символов" }),
  lastname: z.string().min(4, { message: "Требуется не менее 4 символов" }),
  patronimyc: z.string().optional(),
});
