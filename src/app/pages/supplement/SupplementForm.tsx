import {
  CreateModelCartridgeDto,
  createModelCartridgeDtoSchema,
} from "@/app/api/generated";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { Button } from "@/components/ui/Button/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { z } from "zod";

export function SupplementForm() {
  const form = useForm<z.infer<typeof createModelCartridgeDtoSchema>>({
    resolver: zodResolver(createModelCartridgeDtoSchema),
    defaultValues: {
      creator: {
        id: 0,
      },
      modelName: "",
    },
  });

  function onSubmit(data: CreateModelCartridgeDto): void {
    try {
      data.creator.id = decryptedProfile().id;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Toaster richColors />
      <Form {...form}>
        <form
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
          className="flex gap-5 space-y-8 border-b-2 p-8"
        >
          <FormField
            control={form.control}
            name="modelName"
            render={({ field }) => (
              <FormItem className="h-20">
                <FormLabel>Название модели картриджа</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите модель картриджа"
                    {...field}
                    className="w-[300px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Внести</Button>
        </form>
      </Form>
    </>
  );
}
