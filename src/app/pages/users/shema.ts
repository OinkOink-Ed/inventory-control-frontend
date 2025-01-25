import {
  createUserDtoSchema,
  roleWhenCreatingUserDtoSchema,
} from "@/app/api/generated";
import { z } from "zod";

const roleWhenCreatingUserDtoSchemaZOD = roleWhenCreatingUserDtoSchema.extend({
  id: z.coerce.number(),
});

export const createUserDtoSchemaZOD = createUserDtoSchema.extend({
  nickname: z.string().min(4),
  surname: z.string().min(4),
  name: z.string().min(4),
  patronimyc: z.string(),
  password: z.string().min(4),
  role: z.lazy(() => roleWhenCreatingUserDtoSchemaZOD),
});
