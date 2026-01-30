import {
  patchEditUserDtoSchema,
  type getResponseAcceptedCartridgeByUserDtoSchema,
} from "@api/gen";
import { z } from "zod";

export type GetResponseAcceptedCartridgeByUserDtoMySchema = z.infer<
  typeof getResponseAcceptedCartridgeByUserDtoSchema.shape.acceptedCartridge.element
>;

type PatchEditUserCardShape = typeof patchEditUserDtoSchema.shape;

export const editCardUserDtoSchemaZOD = patchEditUserDtoSchema.extend({
  username: z.optional(
    z.string().min(4, { message: "Требуется не менее 4 символов" }),
  ),
  lastname: z.optional(
    z.string().min(4, { message: "Требуется не менее 4 символов" }),
  ),
  name: z.optional(
    z.string().min(4, { message: "Требуется не менее 4 символов" }),
  ),
  patronimyc: z.optional(z.string().optional()),
  telephone: z.optional(
    z
      .string()
      .regex(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/, "Поле обязательно к заполнению")
      .transform((val) => val.replace(/[\s()\\-]/g, "")),
  ),
  role: z.optional(
    z.object({
      id: z.optional(z.number({ message: "Поле обязательно к заполнению" })),
    }),
  ),
  division: z.optional(
    z
      .array(
        z.object({
          id: z.optional(
            z.number({ message: "Поле обязательно к заполнению" }),
          ),
        }),
      )
      .min(1, { message: "Выберите хотя бы одно подразделение" }),
  ),
  kabinets: z.optional(
    z
      .array(
        z.object({
          id: z.optional(
            z.number({ message: "Поле обязательно к заполнению" }),
          ),
        }),
      )
      .min(1, { message: "Выберите хотя бы один кабинет" }),
  ),
} satisfies Record<keyof PatchEditUserCardShape, z.ZodType>);
