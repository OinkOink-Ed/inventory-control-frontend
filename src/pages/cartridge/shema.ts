import { postCreateCartridgeModelDtoSchema } from "@/app/api/generated";
import { z } from "zod";

export const createModelCartridgeDtoSchemaZOD =
  postCreateCartridgeModelDtoSchema.extend({
    name: z.string().min(1, { message: "Поле обязательно для заполнения" }),
  });
