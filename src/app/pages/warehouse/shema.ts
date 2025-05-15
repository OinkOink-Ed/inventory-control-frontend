import {
  postCreateDecommissioningDtoSchema,
  postCreateDeliveryDtoSchema,
  postCreateMovementDtoSchema,
  postCreateReceivingDtoSchema,
} from "@/app/api/generated";
import { z } from "zod";

export const createReceivingDtoSchema = postCreateReceivingDtoSchema.extend({
  model: z.object({
    id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
  }),
  warehouse: z.object({
    id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
  }),
  count: z.coerce
    .number()
    .positive({ message: "Число должно быть положительным и больше 0" }),
});

export const createDecommissioningDtoShema =
  postCreateDecommissioningDtoSchema.extend({
    comment: z
      .string()
      .min(4, { message: "Вы должны ввести причину списания" }),
    warehouse: z.object({
      id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
    }),
    model: z.object({
      id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
    }),
    count: z.coerce
      .number()
      .positive({ message: "Число должно быть положительным и больше 0" }),
  });

export const createMovementDtoShema = postCreateMovementDtoSchema.extend({
  model: z.object({
    id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
  }),
  warehouse: z.object({
    id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
  }),
  warehouseFrom: z.object({
    id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
  }),
  warehouseWhere: z.object({
    id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
  }),
  count: z.coerce
    .number()
    .positive({ message: "Число должно быть положительным и больше 0" }),
});

export const createDeliveryDtoShema = postCreateDeliveryDtoSchema.extend({
  model: z.object({
    id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
  }),
  kabinet: z.object({
    id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
  }),
  division: z.object({
    id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
  }),
  warehouse: z.object({
    id: z.coerce.number({ message: "Поле обязательно к заполнению" }),
  }),
  count: z.coerce
    .number()
    .positive({ message: "Число должно быть положительным и больше 0" }),
});
