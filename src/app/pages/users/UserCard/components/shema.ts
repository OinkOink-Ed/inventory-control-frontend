import {
  getResponseAcceptedCartridgeByUserDtoSchema,
  putEditUserDtoSchema,
} from "@/app/api/generated";
import { z } from "zod";

export type GetResponseAcceptedCartridgeByUserDtoMySchema = z.infer<
  typeof getResponseAcceptedCartridgeByUserDtoSchema.shape.acceptedCartridge.element
>;

type PatchEditUserCardShape = typeof putEditUserDtoSchema.shape;

export const editCardUserDtoSchemaZOD = putEditUserDtoSchema.extend({
  username: z.string().min(4, { message: "Требуется не менее 4 символов" }),
  lastname: z.string().min(4, { message: "Требуется не менее 4 символов" }),
  name: z.string().min(4, { message: "Требуется не менее 4 символов" }),
  patronimyc: z.string().optional(),
  telephone: z
    .string()
    .regex(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/, "Поле обязательно к заполнению")
    .transform((val) => val.replace(/[\s()\\-]/g, "")),
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
} satisfies Record<keyof PatchEditUserCardShape, z.ZodType>);
