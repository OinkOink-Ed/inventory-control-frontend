import { postCreateUserDtoSchema } from "@/app/api/generated";
import { z } from "zod";

type PostCreateUserShape = typeof postCreateUserDtoSchema.shape;

export const createUserDtoSchemaZOD = postCreateUserDtoSchema.extend({
  username: z.string().min(4, { message: "Требуется не менее 4 символов" }),
  lastname: z.string().min(4, { message: "Требуется не менее 4 символов" }),
  name: z.string().min(4, { message: "Требуется не менее 4 символов" }),
  patronimyc: z.string().optional(),
  // Здесь нужен паттерн для номера телефона
  telephone: z
    .string()
    .regex(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/, "Поле обязательно к заполнению")
    .transform((val) => val.replace(/[\s()\\-]/g, "")),
  password: z.string().min(8, { message: "Требуется не менее 8 символов" }),
  role: z.object({
    id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
  }),
  division: z
    .array(
      z.object({
        id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
      }),
    )
    .min(1, { message: "Выберите хотя бы одно подразделение" }),
  kabinets: z
    .array(
      z.object({
        id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
      }),
    )
    .min(1, { message: "Выберите хотя бы один кабинет" }),
  state: z.enum(["active", "inactive"], {
    message: "Поле обязательно к заполнению",
  }),
} satisfies Record<keyof PostCreateUserShape, z.ZodType>);
