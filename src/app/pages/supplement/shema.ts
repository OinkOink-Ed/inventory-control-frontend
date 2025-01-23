import {
  createModelCartridgeDtoSchema,
  userWhenCreatemodelDtoSchema,
} from "@/app/api/generated";
import { z } from "zod";

export const createModelCartridgeDtoSchemaZOD =
  createModelCartridgeDtoSchema.extend({
    modelName: z
      .string()
      .min(1, { message: "Поле обязательно для заполнения" }),
    printerName: z
      .string()
      .min(1, { message: "Поле обязательно для заполнения" }),
    creator: z.lazy(() => userWhenCreatemodelDtoSchema),
  });
