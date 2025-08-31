import { postCreateUserDtoSchema } from "@/app/api/generated";
import { z } from "zod";

export const createStaffDtoSchemaZOD = postCreateUserDtoSchema.extend({
  name: z.string().min(4, { message: "Требуется не менее 4 символов" }),
  lastname: z.string().min(4, { message: "Требуется не менее 4 символов" }),
  patronimyc: z.string().optional(),
});
