import { postCreateUserDtoSchema } from "@api/generated";
import { z } from "zod";

export const createUserDtoSchemaZOD = postCreateUserDtoSchema.extend({
  username: z.string().min(4, { message: "Поле обязательно к заполнению" }),
  lastname: z.string().min(4, { message: "Поле обязательно к заполнению" }),
  name: z.string().min(4, { message: "Поле обязательно к заполнению" }),
  patronimyc: z.string(),
  //Здесь нужен паттерн для номера телефона
  telephone: z.string({ message: "Поле обязательно к заполнению" }),
  password: z.string().min(4, { message: "Поле обязательно к заполнению" }),
  role: z.object(
    { id: z.number().optional() },
    { message: "Поле обязательно к заполнению" },
  ),
  division: z.object(
    { id: z.number().optional() },
    { message: "Поле обязательно к заполнению" },
  ),
  state: z.enum(["active", "inactive"], {
    message: "Поле обязательно к заполнению",
  }),
  creator: z.object(
    { id: z.number().optional() },
    { message: "Поле обязательно к заполнению" },
  ),
});
