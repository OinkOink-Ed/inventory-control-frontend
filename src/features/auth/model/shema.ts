import { postAuthDtoSchema } from "@api/gen";
import { z } from "zod";

export const authRequestDtoSchemaZOD = postAuthDtoSchema.extend({
  username: z.string().min(1, { message: "Поле должно быть заполнено" }),
  password: z.string().min(1, { message: "Поле должно быть заполнено" }),
});
