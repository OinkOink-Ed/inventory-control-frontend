import { postAuthDtoSchema } from "@api/generated";
import { z } from "zod";

export const authRequestDtoSchemaZOD = postAuthDtoSchema.extend({
  nickname: z.string().min(1, { message: "Поле должно быть заполнено" }),
  password: z.string().min(1, { message: "Поле должно быть заполнено" }),
});
